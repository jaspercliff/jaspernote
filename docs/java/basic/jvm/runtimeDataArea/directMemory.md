# 直接内存

直接内存”（Direct Memory）是一个非常特殊的存在。它不属于 JVM 规范中定义的运行时数据区（即不属于堆、栈或方法区），但它却被 Java 程序频繁使用，且与 JVM 的性能息息相关。

简单来说，直接内存就是 JVM 之外的、操作系统管理的本地内存（Native Memory）。

1. 为什么需要直接内存？（核心痛点）

在传统的 Java I/O 中，读取一个文件的数据流向是：

    系统内存（内核缓冲区）

    Java 堆内存（用户缓冲区）

这种“二次拷贝”会消耗 CPU 和内存带宽。

直接内存的引入（通过 NIO 的 DirectByteBuffer）实现了：

    零拷贝（Zero-copy）：Java 申请一块直接指向本地系统的内存，磁盘/网络数据直接写入这块内存，Java 代码直接读取，减少了在内核态和用户态之间的数据复制。

- [直接内存](/docs/java/basic/foundation/io/nio.md##直接内存)

## observation

arths memory
