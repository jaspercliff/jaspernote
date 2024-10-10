# vm参数

vm参数：命令行选项来控制jvm行为
-Xms<size>: 设置JVM启动时的初始堆内存大小。  minimum size
-Xmx<size>: 设置JVM的最大堆内存大小。  maximum


java -Xms512m -jar myapp.jar
JVM 启动时就会分配 512MB 的堆内存。如果应用程序在运行过程中需要更多的内存，JVM 会根据 -Xmx 参数设置的最大堆内存大小动态扩展堆内存。

如果初始堆内存设置得足够大，那么 JVM 可以避免频繁地扩展堆内存，从而减少启动时间和运行时的性能开销
如果初始堆内存太小，JVM 频繁地增加堆内存可能会导致内存碎片，影响性能


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
简单来说，IDEA 通过创建一个临时的 JAR 文件（classpath.jar），并在其中的 MANIFEST.MF 文件里记录所有实际的类路径。这样，即使类路径非常长，也不会超过操作系统的限制，因为 JVM 只需要处理一个较短的路径（即 classpath.jar 的路径）。

示例
假设你的项目有以下依赖库：

深色版本
C:\Users\YourName\Documents\Projects\MyBigProject\lib\dependency1.jar
C:\Users\YourName\Documents\Projects\MyBigProject\lib\dependency2.jar
C:\Users\YourName\Documents\Projects\MyBigProject\lib\dependency3.jar
IDEA 会创建一个 classpath.jar，其 MANIFEST.MF 文件内容可能如下：

深色版本
Manifest-Version: 1.0
Class-Path: lib/dependency1.jar lib/dependency2.jar lib/dependency3.jar
然后，你运行 Java 应用程序时，IDEA 会执行类似这样的命令：

cmd
深色版本
java -jar path/to/classpath.jar com.example.myapp.Main
这样，JVM 就会根据 classpath.jar 中的 MANIFEST.MF 文件加载所有的依赖库，而不会受到类路径长度的限制。