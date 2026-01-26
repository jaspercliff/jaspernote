# completableFuture

`CompletableFuture` 是 Java 8 引入的一个高性能的异步编程工具，它扩展了 `Future` 接口，并提供了一种更加灵活的方式来处理异步操作的结果。
`CompletableFuture` 提供了丰富的 API 来支持异步编程，包括完成异步操作、组合异步操作、处理完成结果等。

![completableFuture](../assets/completableFuture.svg)

## CompletionStage

代表异步计算中的一个阶段（Stage）。它解决了传统的 Future.get() 必须阻塞等待的问题，允许你定义“当上一步完成后，下一步该做什么”
它不是线程、也不是任务，而是计算流程中的一个阶段（stage）

### advantage

- 非阻塞回调 任务完成后自动触发下一步
- 链式编程
- 异常处理

### 关键特性

- supplyAsync: 用于创建一个异步任务，该任务最终会产生一个结果。 接受一个 Supplier 函数式接口作为参数。 返回一个 CompletableFuture 实例，其中 T 是任务的结果类型。
- runAsync: 用于创建一个异步任务，该任务不产生任何结果。接受一个 Runnable 作为参数。 返回一个 CompletableFuture 实例。

1. **异步操作**:
    - `supplyAsync(Supplier)`: 异步执行一个函数并返回一个 `CompletableFuture`。
    - `runAsync(Runnable)`: 异步执行一个 Runnable 任务。
    - 如果不指定 Executor，则使用 ForkJoinPool.commonPool() 作为线程池
2. **组合操作**: 属于回调 不像 get 一样阻塞
    - 串行执行
    - `thenApply(Function)`: 在当前 `CompletableFuture` 完成后，对其结果应用一个函数。
    - `thenRun`: 在当前 `CompletableFuture` 完成后，执行一个 Runnable 任务。与 thenApply 相比没有接收和返回
    - `thenCompose`: 在当前 `CompletableFuture` 完成后，返回一个新的 `CompletableFuture`。类似于 stream 的 flatMap 扁平化（将嵌套的结构转换为更浅更直接的结构）
    - 并行组合
    - `thenCombine(BiFunction)`: 等待两个 `CompletableFuture`，在两者都完成时，使用一个函数处理两个结果。
    - 消费结果
    - `thenAccept(Consumer)`: 在当前 `CompletableFuture` 完成后，消费其结果。
    - 选择执行
    - `applyToEither`: 那个先完成，就用那个的结果转换
    - `acceptEither`: 那个先完成，就消费那个的结果
    - `runAfterEither`: 不关心结果，任一任务完成执行 runnable
    - 等待所有/任一完成
    - `allof`: 等待所有完成，不会返回结果，需要手动获取结果
    - `anyof`: 等待任一完成
3. **错误处理**:
    - `exceptionally`: 处理完成异常的情况。
    - `handle`: 处理完成结果，无论是否异常。
    - `whenComplete`: 类似于 handle 但是不能该变结果，只能用于日志、清理等副作用
4. **完成控制**:
    - `complete`: 手动完成一个 `CompletableFuture`。
    - `completeExceptionally`: 如果该 future 未完成，则将其设置为异常完成 并且后续的 thenApply accept 等不会执行 但是 exceptionally 会执行
    - `cancel`: 尝试取消一个 `CompletableFuture`。
      - true 允许打断正在运行中的任务
      - false 只取消没有开始的任务
      - cancel() 不会中断正在执行的 supplyAsync 或 runAsync 中的代码 只是为了实现 future 接口保留
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

### 异步操作

