--- 
sidebar_position: 0
---
# 对象是否存活

## 引用计数法
引用计数法 (Reference Counting): 给对象添加一个计数器。被引用时 +1，引用失效时 -1。

缺点： 无法解决循环引用（A 引用 B，B 引用 A，但除此之外没人用它们）。

导致内存泄漏 


## 可达性分析算法

可达性分析算法 (Reachability Analysis): 这是主流 JVM 使用的方法。从一系列称为 "GC Roots" 的根对象开始向下搜索。如果一个对象到 GC Roots 没有任何引用链相连，则证明此对象不可用。

GC Roots 包括： 虚拟机栈中引用的对象、方法区中类静态属性引用的对象、本地方法栈引用的对象等

在 JVM 的可达性分析算法中，**GC Roots** 是这一组必须活跃的引用。它们就像是内存世界的“锚点”，只有从这些锚点出发能找到的对象，才会被认为是“活”的。

JVM 中的 GC Roots 主要包括以下几类：

### 1. 虚拟机栈（栈帧中的局部变量表）中引用的对象

这是最常见的来源。当你在方法中定义一个变量并创建一个对象时，这个变量就存在于当前线程的栈帧中。

* **例子**：`User user = new User();` 这里的 `user` 变量就是一个 GC Root。只要这个方法还没执行完，`user` 指向的对象就是活的。

### 2. 方法区中类静态属性引用的对象

由于静态属性（`static` 关键字）属于类，而不属于某个具体的实例，它们的生命周期往往非常长，通常随类的加载而存在。

* **例子**：`public static Cache cache = new Cache();` 这个 `cache` 对象就会被视为 GC Root。

### 3. 方法区中常量引用的对象

被 `final` 修饰的常量引用，如果它指向一个对象，那么这个对象也是 GC Root。

* **例子**：`public static final String SIGNATURE = "RSA";` 字符串常量池里的引用。

### 4. 本地方法栈中 JNI（Native 方法）引用的对象

当 Java 程序调用了 C/C++ 实现的本地方法时，这些方法内部可能会引用 Java 对象。这些被“法外之地”引用的对象不能被回收。

### 5. 所有被同步锁（synchronized 关键字）持有的对象

如果一个对象当前正被某个线程作为锁使用（即正在 `synchronized` 块中），它绝对不能被回收。

### 6. Java 虚拟机内部的引用

这些是维持 JVM 运行的基本对象：

* **系统类加载器（System ClassLoader）**。
* **基本数据类型的 Class 对象**（如 `int.class`, `long.class`）。
* **异常对象**（如 `OutOfMemoryError`, `NullPointerException` 等常驻内存的异常）。

---

### 💡 深度理解：分代收集与“临时” GC Roots

在实际的垃圾回收（如 **G1** 或 **ZGC**）中，为了提高效率，通常会进行“部分回收”（Partial GC）。

* **跨代引用（Inter-generational Reference）**：如果你只回收“年轻代”，那么“老年代”中指向年轻代的引用也必须被临时当作 GC Root。
* **Remembered Set (RSet)**：为了避免为了回收年轻代而扫描整个老年代，JVM 使用了 RSet 这种数据结构来记录这些跨代引用，从而将它们快速加入 GC Roots 的扫描范围。

