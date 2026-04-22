# LinkedBlockingDeque

LinkedBlockingDeque：双端队列，可以两头进、两头出（更灵活）

它是一个基于链表的可选界限（optional-bounded）的阻塞双端队列。
简单来说，它结合了 Deque（双端队列）的灵活性和 BlockingQueue（阻塞队列）的并发控制能力

- 头插：addFirst / putFirst
- 尾插：addLast / putLast
- 头取：takeFirst
- 尾取：takeLast


双端操作：支持在队头和队尾进行插入和移除操作（LIFO 和 FIFO 均可）。
- 可选界限：在初始化时可以指定容量。如果不指定，默认容量为 Integer.MAX_VALUE（类似于 LinkedBlockingQueue）。
- 线程安全：使用一把重入锁（ReentrantLock）来保证并发安全，并配合两个 Condition（notFull 和 notEmpty）来实现阻塞机制。
- 阻塞性：
- 当队列满时，尝试插入的线程会被阻塞。
- 当队列空时，尝试获取的线程会被阻塞。


LinkedBlockingQueue 由于只支持尾部入队和头部出队，操作天然分离，因此可以采用 putLock 和 takeLock 双锁提高并发性能；
而 LinkedBlockingDeque 支持双端插入和删除，同一端可能被多个线程同时修改，无法进行锁分离，因此只能采用单锁保证线程安全

## scene 

适用于需要双端操作或任务调度灵活性的场景，例如任务插队、优先级处理或 LIFO/FIFO 混合模型

## demo 

```java 
/** 双端队列 */
public class LinkedBlockingDequeDemo {
    public static void main(String[] args) throws InterruptedException {
        // also 默认Interger.maxvalue 容易oom
        LinkedBlockingDeque<Integer> qDeque = new LinkedBlockingDeque<Integer>(100);
        qDeque.putFirst(1);
        qDeque.putFirst(2);
        qDeque.putLast(3); // 2 1 3
        qDeque.putFirst(4);
        qDeque.putLast(5); // 4 2 1 3 5
        Integer takeFirst = qDeque.takeFirst(); // 2 1 3 5
        System.out.println(takeFirst);
        Integer takeLast = qDeque.takeLast(); // 2 1 3
        System.out.println(takeLast);
        while (!qDeque.isEmpty()) {
            Integer take = qDeque.take();
            System.out.println(take);
        }
    }
}
```

## source code 

内部链表结构

```text 
null ← a <-> b <-> c → null
       ↑            ↑
     first         last
```