```java
public class CompletableFutureRunAndSupply {
    public static void main(String[] args) {
        // 不指定线程池则使用 使用ForkJoinPool.commonPool()
        // 执行没有返回值的异步任务
        final CompletableFuture<Void> runAsync = CompletableFuture.runAsync(() -> {
            System.out.println("completableFuture runAsync");
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        });
        // 执行有返回值的异步任务
        final CompletableFuture<Integer> supplyAsync = CompletableFuture.supplyAsync(() -> {
            try {
                TimeUnit.SECONDS.sleep(2);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println("supplyAsync");
            return 100;
        });
        runAsync.join();
        System.out.println("supplyAsync result".concat(supplyAsync.join().toString()));
        System.out.println("main thread");
    }
}

```

### 组合操作

```java
public class CompletableFutureCompose {
    public static void main(String[] args) {
        System.out.println("===================串行操作 start");
        final CompletableFuture<Integer> supplyAsync = CompletableFuture.supplyAsync(() -> {
            System.out.println("supplyAsync");
            return 10;
        });
        // 对结果应用一个function
        final CompletableFuture<Integer> integerCompletableFuture = supplyAsync.thenApply(i -> i * 2);
        final CompletableFuture<CompletableFuture<Integer>> com = CompletableFuture.supplyAsync(() -> {
            System.out.println("supplyAsync1");
            return 10;
        }).thenApply(res -> CompletableFuture.supplyAsync(() -> {
            System.out.println("supplyAsync2");
            return res * 2;
        }));
        // 得join俩遍才能得到想要的结果
        System.out.println(com.join().join());

        // 扁平化(将嵌套的结构转换为更浅更直接的结构)在当前com完成之后返回一个新的completableFuture
        final CompletableFuture<Integer> com1 = CompletableFuture.supplyAsync(() -> {
            System.out.println("supplyAsync1");
            return 20;
        }).thenCompose(res -> CompletableFuture.supplyAsync(() -> {
            System.out.println("supplyAsync2");
            return res * 2;
        }));
        System.out.println(com1.join());
        System.out.println("===================串行操作 end");

        System.out.println("===================消费结果 start");
        // 对结果应用一个consumer   thenApply的主要目的是转换 thenAccept的主要目的是消费
        integerCompletableFuture.thenAccept(System.out::println);
        System.out.println("===================消费结果 end");


        System.out.println("===================并行组合 start");
        final CompletableFuture<Integer> a = CompletableFuture.supplyAsync(() -> {
            System.out.println("supplyAsync1");
            return 20;
        });
        final CompletableFuture<Integer> b = CompletableFuture.supplyAsync(() -> {
            System.out.println("supplyAsync2");
            return 10;
        });
        // 等待俩个都完成 然后对他们的结果进行操作 biFunction
        final CompletableFuture<Integer> c = a.thenCombine(b, Integer::sum);
        System.out.println(c.join());
        System.out.println("===================并行组合 end");
        System.out.println("===================选择执行 end");
        final CompletableFuture<String> d = CompletableFuture.supplyAsync(() -> {
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println("supplyAsync1");
            return "fast";
        });
        final CompletableFuture<String> e = CompletableFuture.supplyAsync(() -> {
            try {
                TimeUnit.SECONDS.sleep(2);
            } catch (InterruptedException e1) {
                throw new RuntimeException(e1);
            }
            System.out.println("supplyAsync1");
            return "slow";
        });
        // 那个先完成 就用那个的结果转换
        final CompletableFuture<String> win = d.applyToEither(e, s -> s.concat("win"));
        //消费先完成的任务的结果
        d.acceptEither(e,s->System.out.println("accept either ".concat(s.concat(" win"))));
        System.out.println("win.join() = " + win.join());
        // 只要有任意一个完成就执行后续操作
        d.runAfterEither(e,()-> System.out.println("runAfterEither"));
        System.out.println("===================选择执行 end");


        System.out.println("===================等待所有或者任意 start");
        final CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> "A");
        final CompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> "B");
        final CompletableFuture<String> f3 = CompletableFuture.supplyAsync(() -> "C");

        final CompletableFuture<Void> all = CompletableFuture.allOf(f1, f2, f3);
        all.thenRun(()-> System.out.println(Stream.of(f1,f2,f3).map(CompletableFuture::join).toList()));

        final CompletableFuture<String> cf1 = CompletableFuture.supplyAsync(() -> {
            try {
                TimeUnit.SECONDS.sleep(3);
            } catch (InterruptedException ex) {
                throw new RuntimeException(ex);
            }
            return "first";
        });

        final CompletableFuture<String> cf2 = CompletableFuture.supplyAsync(() -> {
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException ex) {
                throw new RuntimeException(ex);
            }
            return "last";
        });

        final CompletableFuture<Object> any = CompletableFuture.anyOf(cf1, cf2);;
        any.thenAccept(System.out::println);
        any.join();
        System.out.println("===================等待所有或者任意 start");
    }
}
```

