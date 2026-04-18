# ReentrantLock
`ReentrantLock` 是 Java 中的一个同步锁，属于 `java.util.concurrent.locks` 包。
它提供了比传统的 `synchronized` 关键字更加灵活的锁定机制。与 `synchronized` 相比，`ReentrantLock` 提供了一些高级功能，这些功能使得它在某些并发编程场景中更为适用。

### 特点

1. **可重入性**：`ReentrantLock` 是一个可重入锁，这意味着同一个线程可以多次获得锁，不会因为再次尝试获取已持有的锁而发生死锁。每次锁定后，锁的持有计数会增加，只有当锁的持有计数降为0时，锁才会被释放。

2. **公平性选择**：可以指定锁是公平锁还是非公平锁。公平锁意味着锁的分配会按照线程等待的顺序进行，
而非公平锁则允许“插队”，这可能导致某些线程永远得不到锁。
默认情况下，`ReentrantLock` 使用的是非公平锁。

3. **中断响应**：`ReentrantLock` 提供了一种能力，使得线程在等待锁的过程中能够响应中断。这是通过 `lockInterruptibly()` 方法实现的，它允许线程在等待锁的时候被中断并退出等待。

4. **条件变量支持**：`ReentrantLock` 配合 `Condition` 实例，提供了类似 `Object.wait()`、`notify()` 和 `notifyAll()` 方法的功能。这允许线程在某些条件下等待，或者在条件变为真时接收通知。

5. 带超时的锁

### 使用示例

使用 `ReentrantLock` 的基本模式如下：

```java
import java.util.concurrent.locks.ReentrantLock;

public class Demo {
    private final ReentrantLock lock = new ReentrantLock();
    
    public void method() {
        lock.lock(); // 获取锁
        try {
            // 临界区代码
            System.out.println("haha");
        } finally {
            lock.unlock(); // 无论如何，最终都会释放锁
        }
    }
}
```


## reentrant 

```java 
/** synchronized 可重入是jvm维护的monitor reentrantLock 是aqs 实现的 */
public class ReentrantDemo {
    ReentrantLock lock = new ReentrantLock();

    public static void main(String[] args) {
        ReentrantDemo service = new ReentrantDemo();
        service.a();
    }

    public void a() {
        lock.lock();
        try {
            System.out.println("outter");
            b();
        } finally {
            lock.unlock();
        }
    }

    public void b() {
        lock.lock(); // 重入 不会死锁
        try {
            System.out.println("inner");
        } finally {
            lock.unlock();
        }
    }
}
```

## fair /nonfair

```java 
/**
 * 当锁释放的一瞬间，如果正好有一个新产生的线程尝试获取锁，它会直接和队列头部的线程竞争，而不会老老实实去排队 <br>
 * 叫号 必须先叫先占锁
 */
public class fairDemo {

    public static void main(String[] args) throws InterruptedException {
        // 修改此处的 true/false 来切换公平与非公平模式
        ReentrantLock lock = new ReentrantLock(true);
        // 线程任务：获取锁后立即释放，并重复多次
        Runnable task =
                () -> {
                    for (int i = 0; i < 2; i++) {
                        lock.lock();
                        try {
                            System.out.println(Thread.currentThread().getName() + " 获取到了锁");
                            // 模拟持有锁的时间，增加竞争概率
                            Thread.sleep(10);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        } finally {
                            lock.unlock();
                        }
                    }
                };

        // 启动多个线程
        for (int i = 0; i < 5; i++) {
            new Thread(task, "线程-" + i).start();
        }
    }
}
```

## interruptible 

```java 
public class interruptDemo {

    public static void main(String[] args) throws InterruptedException {
        ReentrantLock lock = new ReentrantLock();
        Thread t1 =
                new Thread(
                        () -> {
                            lock.lock();
                            System.out.println("t1 get lock and long time occuption!");
                            try {
                                Thread.sleep(10000); // 10s
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            } finally {
                                lock.unlock();
                            }
                        });
        Thread t2 =
                new Thread(
                        () -> {
                            try {
                                System.out.println("t2 get lock interruptibly");
                                lock.lockInterruptibly();
                                try {
                                    System.out.println("t2 get lock success");
                                } finally {
                                    lock.unlock();
                                }
                            } catch (InterruptedException e) {
                                System.out.println("t2 get lock fail : interruptibly");
                            }
                        });

        t1.start();
        Thread.sleep(100); // t1 get lock first
        t2.start();

        Thread.sleep(1000); // make sure t2 getting lock
        System.out.println("main thread interrupt");
        t2.interrupt();
    }
}

/*
t1 get lock and long time occuption!
t2 get lock interruptibly
main thread interrupt
t2 get lock fail : interruptibly
*/
```

## condition 

```java  
public class ConditionDemo {
    private static final ReentrantLock lock = new ReentrantLock();
    private static final Condition notFull = lock.newCondition();
    private static final Condition notEmpty = lock.newCondition();
    private static int buffer = 0;
    private static final int CAPACITY = 10;

    public static void main(String[] args) {
        Thread producer =
                new Thread(
                        () -> {
                            for (int i = 0; i < 20; i++) {
                                produce();
                            }
                        });

        Thread consumer =
                new Thread(
                        () -> {
                            for (int i = 0; i < 20; i++) {
                                consume();
                            }
                        });

        producer.start();
        consumer.start();
    }

    static void produce() {
        lock.lock();
        try {
            while (buffer == CAPACITY) {
                try {
                    notFull.await(); // 等待 notFull 条件被满足
                } catch (InterruptedException e) {
                    log.info(e.getMessage());
                }
            }
            buffer++;
            System.out.println("Produced: " + buffer);
            notEmpty.signal(); // 唤醒等待的消费者
        } finally {
            lock.unlock();
        }
    }

    static void consume() {
        lock.lock();
        try {
            while (buffer == 0) {
                try {
                    notEmpty.await(); // 等待 notEmpty 条件被满足
                } catch (InterruptedException e) {
                    log.info(e.getMessage());
                }
            }
            buffer--;
            System.out.println("Consumed: " + buffer);
            notFull.signal(); // 唤醒等待的生产者
        } finally {
            lock.unlock();
        }
    }
}
```
## timeout 

```java 
public class TimeoutDemo {
    public static void main(String[] args) throws InterruptedException {
        ReentrantLock lock = new ReentrantLock();

        Thread t1 =
                new Thread(
                        () -> {
                            lock.lock();
                            try {
                                System.out.println("thread a is running");
                                Thread.sleep(5000);
                            } catch (InterruptedException e) {
                                System.out.println(e.getMessage());
                            } finally {
                                lock.unlock();
                            }
                        });

        Thread t2 =
                new Thread(
                        () -> {
                            boolean isSuccess = false;
                            try {
                                isSuccess = lock.tryLock(2, TimeUnit.SECONDS);
                                if (isSuccess) {
                                    System.out.println("thread b is running");
                                } else {
                                    System.out.println("thread b trylock fail timeout");
                                }
                            } catch (InterruptedException e) {
                                System.out.println(e.getMessage());
                            } finally {
                                if (isSuccess) lock.unlock();
                            }
                        });
        t1.start();
        Thread.sleep(500); // make sure t1 gets lock first
        t2.start();
    }
}
```

## scene 

在实际应用中，选择 `ReentrantLock` 还是 `synchronized` 关键字取决于你的具体需求。如果需要更细粒度的控制，或者利用如条件变量、可中断锁等高级功能，`ReentrantLock` 是一个很好的选择。然而，它也需要更加小心地管理锁的获取和释放，特别是在异常情况下确保锁能被释放。

