---
sidebar_position: 1
---

# 内存间交互

在 JMM 中，线程不能直接读写主内存（Main Memory）中的变量，每个线程都有自己私有的工作内存（Working Memory）。线程、工作内存和主内存之间的所有交互，都是通过以下 8 种**原子操作**来完成的：

---

### 一、 核心的 8 种内存原子操作

这 8 种操作可以分为三组：**主内存与工作内存的交互**、**工作内存内部的数据流转**、**以及锁定机制**。

| 操作名称 | 作用对象 | 具体行为含义 |
| --- | --- | --- |
| **lock（锁定）** | 主内存变量 | 把一个变量标识为一条线程独占的状态，其他线程无法访问。 |
| **unlock（解锁）** | 主内存变量 | 释放一个处于锁定状态的变量，释放后其他线程才能锁定它。 |
| **read（读取）** | 主内存变量 | 把变量的值从主内存传输到线程的工作内存中，为后面的 `load` 做准备。 |
| **load（载入）** | 工作内存变量 | 把 `read` 操作得到的变量值，放入工作内存的变量副本中。 |
| **use（使用）** | 工作内存变量 | 把工作内存中变量的值传递给虚拟机执行引擎。每当 JVM 遇到需要读取变量的字节码指令时就会触发。 |
| **assign（赋值）** | 工作内存变量 | 把执行引擎接收到的值赋给工作内存中的变量。每当 JVM 遇到修改变量的字节码指令时就会触发。 |
| **store（存储）** | 工作内存变量 | 把工作内存中变量的值传送到主内存中，为后面的 `write` 做准备。 |
| **write（写入）** | 主内存变量 | 把 `store` 操作得到的变量值，真正写入到主内存的变量中。 |

---

### 二、 操作之间的配对与流转顺序

JMM 规定，这些操作在跨内存边界时**必须成对且按顺序出现**，但并不要求连续执行：

* **从主内存到工作内存（读数据）：** 必须按顺序执行 `read` -> `load`。也就是说，不能只有 `read` 没有 `load`。但在 `read` 和 `load` 之间可以插入其他指令。
* **从工作内存到主内存（写数据）：** 必须按顺序执行 `store` -> `write`。同理，不能只有 `store` 没有 `write`。

一个完整的变量修改并同步的生命周期通常是这样的：
`read`（读主存） -> `load`（载入工作内存） -> `use`（交给引擎计算） -> `assign`（计算完赋值给工作内存） -> `store`（传回主存） -> `write`（写入主存）。

每次 use 变量前，必须先顺序执行 read 和 load（保证读到主内存最新值）
每次 assign 变量后，必须立刻顺序执行 store 和 write（保证新值立刻同步回主内存）

---

### 三、 必须遵守的 8 条硬性规则

为了防止多线程环境下出现数据错乱，JMM 为这 8 种操作制定了非常严格的规则：

1. **不允许单独出现：** `read` 和 `load`、`store` 和 `write` 必须成对出现。
2. **不允许丢弃 assign：** 线程只要在工作内存中修改了变量（执行了 `assign`），就必须同步回主内存（执行 `store` 和 `write`）。
3. **不允许无原因的写回：** 如果线程没有发生过 `assign`（没改过数据），不允许无缘无故把工作内存的数据同步回主内存。
4. **新变量必须诞生于主内存：** 工作内存不能直接使用一个未初始化的变量。也就是说，对一个变量执行 `use` 或 `store` 之前，必须先执行了 `load` 或 `assign`。
5. **变量同一时刻只能被一条线程 lock：** 但同一条线程可以对同一个变量重复 lock 多次（可重入锁），之后需要执行相同次数的 unlock 才能完全解锁。
6. **未被 lock 的变量不能执行 unlock：** 线程不能去解锁一个没被锁定的变量，也不能去解锁被其他线程锁定的变量。
7. **lock 会清空工作内存副本：** 对一个变量执行 `lock` 操作时，会清空工作内存中该变量的值。执行引擎在使用这个变量前，需要重新执行 `load` 或 `assign` 来初始化变量的值（这就是 `synchronized` 保证可见性的原理）。
8. **unlock 前必须先写回主内存：** 对一个变量执行 `unlock` 之前，必须先把该变量同步回主内存中（执行 `store` 和 `write`）。


```java
public class VisibilityDemo {
    // If volatile is not added, the modification by the main thread may be invisible to Thread 1
    private static volatile boolean flag = true;

    public static void main(String[] args) throws InterruptedException {
        new Thread(
                        () -> {
                            while (flag) {
                                // The execution engine continuously executes 'use', always reading
                                // the old copy in working memory
                            }
                            System.out.println("Thread 1 stopped.");
                        })
                .start();

        Thread.sleep(100); //  Ensure Thread 1 is up and running
        flag = false; //  Triggers 'assign' operation
        System.out.println("Main thread changed flag to false.");
    }
}
```