### 错误处理

```java
public class CompletableFutureException {
    public static void main(String[] args) {
         CompletableFuture.supplyAsync(
                () -> {
                    throw new RuntimeException("boom");
                }
        ).exceptionally(ex->"fallback").thenAccept(System.out::println);

         CompletableFuture.supplyAsync(
                () -> {
                    if (true) {
                        throw new RuntimeException("boom");
                    }
                    return "res";
                }
         ).handle((res,ex)->{
             if (ex!=null){
                 log.error(String.valueOf(ex));
             }
             return res;
         }).thenAccept(System.out::println);

        //  类似于handle 但是不能改变结果 只能用于日志、清理等副作用
        CompletableFuture.supplyAsync(() -> "Hello")
                .whenComplete((result, ex) -> {
                    if (ex != null) {
                        System.err.println("Failed: " + ex);
                    } else {
                        System.out.println("Success: " + result);
                    }
                })
                .thenAccept(System.out::println);
    }

}
```

### 完成控制

```java
public class CompletableFutureComplete {
    public static void main(String[] args) throws InterruptedException {
        final CompletableFuture<String> future = new CompletableFuture<>();
        final CompletableFuture<Void> voidCompletableFuture = CompletableFuture.runAsync(() -> {
            try {
                TimeUnit.SECONDS.sleep(2);
                // true 表示是手动完成的  false表示原本就已经完成了 这里complete了不会影响原任务的继续执行，但是后续结果不会影响当前任务了
                final boolean complete = future.complete("手动完成");
                if (complete) {
                    System.out.println("time out manual complete");
                }
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        });
        voidCompletableFuture.join();

        final CompletableFuture<String> future1 = new CompletableFuture<>();
        CompletableFuture.runAsync(()->{
            try {
                TimeUnit.SECONDS.sleep(2);
                future1.completeExceptionally(new TimeoutException());
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        });

        // 如果该future 未完成，则将其设置为异常完成 并且后续的 thenApply accept等不会执行  但是exceptionally会执行
        final CompletableFuture<String> exceptionally = future1.thenApply(res -> {
                    System.out.println("this will not print! ");
                    return res;
                })
                .exceptionally(e -> {
                    System.out.println("exceptionally ");
                    return "exception default";
                });

        System.out.println(exceptionally.join());

        final ExecutorService executorService = Executors.newSingleThreadExecutor();

        final CompletableFuture<Void> future2 = CompletableFuture.runAsync(() -> {
            for (int i = 0; i < 10; i++) {
                System.out.println(i);
                try {
                    TimeUnit.SECONDS.sleep(1); //确保有时间被中断
                } catch (InterruptedException e) {
                    System.out.println("thread is interrupted");
                    Thread.currentThread().interrupt(); //重新设置中断标志
                    return;
                }
            }
            System.out.println("任务正常完成");
        }, executorService);

        TimeUnit.SECONDS.sleep(1);
        // true 允许打断正在运行中的任务
        // false 只取消没有开始的任务
        // cancel() 不会中断正在执行的 supplyAsync 或 runAsync 中的代码 只是为了实现future 接口保留
        final boolean cancel = future2.cancel(true);
        System.out.println("cancel = " + cancel);
        executorService.shutdown();
    }
}
```
