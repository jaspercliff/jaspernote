# jstack

专门用于生成虚拟机当前时刻的 线程快照（Thread Dump）

## 排查死锁或者cpu100%

1. top 查看占用用率最高的进程的 pid
2. `jstack pid  > dump.txt`
3. top -h -p pid 查看占用用率最高的线程的 tid(这里需要10进制转16进制去jstack文件搜索 jdk17以后优化不需要了)
4. nvim dump.txt 搜索 tid 的十六进制值，查看线程的调用栈 找到对应的线程

## arths

1. as thread -n 3 查看占用用率最高的3个线程
2. thread pid
