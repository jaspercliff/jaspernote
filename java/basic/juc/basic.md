# juc
Java并发编程包（Java Util Concurrent，简称JUC）是Java提供的一套并发编程工具，位于`java.util.concurrent`、`java.util.concurrent.atomic`和`java.util.concurrent.locks`包中。JUC自Java 5开始引入，它提供了一系列用于多线程编程的高效工具类，大大简化了并发程序的开发，提高了并发编程的安全性和性能。

### JUC的主要组成部分

1. **执行器（Executors）**：简化了并发编程中线程的创建和管理。提供了线程池的实现，允许用户控制线程的最大并发数，复用线程等。

2. **同步器（tools）**：提供了多种同步工具类，包括：
    - `CountDownLatch`：允许一个或多个线程等待其他线程完成操作。
    - `CyclicBarrier`：允许一组线程互相等待，直到所有线程都达到了某个公共屏障点。
    - `Semaphore`：一个计数信号量。
    - `Exchanger`：允许两个线程在交汇点交换信息。
    - `Phaser`：一个更灵活的线程同步器。

3. **并发集合（Concurrent Collections）**：提供了线程安全的集合类，例如`ConcurrentHashMap`、`ConcurrentLinkedQueue`等，用于在多线程环境中存储和操作数据集。

4. **原子变量（Atomic Variables）**：利用底层硬件的原子指令，提供了一种线程安全的方式来操作单个变量，无需使用`synchronized`，例如`AtomicInteger`、`AtomicReference`等。

5. **锁（Locks）**：提供了比synchronized关键字更灵活、更强大的锁机制，包括可重入锁`ReentrantLock`、读写锁`ReadWriteLock`等。

### 为什么使用JUC

在并发编程领域，正确地管理线程间的协作和资源共享是极其重要的。传统的线程管理和同步方法（如使用`synchronized`关键字）虽然能够解决问题，
但在某些场景下不够灵活，且可能会引入性能瓶颈。JUC提供的工具类和接口能够帮助开发者更加高效和安全地编写并发程序，提高程序的性能和可伸缩性。

### 示例

下面是一个使用`Executors`类创建固定线程池的简单示例：

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ThreadPoolExample {
    public static void main(String[] args) {
        // 创建一个固定大小的线程池
        ExecutorService executor = Executors.newFixedThreadPool(4);

        // 提交任务给线程池
        for (int i = 0; i < 10; i++) {
            int taskNo = i;
            executor.submit(() -> {
                System.out.println("Running task " + taskNo);
            });
        }

        // 关闭线程池
        executor.shutdown();
    }
}
```

这个例子展示了如何创建一个固定大小的线程池来执行多个任务，这是并发编程中常见的一个场景。使用JUC中的`Executors`类可以很容易地创建不同类型的线程池，管理线程的生命周期，以及提交任务给线程池执行。