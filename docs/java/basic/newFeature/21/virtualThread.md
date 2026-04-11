# 虚拟线程 

在 JDK 21 之前，Java 的线程（java.lang.Thread）是平台线程，它与操作系统的内核线程是 1:1 映射的。
    - 痛点： 内核线程非常昂贵。创建一个线程需要预留几 MB 的内存（栈空间），上下文切换涉及系统调用，开销巨大。
    - 瓶颈： 在处理高并发的 IO 密集型任务（如 Web 服务）时，操作系统的线程数很快就会耗尽。
为了解决这个问题，我们以前不得不使用复杂的响应式编程（如 WebFlux）或线程池，但这增加了代码的维护难度和调试成本

虚拟线程是由 JVM 管理的轻量级线程，不再与 OS 线程 1:1 绑定。它实现了 M:N 调度模型：大量的虚拟线程（M）运行在少量的平台线程（N）之上。
关键特性：
    - 极其轻量： 虚拟线程的内存占用通常只有几百字节到几 KB。
    - 创建代价极低： 你可以轻松创建 100 万个虚拟线程而不会导致系统崩溃。
    - 非阻塞 I/O 自动卸载： 当虚拟线程执行阻塞 I/O 操作（如读数据库、调接口）时，它会释放底层绑定的平台线程，直到 I/O 完成后再重新挂载

## 原理 

虚拟线程之所以高效，是因为它实现了用户态的上下文切换：
1. 挂载（Mount）： JVM 将虚拟线程分配给一个平台线程（称为载体线程 Carrier Thread）执行。
2. 卸载（Unmount）： 当遇到 Thread.sleep() 或 I/O 阻塞时，JVM 会将虚拟线程的状态保存到堆内存中，并让平台线程去干别的事。
3. 恢复： 当 I/O 操作完成，调度器会将保存的状态重新加载到可用的平台线程上继续运行。

虚拟线程不是由操作系统调度，而是由普通线程调度，即成百上千个虚拟线程可以由一个普通线程调度。任何时刻，只能执行一个虚拟线程，但是，一旦该虚拟线程执行一个IO操作进入等待时，它会被立刻“挂起”，然后执行下一个虚拟线程。什么时候IO数据返回了，这个挂起的虚拟线程才会被再次调度。因此，若干个虚拟线程可以在一个普通线程中交替运行

## demo 

```java
public class Demo1 {
    public static void main(String[] args) throws InterruptedException {
        Thread vt = Thread.startVirtualThread(()->{
            try {
                System.out.println("start");
                Thread.sleep(2000);
                System.out.println("end");
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        });
//        虚拟线程是守护线程（Daemon Thread），且主线程执行完代码后会立即退出，不会等待虚拟线程结束
        vt.join();
    }
}
```

```java
public class Demo2 {
    public static void main(String[] args) {
        /*
         * 这里还是守护线程
         * ExecutorService 实现了 AutoCloseable 接口。当你退出 try 代码块时
         * 虚拟线程执行器（VirtualThreadPerTaskExecutor）会自动调用它的 .close() 方法
         * 它会调用 awaitTermination()，阻塞主线程，直到所有已提交的虚拟线程任务全部执行完毕
         */
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            IntStream.range(0, 10).forEach(i -> {
                executor.submit(() -> {
                    System.out.println(i);
                    Thread.sleep(Duration.ofSeconds(1));
                    return i;
                });
            });
        } // 自动等待所有任务完成
    }
}

```

## compare 

:::info
50:1
:::

```java
public class Traditional {
    public static void main(String[] args) {
        /*
        传统线程池：200个线程 内核就维护200个
        虚拟线程： 只有16个线程 其他都只是在用户态保存了一个变量
         */
        try (
                ExecutorService executorService = Executors.newFixedThreadPool(200);
        ) {
            Stopwatch stopwatch = Stopwatch.createStarted();
            for (int i = 0; i < 10_000; i++) {
                executorService.submit(()->{
                    try {
                        Thread.sleep(1000);//io block
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                    return null;
                });
            }
            executorService.shutdown(); // 手里活干完停下
            executorService.awaitTermination(1, TimeUnit.HOURS); // 等待一小时还没干完就不等了
            System.out.println(stopwatch.elapsed(TimeUnit.SECONDS));
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
```

```java
public class Virtual {
    public static void main(String[] args) {

        Stopwatch stopwatch = Stopwatch.createStarted();
        try(
                ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();
                ){
            for (int i = 0; i < 10_000; i++) {
                executor.submit(()->{
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                    return null;
                });
            }
        }
        // 要在try之后
        System.out.println(stopwatch.elapsed(TimeUnit.SECONDS));
    }
}
```

## forkjoinpool

- [forkjoinpool](docs/java/basic/juc/executor/forkJoinPool.md)

JDK 21 虚拟线程底层默认就是用 ForkJoinPool 调度的！

```text 
虚拟线程创建   → 作为任务提交到 ForkJoinPool 队列
      ↓
平台线程认领   → 挂载，开始执行
      ↓
遇到阻塞       → 卸载，重新作为任务放回队列
      ↓
IO完成         → 再次作为任务放入队列，等待平台线程认领
      ↓
执行完毕       → 任务结束，从队列移除
```
