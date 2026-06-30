---
sidebar_position: 1
---
# parNew 

Serial 收集器的多线程版本。

它负责新生代（Young Generation）垃圾回收，使用的是复制算法（Copying），并且 GC 时会 Stop The World(STW)。 


ParNew 只负责：

* Eden
* Survivor0
* Survivor1

老年代它完全不管。


## 工作流程

假设：

Eden
A B C D E F G
S0
空
S1
空

对象全部先进入 Eden。

当 Eden 满了，就触发 Young GC（ParNew GC）。

--- 

### 第一步：暂停所有用户线程（STW）

虽然叫并行收集器，

但是：

Java线程
↓
全部暂停(STW)
↓
GC线程开始工作

这里和 Serial 一样。

区别只是：

Serial：

GC线程

ParNew：

GC线程1
GC线程2
GC线程3
GC线程4

多个线程一起扫描 Eden。

--- 

### 第二步：复制存活对象

例如

Eden
A √
B ×
C ×
D √
E ×
F √
G ×

只有

A
D
F

活着。

那么：

复制
Eden
A D F
↓
S0
A D F

然后：

整个 Eden 清空

所以复制算法速度非常快。

⸻

### 第三步：下一次 Young GC

假设：

Eden
H I J K
S0
A D F

再次 Young GC。

假设：

A 活
D 死
F 活
H 活
I 死
J 活
K 死

复制到另一块 Survivor：

S1
A
F
H
J

S0 就空了。

以后：

S0
↓
S1
↓
S0
↓
S1

一直来回切换。

因为 CMS 只负责老年代。

新生代一般就是：

ParNew
↓
Eden
S0
S1

⸻

晋升老年代

每次复制：

对象年龄 +1

例如：

第一次GC
age=1
↓
第二次GC
age=2
↓
...
↓
age=15

达到：

-XX:MaxTenuringThreshold

默认 15。

就进入老年代。

当然：

如果 Survivor 放不下：

直接进入老年代

这就是所谓：

空间分配担保（Promotion）

