# blockingqueue

# Java 阻塞队列 (BlockingQueue)

Java 阻塞队列是一种线程安全的队列，它支持在必要时进行等待（阻塞）操作。它是`java.util.concurrent`包的一部分，特别适用于生产者-消费者场景。

## 主要特点

BlockingQueue提供的操作包括：
- 当队列为空且尝试获取元素时会阻塞
- 当队列已满且尝试添加元素时会阻塞
- 支持阻塞操作的超时设置

## 主要实现类

Java提供了几种BlockingQueue的实现：

1. **ArrayBlockingQueue**：基于数组的固定大小队列
2. **LinkedBlockingQueue**：基于链表的可选容量限制队列
3. **PriorityBlockingQueue**：无界优先级队列
4. **DelayQueue**：延迟队列，只有在延迟时间到期后才能获取元素
5. **SynchronousQueue**：同步队列，一次只能持有一个元素
6. **LinkedTransferQueue**：基于链表节点的无界队列

## 核心方法

### 添加元素
- `put(E e)`：插入元素，必要时等待直到有空间可用  不返回任何值（返回值为 void）
- `offer(E e)`：尝试插入元素，成功返回true 当队列已满时不会阻塞，而是立即返回 false
- `offer(E e, long timeout, TimeUnit unit)`：尝试在超时时间内插入元素 在超时之前成功添加返回 true，超时后返回 false
- `add` 方法来自 Collection 接口，被 Queue 接口继承：
当队列已满时：抛出 IllegalStateException 异常
返回值：成功时返回 true（实际上总是返回 true，除非抛出异常）
阻塞性：非阻塞


### 获取元素
- `take()`：获取并移除队首元素，必要时等待   返回队首元素
- `poll()`：获取并移除队首元素（如果可用），否则返回null 当队列为空时不会阻塞，而是立即返回 null
- `poll(long timeout, TimeUnit unit)`：尝试在超时时间内获取元素

### 其他方法
- `peek()`：查看队首元素但不移除
- `remainingCapacity()`：返回剩余容量
- `drainTo(Collection c)`：移除所有元素并添加到另一个集合中

## 使用示例

### offer take
```java
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class BlockingQueueExample {
    public static void main(String[] args) {
        // 创建容量为5的阻塞队列
        BlockingQueue<String> queue = new ArrayBlockingQueue<>(5);
        
        // 生产者线程
        new Thread(() -> {
            try {
                for (int i = 0; i < 10; i++) {
                    String item = "项目-" + i;
                    System.out.println("生产: " + item);
                    queue.put(item);  // 如果队列已满，将阻塞
                    Thread.sleep(100);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
        
        // 消费者线程
        new Thread(() -> {
            try {
                for (int i = 0; i < 10; i++) {
                    String item = queue.take();  // 如果队列为空，将阻塞
                    System.out.println("消费: " + item);
                    Thread.sleep(300);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
    }
}
```

### drainTo

`drainTo` 方法用于将 BlockingQueue 中的所有元素移除并添加到另一个集合中。它可以用于批量处理元素。
```java
package com.jasper.juc.collections.queue;


import java.util.ArrayList;
import java.util.concurrent.ArrayBlockingQueue;

public class BlockingQueueDrainDemo {
    public static void main(String[] args) {
        final ArrayBlockingQueue<String> data = new ArrayBlockingQueue<>(10);

        for (int i = 0; i < 5; i++) {
            data.offer("data-" + i);
        }

        final ArrayList<String> strings = new ArrayList<>();
        data.drainTo(strings,3);

        System.out.println(strings);
    }
}

```

## guava 

- [Queues.drain()](/java/utils/guava/collections/utils/Queues.md)