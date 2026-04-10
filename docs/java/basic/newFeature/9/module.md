# 模块化结构 

在 Java 9 之前，代码的组织单位是 Package（包）。但包系统有一个缺陷：它无法控制包内代码的对外可见性（只要是 public 就能被所有人访问），且项目依赖关系模糊。

模块化 (Modularity) 引入了一个更高级别的结构：Module（模块）。一个模块由一组相关的包、资源文件以及一个描述文件 module-info.java 组成。
核心特性：

1. 强封装性 (Strong Encapsulation)： 模块可以指定哪些包是对外公开的，哪些是隐藏的。即使是 public 类，如果所在的包没有被 exports，外部也无法访问。
2. 可靠的依赖关系 (Reliable Configuration)： 模块必须在 module-info.java 中明确声明 requires 哪些其他模块。如果在启动时缺少依赖，JVM 会直接报错，而不是运行到一半抛出 NoClassDefFoundError。
3. 瘦身 JDK： JDK 自身也被拆分成了几十个模块（如 java.base, java.sql）。你可以使用 jlink 工具只打包运行程序所需的模块，从而大幅减小运行时环境的体积

每个模块的根目录下都有一个 module-info.java 文件，它的基本语法如下：

```java
module com.jasper.hello {
    requires other.module;    // 依赖其他模块
    exports com.my.package;   // 将指定的包暴露给外部使用
}

```

在 API 文档（Javadoc）的顶部，现在都有一个 "MODULES" 标签 点进去可以看到导出那些

- [jdk](https://docs.oracle.com/en/java/javase/21/docs/api/index.html)


在 Java 9 之前，所有的标准类库（如 Swing、XML、SQL、IO 等）都堆在一个巨大的 rt.jar 文件中。无论你的程序多小，都必须背负这几十兆的“包袱”
现在的 JDK 不再是一个整体，而是由 几十个独立的模块 组成的。

- java.base： 这是最核心的模块（所有模块的基石），包含了 java.lang, java.util, java.io 等基础包。它是自动包含的，不需要显式 requires。
- java.sql： 处理数据库连接（JDBC）。
- java.xml： 处理 XML 解析。

只要你把任何 .jar 文件丢进jre/lib/ext，JVM 启动时就会自动把它们加载到内存中，甚至不需要你在 Classpath 里配置
从 Java 9 开始，jre/lib/ext 目录被彻底废弃


##  为什么 Spring Boot 不需要写 requires java.sql？

在 Java 模块化设计中，为了兼容几十年的老代码，JVM 留了一个“后门”：无名模块 (Unnamed Module)。

- 传统模式（Classpath）： 如果你像往常一样把所有的 JAR 包往项目里一丢，且不创建 module-info.java，JVM 就会把所有内容都塞进“无名模块”。
- 无名模块的特权： 它默认可以访问 JDK 中所有已有的模块（包括 java.sql、java.xml 等），且不需要声明。
- 现状：大多数 Spring Boot 开发者为了省事，依然沿用这种传统方式。所以你不需要写 requires，直接在 pom.xml 里引入 Starter 依赖，代码就能跑通

## demo 

- [github](https://github.com/jaspercliff/learnJava/tree/aba3a716ced2bb4f163aceec7a43fa9dacb77aa3/basic/newFeature/9/moduleDemo)


### producer

```text 
├──  com
│   └──  jasper
│       ├──  api
│       │   └──  OpenUtil.java
│       └──  internel
│           └──  CloseUtil.java
└──  module-info.java
```
```java 
module producer {
    exports com.jasper.api;
}
package com.jasper.api;

public class OpenUtil {
    public static void print(){
        System.out.println("open");
    }
}
package com.jasper.internel;

public class CloseUtil {
    public static void print(){
        System.out.println("close");
    }
}
```

### consumer 

```text 
├──  com
│   └──  jasper
│       └──  Main.java
└──  module-info.java
```
```java
module consumer {
    requires producer;
}
package com.jasper;

import com.jasper.api.OpenUtil;
//import com.jasper.internel.CloseUtil;
// java: package com.jasper.internel is not visible
//  (package com.jasper.internel is declared in module producer, which does not export it)

public class Main {
    public static void main(String[] args) {
        OpenUtil.print();
//        CloseUtil.print();
    }
}
```


## jlink and jdeps 

```java
# 1. 进入项目目录
cd /home/jasper/code/java/person/learnJava/basic/newFeature/9/moduleDemo
# 2. 创建输出目录
mkdir -p mods output

# 3. 编译 producer 模块
#-d mods/producer 指定编译后的 class 文件输出目录
javac  -d mods/producer \
  producer/src/main/java/module-info.java \
  producer/src/main/java/com/jasper/api/OpenUtil.java \
  producer/src/main/java/com/jasper/internel/CloseUtil.java

# 4. 编译 consumer 模块(依赖 producer)
#--module-path mods
#指定模块搜索路径
#consumer 依赖 producer,需要在这里找到已编译的 producer 模块
javac  --module-path mods -d mods/consumer \
  consumer/src/main/java/module-info.java \
  consumer/src/main/java/com/jasper/Main.java

rm -rf output/myapp

# 5. 使用 jlink 创建自定义运行时镜像
#一个是你的业务模块（mods），一个是 JDK 自己的模块库（jmods）
#jlink 会从 consumer 开始，把 producer 及其依赖的所有 JDK 模块
#（如 java.base）全部找出来。没被依赖的（如 java.sql, java.desktop）全部丢弃
jlink --module-path mods:$JAVA_HOME/jmods \
  --add-modules consumer \
  --launcher run=consumer/com.jasper.Main \
  --compress zip-9 \
  --no-header-files \
  --no-man-pages \
  --strip-debug \
  --output output/myapp

# 分析编译好的 consumer 模块
jdeps --module-path mods -m consumer

# 6. 运行应用
./output/myapp/bin/run

cd /home/jasper/code/java/person/learnJava/basic/newFeature/9/moduleDemo/output

du -sh myapp



#--strip-debug：
#JDK 的类文件里包含了大量的本地变量表、行号表等调试信息。对于运行环境来说，这些是“废话”。
# 删掉它们后，.class 文件的体积会显著缩小。
#当你用 javac 编译代码时，默认会把很多方便程序员调试的信息塞进 .class 文件里 jstack 查看
#
#--compress (深度压缩)：
#它把所有模块重新打包，去除了冗余的数据块。
#
#--no-header-files & --no-man-pages：
#虽然这两个减得不多，但它们去掉了所有 C 语言相关的头文件和帮助文档，让镜像变得纯粹——只为了跑 Java 而存在
# 没有使用jni
```
