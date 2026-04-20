# two-condition 

在单锁（synchronized）环境下，我们只能调用 wait() 和 notifyAll()。这会导致一个性能问题：
当生产者唤醒线程时，它会唤醒所有等待的线程（包括其他生产者和消费者）。
如果本该唤醒消费者，却唤醒了另一个生产者，该生产者发现队列还是满的，只能继续等待，这造成了无效的上下文切换。

双条件算法的逻辑如下：
- notEmpty (不为空条件)：消费者在此等待。当队列为空时，消费者挂起；当生产者放入数据后，通过 notEmpty.signal() 唤醒消费者。
- notFull (不为满条件)：生产者在此等待。当队列满时，生产者挂起；当消费者取走数据后，通过 notFull.signal() 唤醒生产者


## demo 

- [ArrayBlockingQueue](/docs/java/basic/juc/collections/queue/ArrayBlockingQueue.md#source-code)
