# Exchanger
在 Java 并发编程中，`Exchanger` 是 `java.util.concurrent` 包提供的一个同步辅助类。它用于在两个线程之间交换数据。这种机制允许两个线程在一个同步点交换各自的数据对象，这可以用于各种并发应用场景，如遗传算法、流水线设计等，或者任何需要在线程之间直接交换信息的场合。

### 主要特性

- **双方交换**：`Exchanger` 允许两个线程在一个同步点交换数据，每个线程提供一些数据给另一个线程并接收对方的数据。
- **可重复使用**：`Exchanger` 对象可以一次又一次地被用于数据交换。

### 核心方法

- **`exchange(V x)`**：当前线程调用此方法并提供一个对象，然后等待另一个线程到达这个交换点，当两个线程都到达后，它们交换数据，然后各自继续执行。

### 使用场景

`Exchanger` 常用于需要在两个工作线程之间交换数据的情况，特别是当任务在执行过程中生成的数据需要在下一步骤之前与另一个任务交换时。例如，在遗传算法中交换遗传信息，在流水线加工中交换处理的中间产品等。

### 示例代码

下面是一个使用 `Exchanger` 的简单示例，展示了两个线程如何交换数据：

```java
import java.util.concurrent.Exchanger;

public class ExchangerExample {
    public static void main(String[] args) {
        final Exchanger<String> exchanger = new Exchanger<>();

        Thread producer = new Thread(() -> {
            try {
                String generatedData = "Data from Producer";
                System.out.println("Producer before exchange: " + generatedData);
                // 交换数据
                generatedData = exchanger.exchange(generatedData);
                System.out.println("Producer after exchange: " + generatedData);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        Thread consumer = new Thread(() -> {
            try {
                String receivedData = "Data from Consumer";
                System.out.println("Consumer before exchange: " + receivedData);
                // 交换数据
                receivedData = exchanger.exchange(receivedData);
                System.out.println("Consumer after exchange: " + receivedData);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        producer.start();
        consumer.start();
    }
}
```

### 注意事项

1. **阻塞行为**：如果一个线程先到达交换点，它将会等待另一个线程到达。这意味着，如果另一个线程由于某种原因无法到达，已到达的线程将会一直等待。
2. **处理中断**：`exchange()` 方法对中断是敏感的，当线程在等待过程中被中断时，它会抛出 `InterruptedException`。
3. **确保配对**：由于 `Exchanger` 是设计用于两个线程的，确保每次使用 `Exchanger` 的是成对的线程，否则可能导致线程永久等待。

通过使用 `Exchanger`，开发者可以方便地在两个线程之间直接交换数据，从而在多线程程序中实现复杂的数据传递和控制逻辑。