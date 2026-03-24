---
sidebar_position: 1
--- 
# start 

引入 org.aspectj:aspectjweaver 依赖 : 主要作用概括为 “解析” 与 “织入” 两大核心能力
Spring 只是 AOP 的管理者，而 aspectjweaver 是 AOP 的执行工具
在springboot中则导入 spring-boot-starter-aop 

1. 导入依赖 
```kotlin
implementation("org.springframework.boot:spring-boot-starter-aop:3.5.11")
```

2. 开启aspectj自动代理功能
```java
@SpringBootApplication
@EnableAspectJAutoProxy
public class SpringDemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringDemoApplication.class, args);
    }
}
```

3. declare an aspect

```java
@Component
@Slf4j
@Aspect
public class LogAspect {

    @Pointcut("@annotation(com.jasper.common.anno.Loggable)")
    public void logPointcut(){}

    @Around("logPointcut()")
    public Object doAround(ProceedingJoinPoint joinPoint){
        Stopwatch stopwatch = Stopwatch.createStarted();
        MethodSignature signature = (MethodSignature)joinPoint.getSignature();
        Loggable loggable = signature.getMethod().getAnnotation(Loggable.class);
        log.info("loggable value: {}", loggable.value());
        log.info("request param is {}", joinPoint.getArgs());
        try {
            //业务逻辑 以及业务返回结果
            Object result = joinPoint.proceed();
            log.info("after proceed elapsed time: {} ",stopwatch.elapsed());
            return result;
        } catch (Throwable e) {
            throw new RuntimeException(e);
        }
    }
}

```
1. use 
```java 
    @PostMapping
    @Loggable("新增用户")
    public User createUser(@RequestBody User user) {
        return userService.saveOrUpdate(user);
    }
```
