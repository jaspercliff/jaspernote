`CountDownLatch` 是 Java 并发包（`java.util.concurrent`）中的一个同步辅助类，它允许一个或多个线程等待其他线程完成一系列操作。`CountDownLatch` 的工作原理是初始化一个计数器，这个计数器表示需要等待完成的操作数量。当一个操作完成后，计数器的值就会减少。当计数器的值减到零时，那些因为等待 `CountDownLatch` 而阻塞的线程就会被唤醒，继续执行。

### 使用场景

`CountDownLatch` 适用于一个线程需要等待一个或多个线程完成某些操作的场景，例如：

- 确保某些服务或资源在应用程序继续执行之前已经启动或初始化完成。
- 等待并发任务全部完成，以便继续执行程序的下一步。

### 基本用法

1. **初始化**：在使用 `CountDownLatch` 时，首先需要指定一个计数值，表示需要等待完成的操作数。

2. **`await()` 方法**：线程调用此方法会等待，直到计数器达到零。

3. **`countDown()` 方法**：当一个操作完成后，应调用此方法。调用一次就将计数器的值减一。当计数器的值变为零时，那些在 `await()` 方法上等待的线程会被唤醒。

### 示例代码

下面是一个简单的示例，展示了如何使用 `CountDownLatch` 来控制三个并发任务全部完成后，主线程才继续执行：

```java
import java.util.concurrent.CountDownLatch;

public class CountDownLatchExample {
    public static void main(String[] args) throws InterruptedException {
        int threadCount = 3;
        final CountDownLatch latch = new CountDownLatch(threadCount);

        for (int i = 1; i <= threadCount; i++) {
            new Thread(new Worker(i, latch)).start();
        }

        // 等待所有工作线程完成任务
        latch.await();

        System.out.println("所有任务完成，主线程继续执行...");
    }

    static class Worker implements Runnable {
        private final int id;
        private final CountDownLatch latch;

        Worker(int id, CountDownLatch latch) {
            this.id = id;
            this.latch = latch;
        }

        @Override
        public void run() {
            try {
                Thread.sleep((long) (Math.random() * 1000)); // 模拟任务执行
                System.out.println("工作线程 " + id + " 完成任务");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            } finally {
                latch.countDown(); // 完成任务后，计数减一
            }
        }
    }
}
```

在这个例子中，`CountDownLatch` 被用来确保主线程 (`main` 方法) 在所有三个工作线程完成它们的任务之前一直等待。每个工作线程完成其任务后，都会调用 `countDown()` 方法。当所有工作线程都调用了 `countDown()` 方法，`latch` 的计数器达到零，`await()` 方法阻塞的主线程就会继续执行。

`CountDownLatch` 是一个一次性的门栓，计数器的值只能在构造时被设置，而且之后不能被重置。如果你需要能够重置计数的版本，可以考虑使用 `CyclicBarrier`。

## countDownLatch 和wait的区别
`CountDownLatch` 和 `wait()` 方法都可以用于线程间的同步控制，但它们在用法和用途上有明显的不同。这些不同主要体现在它们的设计目的、使用方式以及控制线程行为的机制上。

### `wait()` 方法

1. **属于 Object 类**：`wait()` 是 `java.lang.Object` 类的一个方法，这意味着所有的 Java 对象都继承了这个方法。它用于让当前线程等待，直到另一个线程调用相同对象上的 `notify()` 或 `notifyAll()` 方法。

2. **需要在同步块中使用**：`wait()` 必须在同步方法或同步块中使用，因为它需要对象的监视器（monitor）。

3. **释放锁**：调用 `wait()` 会导致当前线程释放对象的锁，进入对象的等待池中，直到其他线程调用此对象上的 `notify()` 或 `notifyAll()` 方法。

4. **主要用途**：用于线程间的通信，特别是在生产者-消费者问题中。

### `CountDownLatch`

1. **并发包中的类**：`CountDownLatch` 是 `java.util.concurrent` 包中的一个类，专门设计用于处理线程间的同步。

2. **不涉及锁的管理**：`CountDownLatch` 不需要和 synchronized 关键字一起使用，它通过内部计数器来管理线程同步。

3. **不会释放锁**：当线程调用 `CountDownLatch` 的 `await()` 方法时，它会阻塞等待直到计数器达到零，但这并不涉及锁的释放和获取。

4. **主要用途**：用于一个线程等待一个或多个线程完成各自的工作，比如并行计算的场景。

### 区别总结

- **设计目的**：`wait()` 方法主要用于线程间的通信，而 `CountDownLatch` 设计用于等待多个线程完成各自的任务。
- **使用方式**：`wait()` 需要在同步方法或同步块中使用，并且调用它会释放锁；`CountDownLatch` 不需要在同步块中使用，且使用它不涉及锁的释放。
- **适用场景**：`wait()` 适用于当线程需要等待特定条件满足时的场景，`CountDownLatch` 适用于等待一组操作全部完成的场景。

这两种机制各有优势，应根据具体的并发控制需求来选择使用。