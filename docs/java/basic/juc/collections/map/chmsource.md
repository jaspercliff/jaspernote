# concurrenthashmap source code 


```java
    /**
     * The array of bins. Lazily initialized upon first insertion.
     * Size is always a power of two. Accessed directly by iterators.
     */
    transient volatile Node<K,V>[] table;

    /**
     * The next table to use; non-null only while resizing.
     */
    private transient volatile Node<K,V>[] nextTable;

// 正常hash是正的 所以这里negative可以用来表示特殊含义
    static final int MOVED     = -1; // hash for forwarding nodes 转发节点 数据已经到新的位置了扩容中
    static final int TREEBIN   = -2; // hash for roots of trees
    static final int RESERVED  = -3; // hash for transient reservations
    static final int HASH_BITS = 0x7fffffff; // usable bits of normal node hash

    // 1 后面跟着 16 个 0   -1 变为16个1 65535 最多65535个线程参加帮忙扩容
    private static final int MAX_RESIZERS = (1 << (32 - RESIZE_STAMP_BITS)) - 1;

// 扰动函数（Perturbation Function）
//h >>> 16 将原始哈希值的高 16 位移动到了低 16 位的位置 
//让原始的“高位”与“低位”进行异或。这样，最终得到的低位部分同时融合了原始高位和低位的特征 
//hashmap put时 hash也是这样计算的
//0 后面跟着 31 个 1  & 确保最后结果是正的 负数有特殊含义
    static final int spread(int h) {
        return (h ^ (h >>> 16)) & HASH_BITS;
    }
/*
普通的数组访问 tab[i] 是不具备可见性保证的  即使数组引用 tab 是 volatile 的，数组内部的元素（如 tab[0], tab[1]）并不具备 volatile 的语义
tabAt 通过 Unsafe 类（U）直接从内存地址取值，实现了无锁且能读到最新值

getReferenceAcquire保证了读取操作的可见性。它确保在读取这个引用之后的所有指令，都不会被重排序到这个读取动作之前,性能优于 volatile

ABASE 数组首元素地址
ASHIFT 元素大小的位移量 如果一个引用占 8 字节，ASHIFT 就是 2 (2^3=8)
i * 2^ASHIFT
数组起始地址 + (下标 * 元素宽度)
*/
    @SuppressWarnings("unchecked")
    static final <K,V> Node<K,V> tabAt(Node<K,V>[] tab, int i) {
        return (Node<K,V>)U.getReferenceAcquire(tab, ((long)i << ASHIFT) + ABASE);
    }

final V putVal(K key, V value, boolean onlyIfAbsent) {
  //不允许为null
        if (key == null || value == null) throw new NullPointerException();
        int hash = spread(key.hashCode());
  // 当前bin （链表、树）节点数量
        int binCount = 0;
  // 自旋+重试  cas失败 扩容中 并发下不能一次成功
        for (Node<K,V>[] tab = table;;) {
            Node<K,V> f; int n, i, fh; K fk; V fv;
    //  初始化 lazy load
            if (tab == null || (n = tab.length) == 0)
                tab = initTable();
            else if ((f = tabAt(tab, i = (n - 1) & hash)) == null) {
      // 原子修改  U.compareAndSetReference 空桶插入完全无锁 U.compareAndSetReference
                if (casTabAt(tab, i, null, new Node<K,V>(hash, key, value)))
                    break;                   // no lock when adding to empty bin
            }
    // 扩容中 转移到新的位置 
            else if ((fh = f.hash) == MOVED)
    // 当前线程帮忙扩容
                tab = helpTransfer(tab, f);
    // 当前就是目标key 直接返回
            else if (onlyIfAbsent // check first node without acquiring lock
                     && fh == hash
                     && ((fk = f.key) == key || (fk != null && key.equals(fk)))
                     && (fv = f.val) != null)
                return fv;
    // 发生冲突 链表或者红黑树
            else {
                V oldVal = null;
      // 给头节点加锁
                synchronized (f) {
        // dcl double check locking 防止获取f 和对f成功加锁之间 有其他线程发生了修改或者扩容
                    if (tabAt(tab, i) == f) {
          // hash 值是正数，则是链表 tree是-2
                        if (fh >= 0) {
                            binCount = 1;
                            for (Node<K,V> e = f;; ++binCount) {
                                K ek;
              // 找到相同key  普通put会覆盖
                                if (e.hash == hash &&
                                    ((ek = e.key) == key ||
                                     (ek != null && key.equals(ek)))) {
                                    oldVal = e.val;
                                    if (!onlyIfAbsent)
                                        e.val = value;
                                    break;
                                }
                                Node<K,V> pred = e;
              // 不存在 尾插
                                if ((e = e.next) == null) {
                                    pred.next = new Node<K,V>(hash, key, value);
                                    break;
                                }
                            }
                        }
              // 红黑树
                        else if (f instanceof TreeBin) {
                            Node<K,V> p;
                            binCount = 2;
                            if ((p = ((TreeBin<K,V>)f).putTreeVal(hash, key,
                                                           value)) != null) {
                                oldVal = p.val;
                                if (!onlyIfAbsent)
                                    p.val = value;
                            }
                        }
          // 防止在compute中执行put操作  避免死锁
          // chm 避免计算的时候锁住整个大数组，但是又不想多个线程重复计算 所以就给hash设置为-3 代表占位了 已经有线程计算了
                        else if (f instanceof ReservationNode)
                            throw new IllegalStateException("Recursive update");
                    }
                }
                if (binCount != 0) {
                    if (binCount >= TREEIFY_THRESHOLD)
                        treeifyBin(tab, i);
                    if (oldVal != null)
                        return oldVal;
                    break;
                }
            }
        }
  // size++ resize 
        addCount(1L, binCount);
        return null;
    }

private final Node<K,V>[] initTable() {
  // 当前tab  sizectl
        Node<K,V>[] tab; int sc;
  // spin 自旋
        while ((tab = table) == null || tab.length == 0) {//o
    // - 1 initialization  <-1 the number of active resizing thread
    // 别的线程正在初始化 先让一下cpu
            if ((sc = sizeCtl) < 0)
                Thread.yield(); // lost initialization race; just spin
            else if (U.compareAndSetInt(this, SIZECTL, sc, -1)) {
                try {/
        // dcl cas 后 可能别的线程已经初始化成功 概率极低
                    if ((tab = table) == null || tab.length == 0) {//
          // 用户指定容量则使用指定的 否则默认 这里指定容量时会赋值sizectl=cap
                        int n = (sc > 0) ? sc : DEFAULT_CAPACITY;
                        @SuppressWarnings("unchecked")
                        Node<K,V>[] nt = (Node<K,V>[])new Node<?,?>[n];
                        table = tab = nt;
          // sc = 0.75*n      n-n/4 = 0.75n  这里已经变为扩容阈值了 16*0.75= 12
                        sc = n - (n >>> 2);
                    }
                } finally {
                    sizeCtl = sc;
                }
                break;
            }
        }
        return tab;
    }
/**
* 生成一个能代表“当前正在进行 n 容量扩容”的唯一stamp
* chm的容量肯定是2^n 
* 每一个不同的capacity 前导数(int 32 从左边最高位开始，到第一个1前面有多少个0)肯定不一样 
* 就能确定是那一次（16-32）的扩容
* 1 向左移15位   确保合并后的低 16 位结果中，最高位一定不是 0
* n = 16  lz = 27     11011 | 1000 0000 0000 0000 = 1000 0000 0001 1011 
* 1 向左移15位   确保合并后的低 16 位结果中，最高位一定不是 0
* 1 负数正在扩容 领先0 原来的容量
*/
    static final int resizeStamp(int n) {
        return Integer.numberOfLeadingZeros(n) | (1 << (RESIZE_STAMP_BITS - 1));
    }
    /**
     * Helps transfer if a resize is in progress.
     * tab 旧table 
     * f bin head
     */
    final Node<K,V>[] helpTransfer(Node<K,V>[] tab, Node<K,V> f) {
        Node<K,V>[] nextTab; int sc;
     // 当前桶已经迁走 nexttab 新位置
        if (tab != null && (f instanceof ForwardingNode) &&
            (nextTab = ((ForwardingNode<K,V>)f).nextTable) != null) {
     // 在次<< 16位 给整数32位 高16位存储resziestamp 最后结果一定是负数，正在扩容中
     // 低16位 参与扩容的线程数
            int rs = resizeStamp(tab.length) << RESIZE_STAMP_SHIFT;
     // nexttable 没有变 还是当前扩容
     // 旧的table 还是当前table 
     // sc < 0 还在扩容
            while (nextTab == nextTable && table == tab &&
                   (sc = sizeCtl) < 0) {
     // 扩容线程达到上限 
     // rs+1: 当一个线程发起扩容时 addCount:U.compareAndSetInt(this, SIZECTL, sc, rs + 2)
     // +2 : 第一个1 代表正在扩容 第二个1 代表 当前有一个线程进行扩容
     // 当sc == rs+1 代表扩容已经完成了
     // 扩容任务分配器：64 -48 thread a：[48,63] 减到0就说明已经迁移完成了
                if (sc == rs + MAX_RESIZERS || sc == rs + 1 ||
                    transferIndex <= 0)
                    break;
                if (U.compareAndSetInt(this, SIZECTL, sc, sc + 1)) {
                    transfer(tab, nextTab);
                    break;
                }
            }
            return nextTab;
        }
        return table;

  /**
  * 更新元素个数 并判断是否需要扩容
  * 1L + binCount(原来数量)
  */
private final void addCount(long x, int check) {
    // 分段计数数组， b basecount 旧值 s sumCount
        CounterCell[] cs; long b, s;
   // 已经启用了分段计数 或者cas更新失败
        if ((cs = counterCells) != null || !U.compareAndSetLong(this, BASECOUNT, b = baseCount, s = b + x)) {
            CounterCell c; long v; int m;
            boolean uncontended = true;
  // 分段计数不存在   
      if (cs == null || (m = cs.length - 1) < 0 ||
   // 每个线程有个probe值 类似线程hash  定位当前线程应该更新那个counterCell 当前槽为空
                (c = cs[ThreadLocalRandom.getProbe() & m]) == null ||
  // cas 更新ceil fail
                !(uncontended = U.compareAndSetLong(c, CELLVALUE, v = c.value, v + x))) {
  // 进入完整版 longadder 逻辑
                fullAddCount(x, uncontended);
                return;
            }
            if (check <= 1)
                return;
  //统计总元素数 baseCount+all counterCell
            s = sumCount();
        }
        if (check >= 0) {
  // current table  nextTable(扩容中的新数组) n current capacity
            Node<K,V>[] tab, nt; int n, sc;
      // 元素数量到达扩容阈值
            while (s >= (long)(sc = sizeCtl) && (tab = table) != null &&
                   (n = tab.length) < MAXIMUM_CAPACITY) {
  // generate resize stamp
                int rs = resizeStamp(n) << RESIZE_STAMP_SHIFT;
  // 有线程在扩容了
                if (sc < 0) {
  // 扩容线程达到上限   新表不存在 或者没有任务可以迁移了
                    if (sc == rs + MAX_RESIZERS || sc == rs + 1 ||
                        (nt = nextTable) == null || transferIndex <= 0)
                        break;
  // help transfer
                    if (U.compareAndSetInt(this, SIZECTL, sc, sc + 1))
                        transfer(tab, nt);
                }
  // 当前线程发起扩容 +1 resize 标记 +1 当前线程
                else if (U.compareAndSetInt(this, SIZECTL, sc, rs + 2))
                    transfer(tab, null);
                s = sumCount();
            }
        }
    }

  /**
  * 统计总元素数 baseCount+all counterCell
  */
    final long sumCount() {
        CounterCell[] cs = counterCells;
        long sum = baseCount;
        if (cs != null) {
            for (CounterCell c : cs)
                if (c != null)
                    sum += c.value;
        }
        return sum;
    }
```

