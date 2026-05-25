--- 
sidebar_position: 1
---
# 强、软、弱、虚引用

Java 提供了 四种引用类型 来管理对象的生命周期，它们影响 GC 对对象的回收策略。

### 强引用（Strong Reference）

```java
Object obj = new Object();
```

强引用是 Java 默认的引用类型，只要对象有强引用存在，GC 永远不会回收 这个对象，即使内存不足也不会回收，可能导致OOM（OutOfMemoryError）。

```java
public static void main(String[] args) {
    Object obj = new Object(); // 强引用
    System.gc();
    System.out.println(obj); // 仍然存在
}
```

### 软引用（Soft Reference）

```java
SoftReference<Object> softRef = new SoftReference<>(new Object());
```

在内存不足时，JVM 会回收软引用对象，适用于 缓存 场景。

```java

// -Xmx20m -Xlog:'gc*'
public class SoftRefDemo {
    public static void main(String[] args) {
        // 创建一个 10MB 的软引用对象
        SoftReference<byte[]> softRef = new SoftReference<>(new byte[1024 * 1024 * 10]);

        System.out.println("内存充足时: " + softRef.get()); // 能拿到对象

        try {
            // 制造一个巨大的强引用对象，强行把内存撑爆
            byte[] leak = new byte[1024 * 1024 * 15];
        } finally {
            // 再次查看软引用
            System.out.println("内存不足后软引用: " + softRef.get()); // 结果：null
        }
    }
}

```

### 弱引用（Weak Reference）

```java
WeakReference<Object> weakRef = new WeakReference<>(new Object());
```

只要发生 GC，弱引用对象就会被回收，适用于缓存 但可以随时回收 的对象（如 WeakHashMap）。

```java
public class WeakRefDemo {
    public static void main(String[] args) {
        Object strongObj = new Object();
        WeakReference<Object> weakRef = new WeakReference<>(strongObj);

        System.out.println("GC前: " + weakRef.get()); // 结果：对象地址

        strongObj = null; // 切断强引用，现在只有弱引用指向它
        System.gc(); // 触发 GC

        System.out.println("GC后: " + weakRef.get()); // 结果：null
    }
}
```

### 虚引用（Phantom Reference）

```java
PhantomReference<Object> phantomRef = new PhantomReference<>(new Object(), queue);
```

虚引用 完全不会影响对象的生命周期，对象被回收后会进入 ReferenceQueue，用于检测对象是否被回收，适用于 管理
DirectMemory（NIO）等资源回收。

```java
import java.lang.ref.PhantomReference;
import java.lang.ref.ReferenceQueue;

public class PhantomRefDemo {
    public static void main(String[] args) {
        ReferenceQueue<Object> queue = new ReferenceQueue<>();
        PhantomReference<Object> phantomRef = new PhantomReference<>(new Object(), queue);
        System.gc();
        System.out.println(phantomRef.get()); // 永远返回 null
        System.out.println(queue.poll() != null); // 判断对象是否被回收
    }
}
```

当我们创建一个 DirectByteBuffer 时，JVM 内部会做两件事：

在堆里创建一个小的 Java 对象（DirectByteBuffer 实例），它是直接内存的“代理人”。
创建一个虚引用（通常是 Cleaner 类）指向这个堆对象，并关联一个引用队列（ReferenceQueue）。

回收流程如下：

堆对象死亡：当你的程序不再使用 DirectByteBuffer 时，它在堆里的实例变成了垃圾。

触发虚引用通知：GC 发现这个对象只有虚引用了，在回收它之前，会将这个虚引用丢进与之关联的 ReferenceQueue 中。

执行清理：JVM 内部有一个后台线程会监控这个队列。一旦发现队列里有东西，就会取出它并调用底层的 C 语言代码（如 unsafe.freeMemory），手动把那块直接内存释放掉
