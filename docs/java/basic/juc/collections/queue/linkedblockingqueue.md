# linkedblockingqueue

一个基于链表的、线程安全的、可阻塞的队列 插入删除更加灵活

双锁: 生产者和消费者可以并行 性能比单锁队列高

array: 数组+单锁  内存连续 性能稳定 但是效率低
linked：链表+双锁 内存不连续 吞吐量更大 但是默认Integer.maxvalue -》无界可能oom

## scene
* 高并发生产消费
* 不确定数据量


## source code

```text 
head -> node -> node -> node -> tail
```

```java 
    /**
     * Linked list node class.
     */
    static class Node<E> {
        E item;

        /**
         * One of:
         * - the real successor Node
         * - this Node, meaning the successor is head.next
         * - null, meaning there is no successor (this is the last node)
         */
        Node<E> next;

        Node(E x) { item = x; }
    }
    /** Current number of elements <br/>
      这里notEmpty和notfull是俩把锁 
      如果不使用atomic 则并发修改时可能会线程安全问题  atomic 使用cas + volatile 
      如果再加一把大锁 则生产者和消费者又不能并行执行了 
      跨锁共享变量
    */
    private final AtomicInteger count = new AtomicInteger();
    /** Lock held by take, poll, etc */
    private final ReentrantLock takeLock = new ReentrantLock();

    /** Wait queue for waiting takes */
    @SuppressWarnings("serial") // Classes implementing Condition may be serializable.
    private final Condition notEmpty = takeLock.newCondition();

    /** Lock held by put, offer, etc */
    private final ReentrantLock putLock = new ReentrantLock();

    /** Wait queue for waiting puts */
    @SuppressWarnings("serial") // Classes implementing Condition may be serializable.
    private final Condition notFull = putLock.newCondition();


    public void put(E e) throws InterruptedException {
        if (e == null) throw new NullPointerException();
        final int c;
        final Node<E> node = new Node<E>(e);
        final ReentrantLock putLock = this.putLock;
        final AtomicInteger count = this.count;
        putLock.lockInterruptibly();
        try {

            while (count.get() == capacity) {
                notFull.await(); //队列满了 等待
            }
            enqueue(node);
            c = count.getAndIncrement();
            if (c + 1 < capacity)// 返回的c是旧值
                notFull.signal();//唤醒其他生产者 
        } finally {
            putLock.unlock();
        }
        if (c == 0)// 原来count是0  put之后count变为1: 唤醒消费者 
            signalNotEmpty();//唤醒消费者 notice：这里是在putlock锁外 防止死锁
    }

    public E take() throws InterruptedException {
        final E x;
        final int c;
        final AtomicInteger count = this.count;
        final ReentrantLock takeLock = this.takeLock;
        takeLock.lockInterruptibly();
        try {
            while (count.get() == 0) {
                notEmpty.await();// 没有数据 等待
            }
            x = dequeue();
            c = count.getAndDecrement();
            if (c > 1)
                notEmpty.signal(); // c-- 之后>1 还有数据 唤醒其他消费者
        } finally {
            takeLock.unlock();
        }
        if (c == capacity)// 我拿数据之前队列是满的  c是旧值 这里不使用count<capacity 是会导致过度唤醒 每次take都signal 但是没有作用
                          // 只有从max -》 max-1 才唤醒
            signalNotFull();
        return x;
    }

```
