# ps

`ps` 命令是 Linux 和 Unix 系统中用于查看当前系统进程状态的命令（process status 的缩写）。
它可以列出当前系统中的活动进程，以及进程的 PID（进程ID）、TTY（终端）、状态、CPU 占用、内存占用等信息。

## param

参数,作用,示例
-a,显示所有终端上的进程（不包括会话领导者）。,ps -a
-x,显示没有控制终端的进程（通常是系统守护进程）。,ps -ax
-e,显示所有进程（等同于 -A）。,ps -e
-p PID,按进程 ID  选择进程ps -fp 1234
-u user,按有效用户 ID 或名称选择进程。,ps -fu root
-C cmd,按命令名称选择进程。,ps -C httpd
-f,完整格式 (Full format),"显示 UID, PID, PPID, C, STIME, TTY, TIME, CMD 等关键字段。"
-l,长列表格式 (Long format),显示更多技术信息，例如优先级 (PRI)、调度类 (CLS) 等。

## 常用参数组合

aux 和-ef只是俩种不同的风格

### 1. `ps`（默认）

```bash
ps
```

只显示当前终端下当前用户的活动进程（信息很有限）。

### 2. `ps -e` 或 `ps -A`

显示所有进程。

```bash
ps -e
```

### 3. `ps -ef`（全格式显示所有进程，最常用）

```bash
ps -ef
```

字段解释：

- UID：进程所有者
- PID：进程ID
- PPID：父进程ID
- C：CPU使用率
- STIME：启动时间
- TTY：终端
- TIME：使用CPU的时间
- CMD：执行的命令

---

### 4. `ps aux`（另一种全格式显示）

```bash
ps aux
```

字段解释：

- USER：用户
- PID：进程ID
- %CPU：CPU占比
- %MEM：内存占比
- VSZ：虚拟内存使用
- RSS：常驻内存集大小
- STAT：进程状态
- START：启动时间
- TIME：运行时间
- COMMAND：命令

---

#### 5. 配合 `grep` 使用（查找进程）

```bash
ps -ef | grep java
```

查找所有包含 “java” 的进程。

---

#### 🔍 示例

```bash
ps -ef | grep nginx
```

结果类似：

```
root     1234     1  0 09:00 ?        00:00:00 nginx: master process
www-data 1235  1234  0 09:00 ?        00:00:00 nginx: worker process
```

### 区别

- 如果你更关心资源占用（如内存、CPU）：推荐 ps aux
- 如果你更关心进程关系（父子进程、启动时间等）：推荐 ps -ef
- 如果要写脚本用于 Linux，建议统一使用 ps -ef
- 如果你在 macOS 或 BSD 系统上工作，则 ps aux 更可靠

## ps aux

jasper           21177   0.0  0.1 416857296  27168 s001  SN   Mon04PM   7:27.87
/Library/Java/jdk1.8.0_441.jdk/Contents/Home/bin/java -server -Xms4g -Xmx4g -Xmn2g
-XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=320m -XX:+UseConcMarkSweepGC -XX:+UseCMSCompactAtFullCollection
-XX:CMSInitiatingOccupancyFraction=70 -XX:+CMSParallelRemarkEnabled -XX:SoftRefLRUPolicyMSPerMB=0
-XX:+CMSClassUnloadingEnabled -XX:SurvivorRatio=8 -XX:-UseParNewGC
-verbose:gc -Xloggc:/Volumes/RAMDisk/rmq_srv_gc_%p_%t.log -XX:+PrintGCDetails
-XX:+PrintGCDateStamps -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=30m
-XX:-OmitStackTraceInFastThrow -XX:-UseLargePages
-cp .:/opt/services/rocketmq-all-5.3.2-bin-release/bin/../conf:/opt/services/rocketmq-all-5.3.2-bin-release/bin/../lib/*:
-Drmq.logback.configurationFile=/opt/services/conf/rmq.namesrv.logback.xml org.apache.rocketmq.namesrv.NamesrvStartup

### 🔹 基本字段说明

```
jasper           21177   0.0  0.1 416857296  27168 s001  SN   Mon04PM   7:27.87 
```

| 字段          | 含义                                     |
|-------------|----------------------------------------|
| `jasper`    | 用户名，运行该进程的用户                           |
| `21177`     | 进程 ID（PID）                             |
| `0.0`       | CPU 占用率（百分比）                           |
| `0.1`       | 内存占用率（百分比）                             |
| `416857296` | 虚拟内存大小(VSZ  virtual set size)（单位为 KB）  |
| `27168`     | 常驻内存（RSS     resident set size），单位为 KB |
| `s001`      | 终端号（TTY），s001 表示当前 shell 会话编号          |
| `SN`        | 进程状态，`S` 表示休眠，`N` 表示低优先级               |
| `Mon04PM`   | 启动时间                                   |
| `7:27.87`   | 累计 CPU 时间（7 分钟 27 秒）                   |

### vsz

虚拟内存（Virtual Memory） 是一种计算机内存管理技术，它使得应用程序认为它们拥有连续的内存空间，而实际上这些内存空间可能是分散在计算机的物理内存和硬盘（如交换分区）上的
虚拟内存是把硬盘空间假装为内存来用的技术

### rss

常驻内存（RSS, Resident Set Size） 是指 进程在物理内存中实际占用的空间。与虚拟内存（VSZ）不同，常驻内存只包括当前在物理内存中的部分，不包括被交换到磁盘上的内存或尚未分配的内存空间

#### 举例

假设你的计算机有 4 GB 的物理内存，而你运行的程序请求 6 GB 的内存。由于物理内存不足，操作系统会使用虚拟内存技术将程序的内存请求映射到硬盘上的交换区，这样程序可以继续运行，即使系统没有足够的物理内存来容纳所有的数据。
• 物理内存（RAM）： 4 GB
• 虚拟内存： 6 GB（包含了 2 GB 来自硬盘的交换空间）

如果程序频繁访问硬盘中的数据，这会导致性能下降，因为磁盘 I/O 的速度远远低于内存的速度

## tty

pts：伪终端（Pseudo Terminal），即虚拟终端，通常由终端仿真器（如Xterm、gnome-terminal）或远程登录（如SSH）产生的终端。pts/0，pts/1等是常见的虚拟终端标识

tty*本地终端、图形界面的终端会话
pts* ssh会话 通过程序模拟的终端会话

## 进程状态

- [进程状态](进程状态.md)
