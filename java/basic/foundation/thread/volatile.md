# volatile

`volatile`是Java语言提供的一种轻量级的同步机制，主要用于确保变量的可见性和防止指令重排序。

### 可见性

在多线程环境中，线程可以把变量缓存到自己的工作内存中。如果一个线程修改了这个变量的值，而这个新值没有及时写回主内存中，那么其他线程看到的还是旧值。
使用`volatile`关键字修饰的变量会强制所有线程都从主内存中读取它的值，而不是从线程的工作内存缓存中读取。这样一来，一个线程修改了`volatile`变量的值，
其他线程立即可见，保证了变量修改的可见性。

可见性问题是多线程编程中常见的问题之一，主要发生在当一个线程对共享变量的修改对其他线程不可见时。
这种情况下，即使一个线程已经修改了某个共享变量的值，其他线程读取该变量时可能仍然看到旧值。这种问题通常是由于线程缓存和编译器优化导致的。


假设我们有一个简单的标志变量来控制线程是否继续执行：

```java
public class VisibilityProblem {
    private static boolean flag = true;

    public static void main(String[] args) throws InterruptedException {
        new Thread(() -> {
            while (flag) {
                // 做一些工作...
            }
            System.out.println("Thread exits.");
        }).start();

        Thread.sleep(1000); // 确保线程启动并运行
        System.out.println("Set flag to false.");
        flag = false; // 修改flag，期望上面的线程能够看到这个修改并退出循环
    }
}
```
在这个例子中，主线程修改了`flag`变量的值，并期望另一个线程能够看到这个变化并退出循环。然而，在没有适当的同步措施的情况下，这种修改可能对另一个线程不可见，导致它永远无法退出循环。

#### 解决方案

为了解决可见性问题，Java提供了几种同步机制：

- **`volatile`关键字**：将`flag`声明为`volatile`类型，可以确保任何线程对这个变量的写入都将立即反映到其他线程中。这是因为`volatile`变量的读写都会直接操作主内存，而不是线程的本地内存缓存。

```java
private static volatile boolean flag = true;
```

- **`synchronized`关键字**：使用`synchronized`关键字同步访问共享变量也可以解决可见性问题，因为进入`synchronized`块时，会清空本地内存，从主内存中重新读取共享变量的最新值。退出`synchronized`块时，会将修改刷新回主内存。

```java
package com.jasper.volatiled;


/**
 * synchronized也可以解决可见性得问题
 */
public class VolatileDemo2 {
    private static  boolean flag = true;
    public static synchronized void setFlag(boolean flagValue) {
        flag = flagValue;
    }

    public static synchronized boolean getFlag() {
        return flag;
    }
    public static void main(String[] args) throws InterruptedException {
        new Thread(() -> {
            int i = 0;
            while (getFlag()) {
                // 循环体故意留空或执行非内存同步操作
                i++;
            }
            System.out.println("Thread stops with i=" + i);
        }).start();

        Thread.sleep(1000); // 确保线程启动并运行
        System.out.println("main thread changes flag to false");
        setFlag(false);
    }
}


```

- **`Lock`机制**：类似于`synchronized`，使用`java.util.concurrent.locks.Lock`及其实现类也可以保证共享变量的可见性，通过`lock()`和`unlock()`方法提供了更加灵活的锁定机制。

使用这些同步机制可以保证共享变量的可见性，避免多线程环境下的可见性问题。每种方法都有其适用场景和性能特点，开发者应根据实际需求选择最合适的同步策略。

### 防止指令重排序

在Java内存模型中，为了提高执行效率，编译器和处理器可能会对指令进行重排序。重排序是在不改变单线程程序执行结果的前提下
，改变指令执行的顺序。然而，在多线程环境中，这种重排序可能会导致严重问题。`volatile`变量的读写操作之前的操作不会被重排序到读写操作之后，
这样就可以在一定程度上保证多线程环境中的执行顺序，防止因指令重排序导致的意外错误。

```java
public class Singleton {
    // 使用volatile关键字保其顺序性
    private volatile static Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```
实例化一个对象其实可以分为三个步骤：

