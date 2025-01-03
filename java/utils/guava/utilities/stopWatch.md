`Stopwatch` 是 Guava 库中提供的一种用于测量代码执行时间的工具类。它可以帮助开发者轻松地记录和计算代码片段的执行时间。

### 使用方法

1. **创建 Stopwatch 实例**：

   ```java
   import com.google.common.base.Stopwatch;

   Stopwatch stopwatch = Stopwatch.createStarted();
   ```
2. **开始计时**：
   如果需要手动控制开始计时点，可以先创建未启动的 `Stopwatch`，然后调用 `start()` 方法来开始计时。

   ```java
   Stopwatch stopwatch = Stopwatch.createUnstarted();
   stopwatch.start();
   ```
3. **停止计时**：
   调用 `stop()` 方法可以停止计时。

   ```java
   stopwatch.stop();
   ```
4. **获取经过的时间**：
   可以通过多种方式获取经过的时间，包括但不限于 `elapsed()` 方法，它可以返回从开始到现在的总时间（即使已经停止）。

   ```java
   long elapsedTimeMillis = stopwatch.elapsed(TimeUnit.MILLISECONDS);
   ```
5. **重置计时器**：
   如果想重新开始计时，可以调用 `reset()` 方法来重置 `Stopwatch`。

   ```java
   stopwatch.reset();
   ```
6. **持续计时**：
   即使在停止后，再次启动 `Stopwatch` 会继续之前的计时，而不是重新开始。

   ```java
   stopwatch.start(); // 继续计时
   ```
7. **使用上下文管理**：
   在 Java 8 及以上版本中，可以使用 try-with-resources 语法来自动管理 `Stopwatch` 的生命周期（虽然 `Stopwatch` 并不实现 `AutoCloseable` 接口，但可以通过自定义实现达到类似效果）。

   ```java
   try (Stopwatch stopwatch = new Stopwatch()) {
       // 执行代码
       stopwatch.start();
       // ...
       // 当退出try块时，stopwatch将被自动停止
   }
   ```

### 示例

下面是一个简单的示例，演示如何使用 `Stopwatch` 来测量一段代码的执行时间：

```java
import com.google.common.base.Stopwatch;
import java.util.concurrent.TimeUnit;

public class StopwatchExample {
    public static void main(String[] args) {
        Stopwatch stopwatch = Stopwatch.createStarted();

        // 假设这是要测量的部分
        for (int i = 0; i < 1000000; i++) {
            Math.random(); // 做一些计算
        }

        stopwatch.stop();
        System.out.println("Total time elapsed: " + stopwatch.elapsed(TimeUnit.MILLISECONDS) + " ms");
    }
}
```

### 注意事项

- `Stopwatch` 不是线程安全的，如果你在一个多线程环境中使用它，你需要确保在每个线程中都有独立的 `Stopwatch` 实例或者适当同步它的访问。

```java
package com.jasper;

import com.google.common.base.Stopwatch;

import java.util.concurrent.TimeUnit;

/**

* @Author jasper
* @Date 2024-08-20
* @version 1.0
* @description stopwatch learn
  */
  public class StopWatchDemo {
  public static void main(String[] args) {
  Stopwatch stopwatch = Stopwatch.createStarted();
  System.out.println("stopwatch = " + stopwatch);
  for (int i = 0; i < 10000; i++) {
  Math.random();
  }
  System.out.println("stopwatch.isRunning() = " + stopwatch.isRunning());
  stopwatch.stop();
  System.out.println("after stop stopwatch.isRunning() = " + stopwatch.isRunning());
  long elapsed = stopwatch.elapsed(TimeUnit.MILLISECONDS);
  System.out.println("elapsed = " + elapsed+"ms");

  System.out.println("elapsed = " + elapsed);

  System.out.println("stopwatch = " + stopwatch);
  Stopwatch reset = stopwatch.reset();
  System.out.println("reset = " + reset);
  }
  }
```

```java
stopwatch = 81.40 μs
stopwatch.isRunning() = true
after stop stopwatch.isRunning() = false
elapsed = 57ms
elapsed = 57
stopwatch = 57.52 ms
reset = 0.000 ns
```
