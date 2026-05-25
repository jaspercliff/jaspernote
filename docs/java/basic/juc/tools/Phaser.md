# Phaser
`Phaser`（阶段同步器）是 Java 并发包 `java.util.concurrent` 中提供的一个同步辅助类，它用于协调多个线程间的复杂多阶段任务的执行。`Phaser` 是在 Java 7 中引入的，其功能类似于 `CyclicBarrier` 和 `CountDownLatch`，但提供了更灵活的控制和动态的线程参与管理。

### 主要特性

- **多阶段执行**：`Phaser` 支持多阶段计算的执行，每个阶段结束时可以进行同步。
- **动态线程管理**：新的参与者可以在任何阶段注册到 `Phaser` 中，也可以随时撤销注册，这使得线程的动态加入和退出成为可能。
- **可重用**：与 `CyclicBarrier` 类似，`Phaser` 在达到一定的同步点后可以重复使用，支持为接下来的阶段重新配置。

### 核心方法

- **`register()`**：注册一个未参与的线程，使其能够参与 `Phaser` 同步。
- arrive(): 到了 但是不等待别的线程 起一个通知的作用
- **`arriveAndAwaitAdvance()`**：当前线程到达，并等待其他线程到达同步点。
- **`arriveAndDeregister()`**：表示当前线程已完成所有阶段的执行，并从 `Phaser` 中注销，不再参与后续同步。也不会等待其他线程
- **`bulkRegister(int parties)`**：一次性注册多个参与者。

### 示例代码

以下示例演示如何使用 `Phaser` 来协调一组线程的多阶段任务执行。假设我们有一个需要多个线程协作执行多个任务阶段的场景。

```java
import java.util.concurrent.Phaser;

public class PhaserExample {
    public static void main(String[] args) {
        final Phaser phaser = new Phaser(1); // 注册主线程，初始有1个参与者

        System.out.println("启动任务");

        for (int i = 1; i <= 5; i++) { // 创建5个任务
            final int taskNo = i;
            phaser.register(); // 为每个任务注册一个参与者
            new Thread(() -> {
                System.out.println("任务" + taskNo + " 第一阶段执行");
                phaser.arriveAndAwaitAdvance(); // 完成第一阶段并等待

                System.out.println("任务" + taskNo + " 第二阶段执行");
                phaser.arriveAndAwaitAdvance(); // 完成第二阶段并等待

                System.out.println("任务" + taskNo + " 完成");
                phaser.arriveAndDeregister(); // 任务完成，注销
            }).start();
        }

        // 等待所有任务完成第一阶段
        phaser.arriveAndAwaitAdvance();
        System.out.println("所有任务完成第一阶段");

        // 等待所有任务完成第二阶段
        phaser.arriveAndAwaitAdvance();
        System.out.println("所有任务完成第二阶段");

        // 主线程注销，任务全部完成
        phaser.arriveAndDeregister();
        System.out.println("所有任务完成");
    }
}
```
```java
package com.jasper.tools.phaser;

import java.util.concurrent.Phaser;

public class PhaserDemo {

    public static void main(String[] args) {

        Phaser phaser = new Phaser(3);

        // 观察者线程
        new Thread(
                        () -> {
                            int phase = phaser.getPhase();

                            while (!phaser.isTerminated()) {

                                phaser.awaitAdvance(phase);

                                phase = phaser.getPhase();

                                System.out.println(
                                        "\n========== 进入 Phase "
                                                + phase
                                                + " 当前人数:"
                                                + phaser.getRegisteredParties()
                                                + " ==========\n");
                            }
                        })
                .start();

        new Thread(new Player("A", phaser)).start();
        new Thread(new Player("B", phaser)).start();
        new Thread(new Player("C", phaser)).start();
    }
}

class Player implements Runnable {

    private final String name;
    private final Phaser phaser;

    public Player(String name, Phaser phaser) {
        this.name = name;
        this.phaser = phaser;
    }

    @Override
    public void run() {

        try {

            // ================= phase 0 =================

            System.out.println(name + " 加载地图...");
            Thread.sleep(random());

            System.out.println(name + " 地图加载完成");

            phaser.arriveAndAwaitAdvance();

            // ================= phase 1 =================

            System.out.println(name + " 选择英雄...");
            Thread.sleep(random());

            // A 玩家动态拉人
            if ("A".equals(name)) {

                System.out.println("新玩家 D 加入游戏");

                // 动态注册
                phaser.register();

                new Thread(new Player("D", phaser)).start();
            }

            // B 玩家退出
            if ("B".equals(name)) {

                System.out.println(name + " 退出游戏");

                phaser.arriveAndDeregister();

                return;
            }

            System.out.println(name + " 英雄选择完成");

            phaser.arriveAndAwaitAdvance();

            // ================= phase 2 =================

            System.out.println(name + " 开始战斗...");
            Thread.sleep(random());

            // arrive 示例
            System.out.println(name + " 战斗完成，通知系统");

            phaser.arrive();

            System.out.println(name + " 去领取奖励了（不等待别人）");

            // 最终退出
            phaser.arriveAndDeregister();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private long random() {
        return (long) (Math.random() * 2000);
    }
}
```

### 使用注意事项

1. **正确注册和注销**：确保每个参与线程正确注册并在完成后注销。如果忘记注销，`Phaser` 可能无法正常前进到下一个阶段。
2. **管理阶段**：`Phaser` 的 `getPhase()` 方法可以获取当前阶段，这对调试和监控是有帮助的。
3. **动态参与**：`Phaser` 支持动态的线程参与，允许在任何阶段增加或减少线程的数量，这为编写动态的并行程序提供了便利。

`Phaser` 提供的灵活性使其成为处理多阶段任务时的理想选择，尤其是当任务数量或参与线程数可能动态变化时。
