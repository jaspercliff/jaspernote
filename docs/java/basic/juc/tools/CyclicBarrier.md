# CyclicBarrier
`CyclicBarrier` 是 Java 中 `java.util.concurrent` 包提供的一个同步辅助类，它允许一组线程互相等待，
直到所有线程都达到一个公共屏障点（Common Barrier Point）再继续执行。与 `CountDownLatch` 相比，
`CyclicBarrier` 的主要特点是它可以重用，即一旦所有等待线程都被释放，它可以被重置并再次使用。

### 核心特性

- **同步点**：所有线程必须到达屏障点，屏障才会打开，线程才能继续执行。
- **重用性**：一旦所有等待线程释放，`CyclicBarrier` 可以被重置并重新使用。
- **可选的屏障动作**：可以在所有线程到达屏障后执行一个屏障动作，这是一个由最后一个到达的线程执行的 Runnable 任务。

### 使用场景

`CyclicBarrier` 适用于多线程计算数据，数据部分完成后，需要合并计算结果的场景。例如，多线程进行矩阵乘法计算，每个线程计算矩阵中的一部分，然后合并结果。

### 示例代码

下面是一个示例，展示了如何使用 `CyclicBarrier` 来协调多个线程的工作，其中线程完成部分任务后等待其他线程。

```java
import java.util.concurrent.CyclicBarrier;

public class CyclicBarrierExample {
    // 创建一个 CyclicBarrier，设置 3 个线程为参与方，所有线程到达后执行一个屏障动作
    private static final CyclicBarrier barrier = new CyclicBarrier(3, () -> {
        System.out.println("所有任务完成，继续执行下一阶段任务");
    });

    static class Task implements Runnable {
        private String name;

        Task(String name) {
            this.name = name;
        }

        @Override
        public void run() {
            System.out.println(name + " 阶段1执行中...");
            try {
                Thread.sleep((long) (Math.random() * 1000)); // 模拟任务
                System.out.println(name + " 到达屏障点");
                barrier.await(); // 到达屏障点等待其他线程

                System.out.println(name + " 阶段2执行中...");
                Thread.sleep((long) (Math.random() * 1000)); // 模拟第二阶段任务
                System.out.println(name + " 完成任务");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) {
        new Thread(new Task("线程A")).start();
        new Thread(new Task("线程B")).start();
        new Thread(new Task("线程C")).start();
    }
}
```

```java
import java.util.concurrent.CyclicBarrier;

public class MarketSimulation {
    private static final int NUM_AGENTS = 3;  // 假设有三个代理：买家、卖家和监管者
    private static final CyclicBarrier barrier = new CyclicBarrier(NUM_AGENTS, () -> {
        System.out.println("市场同步数据和策略更新...");
    });

    static class Agent implements Runnable {
        private String role;

        Agent(String role) {
            this.role = role;
        }

        @Override
        public void run() {
            try {
                for (int i = 1; i <= 5; i++) {  // 模拟五个交易日
                    System.out.println(role + " 完成第 " + i + " 个交易日的交易");
                    barrier.await();  // 等待其他代理完成
                    System.out.println(role + " 开始第 " + i + " 个交易日的后市场活动");
                }
            } catch (Exception e) {
                System.out.println(role + " 遇到异常");
            }
        }
    }

    public static void main(String[] args) {
        String[] roles = {"买家", "卖家", "监管者"};
        for (String role : roles) {
            new Thread(new Agent(role)).start();
        }
    }
}

```
### 注意事项

1. **异常处理**：如果任何参与线程在等待过程中被中断或超时，或者 `barrier.await()` 调用时 barrier 被重置或损坏，则会抛出相应的异常。这可能包括 `InterruptedException`, `BrokenBarrierException` 或 `TimeoutException`。
2. **屏障破损**：如果在任何线程在屏障处等待时，其中一个线程被中断，所有其他等待线程都将抛出 `BrokenBarrierException`，并且屏障被视为损坏。
3. **重置**：`CyclicBarrier` 提供一个 `reset()` 方法，可以重置屏障到其初始状态。注意，如果有线程在屏障处等待时调用 `reset()`，这些线程将抛出 `BrokenBarrierException`。

`CyclicBarrier` 是一种强大的同步辅助类，非常适合于将多个子任务分段执行的场景。正确使用时，可以有效地协调多线程之间的工作流程和数据整合。