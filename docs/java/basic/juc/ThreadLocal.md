# threadlocal
`ThreadLocal` 是 Java 中一个用于创建线程局部变量的类。它提供了一种线程封闭机制，使得每个使用该变量的线程都有自己独立初始化的变量副本，互不干扰。这种机制特别适用于那些希望避免同步操作的情境，因为每个线程都只访问自己内部的变量副本。

## 使用场景

- **用户身份验证**：存储每个线程（通常代表不同的用户）的用户身份信息。
- **数据库连接和会话管理**：确保每个线程有自己独立的数据库连接或会话对象，防止多个线程共享同一连接或会话实例。
- **事务管理**：确保事务的处理在同一线程中是一致的。

## 基本用法

使用 `ThreadLocal` 类时，一般遵循以下步骤：

1. **创建 `ThreadLocal` 变量**：通过覆盖 `ThreadLocal` 类的 `initialValue()` 方法或调用 `ThreadLocal` 的 `withInitial()` 方法提供初始值。
2. **访问 `ThreadLocal` 变量**：使用 `get()` 方法读取当前线程的变量副本，使用 `set()` 方法设置当前线程的变量副本的值。
3. **清理**：在不再需要存储在 `ThreadLocal` 中的变量时，应该调用 `remove()` 方法来清理资源，避免内存泄漏。

### 示例代码

```java
public class ThreadLocalExample {
    // 创建一个 ThreadLocal 变量，并提供初始值
    private static final ThreadLocal<Integer> threadLocalValue = ThreadLocal.withInitial(() -> 1);

    public static void main(String[] args) {
        // 线程 A
        new Thread(() -> {
            threadLocalValue.set(10);
            System.out.println("Thread A: " + threadLocalValue.get());
            threadLocalValue.remove();
        }).start();

        // 线程 B
        new Thread(() -> {
            try {
                Thread.sleep(100); // 为了演示，确保线程 A 先执行
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            System.out.println("Thread B: " + threadLocalValue.get());
            threadLocalValue.remove();
        }).start();
    }
}
```

在上述示例中，尽管两个线程访问的是同一个 `ThreadLocal` 对象，但它们各自设置和获取的值互不干扰。这是因为每个线程内部维护了自己的 `ThreadLocal` 变量副本。

## 注意事项

- **内存泄露**：每个 `ThreadLocal` 实例内部都维护着一个对使用它的线程的引用。如果线程终止了但 `ThreadLocal` 实例没有被回收，那么这个线程对象因为被 `ThreadLocal` 的引用而无法被垃圾回收器回收，导致内存泄漏。因此，使用完 `ThreadLocal` 后，应该显式调用 `remove()` 方法来清理数据。
- **性能考量**：虽然 `ThreadLocal` 可以避免同步带来的性能损失，但它的使用和管理（尤其是内存管理）也是有代价的，应当谨慎使用。
  在Java并发编程中，线程池是一种广泛使用的资源管理工具，它通过重用一组已存在的线程来执行任务，从而减少线程创建和销毁的开销。
当任务执行完毕，线程并不会被销毁，而是会留在线程池中等待下一个任务。这种设计提高了应用程序的响应速度，降低了资源消耗，但也引入了需要注意的管理问题，尤其是关于`ThreadLocal`的使用。

### 线程池与`ThreadLocal`的管理问题

- **内存泄露**：最主要的问题是可能导致内存泄露。因为`ThreadLocal`为每个线程维护了一个变量副本，如果一个线程结束生命周期并被GC回收，其上的`ThreadLocal`变量也会随之被回收。但在线程池场景下，线程执行完任务后并不会被销毁，这意味着线程持有的`ThreadLocal`变量也不会被回收，即使这个线程后续可能永远不会再访问这些变量。如果没有显式地清除这些变量，它们就会一直占用内存。

- **不正确的数据共享**：如果线程池中的线程重用时，之前任务设置的`ThreadLocal`变量值没有被清理，那么新的任务可能会错误地访问到这些残留数据。这可能导致数据不一致、安全问题或逻辑错误。

### 解决策略

为了避免这些问题，可以采取以下措施：

1. **显式清理**：在任务执行完毕之前，显式地调用`ThreadLocal.remove()`清理线程局部变量。这是最直接也是最有效的解决方法。例如，在`finally`块中进行清理，以确保即使任务中发生异常，`ThreadLocal`变量也能被清理。

