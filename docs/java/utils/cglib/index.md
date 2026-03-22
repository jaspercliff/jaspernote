# cglib 

```java
@Slf4j
public class AwsSmsService {
    public SmsResponse send(String phone,String message){
        log.info("aws send message phone is {}, message is {}",phone,message);
        return new SmsResponse("success");
    }
}

@Slf4j
public class WatchInterceptor implements MethodInterceptor {
    @Override
    public Object intercept(Object o, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {
        Stopwatch stopwatch = Stopwatch.createStarted();
        // 1. 前置增强：参数检查
        String phone = (String) args[0];
        if (phone.startsWith("110")) {
            log.info(" [安全拦截] 敏感号码，禁止发送！");
            return new SmsResponse("REJECTED");
        }

        Object result = methodProxy.invokeSuper(o, args);
        stopwatch.stop();
        log.info(" [耗时] {} 毫秒", stopwatch.elapsed().toMillis());
        return result;
    }
}

    static void main() {
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(AwsSmsService.class);
        // proxy enhance
        enhancer.setCallback(new WatchInterceptor());
        AwsSmsService proxy = (AwsSmsService)enhancer.create();
        proxy.send("110","hello");
        proxy.send("120","world");
    }
```
