# vm参数

vm参数：命令行选项来控制jvm行为
-Xms size: 设置JVM启动时的初始堆内存大小。  minimum size
-Xmx size: 设置JVM的最大堆内存大小。  maximum
-Xmn size: 设置新生代的大小。  new generation  通常为堆内存的1/3 1/4

```bash
java -Xms512m -jar myapp.jar
```

JVM 启动时就会分配 512MB 的堆内存。如果应用程序在运行过程中需要更多的内存，JVM 会根据 -Xmx 参数设置的最大堆内存大小动态扩展堆内存。

如果初始堆内存设置得足够大，那么 JVM 可以避免频繁地扩展堆内存，从而减少启动时间和运行时的性能开销
如果初始堆内存太小，JVM 频繁地增加堆内存可能会导致内存碎片，影响性能

## -XX 参数详解

在 JVM 启动参数中：
• -X 开头的参数是非标准参数（JVM 可能不支持所有的 -X 参数）。
• -XX 开头的参数是 高级（实验性）参数，用于调优 GC、JIT、堆大小 等功能。

⸻

1. -XX 参数的常见分类

-XX 参数一般分为三类：

1. 布尔型参数（-XX:+option / -XX:-option）
• + 代表启用该选项，- 代表禁用该选项。
• 示例：

-XX:+UseG1GC   # 启用 G1 GC
-XX:-UseGCOverheadLimit  # 关闭 GC 开销限制

 2.整型/字符串参数（-XX:）
 •直接指定一个数值或字符串参数。
 •示例：

-XX:MaxHeapSize=512M  # 最大堆大小 512MB
-XX:MetaspaceSize=128M  # Metaspace 大小 128MB
-XX:SurvivorRatio=8  # Eden:Survivor = 8:1

 1. 诊断参数（-XX:+UnlockDiagnosticVMOptions）
 • 一些调试或实验性功能默认被锁定，必须先解锁。
 • 示例：

-XX:+UnlockExperimentalVMOptions -XX:+UseZGC  # 启用实验性的 ZGC
-XX:+UnlockDiagnosticVMOptions -XX:+PrintSafepointStatistics  # 打印 Safepoint 统计信息

⸻

1. 常见的 -XX 参数

（1）GC 相关参数

参数 说明
-XX:+UseSerialGC 使用 Serial GC（单线程）
-XX:+UseParallelGC 使用 Parallel GC（吞吐量优先）
-XX:+UseG1GC 使用 G1 GC（默认 GC）
-XX:+UseZGC 启用 ZGC（低延迟 GC，需要 -XX:+UnlockExperimentalVMOptions）
-XX:+UseShenandoahGC 启用 Shenandoah GC（低延迟 GC）
-XX:MaxGCPauseMillis=200 目标 GC 停顿时间（单位：ms）
-XX:GCTimeRatio=4 GC 时间占比（用于 Parallel GC）

（2）堆内存参数

参数 说明
-XX:InitialHeapSize=256M 初始堆大小
-XX:MaxHeapSize=1024M 最大堆大小
-XX:NewRatio=2 老年代:新生代 = 2:1
-XX:SurvivorRatio=8 Eden:Survivor = 8:1
-XX:+UseLargePages 启用大页内存

（3）GC 日志相关参数

参数 说明
-XX:+PrintGC 打印 GC 信息
-XX:+PrintGCDetails 打印详细 GC 信息
-XX:+PrintGCTimeStamps 打印 GC 发生的时间戳
-XX:+PrintGCApplicationStoppedTime 打印 GC 导致应用程序暂停的时间
-XX:+PrintReferenceGC 监测软引用/弱引用的回收情况

（4）元空间（Metaspace）参数

参数 说明
-XX:MetaspaceSize=128M 初始 Metaspace 大小
-XX:MaxMetaspaceSize=512M 最大 Metaspace 大小
-XX:+UseCompressedOops 开启指针压缩（默认启用，32-bit 运行 64-bit JVM 时）

⸻

1. 如何查看 -XX 参数

你可以用以下命令 查看 JVM 的默认 -XX 参数：

java -XX:+PrintFlagsFinal -version

这会列出所有 JVM 运行时参数，并显示它们的默认值。

⸻

1. 结论
   • -XX 参数用于 高级 JVM 调优，可以控制 GC、堆、JIT 等行为。
   • -XX:+ 启用某个功能，-XX:- 禁用某个功能。
   • -XX:参数=值 设置具体的 JVM 选项，如 -XX:MaxHeapSize=512M。

🚀 想调优 GC？试试 -XX:+UseG1GC -XX:MaxGCPauseMillis=200！

## 遇到的问题

如果类路径太长，或者有许多VM参数，程序就无法启动。原因是大多数操作系统都有命令行长度限制。
idea shorten command line 可以缩短类路径

## idea

- none 不会缩短
- JAR manifest：idea 通过临时的classpath.jar传递长的类路径。原始类路径在MANIFEST.MF中定义为classpath.jar中的类路径属性。
- classpath file：idea 将一个长类路径写入文本文件中。

## manifest

具体步骤
创建临时的 classpath.jar 文件：
IDEA 会创建一个临时的 JAR 文件，通常命名为 classpath.jar。
这个 classpath.jar 文件本身不包含任何实际的类文件或资源文件，但它包含了一个特殊的 MANIFEST.MF 文件。
在 MANIFEST.MF 中定义类路径：
在 classpath.jar 的 MANIFEST.MF 文件中，IDEA 会定义一个特殊的属性，通常是 Class-Path 属性。
Class-Path 属性列出了所有实际的类文件和依赖库的路径。
运行 Java 应用程序：
当你运行 Java 应用程序时，IDEA 会使用 -jar 选项来指定这个 classpath.jar 文件。
JVM 会读取 classpath.jar 中的 MANIFEST.MF 文件，并根据 Class-Path 属性加载所有的类文件和依赖库。
通俗解释
简单来说，IDEA 通过创建一个临时的 JAR 文件（classpath.jar），并在其中的 MANIFEST.MF 文件里记录所有实际的类路径。这样，即使类路径非常长，
也不会超过操作系统的限制，因为 JVM 只需要处理一个较短的路径（即 classpath.jar 的路径）。

示例
假设你的项目有以下依赖库：

深色版本
C:\Users\YourName\Documents\Projects\MyBigProject\lib\dependency1.jar
C:\Users\YourName\Documents\Projects\MyBigProject\lib\dependency2.jar
C:\Users\YourName\Documents\Projects\MyBigProject\lib\dependency3.jar
IDEA 会创建一个 classpath.jar，其 MANIFEST.MF 文件内容可能如下：

```text
Manifest-Version: 1.0
Class-Path: lib/dependency1.jar lib/dependency2.jar lib/dependency3.jar
```

然后，你运行 Java 应用程序时，IDEA 会执行类似这样的命令：

```bash
java -jar path/to/classpath.jar com.example.myapp.Main
```

这样，JVM 就会根据 classpath.jar 中的 MANIFEST.MF 文件加载所有的依赖库，而不会受到类路径长度的限制。
