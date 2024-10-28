# Semaphore
`Semaphore`（信号量）是 Java 中 `java.util.concurrent` 包提供的一个同步辅助类，它用于控制对共享资源的访问。信号量管理一组许可证（permits），线程可以通过调用 `acquire()` 方法来获取许可，如果许可不可用，线程则会阻塞直到许可证变得可用。当线程使用完资源后，它必须通过调用 `release()` 方法来释放许可。

### 主要用途

`Semaphore` 主要用于两个目的：

1. **保护资源访问**：确保同时只有固定数量的线程可以访问某个特定资源。
2. **发送信号**：允许一组线程互相等待，通过许可的获取和释放来发送信号。

### 核心方法

- `acquire()`：请求一个许可。如果请求不成功（即许可数量为0），当前线程将被阻塞直到许可证可用。
- `release()`：释放一个许可，增加可用许可证的数量。
- `availablePermits()`：返回当前可用的许可证数量。

### 示例代码

下面是一个使用 `Semaphore` 的简单示例，模拟了一个停车场系统，其中停车位数量有限：

```java
import java.util.concurrent.Semaphore;

public class ParkingLot {
    private final Semaphore semaphore;

    public ParkingLot(int slots) {
        semaphore = new Semaphore(slots);
    }

    public void park(String car) {
        try {
            System.out.println(car + " 尝试停车");
            semaphore.acquire();
            System.out.println(car + " 成功停车");
            Thread.sleep(1000); // 假设停车时长
            semaphore.release();
            System.out.println(car + " 离开停车位");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    public static void main(String[] args) {
        ParkingLot parkingLot = new ParkingLot(5); // 假设有5个停车位

        for (int i = 1; i <= 10; i++) {
            final String car = "Car " + i;
            new Thread(() -> parkingLot.park(car)).start();
        }
    }
}
```

在这个示例中，`Semaphore` 初始化为5，表示停车场有5个停车位。每当一辆车停车时，它尝试获取一个许可；如果停车位已满，该线程将阻塞，直到有车离开并释放一个许可。

### 注意事项

1. **公平性**：可以选择创建一个公平的 `Semaphore`（通过将构造函数的 `fair` 参数设置为 `true`），这样许可的分配就会遵循先进先出的原则，而不是随机的。
2. **释放许可**：一定要在 `finally` 块中调用 `release()` 方法以确保许可被正确释放，这样可以避免死锁。
3. **正确使用**：虽然 `Semaphore` 可以用于多种并发控制场景，但其主要还是用于资源的互斥访问控制，使用时需要谨慎设计逻辑，避免引入并发bug。

`Semaphore` 是一个强大的同步工具，可以在你需要控制并发访问数量时提供大量的帮助。