```java
// 将数据并发迁移到新数组  128 bin 16 core
private final void transfer(Node<K,V>[] tab, Node<K,V>[] nextTab) {
        int n = tab.length, stride;
  // 每个线程一次处理多少桶 s = max(n/8/cpu core ,16)
        if ((stride = (NCPU > 1) ? (n >>> 3) / NCPU : n) < MIN_TRANSFER_STRIDE)
            stride = MIN_TRANSFER_STRIDE; // subdivide range
        if (nextTab == null) {            // initiating  current thread is first transfer
            try {
                @SuppressWarnings("unchecked")
                Node<K,V>[] nt = (Node<K,V>[])new Node<?,?>[n << 1];
                nextTab = nt;
            } catch (Throwable ex) {      // try to cope with OOME
                sizeCtl = Integer.MAX_VALUE;
                return;
            }
            nextTable = nextTab;// 新数组
            transferIndex = n;// 减到0就说明已经迁移完成了
        }
        int nextn = nextTab.length;
  // hash = -1  在transfer 其他线程看到就不管了
  ForwardingNode<K,V> fwd = new ForwardingNode<K,V>(nextTab);
  // 当前线程要不要继续领取新bin
        boolean advance = true;
  // 是否全部迁移完成
        boolean finishing = false; // to ensure sweep before committing nextTab
        for (int i = 0, bound = 0;;) {
            Node<K,V> f; int fh;
            while (advance) {
                int nextIndex, nextBound;
                if (--i >= bound || finishing)
                    advance = false;
      // 所有bin都领取完了
                else if ((nextIndex = transferIndex) <= 0) {
                    i = -1;
                    advance = false;
                }
      // cas 抢一段区间
                else if (U.compareAndSetInt
                         (this, TRANSFERINDEX, nextIndex,
                          nextBound = (nextIndex > stride ?
                                       nextIndex - stride : 0))) {
        // 该线程负责127-112
                    bound = nextBound;//112
        // 当前处理的数组最大下标
                    i = nextIndex - 1;//127
                    advance = false;
                }
            }
    // check is finished
    // 索引超出范围 或者超出新数组的长度（ 旧数组的一个桶 i会被迁移到新数组的 i 位或 i+n 位)
            if (i < 0 || i >= n || i + n >= nextn) {
                int sc;
      // 扩容完成
                if (finishing) {
                    nextTable = null;
                    table = nextTab;
        // new capacity   n*2 - n/2  = 0.75n 避免浮点数运算
                    sizeCtl = (n << 1) - (n >>> 1);
                    return;
                }
      // 每个线程结束 sizectl-1
                if (U.compareAndSetInt(this, SIZECTL, sc = sizeCtl, sc - 1)) {
        // 不是最后一个线程直接退出
                    if ((sc - 2) != resizeStamp(n) << RESIZE_STAMP_SHIFT)
                        return;
                    finishing = advance = true;
                    i = n; // recheck before commit
                }
            }
    // bin is null 直接设置为forwardNode
            else if ((f = tabAt(tab, i)) == null)
                advance = casTabAt(tab, i, null, fwd);
    // 别的线程已经迁移了 
            else if ((fh = f.hash) == MOVED)
                advance = true; // already processed
            else {
      // 对桶加锁
                synchronized (f) {
                    if (tabAt(tab, i) == f) {
                        Node<K,V> ln, hn;
          // 是普通链表
                        if (fh >= 0) {
            // 判断新位置是否+n
                            int runBit = fh & n;
            // 寻找链表尾部连续不断的一段  不用复制 直接复用 减少node 的创建
                            Node<K,V> lastRun = f;
                            for (Node<K,V> p = f.next; p != null; p = p.next) {
                                int b = p.hash & n;
                                if (b != runBit) { // 一旦发现某个节点的去向和上一个不一样了
                                        runBit = b;    // 更新当前走势的方向
                                        lastRun = p;   // 重新记录“直通车”的起点
                                    }
                            }
                            if (runBit == 0) {  // 如果最后这一串都要去低位
                                ln = lastRun;   // 低位链表直接接上这整条尾巴
                                hn = null;      // 高位暂时是空的
                            }
                            else {              // 如果最后这一串都要去高位
                                hn = lastRun;   // 高位链表直接接上这整条尾巴
                                ln = null;      // 低位暂时是空的
                            }
            //剩下的节点（从桶头 f 到 lastRun 之前的节点）由于去向杂乱交错，就必须一个个重新复制（new）了
                            for (Node<K,V> p = f; p != lastRun; p = p.next) {
                                int ph = p.hash; K pk = p.key; V pv = p.val;
              // 用的头插法 顺序会颠倒 原本会有线程安全问题 但是这里加锁了 
                                if ((ph & n) == 0)
                                    ln = new Node<K,V>(ph, pk, pv, ln);
                                else
                                    hn = new Node<K,V>(ph, pk, pv, hn);
                            }
                            setTabAt(nextTab, i, ln);       // 1. 低位链表 ln 放入新数组的原位置 i
                            setTabAt(nextTab, i + n, hn);   // 2. 高位链表 hn 放入新数组的新位置 i + n
                            setTabAt(tab, i, fwd);          // 3. 把老数组的桶位替换为 fwd 封条（Hash为-1）
                            advance = true;                 // 4. 标志着当前桶处理完毕，让线程去领下一个桶
                        }
                        else if (f instanceof TreeBin) {
                            TreeBin<K,V> t = (TreeBin<K,V>)f;
                            TreeNode<K,V> lo = null, loTail = null;
                            TreeNode<K,V> hi = null, hiTail = null;
                            int lc = 0, hc = 0;
                            for (Node<K,V> e = t.first; e != null; e = e.next) {
                                int h = e.hash;
                                TreeNode<K,V> p = new TreeNode<K,V>
                                    (h, e.key, e.val, null, null);
                                if ((h & n) == 0) {
                                    if ((p.prev = loTail) == null)
                                        lo = p;
                                    else
                                        loTail.next = p;
                                    loTail = p;
                                    ++lc;
                                }
                                else {
                                    if ((p.prev = hiTail) == null)
                                        hi = p;
                                    else
                                        hiTail.next = p;
                                    hiTail = p;
                                    ++hc;
                                }
                            }
                            ln = (lc <= UNTREEIFY_THRESHOLD) ? untreeify(lo) :
                                (hc != 0) ? new TreeBin<K,V>(lo) : t;
                            hn = (hc <= UNTREEIFY_THRESHOLD) ? untreeify(hi) :
                                (lc != 0) ? new TreeBin<K,V>(hi) : t;
                            setTabAt(nextTab, i, ln);
                            setTabAt(nextTab, i + n, hn);
                            setTabAt(tab, i, fwd);
                            advance = true;
                        }
                        else if (f instanceof ReservationNode)
                            throw new IllegalStateException("Recursive update");
                    }
                }
            }
        }
    }
```