2. **使用`try-with-resources`模式**：对于Java 7及以上版本，可以利用`try-with-resources`模式创建一个自定义的`AutoCloseable`资源，该资源在关闭时清理`ThreadLocal`，以此确保`ThreadLocal`的安全清理。

3. **自定义线程池**：通过扩展`ThreadPoolExecutor`并重写`afterExecute`方法，可以在每个任务执行后自动清理`ThreadLocal`变量。这种方式可以在线程池层面统一管理`ThreadLocal`的清理，减少遗忘清理的风险。

4. **避免使用`ThreadLocal`**：在可能的情况下，考虑避免使用`ThreadLocal`，或者限制其使用范围。如果可以将需要的数据直接传递给任务，就无需依赖线程局部存储。

通过采取适当的措施管理`ThreadLocal`使用，可以充分利用线程池带来的性能优势，同时避免潜在的内存泄露和数据错误问题。

## InheritableThreadLocal

传递给子线程

```java
public class InheritableThreadLocalDemo {
    public static void main(String[] args) {
        InheritableThreadLocal<String> local = new InheritableThreadLocal<>();
        local.set("hello");
        // 创建子线程时父线程 ThreadLocal 会拷贝一份
        new Thread(
                        () -> {
                            System.out.println(local.get());
                        })
                .start();
    }
}
```

### 线程池失效 

```java

public class ThreadPoolITLFailure {
    // 使用 InheritableThreadLocal
    private static ThreadLocal<String> context = new InheritableThreadLocal<>();

    // 线程池中的线程是预先创建好的，不会在每次提交任务时都触发“父传子”的拷贝
    // 创建一个只有一个核心线程的线程池，方便复现问题
    private static ExecutorService executor = Executors.newFixedThreadPool(1);

    public static void main(String[] args) throws InterruptedException {

        // ---  第一个任务 ---
        context.set("任务A的标识");
        executor.submit(
                () -> {
                    // 此时线程池创建了新线程，拷贝成功
                    System.out.println("线程池任务1获取值: " + context.get());
                });

        Thread.sleep(1000); // 确保第一个任务执行完，线程回到池子里闲置

        // ---  修改父线程的值 ---
        context.set("任务B的标识");
        System.out.println("主线程修改值为: " + context.get());

        // --- 第二个任务 ---
        executor.submit(
                () -> {
                    // 关键点：由于线程池复用了之前的线程，它不会再次执行拷贝动作
                    // 它拿到的依然是第一次拷贝进来的“任务A的标识”，或者更糟，拿到的是上一个任务遗留的值
                    System.out.println("线程池任务2获取值: " + context.get());
                });

        executor.shutdown();
    }
}
```

### 解决方法：手动传值

```java
public class ThreadPoolManualContext {

    private static final ThreadLocal<String> context = new ThreadLocal<>();

    private static final ExecutorService executor = Executors.newFixedThreadPool(1);

    public static void main(String[] args) throws InterruptedException {

        // ================= 任务A =================
        // 就相当于是先设置到父线程 然后在手动复制到子线程
        context.set("任务A的标识");
        submitTask(
                () -> {
                    System.out.println("任务1获取值: " + context.get());
                });
        Thread.sleep(1000);
        // ================= 任务B =================
        context.set("任务B的标识");
        submitTask(
                () -> {
                    System.out.println("任务2获取值: " + context.get());
                });
        executor.shutdown();
    }

    /** 手动传递 ThreadLocal */
    private static void submitTask(Runnable task) {

        // 捕获父线程上下文
        String parentValue = context.get();
        executor.submit(
                () -> {
                    try {
                        //  设置到子线程
                        context.set(parentValue);
                        // 执行任务
                        task.run();
                    } finally {
                        //  清理（非常重要）
                        context.remove();
                    }
                });
    }
}
```

### 解决方法： 阿里 TransmittableThreadLocal

```java

public class TTLDemo {

    private static final TransmittableThreadLocal<String> context =
            new TransmittableThreadLocal<>();

    private static final ExecutorService executor =
            TtlExecutors.getTtlExecutorService(Executors.newFixedThreadPool(1));

    public static void main(String[] args) throws Exception {

        context.set("任务A");

        executor.submit(
                () -> {
                    System.out.println("任务1: " + context.get());
                });

        Thread.sleep(1000);

        context.set("任务B");

        executor.submit(
                () -> {
                    System.out.println("任务2: " + context.get());
                });

        executor.shutdown();
    }
}
```
