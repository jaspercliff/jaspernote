# -Xlog 

 JDK 9 引入的统一日志（Unified JVM Logging） 参数，用于替代以前各种零散的日志参数
eg:
```text 
-XX:+PrintGC
-XX:+PrintGCDetails
```

## Selectors（选择器：选什么日志）
由 标签 (Tag) 和 日志级别 (Level) 组成，格式为 tag1+tag2+...=level。

常用 Tags：gc（垃圾回收）、class+load（类加载）、safepoint（安全点）、os（操作系统）。

常用 Levels：off, trace, debug, info, warning, error（默认是 info）。

通配符：gc* 表示匹配所有以 gc 开头的标签组合（如 gc,phases, gc,metaspace 等）。

## Output（输出到哪）
stdout：标准输出（控制台，默认）。

stderr：标准错误输出。

file=`<filename>`：输出到指定的日志文件（生产环境推荐）。

## Decorators（日志修饰符：长什么样）
决定每行日志开头附带哪些元数据。默认包含：uptime（启动时间）、level（级别）、tags（标签）。

常用修饰符：time（当前绝对时间）、pid（进程ID）、tid（线程ID）。

## demo 

```text 
-XX:+PrintGC	-Xlog:gc
-XX:+PrintGCDetails	-Xlog:gc*
```
