# mat 

## oom 自动生成 

```text 
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=/tmp
```
发生oom会自动生成hprof文件


## jcmd 生成没有oom的heap dump

### 生成heap dump

```zsh 
jcmd <pid> GC.heap_dump heap.hprof 
```

这个默认生成文件是在进程目录下，如果要指定则

```zsh 
jcmd 65995 GC.heap_dump $(pwd)/heap65995.hprof
```
