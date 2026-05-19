# concurrentHashmap

ConcurrentHashMap = 数组 + 链表/红黑树 + getReferenceAcquire + CAS(空桶) + synchronized(bin head)+longadder + 多线程协同扩容

1. getReferenceAcquire 确保多线程读取最新值 tabAt
2. 数组 U.compareAndSetReference  空桶插入完全无锁 casTabAt  CAS(null -> newNode) 自旋
3. 链表 sychronized+dcl(double check locking) 给桶头加锁
4. addCount CounterCell([longAdder](../../atomic/longAdder.md)) 分段计数

- 不可以存null
- 通过位运算确保hash值肯定是正的，负数则有特殊含义
- transferIndex n->0 减到0就说明已经迁移完成了
- 扩容cas抢桶区间

## 头节点 

```text 
fh >= 0：它是普通链表。

f instanceof TreeBin：它是红黑树。

f instanceof ForwardingNode：正在扩容（这种情况通常在锁前就被拦截去协助扩容了）。

f instanceof ReservationNode：正在并发计算中，如果此时你还要进来改，那就是递归更新错误 compute
```

