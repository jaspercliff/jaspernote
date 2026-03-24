# 代理模式

我们使用代理对象来代替对真实对象(real object)的访问，这样就可以在不修改原目标对象的前提下，提供额外的功能操作，扩展目标对象的功能
代理模式的主要作用是扩展目标对象的功能，比如说在目标对象的某个方法执行前后你可以增加一些自定义的操作

## 静态代理

- 静态代理中，我们对目标对象的每个方法的增强都是手动完成的，非常不灵活（*比如接口一旦新增加方法，目标对象和代理对象都要进行修改*）且麻烦(*需要对每个目标类都单独写一个代理类*）

静态代理实现步骤:

1. 定义一个接口及其实现类；
2. 创建一个代理类同样实现这个接口
3. 将目标对象注入进代理类，然后在代理类的对应方法调用目标类中的对应方法

```java
public interface SmsService {
    void send(String phone, String message);
}
@Slf4j
public class AliSmsService implements SmsService{
    @Override
    public void send(String phone, String message) {
        log.info("ali send message");
    }
}

@RequiredArgsConstructor
@Slf4j
public class SmsServiceProxy {
    private final SmsService realService;

    /**
     * 如果某个模块调用时需要代理，则使用该proxy类，不需要则直接使用原对象就好
     * @param phone phone
     * @param message message
     */
    public void send(String phone,String message) {
        Stopwatch stopwatch = Stopwatch.createStarted();
        realService.send(phone,message);
        stopwatch.stop();
        log.info("cost time: {}",stopwatch.elapsed());
    }
}

```

## 动态代理

相比于静态代理来说，动态代理更加灵活。我们不需要针对每个目标类都单独创建一个代理类，并且也不需要我们必须实现接口，我们可以直接代理实现类( *CGLIB 动态代理机制*)

**从 JVM 角度来说，动态代理是在运行时动态生成类字节码，并加载到 JVM 中的。**

说到动态代理，Spring AOP、RPC 框架应该是两个不得不提的，它们的实现都依赖了动态代理。

**动态代理在我们日常开发中使用的相对较少，但是在框架中的几乎是必用的一门技术。学会了动态代理之后，对于我们理解和学习各种框架的原理也非常有帮助。**

就 Java 来说，动态代理的实现方式有很多种，比如**JDK 动态代理**、**CGLIB 动态代理**等等。

### jdk动态代理

1. 定义一个接口及其实现类；
2. 自定义`InvocationHandler`并重写`invoke`方法，在`invoke`方法中我们会调用原生方法（被代理类的方法）并自定义一些处理逻辑；
3. 通过`Proxy.newProxyInstance(ClassLoader loader,Class<?>[] interfaces,InvocationHandler h)`方法创建代理对象；

:::info
如果 UserServiceImpl 实现了 UserService 接口，JDK 代理会生成一个名为 $ProxyN 的类。  
关系： $ProxyN 和 UserServiceImpl 是 兄弟关系。它们都实现了 UserService 接口。  
结构： 代理类内部持有一个 InvocationHandler，该处理器引用了真正的 target（即你的 UserServiceImpl 实例）  
:::

#### InvocationHandler

1.定义发送短信的接口

```java

public interface SmsService {
    String send(String message);
}

```

2.实现发送短信的接口

```java
@Slf4j
public class TxSmsService implements SmsService {
    @Override
    public SmsResponse send(String phone, String message) {
        log.info("tx phone is {} : message is {} ", phone, message);
        return  new SmsResponse();
    }
}
```

3.定义一个 JDK 动态代理类

```java
@RequiredArgsConstructor
@Slf4j
public class WatchInvocationHandler implements InvocationHandler {

    private final Object target;

    @Override
    public Object invoke(Object o, Method method, Object[] args) throws Throwable {

        String phone = (String)args[0];
        if ("110".equals(phone)){
            log.info("phone number is 110, don't");
        }
        Stopwatch stopwatch = Stopwatch.createStarted();
        Object result = method.invoke(target, args);
        stopwatch.stop();
        log.info("cost time: {} ms",stopwatch.elapsed(TimeUnit.MILLISECONDS));
        return result;
    }
}
```

`invoke()`方法: 当我们的动态代理对象调用原生方法的时候，最终实际上调用到的是`invoke()`方法，然后`invoke()`方法代替我们去调用了被代理对象的原生方法。

4.获取代理对象的工厂类

```java
public class ProxyFactory {
    public static Object getProxy(Object target) {
        return Proxy.newProxyInstance(
                target.getClass().getClassLoader(), // 目标类的类加载器  TxSmsService
                target.getClass().getInterfaces(),  // 代理需要实现的接口，可指定多个 SmsService
                new WatchInvocationHandler(target)   // 代理对象对应的自定义 InvocationHandler
        );
    }
}
```

`getProxy()`：主要通过`Proxy.newProxyInstance（）`方法获取某个类的代理对象

5.实际使用

```java
public class MainDemo {
    static void main() {
        TxSmsService txSmsService = new TxSmsService();
        SmsService proxyInstance = (SmsService) ProxyFactory.getProxy(txSmsService);
        proxyInstance.send("110","text message");
        proxyInstance.send("120","text message");
    }
}
```

运行上述代码之后，控制台打印出：

```txt
21:12:52.717 [main] INFO com.jasper.creational.structural.proxy.dynamic.WatchInvocationHandler -- phone number is 110, don't
21:12:52.720 [main] INFO com.jasper.creational.structural.proxy.dynamic.TxSmsService -- tx phone is 110 : message is text message 
21:12:52.720 [main] INFO com.jasper.creational.structural.proxy.dynamic.WatchInvocationHandler -- cost time: 1 ms
21:12:52.720 [main] INFO com.jasper.creational.structural.proxy.dynamic.TxSmsService -- tx phone is 120 : message is text message 
21:12:52.720 [main] INFO com.jasper.creational.structural.proxy.dynamic.WatchInvocationHandler -- cost time: 0 ms

```
### cglib

JDK动态代理的缺点就是只能代理实现了某个接口的类

[CGLIB](https://github.com/cglib/cglib)(*Code Generation Library*)是一个基于asm的字节码生成库，它允许我们在运行时对字节码进行修改和动态生成。
CGLIB 通过继承方式实现代理。很多知名的开源框架都使用到了[CGLIB](https://github.com/cglib/cglib)， 例如 Spring 中的 AOP 模块中：如果目标对象实现了接口，则默认采用 JDK 动态代理，否则采用 CGLIB 动态代理

它在内存中动态构建一个子类，继承自你的目标类。
它重写（Override）了目标类的方法，在方法调用前后织入逻辑。
:::info 
ASM 是一个 Java 字节码操纵框架
ASM：让你直接去改 .class 文件里的字节码指令。比如把 aload_0 改成 invokestatic。它不处理 Java 对象，它处理的是 指令流
:::
:::danger

- 无法代理 final 方法：因为 CGLIB 是靠继承和重写来实现的
- 默认会调用父类的无参构造函数: 如果目标对象只有一个带参数的构造函数，CGLIB 在创建代理时会直接报错

:::

:::warning 
 * CGLIB 为了生成子类，必须调用 ClassLoader.defineClass。在 Java 8 之前，这是合法的；
 * 但在 Java 17 中，java.base 模块默认对外部“封闭”了这些底层接口
 * 添加vm option:  --add-opens java.base/java.lang=ALL-UNNAMED
 * 可以使用 bytebuddy
:::


1. 定义一个类；
2. 自定义 `MethodInterceptor` 并重写 `intercept` 方法，`intercept` 用于拦截增强被代理类的方法，和 JDK 动态代理中的 `invoke` 方法类似；
3. 通过 `Enhancer` 类的 `create()`创建代理类；


```java
<dependency>
  <groupId>cglib</groupId>
  <artifactId>cglib</artifactId>
  <version>3.3.0</version>
</dependency>
```

1.实现一个使用阿里云发送短信的类

```java
package github.javaguide.dynamicProxy.cglibDynamicProxy;

public class AliSmsService {
    public String send(String message) {
        System.out.println("send message:" + message);
        return message;
    }
}
```

2.自定义 `MethodInterceptor`（方法拦截器）

```java
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

import java.lang.reflect.Method;

/**
 * 自定义MethodInterceptor
 */
public class DebugMethodInterceptor implements MethodInterceptor {

    /**
     * @param o           被代理的对象（需要增强的对象）
     * @param method      被拦截的方法（需要增强的方法）
     * @param args        方法入参
     * @param methodProxy 用于调用原始方法
     */
    @Override
    public Object intercept(Object o, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {
        //调用方法之前，我们可以添加自己的操作
        System.out.println("before method " + method.getName());
        Object object = methodProxy.invokeSuper(o, args);
        //调用方法之后，我们同样可以添加自己的操作
        System.out.println("after method " + method.getName());
        return object;
    }

}
```

3.获取代理类

```java
import net.sf.cglib.proxy.Enhancer;

public class CglibProxyFactory {

    public static Object getProxy(Class<?> clazz) {
        // 创建动态代理增强类
        Enhancer enhancer = new Enhancer();
        // 设置类加载器
        enhancer.setClassLoader(clazz.getClassLoader());
        // 设置被代理类
        enhancer.setSuperclass(clazz);
        // 设置方法拦截器
        enhancer.setCallback(new DebugMethodInterceptor());
        // 创建代理类
        return enhancer.create();
    }
}
```

4.实际使用

```java
AliSmsService aliSmsService = (AliSmsService) CglibProxyFactory.getProxy(AliSmsService.class);
aliSmsService.send("java");
```

运行上述代码之后，控制台打印出：

```text
before method send
send message:java
after method send
```

### JDK 动态代理和 CGLIB 动态代理对比

1. **JDK 动态代理只能代理实现了接口的类或者直接代理接口，而 CGLIB 可以代理未实现任何接口的类。** 另外， CGLIB 动态代理是通过生成一个被代理类的子类来拦截被代理类的方法调用，因此不能代理声明为 final 类型的类和方法。
2. 就二者的效率来说，大部分情况都是 JDK 动态代理更优秀，随着 JDK 版本的升级，这个优势更加明显。

## 4. 静态代理和动态代理的对比

1. **灵活性**：动态代理更加灵活，不需要必须实现接口，可以直接代理实现类，并且可以不需要针对每个目标类都创建一个代理类。另外，静态代理中，接口一旦新增加方法，目标对象和代理对象都要进行修改，这是非常麻烦的！
2. **JVM 层面**：静态代理在编译时就将接口、实现类、代理类这些都变成了一个个实际的 class 文件。而动态代理是在运行时动态生成类字节码，并加载到 JVM 中的。
