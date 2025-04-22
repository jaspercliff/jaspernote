# ReentrantReadWriteLock

`ReentrantReadWriteLock` 是 Java 中一个实现读写锁的同步工具，允许多个线程同时读取共享资源，但只允许一个线程写入。
这种机制提高了并发访问共享资源的效率，特别是在读操作远多于写操作的场景中。下面是 `ReentrantReadWriteLock` 的主要知识点

### 主要特性

1. **分离读写操作**：允许多个读线程同时访问，但保证写操作的独占性。
2. **提高并发性能**：适用于读多写少的并发场景，可以显著提高性能。
3. **支持可重入**：线程可以重复获取已持有的锁。
4. **锁降级**：支持从写锁降级为读锁。
5. **公平选择**：可选择公平锁或非公平锁。

### 示例代码

```java
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class ReentrantReadWriteLockExample {
    private final ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();
    private final ReentrantReadWriteLock.ReadLock readLock = rwLock.readLock();
    private final ReentrantReadWriteLock.WriteLock writeLock = rwLock.writeLock();
    private int value = 0;

    // 读操作
    public int getValue() {
        readLock.lock(); // 获取读锁
        try {
            return value;
        } finally {
            readLock.unlock(); // 释放读锁
        }
    }

    // 写操作
    public void incrementValue() {
        writeLock.lock(); // 获取写锁
        try {
            value++;
        } finally {
            writeLock.unlock(); // 释放写锁
        }
    }

    public static void main(String[] args) {
        ReentrantReadWriteLockExample example = new ReentrantReadWriteLockExample();
        // 示例：启动读写线程
    }
}
```

### 分析

- **创建读写锁**：首先，我们实例化 `ReentrantReadWriteLock`，然后分别获取它的读锁和写锁。
- **读操作使用读锁**：在 `getValue` 方法中，我们通过调用 `readLock.lock()` 获取读锁，执行读操作后，使用 `finally` 块确保读锁被释放。这允许多个线程同时进行读操作。
- **写操作使用写锁**：在 `incrementValue` 方法中，我们通过调用 `writeLock.lock()` 获取写锁，执行写操作，然后释放写锁。写锁保证了写操作的独占性，当写锁被持有时，其他读写操作都会被阻塞。

### 锁降级

锁降级是指在持有写锁的情况下，获取读锁，然后释放写锁的过程。这样做可以保留对资源的读取权限，而不允许其他线程进行写操作。锁降级的代码示例：

``` java
writeLock.lock();
try {
    // 修改共享资源
    value++;
    readLock.lock(); // 在释放写锁之前获取读锁
} finally {
    writeLock.unlock(); // 释放写锁
}
// 此处仍持有读锁
try {
    // 读取共享资源
} finally {
    readLock.unlock(); // 释放读锁
}
```

### 注意事项

- **锁获取顺序**：遵循获取写锁、读锁的顺序，以避免死锁。
- **公平性设置**：`ReentrantReadWriteLock` 在构造时可以选择是公平锁还是非公平锁。公平锁可以防止饥饿，但可能会影响性能。


## 实际案例

🟢 1. 读线程可并发执行

多个读线程会同时获取读锁，不会互相阻塞。
这是 ReadWriteLock 的最大优势 —— 读多写少场景下性能很高。

🔴 2. 写线程必须等所有读线程释放读锁后才能获取写锁

写操作是独占锁，必须等待其他线程释放读锁，它自己才能加上写锁。

所以，通常写线程的 “正在写入…” 会晚于所有读线程完成之后出现。

```java
package com.jasper.juc.lock;

import java.util.concurrent.locks.ReentrantReadWriteLock;

public class ReadWriteLockExample {
    private int value = 0;
    private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();

    public int read() {
        lock.readLock().lock();
        try {
            System.out.println(Thread.currentThread().getName() + " 正在读取...");
            Thread.sleep(100); // 模拟耗时读取
            return value;
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            lock.readLock().unlock();
        }
    }

    public void write(int newValue) {
        lock.writeLock().lock();
        try {
            System.out.println(Thread.currentThread().getName() + " 正在写入...");
            Thread.sleep(200); // 模拟耗时写入
            this.value = newValue;
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            lock.writeLock().unlock();
            System.out.println(Thread.currentThread().getName() + " 写入完成...");
        }
    }
}

public class TestReadWriteLock {
    public static void main(String[] args) {
        ReadWriteLockExample example = new ReadWriteLockExample();

        // 启动多个读线程
        for (int i = 0; i < 5; i++) {
            new Thread(() -> {
                System.out.println("读取结果：" + example.read());
            }, "读线程-" + i).start();
        }

        // 启动一个写线程
        new Thread(() -> {
            example.write(42);
        }, "写线程").start();
    }
}
```