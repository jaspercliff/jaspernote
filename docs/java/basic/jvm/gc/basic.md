# 垃圾回收 基本概念


管理内存的核心部分

## 强、软、弱、虚引用

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
import java.lang.ref.SoftReference;

public class SoftRefDemo {
    public static void main(String[] args) {
        SoftReference<byte[]> softRef = new SoftReference<>(new byte[10 * 1024 * 1024]); // 10MB
        System.gc(); //建议JVM启动垃圾回收过程，但并不保证会立即执行垃圾回收
        System.out.println(softRef.get() != null); // 可能仍然存在

        byte[] newAlloc = new byte[15 * 1024 * 1024]; // 内存不足，软引用被回收
        System.out.println(softRef.get() != null); // 可能被回收
    }
}
```

### 弱引用（Weak Reference）

```java
WeakReference<Object> weakRef = new WeakReference<>(new Object());
```

只要发生 GC，弱引用对象就会被回收，适用于缓存 但可以随时回收 的对象（如 WeakHashMap）。

```java
import java.lang.ref.WeakReference;

public class WeakRefDemo {
    public static void main(String[] args) {
        WeakReference<byte[]> weakRef = new WeakReference<>(new byte[10 * 1024 * 1024]); // 10MB
        System.gc();
        System.out.println(weakRef.get() != null); // 可能被回收
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

⸻

## GC 类型

在 JVM 中，GC 主要分为 Minor GC、Major GC 和 Full GC，它们的触发时机和影响不同。

### Minor GC（年轻代 GC）

• 触发时机：
• 当 Eden 区满 时，JVM 触发 Minor GC，将存活对象移到 Survivor 区 或老年代。
• 特点：
• 速度快，采用 复制算法（Eden → Survivor）。
• 频繁触发（因为对象创建频率高）。
• 并不会影响老年代。
• 示例：

-XX:+PrintGCDetails

运行后 GC 日志示例：

[GC (Allocation Failure) [PSYoungGen: 512K->128K(1024K)] 1024K->512K(2048K), 0.002345 secs]

### Major GC（老年代 GC）

• 触发时机：
• 老年代空间不足 时触发。
• 一般由 Minor GC 失败 或大对象直接进入老年代导致。
• 特点：
• Major GC 比 Minor GC 慢，因为涉及老年代的大量对象。
• 可能导致 应用 STW（Stop The World）。

### Full GC（全局 GC）

• 触发时机：
• 调用 System.gc()（建议 JVM 执行 Full GC，但不一定执行）。
• 老年代空间不足时（如 CMS 失败触发 Full GC）。
• Metaspace（元空间）不足时。
• 特点：
• 清理整个堆，包括年轻代 + 老年代。
• 会导致 STW，影响应用性能。
• 避免频繁触发 Full GC（可通过 GC 日志分析）。

### 总结

GC 类型 作用 触发时机 影响
Minor GC 年轻代回收 Eden 区满 速度快，回收新生代对象
Major GC 老年代回收 老年代空间不足 速度慢，可能引起 STW
Full GC 整个堆回收 调用 System.gc()、Metaspace 满 STW 时间长，影响应用性能

💡 优化建议：
• 避免 System.gc()，让 JVM 自己管理。
• 调整 -Xmx、-Xms 参数，减少 Full GC 触发。
• 选择合适的 GC 策略，如 G1/ZGC 适用于低延迟应用。

## GC 日志分析
| 参数                  | 描述      |
|---------------------|---------|
| -Xmx20M             | 最大堆内存   |
| -Xms20M             | 初始堆内存   |
| -XX:+PrintGCDetails | GC 日志打印 |

```text

        SoftReference<byte[]> softRef = new SoftReference<>(new byte[10 * 1024 * 1024]); // 10MB
        System.gc();
        System.out.println(softRef.get() != null); // 可能仍然存在

        byte[] newAlloc = new byte[15 * 1024 * 1024]; // 内存不足，软引用被回收
        System.out.println(softRef.get() != null); // 可能被回收    堆空间足够大 不一定会回收
        
[GC (System.gc()) [PSYoungGen: 1646K->528K(7168K)] 11886K->10776K(23552K), 0.0005435 secs] [Times: user=0.00 sys=0.00, real=0.00 secs] 
	•	GC (System.gc())：表示这是一个由 System.gc() 手动触发的垃圾回收。
	•	PSYoungGen: 1646K->528K(7168K)：
	•	新生代（PSYoungGen）大小从 1646KB 回收到了 528KB，总大小为 7168KB。
	•	说明在此次 GC 中，新生代释放了一些内存。
	•	11886K->10776K(23552K)：堆的总大小减少了 110KB，从 11886KB 降到了 10776KB，总堆大小为 23552KB。
	•	0.0005435 secs：这次垃圾回收操作花费了 0.0005435 秒。
	•	[Times: user=0.00 sys=0.00, real=0.00 secs]：用户模式和系统模式时间几乎为零，总体执行时间也很短。
[Full GC (System.gc()) [PSYoungGen: 528K->0K(7168K)] [ParOldGen: 10248K->10599K(16384K)] 10776K->10599K(23552K), [Metaspace: 3123K->3123K(1056768K)], 0.0021886 secs] [Times: user=0.01 sys=0.00, real=0.00 secs] 
	•	Full GC (System.gc())：表示这是一个全量垃圾回收（Full GC），由 System.gc() 手动触发。
	•	PSYoungGen: 528K->0K(7168K)：
	•	新生代（PSYoungGen）释放了 528KB 内存，回收后其使用量为 0KB，仍然保持总大小为 7168KB。
	•	ParOldGen: 10248K->10599K(16384K)：
	•	老年代（ParOldGen）的大小从 10248KB 增加到 10599KB，总大小为 16384KB。
	•	说明老年代中有对象被移动到老年代，导致它的内存使用量有所增加。
	•	10776K->10599K(23552K)：堆的总大小减少了 177KB，从 10776KB 降到 10599KB。
	•	[Metaspace: 3123K->3123K(1056768K)]：元空间（Metaspace）大小没有变化，仍然是 3123KB，容量为 1056768KB。
	•	0.0021886 secs：全量垃圾回收花费了 0.0021886 秒，执行时间比上次稍长。
	•	[Times: user=0.01 sys=0.00, real=0.00 secs]：CPU 时间消耗较小，总体执行时间非常短。
true
[GC (Allocation Failure) [PSYoungGen: 122K->32K(7168K)] 10722K->10631K(23552K), 0.0002766 secs] [Times: user=0.00 sys=0.00, real=0.00 secs] 
	•	GC (Allocation Failure)：表示发生了分配失败，JVM 无法为新创建的对象分配足够的内存，因此触发了垃圾回收。
	•	PSYoungGen: 122K->32K(7168K)：新生代（PSYoungGen）使用的内存从 122KB 减少到了 32KB，总大小为 7168KB。
	•	10722K->10631K(23552K)：堆的总大小从 10722KB 降到 10631KB，总堆大小为 23552KB。
	•	0.0002766 secs：这次垃圾回收花费了 0.0002766 秒。
[GC (Allocation Failure) [PSYoungGen: 32K->64K(7168K)] 10631K->10663K(23552K), 0.0002304 secs] [Times: user=0.00 sys=0.00, real=0.00 secs] 
	•	GC (Allocation Failure)：再次发生分配失败，触发了垃圾回收。
	•	PSYoungGen: 32K->64K(7168K)：新生代（PSYoungGen）使用的内存从 32KB 增加到 64KB，总大小为 7168KB。
	•	10631K->10663K(23552K)：堆的总大小从 10631KB 增加到 10663KB，总堆大小为 23552KB。
	•	0.0002304 secs：这次垃圾回收花费了 0.0002304 秒。
[Full GC (Allocation Failure) [PSYoungGen: 64K->0K(7168K)] [ParOldGen: 10599K->10594K(16384K)] 10663K->10594K(23552K), [Metaspace: 3125K->3125K(1056768K)], 0.0017707 secs] [Times: user=0.01 sys=0.00, real=0.00 secs]
	•	Full GC (Allocation Failure)：再次发生分配失败，触发了全量垃圾回收。
	•	PSYoungGen: 64K->0K(7168K)：新生代（PSYoungGen）释放了所有 64KB 内存，回收后为 0KB，总大小为 7168KB。
	•	ParOldGen: 10599K->10594K(16384K)：老年代（ParOldGen）的内存使用量从 10599KB 减少到 10594KB，总大小为 16384KB。
	•	10663K->10594K(23552K)：堆的总大小从 10663KB 减少到 10594KB，总堆大小为 23552KB。
	•	[Metaspace: 3125K->3125K(1056768K)]：元空间（Metaspace）大小没有变化。
	•	0.0017707 secs：全量垃圾回收花费了 0.0017707 秒。 
[GC (Allocation Failure) [PSYoungGen: 0K->0K(7168K)] 10594K->10594K(23552K), 0.0002370 secs] [Times: user=0.00 sys=0.00, real=0.00 secs] 
	•	GC (Allocation Failure)：分配失败，再次触发垃圾回收。
	•	PSYoungGen: 0K->0K(7168K)：新生代内存没有变化，依然为 0KB。
	•	10594K->10594K(23552K)：堆的总大小没有变化，依然为 10594KB。
	•	0.0002370 secs：这次垃圾回收花费了 0.0002370 秒。
[Full GC (Allocation Failure) [PSYoungGen: 0K->0K(7168K)] [ParOldGen: 10594K->332K(16384K)] 10594K->332K(23552K), [Metaspace: 3125K->3125K(1056768K)], 0.0017455 secs] [Times: user=0.01 sys=0.00, real=0.01 secs] 
	•	Full GC (Allocation Failure)：全量垃圾回收由于分配失败触发。
	•	PSYoungGen: 0K->0K(7168K)：新生代内存没有变化。
	•	ParOldGen: 10594K->332K(16384K)：老年代内存使用量大幅减少，从 10594KB 降到 332KB。
	•	10594K->332K(23552K)：堆的总大小减少了 10262KB，从 10594KB 降到 332KB，总堆大小为 23552KB。
	•	[Metaspace: 3125K->3125K(1056768K)]：元空间（Metaspace）大小没有变化。
	•	0.0017455 secs：全量垃圾回收花费了 0.0017455 秒。
false
Heap
 PSYoungGen      total 7168K, used 430K [0x00000007bf800000, 0x00000007c0000000, 0x00000007c0000000)
  eden space 6144K, 7% used [0x00000007bf800000,0x00000007bf86ba48,0x00000007bfe00000)
  from space 1024K, 0% used [0x00000007bff00000,0x00000007bff00000,0x00000007c0000000)
  to   space 1024K, 0% used [0x00000007bfe00000,0x00000007bfe00000,0x00000007bff00000)
 ParOldGen       total 16384K, used 15692K [0x00000007be800000, 0x00000007bf800000, 0x00000007bf800000)
  object space 16384K, 95% used [0x00000007be800000,0x00000007bf7532c8,0x00000007bf800000)
 Metaspace       used 3151K, capacity 4500K, committed 4864K, reserved 1056768K
  class space    used 347K, capacity 388K, committed 512K, reserved 1048576K
  	•	PSYoungGen：新生代总大小为 7168KB，当前使用了 430KB，eden 区使用了 7%。
	•	ParOldGen：老年代总大小为 16384KB，当前使用了 15692KB，已使用 95%。
	•	Metaspace：元空间使用了 3151KB，总容量为 4500KB，已承诺 4864KB，保留容量为 1056768KB。
```
