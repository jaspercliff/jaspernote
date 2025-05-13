# AbstractQueuedSynchronizer

`AbstractQueuedSynchronizer`（简称 **AQS**）是 Java 并发包 `java.util.concurrent.locks` 的核心框架之一，
用于**构建锁和同步器的基础框架**，例如：

- `ReentrantLock`
- `CountDownLatch`
- `Semaphore`
- `ReentrantReadWriteLock`
- `FutureTask`  
  这些类的底层几乎都基于 AQS 实现。

---
> AQS 是一个“同步状态管理器”，通过一个 **FIFO 等待队列** 和一个 **state 状态变量**，让线程安全、有序地获取或释放资源。
---

##  AQS 的核心原理

### 1. **核心成员变量**

```java
public abstract class AbstractQueuedSynchronizer
        extends AbstractOwnableSynchronizer
        implements java.io.Serializable {

    private transient volatile Node head;
    private transient volatile Node tail;
    private volatile int state;
}
```

- `state`: 表示同步状态（例如是否被锁住、剩余许可数等），通过 `getState()/setState()/compareAndSetState()` 操作。
- `head/tail`: 表示一个 **等待获取锁的线程队列（FIFO）**。

---

### 2. **两种模式**

| 模式   | 用途                 | 方法                                          |
|------|--------------------|---------------------------------------------|
| 独占模式 | 一个线程持有（如 Lock）     | `tryAcquire()` / `tryRelease()`             |
| 共享模式 | 多线程共享（如 Semaphore） | `tryAcquireShared()` / `tryReleaseShared()` |

---

### 3. **自定义同步器的典型写法**

要使用 AQS，通常要**继承 AQS 并重写其方法**，例如：

---

##  AQS 的设计优势

- 🔁 支持共享和独占两种资源访问模式；
- ⚙️ 提供阻塞队列、状态管理、线程中断等机制；
- 📦 避免重复造轮子，让开发者专注实现核心逻辑。

---

## 🧩 应用举例

| 同步器/类                    | AQS 实现方式     |
|--------------------------|--------------|
| `ReentrantLock`          | 独占模式         |
| `Semaphore`              | 共享模式         |
| `CountDownLatch`         | 共享模式，计数为0时释放 |
| `ReentrantReadWriteLock` | 独占+共享        |
| `FutureTask`             | 状态管理+排队      |

---

## ✅ 总结

| 概念   | 内容描述                                  |
|------|---------------------------------------|
| 本质   | 基于一个 int 状态值 + FIFO 队列构建同步器           |
| 使用方式 | 继承并实现 `tryAcquire` / `tryRelease` 等方法 |
| 支持模式 | 独占、共享                                 |
| 应用场景 | 构建各种锁、信号量、同步器的基础工具                    |

---
