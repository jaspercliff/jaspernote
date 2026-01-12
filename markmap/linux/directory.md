---
title: directory
markmap:
  colorFreezeLevel: 3
---


## opt

- 存放第三方软件的位置，一个软件的所有文件（二进制文件、库、图标、配置）
都存放在 /opt/软件名 这样一个独立的文件夹里

## usr

## proc

### 虚拟文件系统（Virtual File System),不占用磁盘空间，里面的“文件”直接由 Linux 内核在内存中生成的

### 实时了解 CPU、内存、进程等系统信息

数字文件夹当前正在运行的进程的pid

### 调整内核的运行参数，而无需重启系统 sudo sh -c 'echo 1 > /proc/sys/kernel/perf_event_paranoid'

### sys

#### kernel

##### perf_event_paranoid

- 决定了普通用户（非 root）能用 perf 这种调优工具看到多少内核信息
- 2：极度偏执。禁止普通用户进行内核剖析，甚至无法查看 CPU 事件
- 1：适度限制。允许普通用户监控用户空间程序，但不允许看内核空间。
- 0：相对信任。允许普通用户查看内核样本。
- -1：完全信任。允许任何用户获取系统的几乎所有性能数据。

#### net

- 网络协议栈
