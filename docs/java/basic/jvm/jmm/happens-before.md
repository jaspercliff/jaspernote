---
sidebar_position: 2
---



# 先行发生原则 heapens-before 

在 Java 内存模型（JMM, Java Memory Model）中，先行发生原则（Happens-Before）是判断数据是否存在竞争、线程是否安全的根本依据。

简单来说，如果操作 A "happens-before" 操作 B，那么**操作 A 产生的影响（修改的变量值、发送的消息、调用的方法等）都能被操作 B 观察到**。它保证了跨线程的可见性和有序性，防止编译器和处理器进行不安全的指令重排。

---

### Happens-Before 的核心规则

JMM 定义了一些天然的 Happens-Before 规则，无需任何同步手段就已存在：

1. **程序次序规则（Program Order Rule）**：在一个线程内，按照代码顺序，书写在前面的操作先行发生于书写在后面的操作。
2. **管程锁定规则（Monitor Lock Rule）**：一个 unlock 操作先行发生于后面对同一个锁的 lock 操作。
3. **volatile 变量规则（Volatile Variable Rule）**：对一个 volatile 变量的写操作先行发生于后面对这个变量的读操作。
4. **线程启动规则（Thread Start Rule）**：Thread 对象的 start() 方法先行发生于此线程的每一个动作。
5. **线程终止规则（Thread Termination Rule）**：线程中的所有操作都先行发生于对此线程的终止检测（如 Thread.join() 结束或 Thread.isAlive() 返回 false）。
6. **对象终结规则（Finalizer Rule）**：一个对象的初始化完成（构造函数执行结束）先行发生于它的 finalize() 方法的开始。
7. **传递性（Transitivity）**：如果操作 A happens-before 操作 B，且操作 B happens-before 操作 C，那么操作 A happens-before 操作 C。

### finalize

在 Java 中，finalize() 是 java.lang.Object 类的一个方法。它的最初设计目的是在垃圾回收器（GC）销毁对象之前，给对象一个释放底层资源的机会（类似于 C++ 中的析构函数）。

但是，在现代 Java 开发中，finalize() 已经被彻底废弃（Deprecated），并且强烈建议不要使用它。
为什么不推荐使用 finalize()？

- 执行时间完全无法确定：GC 什么时候运行是不可控的。如果一个对象持有了文件描述符或数据库连接，而 GC 迟迟不运行，这些系统资源就会被耗尽。
- 极其严重的性能问题：垃圾回收器在处理实现了 finalize() 的对象时需要做额外的工作（需要将其放入队列单独处理），这会大大降低 GC 的效率，甚至导致内存泄漏。
- 可能会被“复活”：在 finalize() 方法中，如果把当前对象（this）重新赋值给某个活着的引用，这个对象就会在 GC 眼前“复活”，这会带来极大的设计混乱。
- 异常会被吞掉：如果在 finalize() 执行过程中抛出了异常，GC 会直接忽略它，不会打印堆栈信息，导致难以排查问题。

正确的替代方案：AutoCloseable 与 try-with-resources

如果你需要确保资源（文件、网络连接、内存外数据）被正确关闭，标准的做法是让你的类实现 AutoCloseable 接口，并使用 try-with-resources 块

### demo

```java
private int value = 0;

// thread a 
public void setValue(int a){
  this.value = a 
}

// thread b
public int getValue(){
  return value 
}
```

是线程不安全的，
- 俩个线程不满足1 
- 没有同步块 不满足2
- 没有volatile 不满足3 
- 4 5 6 7 不沾边
