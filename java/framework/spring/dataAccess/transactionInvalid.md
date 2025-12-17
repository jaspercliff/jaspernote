# 事务失效的场景

- 非public方法  事务管理基于aop动态代理，只能拦截public的方法
- 异常被内部catch spring只有捕获到异常，才会回滚
- 传播行为设置不对 never not_support
- 多线程调用 事务是与线程绑定的，使用threadlocal存储事务上下文
- 类的内部方法自调用：非事务方法调用事务方法，a method invoke b method

```java
@Service
public class OrderService {

    public void methodA() {
        // 这里的调用等同于 this.methodB();
        methodB(); 
    }

    @Transactional
    public void methodB() {
        // 数据库操作...
    }
}
```

外部调用： 当你在 Controller 中调用 orderService.methodB() 时，拿到的是 Spring 提供的代理对象。
代理对象会先开启事务，然后再去调用原始对象的 methodB。

内部自调用： 当你调用 methodA() 时，由于 methodA 没加事务，你进入了原始对象。
在 methodA 内部调用 methodB() 时，JVM 使用的是 this.methodB()。

结果： this 指向的是原始对象本身，而不是 Spring 代理。它直接跳过了“开启事务”的切面逻辑，所以 @Transactional 就成了摆设。

---
解决方案

1. 移到别的service
2. 使用AopContext.currentProxy() 强行找回代理
3. 自注入 需要开启循环依赖
