---
sidebar_position: 2
---
# ArrayBlockingQueue 

- 有界性 (Bounded): 在创建时必须指定容量大小（Capacity），一旦确定，不可更改。
- 数组结构: 内部通过一个循环数组实现。
- 线程安全: 使用独占锁（ReentrantLock）来保证并发环境下的数据一致性。
- 阻塞机制: * 当队列满时，入队操作（put）会阻塞。
- 当队列空时，出队操作（take）会阻塞。
- FIFO (First-In-First-Out): 遵循先进先出原则，最先放入的元素最先被取出

* 内部只有 一把锁（ReentrantLock）
* put / take 共用同一把锁
* ArrayBlockingQueue：单锁（吞吐量较低）
* LinkedBlockingQueue：双锁（put / take 分离）

ReentrantLock: 无论是读还是写，都使用同一把锁。这意味着生产者和消费者不能同时执行
（在多核 CPU 下，相比 LinkedBlockingQueue 的双锁模型，其并发性能稍低）

## add and remove

  出错返回异常 

```java
package com.jasper.collections.queue.arrayBlockingQueue;

import java.util.concurrent.ArrayBlockingQueue;

public class AddAndRemoveDemo {
    public static void main(String[] args) {
        ArrayBlockingQueue<Integer> queue = new ArrayBlockingQueue<>(3);
        // queue.remove(); // Exception in thread "main" java.util.NoSuchElementException
        boolean isSuccess =
                queue.remove(3); // Deleting the specified element will not throw an exception
        // if not return false
        System.out.println(isSuccess);
        queue.add(1);
        queue.add(2);
        queue.add(3);
        // queue.add(4); // Exception in thread "main" java.lang.IllegalStateException: Queue full
    }
}
```
## offer and poll 

出错返回false 带超时时间也使用poll

```java
package com.jasper.collections.queue.arrayBlockingQueue;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.TimeUnit;

public class OfferAndPollDemo {

    public static void main(String[] args) throws InterruptedException {
        ArrayBlockingQueue<Integer> queue = new ArrayBlockingQueue<Integer>(1);
        Integer poll = queue.poll();
        System.out.println(poll); // return null
        queue.offer(1);
        Integer poll2 = queue.poll();
        System.out.println(poll2);
        Integer poll3 = queue.poll(2, TimeUnit.SECONDS); // with timeout
        System.out.println(poll3);

        queue.offer(2);
        boolean offer = queue.offer(3);
        System.out.println("offfer success: " + offer);
    }
}
```


## put and take

阻塞等待 

```java

package com.jasper.collections.queue.arrayBlockingQueue;

import java.util.concurrent.ArrayBlockingQueue;

public class PutAndTakeDemo {
    public static void main(String[] args) {
        ArrayBlockingQueue<Integer> queue = new ArrayBlockingQueue<Integer>(3);

        new Thread(
                        () -> {
                            for (Integer i = 0; i < 3; i++) {
                                try {
                                    queue.put(i); // i = 3 will blocking until there is a consumer
                                } catch (InterruptedException e) {
                                    System.out.println(e.getMessage());
                                }
                            }
                        })
                .start();

        new Thread(
                        () -> {
                            try {
                                Thread.sleep(2000);
                                while (true) {
                                    System.out.println(queue.take()); // blocking wait
                                }

                            } catch (InterruptedException e) {
                                System.out.println(e.getMessage());
                            }
                        })
                .start();
    }
}
```

## source code 

```java
// 数组 + 循环队列 + 一把锁 + 两个条件变量
final Object[] items;   // 存数据

int takeIndex;          // 取数据的位置
int putIndex;           // 放数据的位置
int count;              // 当前元素个数

final ReentrantLock lock;     // 唯一一把锁（重点）
final Condition notEmpty;     // 队列非空
final Condition notFull;      // 队列未满
```

```java
    public void put(E e) throws InterruptedException {
        Objects.requireNonNull(e);
        final ReentrantLock lock = this.lock;
        lock.lockInterruptibly();
        try {
        /*
        操作系统允许线程“无理由唤醒”（为了优化调度）
         JVM 为了避免死锁/丢信号做的兜底设计

         为了防止虚假唤醒以及多线程竞争导致条件失效，await() 必须放在 while 循环中。因为线程被唤醒后并不保证条件仍然成立，
         需要重新检查条件，不满足就继续等待，否则会导致数据错误或并发问题
        */
            while (count == items.length) //防止 虚假唤醒（spurious wakeup）
                notFull.await(); //队列满了 生产者等待
            enqueue(e);
        } finally {
            lock.unlock();
        }
    }

    private void enqueue(E e) {
        // assert lock.isHeldByCurrentThread();
        // assert lock.getHoldCount() == 1;
        // assert items[putIndex] == null;
        final Object[] items = this.items;
        items[putIndex] = e;
        if (++putIndex == items.length) putIndex = 0; //数组实现循环队列
        count++;//判断 数组满还是空
        notEmpty.signal();// 通知消费者不为空了 可以来拿了
    }

    public E take() throws InterruptedException {
        final ReentrantLock lock = this.lock;
        lock.lockInterruptibly();
        try {
            while (count == 0)
                notEmpty.await(); // 队列空了 消费者等待
            return dequeue();
        } finally {
            lock.unlock();
        }
    }

    private E dequeue() {
        // assert lock.isHeldByCurrentThread();
        // assert lock.getHoldCount() == 1;
        // assert items[takeIndex] != null;
        final Object[] items = this.items;
        @SuppressWarnings("unchecked")
        E e = (E) items[takeIndex];
        items[takeIndex] = null;
        if (++takeIndex == items.length) takeIndex = 0;
        count--;
        if (itrs != null)
            itrs.elementDequeued(); //itrs 用来维护正在遍历队列的迭代器，保证在并发修改时迭代器不出错
        notFull.signal(); //通知生产者 不满了 可以添加了
        return e;
    }


```

1. 生产者 put()
2. 发现 count == capacity
3. 执行 notFull.await() → 阻塞

👉 消费者 take() 后 唤醒signal(notFull)

1. 消费者 take()
2. 发现 count == 0
3. 执行 notEmpty.await() → 阻塞

👉 生产者 put() 后 唤醒signal(notEmpty)

## scene 

### 限流 降级

```java
if (!queue.offer(task)) {
    return "系统繁忙";
}

if (!queue.offer(task)) {
    // fallback 处理
    saveToDB(task); // 或者写文件
}
```


