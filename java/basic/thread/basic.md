# 线程
## 并发三要素(出现问题的根源)
- 原子性
  - 即一个操作或者多个操作 要么全部执行并且执行的过程不会被任何因素打断，要么就都不执行。
- 有序性
  - 程序执行的顺序按照代码的先后顺序执行
- 可见性
  - 一个线程对共享变量的修改，另外一个线程能够立刻看到

如果线程可以保持这三个特性，则说明线程是安全的

## 死锁

俩个或者多个线程同时等待对方对共享资源的释放，从而导致都无法执行

### 发生条件
- 资源一次只能被一个线程占用
- 资源不能强制从线程手中夺走
- 占有并等待，线程1手中拿着锁1 等待锁2的释放， 线程2拿着锁2 等待锁1的释放
- 存在循环等待

```java
import java.util.Arrays;
import java.util.List;

public class ParallelStreamDeadlock {
    private final Object lock1 = new Object();
    private final Object lock2 = new Object();

    public void processWithParallelStream() {
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);

        list.parallelStream().forEach(item -> {
            if (item % 2 == 0) {
                synchronized (lock1) {
                    System.out.println("Processing even: " + item);
                    try { Thread.sleep(100); } catch (InterruptedException e) {}
                    synchronized (lock2) {
                        System.out.println("Even: " + item + " done");
                    }
                }
            } else {
                synchronized (lock2) {
                    System.out.println("Processing odd: " + item);
                    try { Thread.sleep(100); } catch (InterruptedException e) {}
                    synchronized (lock1) {
                        System.out.println("Odd: " + item + " done");
                    }
                }
            }
        });
    }

    public static void main(String[] args) {
        new ParallelStreamDeadlock().processWithParallelStream();
    }
}
```

## 为什么需要多线程
CPU、内存、I/O 设备的速度是有极大差异的
- CPU 增加了缓存，以均衡与内存的速度差异 //可见性
- 操作系统增加了进程、线程，以分时复用 CPU，进而均衡 CPU 与 I/O 设备的速度差异 //原子性
- 编译程序优化指令执行次序，使得缓存能够得到更加合理地利用 //有序性
### 可见性
``` java
//线程1执行的代码
int i = 0;
i = 10;
//线程2执行的代码
j = i;
```
假若执行线程1的是CPU1，执行线程2的是CPU2。由上面的分析可知，当线程1执行 i =10这句时，
会先把i的初始值加载到CPU1的高速缓存中，然后赋值为10，那么在CPU1的高速缓存当中i的值变为10了，
却没有立即写入到主存当中。此时线程2执行 j = i，它会先去主存读取i的值并加载到CPU2的缓存当中，
注意此时内存当中i的值还是0，那么就会使得j的值为0，而不是10
### 原子性
``` java
nt i = 1;
// 线程1执行
i += 1;
// 线程2执行
i += 1;
```
i += 1需要三条 CPU 指令
将变量 i 从内存读取到 CPU寄存器；
在CPU寄存器中执行 i + 1 操作；
将最后的结果i写入内存（缓存机制导致可能写入的是 CPU 缓存而不是内存）。
由于CPU分时复用（线程切换）的存在，线程1执行了第一条指令后，就切换到线程2执行，
假如线程2执行了这三条指令后，再切换会线程1执行后续两条指令，将造成最后写到内存中的i值是2而不是3
### 顺序性
Java源代码到最终实际执行的指令序列，会经历编译期重排序、类加载期重排序以及运行时重排序三个阶段的重新排序。
这些重排序主要是由Java编译器、JVM（Java虚拟机）和CPU来共同完成的，目的是为了优化程序性能，但需要保证最终执行结果与Java内存模型（JMM）规定的结果一致。

#### 1. 编译期重排序

在编译期间，Java编译器（javac）会将你的Java源代码编译成字节码（.class文件）。在这个过程中，编译器可能会对代码进行重排序，以优化程序运行的性能。这种重排序包括但不限于指令重排、循环变换等，目的是提高代码的执行效率。重排序在遵循Java内存模型的前提下进行，确保在单线程环境下程序的执行行为不会改变。

#### 2. 类加载期重排序

在类加载时，JVM的类加载器会将字节码转换成JVM内部的表示，并进行链接、初始化等一系列操作。在这个阶段，可能会有一些重排序发生，特别是在解析阶段，JVM为了优化程序性能，可能会进行一定的优化处理。

#### 3. 运行时重排序

运行时重排序主要发生在JIT编译过程中和CPU层面：

- **JIT编译期重排序**：JVM的即时编译器（Just-In-Time, JIT）在运行时将热点代码（经常执行的代码）编译成本地机器代码，以提高执行效率。JIT编译器在进行编译时，也可能会对指令进行重排序，
- 包括但不限于指令合并、循环展开、方法内联等优化措施。

