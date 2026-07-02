# class loader 

核心类库（RT.jar）由 BootstrapClassLoader 加载 → 扩展库由 ExtClassLoader 加载 → 你的代码由 AppClassLoader 加载。


## 双亲委派模型

1. 向上检查：当 App ClassLoader 收到加载请求，它先看缓存里有没有，没有就转交给父类 Ext ClassLoader。
2. 继续向上：Ext ClassLoader 同样不直接加载，而是转交给 Bootstrap ClassLoader。
3. 顶层查找：Bootstrap ClassLoader 尝试在自己的搜索范围（核心库）里找。如果找到了，加载结束。
4. 向下派发：如果顶层没找到，它会告诉子类“我没找到，你自己试试”。子类此时才会尝试在自己的路径里搜索加载。

jdk9+:

虽然还是向上委派，但 JDK 9 后的加载逻辑加入了一个模块判断步骤：

1. 检查模块归属：当类加载器接到加载请求时，它会先判断这个类是否属于某个已命名的模块。
2. 直接委派：如果该类属于某个模块，且该模块定义在某个类加载器中，那么 JVM 会直接把请求交给那个特定的加载器，而不再是死板地一层层往上传。
3. 传统模式：如果找不到模块归属，才会退回到传统的双亲委派流程（App → Platform → Bootstrap)

JVM 会先根据类所属模块确定其对应的 ClassLoader，
对于 java.base 中的类，会直接选择 Bootstrap ClassLoader，
而不是先经过应用类加载器再逐级委派。

JDK 8 之前的架构        JDK 9+ 模块化架构	    加载职责的变化Bootstrap ClassLoader	Bootstrap ClassLoader	现在只加载极少数核心模块（如 java.base）
Extension ClassLoader	Platform ClassLoader	不再加载 jre/lib/ext，而是加载标准库扩展模块java.sql java.xml
AppClassLoader       	AppClassLoader	        加载模块路径（ModulePath）和类路径（ClassPath）下的应用类

## 双亲委派的意义

收到加载请求时，ClassLoader 先将请求**向上委派给父加载器**，直到 Bootstrap ClassLoader；只有父加载器表示无法处理，才由自身加载。这样保证了核心类（`java.lang.String`）不会被用户代码篡改，避免类的重复加载。

**打破双亲委派的场景：** Tomcat（不同 Web App 需要隔离）、OSGi（模块化热部署）、JDBC SPI（父加载器需要反向委托子加载器）、Java Agent 等。

点击图中任意节点可继续深入探讨某个阶段。

## 破坏双亲委派模型 


按照 Java 的双亲委派模型，类的加载是自下而上的：

    启动类加载器 (Bootstrap ClassLoader) 加载 JDK 核心类（如 java.sql.Driver 接口）。

    应用类加载器 (App ClassLoader) 加载你项目里的三方 Jar（如 mysql-connector.jar 中的实现类）。

矛盾点出现了：
DriverManager（在核心库里，由启动类加载器加载）需要去调用 MySQL Driver（在三方库里，由应用类加载器加载）。
根据规则，上层类加载器无法看见下层类加载器加载的类。

解决方案：
Java 引入了 线程上下文类加载器 (TCCL)。
通过 Thread.currentThread().getContextClassLoader()，原本处于高层的核心库代码，可以“向下”借用当前线程（通常是应用线程）的类加载器，从而加载到位于 classpath 下的实现类

```java
    @CallerSensitive
    public static <S> ServiceLoader<S> load(Class<S> service) {
        ClassLoader cl = Thread.currentThread().getContextClassLoader();
        return new ServiceLoader<S>(Reflection.getCallerClass(), service, cl);
    }
```

## SharedImageReader

SharedImageReader 是整个 JVM 实现“直接委派”和“高效加载核心模块类”的底层“指路人”和“运输车”。

1. 它是怎么帮 JVM 实现“直接委派”的？（指路人）
当 JVM 启动时，它需要知道哪一个类属于哪一个模块，进而知道该直接委派给哪个类加载器。

建立索引：SharedImageReader 在 JVM 启动时，会去读取 JDK_HOME/lib/modules 文件。

绘制地图：它会把这个二进制镜像文件里的所有模块信息（比如 java.base 包含哪些类，java.sql 包含哪些类）在内存中梳理成一棵树或者一个高效的哈希表。

当 JVM 收到类加载请求时，正是通过 SharedImageReader 建立的这套内存索引，才能实现“一眼看出该类属于哪个模块，并直接定向投递给特定加载器”。

2. 当委派定位后，它负责把类读出来（运输车）
当类加载器（比如 Platform ClassLoader）确定自己要加载 java.sql.Connection 时，它自己其实不知道怎么去解析那个神秘的 modules 二进制大文件。

这时候，它就会调用 SharedImageReader：

定位：加载器说：“我要 java.sql.Connection，帮我拿一下。”

读取：SharedImageReader 利用底层的 java.nio.channels.FileChannel 和内存映射技术（Memory-Mapped IO），在不消耗大量 CPU 的情况下，精准地从 modules 文件里把这个类的 .class 二进制字节流挖出来。

交付：把字节流交给类加载器，类加载器再调用 defineClass() 把它真正变成堆里的 java.lang.Class 对象。
