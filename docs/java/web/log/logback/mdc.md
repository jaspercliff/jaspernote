# mdc 

**MDC (Mapped Diagnostic Context)** 是分布式链路追踪（TraceId）和日志排查的“生命线”。

---

### 一、 什么是 MDC？它为什么重要？

**MDC** 是 SLF4J 提供的一个机制，底层基于 `ThreadLocal` 实现。它允许我们在当前线程的上下文中绑定一些键值对（如 `traceId`、`userId`），然后在打印日志时，通过日志框架（Logback/Log4j2）的配置，自动将这些值追加到日志中。

**它的重要性在于**：在微服务和高并发场景下，一个用户请求可能会跨越多个线程、多个服务。如果没有 MDC，日志就会变成一团乱麻，你根本无法把同一个请求的日志串联起来。

---

### 二、 MDC 在多线程/线程池中的“致命痛点”

MDC 的底层是 `ThreadLocal`，这就注定了它在多线程环境下有三个致命缺陷：

1. **父子线程不传递**：主线程 `put` 了 `traceId`，新建的子线程默认是拿不到的（除非用 `InheritableThreadLocal`）。
2. **线程池复用导致传递失效**：即使你用了 `InheritableThreadLocal`，它只在**线程创建时**（`new Thread`）拷贝一次父线程的值。而**线程池中的线程是复用的**，子线程早就创建好了，所以 `InheritableThreadLocal` 在线程池场景下**完全失效**！
3. **线程复用导致上下文污染**：任务 A 执行时设置了 `traceId=111`，执行完没清理；线程被复用给任务 B 时，任务 B 的日志里会错误地打印出 `traceId=111`，导致链路彻底错乱。

---

### 三、 生产级 MDC 落地方案（终极闭环）

要彻底解决上述问题，我们需要一套完整的方案：**入口拦截 -> 线程池传递 -> 日志输出**。

#### 1. 引入终极武器：阿里 TTL (TransmittableThreadLocal)
手动包装每一个 `Runnable` 和 `Callable` 太容易遗漏了。生产环境强烈建议使用阿里的 **TTL**，它专门解决线程池上下文传递问题。

```xml
<!-- pom.xml 引入依赖 -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>transmittable-thread-local</artifactId>
    <version>2.14.2</version>
</dependency>
```

#### 2. 配置支持 TTL 的线程池
在 Spring Boot 中，将原生的线程池用 TTL 包装一层。这样，MDC 就能自动在线程池任务间传递了。

```java
import com.alibaba.ttl.threadpool.TtlExecutors;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.concurrent.*;

@Configuration
public class ThreadPoolConfig {

    @Bean("bizExecutor")
    public Executor bizExecutor() {
        // 1. 创建原生线程池
        ThreadPoolExecutor rawExecutor = new ThreadPoolExecutor(
                10, 20, 60L, TimeUnit.SECONDS,
                new LinkedBlockingQueue<>(1000),
                new ThreadFactoryBuilder().setNameFormat("biz-pool-%d").build(),
                new ThreadPoolExecutor.CallerRunsPolicy()
        );
        
        // 2. 【核心】使用 TTL 包装，使其具备跨线程池传递 ThreadLocal (包括 MDC) 的能力
        return TtlExecutors.getTtlExecutor(rawExecutor);
    }
}
```

#### 3. 在请求入口统一初始化 MDC (Web 环境)
在 HTTP 请求刚进入系统时，生成 `traceId` 并放入 MDC。

```java
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import java.util.UUID;

@Component
public class TraceIdInterceptor implements HandlerInterceptor {

    private static final String TRACE_ID = "traceId";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        // 1. 从请求头获取（如果是上游传过来的），或者自己生成一个
        String traceId = request.getHeader(TRACE_ID);
        if (traceId == null || traceId.isEmpty()) {
            traceId = UUID.randomUUID().toString().replace("-", "");
        }
        
        // 2. 放入 MDC
        MDC.put(TRACE_ID, traceId);
        
        // 3. 将 traceId 放入响应头，方便前端或上游排查
        response.setHeader(TRACE_ID, traceId);
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        // 【极其重要】请求结束时，必须清理 MDC，防止 Tomcat 线程池复用导致污染！
        MDC.clear();
    }
}
```
*(注：别忘了在 WebMvcConfigurer 中注册这个 Interceptor)*

#### 4. 配置 Logback 输出 TraceId
修改 `logback-spring.xml`，让日志自动打印 MDC 中的 `traceId`。

```xml
<!-- 定义日志格式，使用 %X{traceId} 获取 MDC 中的值 -->
<property name="LOG_PATTERN" value="%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] [%X{traceId:-}] %-5level %logger{36} - %msg%n"/>

<appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
    <encoder>
        <pattern>${LOG_PATTERN}</pattern>
    </encoder>
</appender>

<root level="INFO">
    <appender-ref ref="CONSOLE"/>
</root>
```

---

### 四、 业务代码中的“无感”使用

经过上述配置后，你的业务代码将变得极其清爽，**完全不需要手动去 get/set MDC**：

```java
@Service
@Slf4j
public class OrderService {

    @Resource
    private Executor bizExecutor; // 注入前面配置的 TTL 包装过的线程池

    public void createOrder(Long userId) {
        // 主线程打印日志，自动带上 traceId
        log.info("开始创建订单, userId: {}", userId);

        // 提交异步任务
        CompletableFuture.runAsync(() -> {
            // 【神奇的事情发生了】：异步线程中，MDC 自动传递过来了！
            // 这里的日志会自动带上和主线程一模一样的 traceId
            log.info("异步执行：扣减库存, userId: {}", userId);
            
            // 模拟业务逻辑
            deductStock(userId);
        }, bizExecutor);
        
        // 如果是 CompletableFuture 链式调用，同样自动传递
        CompletableFuture.supplyAsync(() -> queryUser(userId), bizExecutor)
            .thenApplyAsync(user -> sendSms(user.getPhone()), bizExecutor);
    }
}
```

---

### 五、 MDC 生产环境避坑 Checklist

1. **绝对不要忘记 `MDC.clear()`**：
   在 Web 拦截器（Filter/Interceptor）的 `afterCompletion` 或 `finally` 块中，**必须**调用 `MDC.clear()`。否则 Tomcat 的工作线程被复用时，上一个请求的 `traceId` 会“附体”到下一个请求上。
2. **警惕 `@Async` 默认线程池**：
   Spring 的 `@Async` 默认使用 `SimpleAsyncTaskExecutor`（每次新建线程）或自定义的线程池。如果你自定义了线程池，**一定要用 TTL 包装它**，否则 `@Async` 方法里的 MDC 会丢失。
3. **定时任务（`@Scheduled`）的坑**：
   定时任务是由 Spring 内部的 `TaskScheduler` 线程池执行的，它**没有 HTTP 请求上下文**，所以天然没有 `traceId`。
   *解决办法*：在定时任务内部手动生成一个特殊的 `traceId`（如 `schedule-xxx`），放入 MDC，执行完再清理。
4. **日志脱敏与长度限制**：
   不要把太大的对象（如完整的 JSON 报文）塞进 MDC，MDC 是跟着线程走的，塞大对象会导致内存暴涨。只放 `traceId`、`userId` 这种短字符串。

