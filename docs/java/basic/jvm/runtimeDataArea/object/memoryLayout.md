#  对象在内存中的布局 

 HotSpot 虚拟机中对象在堆内存中的存储布局划分为三个核心部分：
 **对象头（Header）**、**实例数据（Instance Data）**和**对齐填充（Padding）**。


---

## 🧱 堆内存布局的三大核心区域

### 1. 对象头（Header）—— 存储对象自身元数据

对象头是 JVM 管理对象的关键，在 64 位虚拟机上通常占用 12 字节或 16 字节。它内部又被分为两到三个板块：

* **Mark Word（标记字段）**：在 64 位 JVM 中固定占 **8 字节（64 bits）**。它是一个“省空间大师”，用来存储对象自身的运行时数据。比如对象的 HashCode、GC 分代年龄、锁状态标志、线程持有的锁等。它的内容会随着锁升级而动态改变。
* **Klass Pointer（类型指针）**：对象指向它的类元数据的指针，JVM 通过它知道这个对象是哪个类 new 出来的。在 64 位机器上默认开启了**指针压缩**（`-XX:+UseCompressedClassPointers`），因此它通常只占 **4 字节**（关闭指针压缩时为 8 字节）。
* **数组长度（Array Length）**：**只有当对象是“数组”时**，对象头才会额外多出这一块，固定占用 **4 字节**，用来记录数组的长度。

### 2. 实例数据（Instance Data）—— 对象的真金白银

这里存放的是你在代码里真正定义的各种成员变量字段，包括从父类继承下来的和自己定义的。

* 基本数据类型按各自大小占空间（例如：`byte` 占 1 字节，`int` 占 4 字节，`long` 占 8 字节）。
* 引用类型（Reference）在开启指针压缩（`-XX:+UseCompressedOops`）的情况下占 **4 字节**，关闭时占 8 字节。
* **字段重排列（Fields Reorder）**：为了让 CPU 读取内存时最高效（减少跨缓存行读取），JVM 在安排实例数据时，并不是按照你在代码里写的顺序排列的。它会按照“相同宽度（字节数）的字段放在一起”的原则重新排序（如 `long/double` 靠前，`byte/boolean` 靠后）。

### 3. 对齐填充（Padding）—— 内存对齐的补白

* **为什么要填充？** HotSpot 虚拟机的自动内存管理系统要求**对象的起始地址必须是 8 字节的整数倍**。换句话说，任何对象在堆里占用的总大小，必须能被 8 整除。
* **如何填充？** 如果一个对象的“对象头 + 实例数据”加起来正好是 20 字节，不能被 8 整除，那么 JVM 就会在末尾强行加上 4 个字节的空白占位符（Outer Padding），凑成 24 字节。它没有任何业务含义，纯粹是为了满足 8 字节对齐的硬性要求。

---

## 🔍 实战看穿内存：一个普通对象到底占多少字节？

我们来做一道计算题。假设在**开启指针压缩**的默认 64 位 JDK 中，有下面这样一个普通类：

```java
public class User {
    int id;          // int 占 4 字节
    boolean VIP;     // boolean 占 1 字节
}

```

当我们 `new User()` 出来放在堆里时，它的大小是怎么算出来的呢？

1. **对象头**：
* Mark Word = 8 字节
* Klass Pointer = 4 字节
* *对象头小计 = 12 字节*


2. **实例数据**：
* id (`int`) = 4 字节
* VIP (`boolean`) = 1 字节
* *实例数据小计 = 5 字节*


3. **计算总和**：
* 12字节 (对象头) + 5字节 (实例数据) = **17 字节**。


4. **对齐填充**：
* 17 不能被 8 整除，距离最近的 8 的倍数是 24。
* JVM 自动填充：24 - 17 = **7 字节 的 Padding**。



**🏁 最终结论**：这个 `User` 对象在 Java 堆内存中实际占用 **24 字节** 的空间。

## jol 

```java 
public class JolDemo {

    static class User {
        int id; // 4 字节
        boolean isVip; // 1 字节
        String name; // 引用类型：开启指针压缩占 4 字节，关闭占 8 字节
    }

    public static void main(String[] args) {
        User user = new User();

        // 核心：打印 user 对象的内存布局
        System.out.println(ClassLayout.parseInstance(user).toPrintable());
    }
}
```
```text 
com.jasper.memory.object.JolDemo$User object internals:
OFF  SZ               TYPE DESCRIPTION               VALUE
  0   8                    (object header: mark)     0x0000000000000001 (non-biasable; age: 0)
  8   4                    (object header: class)    0x01000a08
 12   4                int User.id                   0
 16   1            boolean User.isVip                false
 17   3                    (alignment/padding gap)   
 20   4   java.lang.String User.name                 null
Instance size: 24 bytes
Space losses: 3 bytes internal + 0 bytes external = 3 bytes total
```

## mark word 


### 无锁 


| unused | hashcode | age | biased_lock | lock |
|---------|----------|-----|-------------|------|
| 25bit   | 31bit    | 4bit| 1bit        | 2bit |

锁标志：01 

### biased lock 


| thread id | epoch | age | biased_lock | lock |
|------------|-------|-----|-------------|------|
| 54bit      | 2bit  | 4bit| 1bit        | 2bit |

锁标志：101 

### 轻量级锁 

| pointer to Lock Record (stack) | lock | 
|--------------------------------|------|
| 62bit                          | 2bit |


当前线程持有轻量级锁
锁标志： 00 

### 重量级锁 

| pointer to ObjectMonitor | lock |
|--------------------------|------|
| 62bit                    | 2bit |


指向 ObjectMonitor（JVM内部监视器）
锁标志：10
