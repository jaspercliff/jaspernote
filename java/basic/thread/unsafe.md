# unsafe
## Atomic
Java中的`Atomic`类是在`java.util.concurrent.atomic`包下，这些类提供了一组原子操作工具类，
使得在单个变量上的操作可以在并行程序中进行线程安全的操作，而无需使用`synchronized`关键字。
这些类利用底层硬件的原子指令，以达到较低的开销和更高的性能，特别是在高并发环境下。

### 常用的Atomic类

以下是一些常用的`Atomic`类及其简要用途：

- **`AtomicBoolean`**：一个布尔值，可以原子更新。
- **`AtomicInteger`**：一个`int`值，可以原子更新。提供了原子的增加、减少、设置等操作。
- **`AtomicLong`**：一个`long`值，可以原子更新。
- **`AtomicReference`**：一个对任意类型对象的引用，可以原子更新。
- **`AtomicIntegerArray`**、**`AtomicLongArray`**、**`AtomicReferenceArray`**：
分别为`int`、`long`和引用类型的数组，其元素可以原子更新。
- **`AtomicIntegerFieldUpdater`**、**`AtomicLongFieldUpdater`**、**`AtomicReferenceFieldUpdater`**：这些是原子更新器， 用于对指定类的指定`volatile`字段进行原子更新。

### 核心功能

- **原子性**：确保变量的修改为原子操作，即要么完全执行，要么完全不执行，不会出现中间状态。
- **可见性**：保证一个线程对共享变量的修改，对其他线程是可见的。
- **有序性**：在没有明确同步的情况下，保证变量操作的有序性。

### 示例：使用`AtomicInteger`

```java
import java.util.concurrent.atomic.AtomicInteger;

public class AtomicExample {
    private AtomicInteger count = new AtomicInteger(0);

    public void increment() {
        count.incrementAndGet(); // 原子地将当前值加1
    }

    public int getCount() {
        return count.get(); // 获取当前值
    }

    public static void main(String[] args) {
        AtomicExample example = new AtomicExample();
        example.increment();
        System.out.println(example.getCount()); // 输出1
    }
}
```

### 为何选择`Atomic`类

- **性能**：对于基本类型的原子操作，`Atomic`类通常比锁更高效。
- **无锁编程**：`Atomic`类的操作基于CAS（Compare-And-Swap）算法实现无锁编程，减少了线程阻塞和唤醒的开销。
- **简化代码**：使用`Atomic`类可以使并发代码更简洁，易于理解和维护。

`Atomic`类在构建高性能并发应用时非常有用，它们使得实现无锁的线程安全操作成为可能。

### AtomicIntegerArray
```java
package com.jasper.cas;

import java.util.concurrent.atomic.AtomicIntegerArray;

public class CourseRegistration {
    private final AtomicIntegerArray courseRegistrations;

    public CourseRegistration(int numberOfCourses) {
        // 有5个课程 然后初始化每个课程的注册人数为0
        this.courseRegistrations = new AtomicIntegerArray(numberOfCourses);
    }

    /**
     * 注册课程
     * @param courseId 课程ID（数组索引）
     */
    public void register(int courseId) {
        // 原子地将选定课程的注册人数加1
        courseRegistrations.incrementAndGet(courseId);
    }

    /**
     * 获取课程的注册人数
     * @param courseId 课程ID（数组索引）
     * @return 该课程的注册人数
     */
    public int getRegistrations(int courseId) {
        return courseRegistrations.get(courseId);
    }

    public static void main(String[] args) throws InterruptedException {
        CourseRegistration registration = new CourseRegistration(5); // 假设有5门课程

        // 模拟多线程环境下的课程注册
        for (int i = 0; i < 10; i++) {
            int courseId = i % 5; // 为了示例简单，这里简单使用模运算模拟课程ID
            new Thread(() -> {
                registration.register(courseId);
                System.out.println("Course " + courseId + " registrations: " + registration.getRegistrations(courseId));
            }).start();
        }
        Thread.sleep(1000);
        System.out.println("registration.courseRegistrations = " + registration.courseRegistrations);
    }
}


```
### AtomicIntegerFieldUpdater
`AtomicIntegerFieldUpdater`是Java中一个有用的工具类，它提供了一种方式来原子地更新某个类的实例的指定`volatile int`字段，而无需将该类的整个字段定义为原子的。这个类在`java.util.concurrent.atomic`包中。它是在那些需要原子操作但又不想使用`AtomicInteger`包装器对象的情况下的理想选择，因为使用包装器会增加额外的内存负担。

#### 使用场景

`AtomicIntegerFieldUpdater`非常适合用于自定义类中的`volatile int`字段的原子操作，
特别是在这些字段表示类的状态或计数器时。例如，你可能有一个表示网络连接数的字段，
或者是一个简单计数器来统计完成的任务数。通过使用`AtomicIntegerFieldUpdater`，
你可以保证这些操作的线程安全性，而不会像在每个操作上同步那样引入重的性能开销。

#### 示例代码

假设你有一个类`Player`，它有一个`score`字段，你想在多线程环境中原子地更新这个分数：

```java
import java.util.concurrent.atomic.AtomicIntegerFieldUpdater;

public class Player {
    // 注意：字段必须是public volatile类型
    public volatile int score;

    // 其他类成员...

    public static void main(String[] args) {
        AtomicIntegerFieldUpdater<Player> scoreUpdater = AtomicIntegerFieldUpdater.newUpdater(Player.class, "score");

        Player player = new Player();

        // 原子地增加玩家的分数
        scoreUpdater.getAndIncrement(player);

        // 原子地增加特定的值
        scoreUpdater.getAndAdd(player, 5);

        // 获取当前分数
        int currentScore = scoreUpdater.get(player);
        System.out.println("Current Score: " + currentScore);
    }
}
```

### 核心点

- **字段必须是`volatile int`类型**：`AtomicIntegerFieldUpdater`只能用于`volatile int`类型的字段，这确保了字段的更改对所有线程立即可见，同时`AtomicIntegerFieldUpdater`利用CAS操作保证了更新操作的原子性。
- **性能优势**：使用`AtomicIntegerFieldUpdater`比单独使用`AtomicInteger`有性能优势，尤其是当你有许多需要原子操作的字段时，因为它减少了对象的内存开销。
- **安全性**：更新器在使用时会检查字段的类型和修改权限，确保只能更新符合要求的字段。如果字段名称错误或字段类型不适用，它会在运行时抛出`Exception`。

通过这种方式，`AtomicIntegerFieldUpdater`提供了一种高效且线程安全的方式来原子地更新对象中的`int`字段，无需为此引入额外的同步机制，从而在高并发场景下提供了良好的性能。