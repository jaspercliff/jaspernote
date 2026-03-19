---
sidebar_position: 1
---
# 程序计数器

program counter register

当前线程执行的字节码的行号指示器，
分支、循环、跳转、异常处理、线程恢复都需要它的支持,每个线程都有一个独立的程序计数器

如果线程正在执行的是 Native 方法（本地方法），那么程序计数器的值是 Undefined（为空）。

    原因：Native 方法通常是 C/C++ 编写的，直接运行在操作系统硬件上，不受 JVM 字节码解释器管辖。此时的“进度控制”交给了操作系统的 CPU 指令寄存器

```txt
"main" #1 [35179] prio=5 os_prio=0 cpu=30.38ms elapsed=38.93s tid=0x00007facfc01bed0 nid=35179 waiting on condition  [0x00007fad035fe000]
java.lang.Thread.State: TIMED_WAITING (sleeping)
 at java.lang.Thread.sleep0(java.base@21.0.10/Native Method)
 at java.lang.Thread.sleep(java.base@21.0.10/Thread.java:509)
 at com.jasper.PCRegisterDemo.main(PCRegisterDemo.java:6)
```

sleep0 是一个 Native 方法,
此时 JVM 的程序计数器里没有存储任何指向字节码的偏移量，因为它不在执行字节码
