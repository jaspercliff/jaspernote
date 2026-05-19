# 逃逸分析

**逃逸分析（Escape Analysis）**是 Java 虚拟机（JVM）中非常核心的一种**代码优化技术**。

简单来说，它的目的就是：**分析一个在方法内创建的对象，会不会被方法外部的代码访问到。**

过去我们常说：“Java 的对象都是在堆（Heap）上分配的。”但有了逃逸分析后，这句话就不绝对了。如果 JVM 发现一个对象根本不会“逃”出当前方法，它就会使出一些骚操作来狠狠提升性能。

---

## 🚀 对象的两种状态：逃逸与不逃逸

JVM 在即时编译（JIT Compilation）时，会把对象的生命周期分为两种情况：

### 1. 方法逃逸（Escaped）

对象在方法中被创建后，被外部方法引用了。比如作为返回值 return 出去，或者赋值给了全局变量/类变量。

```java
public StringBuffer createString(String alpha, String beta) {
    StringBuffer sb = new StringBuffer();
    sb.append(alpha);
    sb.append(beta);
    return sb; //  逃逸了！因为对象被 return 给外部使用了
}

```

### 2. 不逃逸（No Escape）

对象只在当前方法内部存活，方法一旦结束，这个对象就再也没有人能访问到了。

```java
public String concat(String alpha, String beta) {
    StringBuffer sb = new StringBuffer(); //  没逃逸！
    sb.append(alpha);
    sb.append(beta);
    return sb.toString(); // 返回的是新生成的 String，sb 对象本身死在方法内
}

```

---

## 🛠 逃逸分析带来的三大神级优化

如果 JVM 确认一个对象**没有逃逸**，它就会偷偷做以下三件事来压榨性能：

### ① 栈上分配（Stack Allocation）

这是最强大的优化。既然对象只在方法内有用，那为什么还要去堆内存排队、等垃圾回收（GC）呢？

* **做法：** JVM 直接把这个对象分配在**栈帧**上。
* **好处：** 方法一旦执行结束，栈帧弹出，**对象随之自动销毁**。这就大大减轻了堆内存的压力，减少了 GC（垃圾回收）的频率和停顿时间。

HotSpot 虚拟机并没有真正实现传统的“栈上分配”,
目前主流虚拟机（hotspot）还没有实现栈上分配，标量替换是Java 实现“栈上分配”的底层代行者。通过不创建对象头、不产生堆内存地址，彻底消除了这个对象

### ② 锁消除（Lock Elimination / 同步消除）

在 Java 中，有些类（比如 `StringBuffer` 或 `Vector`）内部自带 `synchronized` 锁。

* **做法：** 如果 JVM 发现 `sb` 对象没有逃逸（如上面的第二个例子），说明**这个对象绝对不可能被第二个线程同时访问**（因为别的线程根本拿不到它）。
* **好处：** JVM 会直接**把这个对象内部的锁代码拆掉**，变成无锁运行，避免了线程加锁、解锁的性能开销。

### ③ 标量替换（Scalar Replacement）

有些时候，JVM 觉得在栈上分配一整个对象还是有点重，干脆把对象“肢解”了。

* **概念：** 像 `int`、`long` 这种不能再拆分的数据叫**标量**；而对象这种还能拆分的叫**聚合量**。
* **做法：** 如果一个对象没逃逸，且可以被拆散，JVM 就会**不创建这个对象**，而是直接在栈上创建它被用到的那几个成员变量。

```java
// 优化前
class Point { int x; int y; }

public void calculate() {
    Point p = new Point(1, 2);
    System.out.println(p.x + p.y);
}

// JVM 标量替换后的实际效果（类似这样）：
public void calculate() {
    int x = 1; // 直接变成局部变量，连对象都不new了
    int y = 2;
    System.out.println(x + y);
}

```

---

## 📝 总结与日常开发建议

* **尽量控制变量的作用域**：变量能写在方法内部就不要写在外面。
* **不要盲目返回不必要的对象**：如果外部不需要，就不要把它 return 出去。
