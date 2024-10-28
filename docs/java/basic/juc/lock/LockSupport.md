# LockSupport
`LockSupport` 是 Java 并发包 `java.util.concurrent.locks` 中的一个工具类，它提供了基本的线程同步机制，允许创建锁和其他同步类的简化。
与 `wait` 和 `notify` 相比，`LockSupport` 提供的机制更加灵活，因为它不要求线程持有某个对象的锁就能进行阻塞和唤醒操作。

`LockSupport` 的核心功能是通过 `park` 和 `unpark` 方法来控制线程的阻塞和唤醒：

- `park()` 方法可以阻塞当前线程。
- `unpark(Thread thread)` 方法可以唤醒一个指定的线程。

这些方法不要求在同步代码块中调用，也就是说，调用 `park` 和 `unpark` 不需要先获取某个对象的锁。

此外，`LockSupport` 还提供了如 `parkNanos`、`parkUntil` 等方法，它们允许线程在指定的时间后自动唤醒。

`LockSupport` 的特点：

1. **不需要锁块**：与 `Object` 的 `wait/notify` 方法相比，`park/unpark` 不需要在同步代码块内，使得控制更为灵活。
2. **准许性许可（Permit）**：每个线程都有一个与 `LockSupport` 相关的“准许”（permit）。`park` 方法会消耗掉这个准许（如果有的话），使得线程阻塞；而 `unpark` 则是提供一个准许，但准许不可累积，最多只有一个。
3. **不易产生死锁**：由于 `unpark` 操作可以在任何时候进行，因此使用 `LockSupport` 的同步机制不易产生死锁情况。

使用 `LockSupport` 时，需要注意：

- 由于 `LockSupport` 不与任何锁关联，因此使用时必须小心，确保线程间通信的正确性和同步的安全性。
- `park` 方法可能会因为“虚假唤醒”而在没有调用 `unpark` 的情况下返回，因此通常需要在循环中调用 `park` 方法，并检查某个条件以决定是否继续等待。

## park
`park` 方法您提到的，`public native void park(boolean isAbsolute, long time);`，
这个方法是用于阻塞当前线程，直到获得许可，或者在给定的等待时间内获得许可，或者线程被中断。

参数解释如下：
- `isAbsolute`：这个参数指示时间参数的解释方式。如果 `isAbsolute` 为 `true`，则 `time` 参数被解释为绝对唤醒时间（
- 从 Epoch，即 1970 年 1 月 1 日 00:00:00 GMT 计算的毫秒数）。如果为 `false`，`time` 被解释为相对等待时间（毫秒数）。
- `time`：这个参数指定了阻塞的时间长度，单位为毫秒。如果 `time` 为零，线程将无限期阻塞，直到接收到许可。

这个方法是 `native` 的，意味着它是用本地代码（如 C 或 C++）实现的，
并通过 Java 的本地接口（JNI）调用。`park` 方法通常用于构建低级同步构件，如锁和条件变量。
它提供了一种有效的方式来阻塞和唤醒线程，而不需要使用 Java 的内置同步机制，如 `synchronized` 或 `ReentrantLock`。

```java
package com.jasper.juc;

import java.util.concurrent.locks.LockSupport;

public class LockSupportDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            LockSupport.park("haha blocker is me");
            System.out.println("Thread 被唤醒了一次");
            LockSupport.park();
            System.out.println("thread 又被唤醒了一次");
        });
        thread.start();


        Thread.sleep(1000);
        System.out.println(LockSupport.getBlocker(thread));
        LockSupport.unpark(thread);
        Thread.sleep(1000);
        System.out.println(LockSupport.getBlocker(thread));
        LockSupport.unpark(thread);
    }
}
```
## `Object.wait()` 方法和 `LockSupport.park()`
`Object.wait()` 方法和 `LockSupport.park()` 方法都是Java并发编程中用于挂起线程的机制，但它们在使用方式、设计目的和功能特性上有显著的区别：

### 使用前提和机制

- **`Object.wait()`** 必须在同步块或方法中使用，它依赖于对象监视器。调用 `wait()` 会释放持有的监视器锁，
- 并使当前线程等待，直到其他线程调用同一个对象的 `notify()` 或 `notifyAll()` 方法。`wait()` 方法通常用于线程间的协作，等待某个条件满足。

- **`LockSupport.park()`** 不需要在同步块中使用，也不依赖对象监视器。它是基于许可的机制
- ，线程调用 `park()` 后会被挂起，直到获得许可（通过 `unpark()` 方法）。`park()` 和 `unpark()` 提供了一种更灵活的线程挂起和唤醒方式，适用于实现锁和其他同步工具。

### 对中断的响应

- **`Object.wait()`** 对中断敏感。当线程处于 `wait()` 状态时被中断，它会退出等待状态，抛出 `InterruptedException` 并清除中断状态。

- **`LockSupport.park()`** 也对中断敏感，但它不会抛出 `InterruptedException`。线程被中断时，`park()` 会返回，但中断状态会被保留。可以通过 `Thread.interrupted()` 或 `Thread.isInterrupted()` 检查并清除中断状态。

### 使用场景

- **`Object.wait()/notify()/notifyAll()`** 通常用于实现依赖于某些条件的等待/通知模式，比如生产者消费者问题。这需要明确的同步控制和对象锁的管理。

- **`LockSupport.park()/unpark()`** 更多用于构建低级同步结构，如自定义锁、协程或其他并发控制机制。由于它们不要求持有特定的对象锁，因此提供了更大的灵活性。