分配内存空间。
初始化对象。
将内存空间的地址赋值给对应的引用。
但是由于jvm可以对指令进行重排序，所以上面的过程也可能会变成如下过程：分配内存空间。将内存空间的地址赋值给对应的引用。
初始化对象如果是这个流程，多线程环境下就可能将一个未初始化的对象引用暴露出来，从而导致不可预料的结果



### 使用场景

- **状态标志**：`volatile`适用于状态标记的场景，比如一个线程控制另一个线程是否继续执行的停止标志。
- **单例模式**：在双重检查锁定（Double-Check Locking）实现单例模式时，`volatile`可以防止新的实例被部分初始化。
- **避免指令重排序**：在一些复杂的并发模型中，使用`volatile`变量可以防止JVM的指令重排序优化，保证程序的正确性。

### 注意

虽然`volatile`关键字在某些场景下非常有用，但它并不能保证操作的原子性。例如，`volatile`变量的自增操作（`i++`）并不是原子性的，
如果需要原子性操作，应该考虑使用`java.util.concurrent.atomic`包下的原子类，或者使用`synchronized`关键字或`java.util.concurrent.locks.Lock`实现同步。

### Non-Atomic Treatment of double and long  JLS8(java language specification 8th edition)
> For the purposes of the Java programming language memory model, a single write
to a non-volatile long or double value is treated as two separate writes: one to each
32-bit half. This can result in a situation where a thread sees the first 32 bits of a
64-bit value from one write, and the second 32 bits from another write.
Writes and reads of volatile long and double values are always atomic.
Writes to and reads of references are always atomic, regardless of whether they are
implemented as 32-bit or 64-bit values.
Some implementations may find it convenient to divide a single write action on a 64-bit
long or double value into two write actions on adjacent 32-bit values. For efficiency's
sake, this behavior is implementation-specific; an implementation of the Java Virtual
Machine is free to perform writes to long and double values atomically or in two parts.
Implementations of the Java Virtual Machine are encouraged to avoid splitting 64-bit values
where possible. **Programmers are encouraged to declare shared 64-bit values as volatile**
or synchronize their programs correctly to avoid possible complications.

[jls](https://docs.oracle.com/javase/specs/jls/se8/jls8.pdf)

## 内存屏障
内存屏障（Memory Barrier），也称为内存栅栏，是一种同步机制，用于确保指令执行的顺序性和内存操作的可见性。
内存屏障是处理器指令集提供的一种低级同步机制，通过防止在屏障之前和之后的特定类型的操作被重排序，来解决多核处理器环境下的内存一致性问题。

在多线程程序中，为了优化性能，编译器和处理器可能会对指令进行重排序。此外，由于现代计算机体系结构中的缓存一致性问题，
一个线程对共享变量的修改可能不会立即对其他线程可见。内存屏障用于在这些环境中确保操作的正确顺序和可见性。

### 类型

内存屏障主要分为四种类型：

1. **读取屏障（Load Barrier）**：确保屏障之前的所有读取操作完成后，才能执行屏障之后的读取操作。
2. **写入屏障（Store Barrier）**：确保屏障之前的所有写入操作完成后，才能执行屏障之后的写入操作。
3. **全屏障（Full Barrier）**：结合读取屏障和写入屏障的特性，确保屏障之前的所有读取和写入操作完成后，才能执行屏障之后的操作。
4. **无操作屏障（No-Op Barrier）**：不执行任何操作，但可以作为同步的占位符使用。

### 在Java中的应用

在Java中，`volatile`关键字和`java.util.concurrent`包中的锁和原子变量等并发工具的实现，底层都依赖于内存屏障来保证内存的可见性和防止指令重排序。

- 当写入一个`volatile`变量时，会插入一个写入屏障，确保该操作之前的所有写入操作（包括对普通变量的写入）都在写入`volatile`变量之前完成。
- 当读取一个`volatile`变量时，会插入一个读取屏障，确保该操作之后的所有读取操作（包括对普通变量的读取）都在读取`volatile`变量之后进行。

通过这种方式，`volatile`关键字不仅保证了标记变量本身操作的可见性，也为其它变量的访问提供了部分顺序性保证。

### 总结

内存屏障是并发编程中解决内存一致性和指令重排序问题的关键技术。在高级语言如Java中，开发者不需要直接操作内存屏障，但了解其工作原理有助于更好地理解并发控制机制的底层实现。