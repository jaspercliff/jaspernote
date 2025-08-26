# FutureTask

## Future
在 Java 并发编程中，`Future` 接口表示一个异步计算的结果。使用 `Future` 可以对长时间运行的计算结果进行查询、判断是否完成、获取结果，
甚至可以取消计算。`Future` 提供了一种在将来某个时刻获取计算结果的机制，而不用阻塞等待计算完成。

### 核心方法

`Future` 接口提供了以下几个核心方法：

- **`boolean cancel(boolean mayInterruptIfRunning)`**：尝试取消任务。如果任务已完成、已取消或由于某些其他原因无法取消，则此尝试将失败。参数 `mayInterruptIfRunning` 表示是否允许中断正在运行的任务。
- **`boolean isCancelled()`**：任务是否被取消成功。
- **`boolean isDone()`**：任务是否已完成。需要注意的是，任务正常完成、异常终止或取消都会导致这个方法返回 `true`。
- **`V get()`**：等待计算完成，然后检索其结果。
- **`V get(long timeout, TimeUnit unit)`**：如果需要，最多等待 `timeout` 和 `unit` 指定的时间以获取计算结果，然后检索其结果。

### 示例代码

下面是一个使用 `ExecutorService` 提交任务，并使用 `Future` 获取结果的简单示例：

```java
import java.util.concurrent.*;

public class FutureExample {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newCachedThreadPool();
        
        // 提交一个 Callable 任务，并获得一个 Future
        Future<Integer> futureResult = executor.submit(() -> {
            TimeUnit.SECONDS.sleep(1); // 模拟长时间运行的计算
            return 123; // 返回计算结果
        });
        
        try {
            // 在结果可用之前，get 方法会阻塞
            System.out.println("future result: " + futureResult.get());
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        } finally {
            executor.shutdown();
        }
    }
}
```

### 使用场景

`Future` 通常与 `ExecutorService` 配合使用，用于异步执行任务。在实际开发中，如果需要执行一个耗时的操作，
并且不想当前线程阻塞等待结果时，就可以使用 `Future`。通过 `Future`，你可以在计算完成后获取结果，或者在计算还未完成时就取消任务。

### 注意事项

- 调用 `get()` 方法时，当前线程会阻塞直到 `Future` 完成，这可能会影响程序的响应性。
- 使用带有超时参数的 `get(long timeout, TimeUnit unit)` 方法可以减少这种影响。
- 如果计算抛出异常，那么尝试通过 `get()` 方法获取结果将导致 `ExecutionException` 异常被抛出。
- `Future` 提供了基本的取消机制和任务状态查询功能，但在某些更复杂的应用场景下可能不够用。
- Java 8 引入的 `CompletableFuture` 类提供了更丰富的功能，例如结果组合、转换以及异步执行操作。

## FutureTask
`FutureTask` 是一个实现了 `RunnableFuture<V>` 接口的类，`RunnableFuture<V>` 接口继承自 `Runnable` 和 `Future<V>` 接口。这使得 `FutureTask` 既可以作为 `Runnable` 被线程执行，
又可以作为 `Future` 提供异步计算的结果。

### 构造方法

`FutureTask` 提供了两种构造器：

1. `FutureTask(Callable<V> callable)`：使用 `Callable<V>` 作为任务创建 `FutureTask`。`Callable` 是一个函数式接口，它的 `call` 方法可以返回结果，并且可以抛出异常。

2. `FutureTask(Runnable runnable, V result)`：使用 `Runnable` 和一个固定的结果创建 `FutureTask`。这允许在任务完成时获取一个预设的结果。

### 示例：使用 `FutureTask` 执行耗时任务

``` java
Callable<Integer> callableTask = () -> {
    // 模拟耗时操作
    TimeUnit.SECONDS.sleep(2);
    return 10;
};

FutureTask<Integer> futureTask = new FutureTask<>(callableTask);

// 方式1：直接使用 Thread 执行
Thread thread = new Thread(futureTask);
thread.start();

// 方式2：提交给 ExecutorService 执行
ExecutorService executor = Executors.newSingleThreadExecutor();
executor.submit(futureTask);

// 获取执行结果
try {
    // 这里会阻塞，直到 futureTask 执行完毕
    Integer result = futureTask.get();
    System.out.println("FutureTask result: " + result);
} catch (InterruptedException | ExecutionException e) {
    e.printStackTrace();
} finally {
    executor.shutdown();
}

// 取消任务
boolean canceled = futureTask.cancel(true);
if (canceled) {
    System.out.println("Task was canceled.");
}
```
``` java
final Callable<Integer> callable = () -> {
    Thread.sleep(2000);
    return 42;
};
final FutureTask<Integer> futureTask = new FutureTask<>(callable);
final Thread thread = new Thread(futureTask);
        thread.start();

        futureTask.cancel(true);
// System.out.println(futureTask.get());// 阻塞
        System.out.println(futureTask.isDone());
        System.out.println(futureTask.isCancelled());
```
### 注意事项

- 当任务已经开始执行时，`cancel` 方法将尝试中断执行任务的线程。但如果任务不响应中断，则无法取消。
- 一旦任务执行完成，就不能再次执行或取消任务。
- 使用 `get()` 方法时，如果任务执行期间抛出异常，则这些异常会被封装为 `ExecutionException` 抛出。
- `FutureTask` 的 `get` 方法在任务完成之前会阻塞当前线程，可以使用带超时的 `get` 方法来避免无限期等待。