- **CPU重排序**：现代处理器为了利用执行单元的并行能力，提高指令执行的吞吐率，会在执行机器指令时进行指令级的并行和重排序。
- 这种重排序是透明的，程序员通常不需要关心，但它是实现高性能计算的关键技术之一。

为了保证多线程程序的正确性，Java内存模型定义了一套规则来协调这些重排序，确保在多线程环境中，程序行为的一致性和正确性。
JMM通过happens-before规则来保证特定的编程模式下内存操作的可见性和有序性，避免了因重排序导致的数据竞争和内存一致性问题。

## 并发三要素(出现问题的根源)
原子性在Java中，对基本数据类型的变量的读取和赋值操作是原子性操作，即这些操作是不可被中断的，要么执行，要么不执行。 请分析以下哪些操作是原子性操作：x = 10;        //语句1: 直接将数值10赋值给x，也就是说线程执行这个语句的会直接将数值10写入到工作内存中
y = x;         //语句2: 包含2个操作，它先要去读取x的值，再将x的值写入工作内存，虽然读取x的值以及 将x的值写入工作内存 这2个操作都是原子性操作，但是合起来就不是原子性操作了。
x++;           //语句3： x++包括3个操作：读取x的值，进行加1操作，写入新的值。
x = x + 1;     //语句4： 同语句3
上面4个语句只有语句1的操作具备原子性。也就是说，只有简单的读取、赋值（而且必须是将数字赋值给某个变量，变量之间的相互赋值不是原子操作）才是原子操作。



## java实现线程的方式
在 Java 中，可以通过以下几种方法实现线程的创建和使用：

---

### **1. 继承 `Thread` 类**
通过继承 `Thread` 类并重写其 `run()` 方法来实现线程。

```java
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("线程运行：" + Thread.currentThread().getName());
    }
}

public class Main {
    public static void main(String[] args) {
        MyThread thread = new MyThread();
        thread.start(); // 启动线程
    }
}
```

**注意**：需要调用 `start()` 方法启动线程，而不是直接调用 `run()` 方法。

---

### **2. 实现 `Runnable` 接口**
通过实现 `Runnable` 接口并实现其 `run()` 方法，然后将其实例传递给 `Thread` 类。

```java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("线程运行：" + Thread.currentThread().getName());
    }
}

public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(new MyRunnable());
        thread.start(); // 启动线程
    }
}
```

**优点**：这种方式更适合多线程共享资源的场景，因为 Java 不支持多重继承，但可以实现多个接口。

---

### **3. 使用 `Callable` 和 `FutureTask`**
`Callable` 接口类似于 `Runnable`，但它可以返回结果并抛出异常。结合 `FutureTask` 可以获取线程执行的结果。

```java
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

class MyCallable implements Callable<Integer> {
    @Override
    public Integer call() throws Exception {
        System.out.println("线程运行：" + Thread.currentThread().getName());
        return 42; // 返回结果
    }
}

public class Main {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        FutureTask<Integer> task = new FutureTask<>(new MyCallable());
        Thread thread = new Thread(task);
        thread.start();

        // 获取线程返回值
        System.out.println("线程返回值：" + task.get());
    }
}
```

**优点**：支持返回值和异常处理。

---

### **4. 使用线程池 (`ExecutorService`)**
Java 提供了高级的线程管理工具——线程池，推荐使用它来管理线程。

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2); // 创建固定大小的线程池

        Runnable task = () -> {
            System.out.println("任务运行：" + Thread.currentThread().getName());
        };

        executor.submit(task); // 提交任务
        executor.submit(task);

        executor.shutdown(); // 关闭线程池
    }
}
```

**优点**：线程池可以复用线程，避免频繁创建和销毁线程带来的开销。

---

### **5. 使用 `CompletableFuture`**
`CompletableFuture` 是 Java 8 引入的一种异步编程工具，可以简化线程的管理和回调操作。

```java
import java.util.concurrent.CompletableFuture;

public class Main {
    public static void main(String[] args) {
        CompletableFuture.runAsync(() -> {
            System.out.println("异步任务运行：" + Thread.currentThread().getName());
        });

        try {
            Thread.sleep(1000); // 等待异步任务完成
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

**优点**：提供了强大的异步编程能力，支持链式调用和组合操作。

---

### 总结
| 方法                     | 特点                                |
|------------------------|-----------------------------------|
| 继承 `Thread`            | 简单易用，但不适合资源共享场景，且无法返回值。           |
| 实现 `Runnable`          | 更灵活，适合资源共享场景，但无法返回值。              |
| 使用 `Callable`          | 支持返回值和异常处理，但需要配合 `FutureTask` 使用。 |
| 使用线程池                  | 高效管理线程，避免频繁创建和销毁线程，推荐用于实际项目中。     |
| 使用 `CompletableFuture` | 异步编程的强大工具，适合复杂的异步任务和回调操作。         |

