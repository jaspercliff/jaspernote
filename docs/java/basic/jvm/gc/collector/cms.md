---
sidebar_position: 2
---
# cms 

MS（Concurrent Mark Sweep）是 HotSpot 中第一款真正意义上的并发垃圾回收器，它的目标不是追求最高吞吐量，而是尽可能缩短 Stop The World（STW）停顿时间。它主要负责老年代的回收，采用的是标记-清除（Mark-Sweep）算法。 

不过需要注意的是：

* JDK 9 开始，CMS 被标记为废弃（Deprecated）
* JDK 14 开始，CMS 已经被移除，现在基本由 G1、ZGC、Shenandoah 替代。 

在 CMS 之前，老年代一般使用 Serial Old 或 Parallel Old。

假设一次 Full GC：

GC线程：
=============================
用户线程：
-----------------------------（一直暂停）

整个 GC 过程中，程序完全不能运行。

CMS 的思想就是：

能不能只有少数几个阶段暂停，其余时间 GC 和用户线程一起工作？

所以 CMS 最大特点就是：

大部分 GC 时间都是并发执行。

--- 

CMS 的四个核心阶段

1. Initial Mark（初始标记）      STW
2. Concurrent Mark（并发标记）  并发
3. Remark（重新标记）          STW
4. Concurrent Sweep（并发清除） 并发

--- 


## 第一阶段：Initial Mark（初始标记）

这个阶段会 STW。

但是非常快。

它只做一件事：

标记 GC Roots 直接引用的对象。

例如：

GC Root -> A-> B ->C

这里只标记：

A

不会继续往下面扫描。

所以时间非常短。

--- 

## 第二阶段：Concurrent Mark（并发标记）

这是 CMS 最耗时的一步。

但是：

不会 STW。

GC 线程开始做完整的可达性分析。

GC Root -> A-> B ->C

A B C 全部都会被标记。

与此同时：

GC线程：
正在遍历

用户线程：
继续处理请求
继续创建对象
继续删除对象

所以用户几乎感觉不到停顿。

--- 

## 第三阶段：Remark（重新标记）


在第二阶段用户线程一直在运行。

例如：

刚开始：

A -> B

GC 标记到这里。

突然用户线程：

A -> C

或者：

A 不再引用 B

对象关系发生变化。

如果不修正：

GC 的标记就错了。

所以需要：

重新标记（Remark）

它负责修正：

并发标记期间因为用户线程修改对象引用导致的标记错误。 


--- 

## 第四阶段：Concurrent Sweep（并发清除）

这里开始真正删除垃圾。

CMS 使用：

Mark-Sweep（标记-清除）

会有内存碎片。

--- 

## Concurrent Mode Failure

这是 CMS 最经典的问题。

例如：

CMS 正在：

Concurrent Sweep

用户线程：

不停创建对象

结果：

老年代已经满了。

CMS 还没清理完。

怎么办？

CMS 只能：

退化。

启动：

Serial Old

进行一次：

Full GC

整个 JVM：

STW

暂停很长时间。

这个就是：

Concurrent Mode Failure。 

--- 

## 浮动垃圾（Floating Garbage）

也是 CMS 面试高频。

例如：

并发标记开始：

A
B
C

GC：

已经完成标记

这时候：

用户线程：

A = null

A 突然变成垃圾。

但是：

CMS：

已经完成标记了。

不会重新扫描。

于是：

这块垃圾：

不会本次回收

只能：

下一次 CMS 再处理。

这种垃圾叫：

Floating Garbage（浮动垃圾）。 

--- 

CMS 优缺点总结

优点

* 停顿时间短
* 大部分阶段与用户线程并发
* 适合 Web 服务、低延迟系统

--- 

缺点

* 使用标记-清除，会产生内存碎片
* 会产生浮动垃圾
* 占用 CPU（GC 和业务线程同时运行）
* 容易出现 Concurrent Mode Failure
* 已被 G1 等新收集器取代 
