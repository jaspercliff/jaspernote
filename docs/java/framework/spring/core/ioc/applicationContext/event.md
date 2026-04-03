# spring event

要运行一个 Spring 事件，你需要定义三个角色：

1. 事件 (Event)：你要传递的消息载体 extends ApplicationEvent。现在（Spring 4.2+）不需要继承任何类，普通的 POJO 即可。
2. 发布者 (Publisher)：触发事件的对象: 通过注入 ApplicationEventPublisher 并调用 publishEvent() 发送。
3. 监听器 (Listener)：接收并处理事件的对象:使用 @EventListener 注解或者实现 ApplicationListener 接口。

> 从 Spring 4.2 版本开始，事件基础架构得到了显著改进，不仅提供了基于注解的模型 ，还允许发布任意事件（即不一定继承自 ApplicationEvent 对象）。发布此类对象时，我们会自动将其包装在一个事件中


```java
/**
 * orderId event                  extends ApplicationEvent  is unnecessary for 4.2 +
 * @param orderId
 * @param amount
 */
public record CreateOrderEvent(String orderId, BigDecimal amount) {
}

@Getter
public class CreateOrder1Event extends ApplicationEvent {
    private final String orderId;
    private final BigDecimal amount;

    // 必须实现这个构造函数
    public CreateOrder1Event(Object source, String orderId, BigDecimal amount) {
        super(source);
        this.orderId = orderId;
        this.amount = amount;
    }

}

@Component
@Slf4j
public class SmsListener {
    @EventListener
    public void onCreateOrder(CreateOrderEvent event) {
        log.info("短信监听：订单{}创建成功，开始发送短信...",event.orderId());
    }
}
@Component
@Slf4j
public class EmailListener implements ApplicationListener<CreateOrder1Event> {
    @Override
    public void onApplicationEvent(CreateOrder1Event event) {
        log.info("email监听：订单{}创建成功,amount is {} ，开始发送email..."
                ,event.getOrderId(),event.getAmount());
    }
}

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {
    private final ApplicationEventPublisher publisher;
    public void createOrder(String orderId, BigDecimal amount) {
        log.info("创建订单: {}", orderId);
        // 发送事件
        publisher.publishEvent(new CreateOrderEvent(orderId,amount));
        publisher.publishEvent(new CreateOrder1Event(this,orderId,amount));
    }
}
```

可以使用spel表达式在 @EventListener 注解上添加条件，只有当条件满足时才会调用监听方法

```java
@Component
@Slf4j
public class SmsListener {
    @EventListener(condition = "#event.amount > 100")
    public void onCreateOrder(CreateOrderEvent event) {
        log.info("has param 短信监听：订单{}创建成功，开始发送短信...",event.orderId());
    }

    /**
     * 只关心事件发生，不关心事件内容
     */
    @EventListener(value = CreateOrderEvent.class)
    public void onCreateOrder1() {
        log.info("no param 短信监听：订单创建成功，开始发送短信....");
    }
}
```

如果需要发布一个事件作为处理另一个事件的结果，可以更改方法签名以返回要发布的事件
异步事件监听器方法无法通过返回值来发布后续事件。如果需要发布另一个事件作为处理结果，请注入一个 ApplicationEventPublisher 手动发布活动

```java
@Component
@Slf4j
@RequiredArgsConstructor
public class LogListener {

    /**
     * like stack  no order(log is before sms and email) is nest
     * add order to solve(sms and email before log)
     */
    @EventListener
    @Order(5)
    public LogEvent handleLogEvent(CreateOrderEvent event) {
        log.info("LogEvent");
        return new LogEvent(event.orderId(),event.amount());
    }

    /**
     * log event
     */
    @EventListener
    public void handleLogEvent(LogEvent event) {
        log.info("LogEvent, add log orderId is {}, amount is {}", event.orderId(),event.amount());
    }
}
```

异步

```java
    @EnableAsync
    public class SpringDemoApplication {}

    /**
     * 只关心事件发生，不关心事件内容
     * 如果异步监听器里报错了，主流程是感知不到的。事务也不会因为异步方法的失败而回滚
     * 异步线程无法直接获取主线程的 @Transactional 事务状态。如果你在异步方法里写数据库，它是一个独立的事务
     * ThreadLocal 和日志上下文不会在事件处理过程中传播
     */
    @EventListener(value = CreateOrderEvent.class)
    @Order(0)
    @Async
    public void onCreateOrder1() {
        log.info("no param 短信监听：订单创建成功，开始发送短信....,threadName:{}"
        ,Thread.currentThread().getName());
    }
```

异步线程补偿  AsyncUncaughtExceptionHandler
```java
@Configuration
@EnableAsync
@Slf4j
public class AsyncConfig implements AsyncConfigurer {

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return (throwable, method, obj) -> {
            log.error("-------------------------------------------------");
            log.error("异步任务发生异常！");
            log.error("异常信息: {}", throwable.getMessage());
            log.error("方法名称: {}", method.getName());
            for (Object param : obj) {
                log.error("参数: {}", param);
            }
            log.error("-------------------------------------------------");
            
            // 在这里可以做额外处理：比如发邮件告警、写入数据库错误日志
        };
    }
}
```

泛型 

```java 
@SuppressWarnings({"unchecked"})
// 泛型 T 代表手机类型
// 泛型擦除 后的 PhoneProducedEvent<T> 变成 PhoneProducedEvent<Object> 不知道是apple还是android
public class PhoneProducedEvent<T> extends ApplicationEvent implements ResolvableTypeProvider {

    public PhoneProducedEvent(T phone) {
        super(phone);
    }

    @Override
    public ResolvableType getResolvableType() {
        // 关键：动态获取 getSource() (即手机实例) 的实际类型
        // 从而把 PhoneProducedEvent<T> 变成 PhoneProducedEvent<Apple> 等
        return ResolvableType.forClassWithGenerics(getClass(), 
                ResolvableType.forInstance(getSource()));
    }
    
    public T getPhone() {
        return (T) getSource();
    }
}
@Component
public class PhoneProductionListener {

    // 只会接收泛型为 Apple 的事件
    @EventListener
    public void onAppleProduced(PhoneProducedEvent<Apple> event) {
        Apple apple = event.getPhone();
        System.out.println("🍎 监听到苹果手机生产: " + apple.getBrand());
    }

    // 只会接收泛型为 Android 的事件
    @EventListener
    public void onAndroidProduced(PhoneProducedEvent<Android> event) {
        Android android = event.getPhone();
        System.out.println("🤖 监听到安卓手机生产: " + android.getBrand());
    }
}
```
