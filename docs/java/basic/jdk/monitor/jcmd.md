# jcmd

代替jps jmap jstack

- jcmd 查看当前有哪些java进程
- `jcmd 121144 Thread.print > test.txt  =  jstack pid  > dump.txt`

- `jcmd <PID> VM.native_memory summary`

Total: 进程总共向系统申请了多少内存（Reserved）以及系统实际分配了多少物理内存（Committed）。

Java Heap: 堆内存的实际占用。

Class: 方法区/元空间的占用（类元数据）。

Thread: 所有线程栈占用的内存（每个线程默认 1MB）。

Code: JIT 编译器缓存编译后的机器码占用的空间。

Internal: 直接内存（Direct Memory）。

GC: 垃圾回收器本身运行所需的内存（如 G1 的 Remembered Sets）。

## 生成heap dump

```zsh 
jcmd <pid> GC.heap_dump heap.hprof 
```

这个默认生成文件是在进程目录下，如果要指定则

```zsh 
jcmd 65995 GC.heap_dump $(pwd)/heap65995.hprof
```
