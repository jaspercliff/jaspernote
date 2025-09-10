# completableFuture
`CompletableFuture` 是 Java 8 引入的一个高性能的异步编程工具，它扩展了 `Future` 接口，并提供了一种更加灵活的方式来处理异步操作的结果。
`CompletableFuture` 提供了丰富的 API 来支持异步编程，包括完成异步操作、组合异步操作、处理完成结果等。

## advantage 
- 非阻塞回调 任务完成后自动触发下一步
- 链式编程
- 异常处理

### 关键特性

- supplyAsync: 用于创建一个异步任务，该任务最终会产生一个结果。 接受一个 Supplier 函数式接口作为参数。 返回一个 CompletableFuture 实例，其中 T 是任务的结果类型。
- runAsync: 用于创建一个异步任务，该任务不产生任何结果。接受一个 Runnable 作为参数。 返回一个 CompletableFuture实例。
1. **异步操作**:
    - `supplyAsync`: 异步执行一个函数并返回一个 `CompletableFuture`。
    - `runAsync`: 异步执行一个 Runnable 任务。
2. **组合操作**: 属于回调 不像get一样阻塞
    - `thenApply(Function)`: 在当前 `CompletableFuture` 完成后，对其结果应用一个函数。
    - `thenAccept(Consumer)`: 在当前 `CompletableFuture` 完成后，消费其结果。
    - `thenCombine(BiFunction)`: 结合两个 `CompletableFuture`，在两者都完成时，使用一个函数处理两个结果。
    - `thenCompose`: 在当前 `CompletableFuture` 完成后，返回一个新的 `CompletableFuture`。
    - `thenRun`: 在当前 `CompletableFuture` 完成后，执行一个 Runnable 任务。

3. **错误处理**:
    - `exceptionally`: 处理完成异常的情况。
    - `handle`: 处理完成结果，无论是否异常。

4. **完成控制**:
    - `complete`: 手动完成一个 `CompletableFuture`。
    - `cancel`: 尝试取消一个 `CompletableFuture`。
    - `isDone`: 检查 `CompletableFuture` 是否已完成。
    - `join`: 阻塞并等待 `CompletableFuture` 完成。

### 示例

下面是一个简单的示例，展示如何使用 `CompletableFuture` 来执行异步任务：

```java
public class CompletableFutureDemo {
    public static void main(String[] args) {
        CompletableFuture<Integer> completeFuture = CompletableFuture.supplyAsync(() -> {
            System.out.println("supplyAsync");
            return 42;
        });
        // apply 对其结果应用一个Function  accept 对结果应用一个Consumer 属于回调 和get阻塞不一样
        completeFuture.thenApply(i -> i*2).thenAccept(result -> System.out.println("异步处理的结果".concat(result.toString())));
        completeFuture.thenAccept(System.out::println);

        CompletableFuture<Integer> a = CompletableFuture.supplyAsync(() -> 10);
        CompletableFuture<Integer> b = CompletableFuture.supplyAsync(() -> 16);
        //组合   join也是阻塞的 join 抛出CompletionException
        CompletableFuture<Integer> combine = a.thenCombine(b, Integer::sum);
        System.out.println("combine = " + combine.join());

        CompletableFuture<Integer> exceptionally = CompletableFuture.supplyAsync(() -> {
            if (true) throw new RuntimeException();
            return 15;
        }).exceptionally(throwable -> {
            System.out.println("throwable = " + throwable);
            return 0;
        });
        System.out.println("exceptionally = " + exceptionally.join());
    }
}
```

在这个例子中：
- 使用 `supplyAsync()` 创建了一个异步任务，该任务将在后台线程中运行，并返回一个整数值。
- 使用 `thenAccept()` 方法注册了一个回调函数，当异步任务完成后，这个回调函数将被调用来处理结果。
- 主线程会继续执行其他任务，而不会等待 `CompletableFuture` 的结果。
- 最后，如果需要，可以使用 `get()` 方法来阻塞等待结果。

`CompletableFuture` 提供了许多其他有用的方法来处理更复杂的异步场景，例如错误处理、取消操作、超时控制等。