---
sidebar_position: 3
---

# jmm 具体实现 

在写并发代码时，我们依靠 JVM 提供的关键字来强制执行 JMM 的规范：

## 1. volatile 关键字

* **可见性保证**：修改完变量后立刻强制刷新回主内存；读取变量时立刻使工作内存失效，直接从主内存读取。
* **有序性保证**：通过在生成汇编代码时插入 **内存屏障（Memory Barrier）**，禁止特定的指令重排序（如防止 DCL 单例中的半初始化问题）。

## 2. synchronized 关键字

* **万能锁**：同时保证原子性、可见性、有序性。
* **JMM 机制**：进入同步块（lock）会清空工作内存，重新从主内存拉取；退出同步块（unlock）必须先把变量同步回主内存。

## 3. final 关键字

* **逸出保护**：只要对象被正确构造（构造函数中没有发生 this 引用逸出），那么其他线程看到的 final 字段必定是初始化完毕的值。

```java
public class FinalDemo {
    int a;            // 普通域
    final int b;      // final 域
    static FinalDemo obj;

    public FinalDemo() {
        a = 1;        // 写普通域
//禁止编译器把 final 域的写操作重排序到构造函数之外
        b = 2;        // 写 final 域
    }

    // 线程 A 执行：初始化对象并发布
    public static void writer() {
        obj = new FinalDemo();
    }

    // 线程 B 执行：读取对象并使用
    public static void reader() {
        if (obj != null) {
            int resultA = obj.a; // 可能会读到 0 ！！！
            int resultB = obj.b; // 100% 读到 2
        }
    }
}
```

### this 引用逸出 

```java
public class EscapeDemo {
    final int id;
    
    public EscapeDemo() {
        id = 99;
        // 错误：在构造函数还没结束时，就把自己暴露给了一个全局监听器或启动了线程
        GlobalListener.register(this); 
    }
}
```
