# Atomic类
Java并发包（Java Util Concurrent，简称JUC）中的原子类（Atomic）是构建非阻塞算法的基础，提供了一种用法简单、性能高效、线程安全的更新变量的方式。
这些类位于`java.util.concurrent.atomic`包下，主要利用CAS（Compare-And-Swap）机制来保证变量操作的原子性。

### CAS机制简介
CAS操作包含三个操作数：内存位置（V）、预期原值（A）和新值（B）。如果内存位置的值与预期原值相匹配，
那么处理器会自动将该位置值更新为新值。CAS是一种无锁的非阻塞算法的实现基础。

### 原子类的分类
原子类大致可以分为四类：

1. **基本类型**：如`AtomicInteger`、`AtomicLong`、`AtomicBoolean`，用于基本数据类型的原子操作。
2. **数组类型**：如`AtomicIntegerArray`、`AtomicLongArray`、`AtomicReferenceArray`，用于数组中元素的原子操作。
3. **引用类型**：如`AtomicReference`、`AtomicStampedReference`、`AtomicMarkableReference`，用于对象引用的原子操作，`AtomicStampedReference`和`AtomicMarkableReference`提供了一种解决ABA问题的方法。
4. **字段更新器**：如`AtomicIntegerFieldUpdater`、`AtomicLongFieldUpdater`、`AtomicReferenceFieldUpdater`，用于对象的某个字段的原子操作。

### 核心原子类简介
- **`AtomicInteger`与`AtomicLong`**：
  提供了基本数据类型`int`和`long`的原子操作。
- 常见方法有`get()`、`set(int newValue)`、`getAndIncrement()`、`incrementAndGet()`、`getAndAdd(int delta)`、`addAndGet(int delta)`等。

- **`AtomicBoolean`**：
  提供了`boolean`值的原子操作。常见方法有`get()`、`set(boolean newValue)`、`compareAndSet(boolean expect, boolean update)`等。

- **`AtomicReference`**：
  提供了对对象引用的原子操作。常用方法包括`get()`、`set(T newValue)`、`compareAndSet(T expect, T update)`等。

- **`AtomicIntegerArray`、`AtomicLongArray`和`AtomicReferenceArray`**：
  提供了对数组中元素进行原子操作的能力。常见方法有`get(int i)`、`set(int i, T newValue)`、`getAndSet(int i, T newValue)`等。

### 使用场景和好处
原子类主要用于实现高性能的并发算法和数据结构，如计数器、累加器、循环标记等场景。使用原子类可以避免synchronized的高开销，实现更细粒度的锁控制，从而提高系统的并发性能。

### 注意事项
- 尽管原子类提高了并发操作的性能，但在某些高度竞争的场景中，频繁的CAS操作可能会导致性能瓶颈。
- 原子类不能替代所有的同步操作，对于复合操作（比如条件判断加上操作）仍然需要使用锁或其他同步机制。

这就是JUC原子类的基本概念和使用方法。了解这些基础知识，可以帮助你在实际开发中更好地利用Java的并发工具来提高程序的性能和并发度。

### 示例代码
让我们通过一些基本的代码示例来详细了解JUC原子类的使用方法和场景。

### 1. 使用`AtomicInteger`
`AtomicInteger`提供了一种线程安全的方式来操作单个`int`值。它是通过CAS来实现的。

```java
import java.util.concurrent.atomic.AtomicInteger;

public class AtomicIntegerExample {
    public static void main(String[] args) {
        AtomicInteger atomicInteger = new AtomicInteger(0);

        // 获取当前的值
        System.out.println("当前值: " + atomicInteger.get());

        // 设置值
        atomicInteger.set(10);
        System.out.println("设置后的值: " + atomicInteger.get());

        // 获取当前的值，并设置新的值
        int oldValue = atomicInteger.getAndSet(5);
        System.out.println("旧值: " + oldValue + ", 新值: " + atomicInteger.get());

        // 自增并返回新值
        int newValue = atomicInteger.incrementAndGet();
        System.out.println("自增后的值: " + newValue);

        // 自增后返回旧值
        oldValue = atomicInteger.getAndIncrement();
        System.out.println("自增前的旧值: " + oldValue + ", 当前值: " + atomicInteger.get());

        // 添加到当前值并返回新值
        newValue = atomicInteger.addAndGet(5);
        System.out.println("添加后的值: " + newValue);

        // 如果当前值==预期值，则以原子方式将该值设置为给定的更新值
        boolean updated = atomicInteger.compareAndSet(11, 20);
        System.out.println("是否成功更新: " + updated + ", 当前值: " + atomicInteger.get());
    }
}
```

### 2. 使用`AtomicReference`
`AtomicReference`提供了一种线程安全的方式来操作对象引用。

```java
import java.util.concurrent.atomic.AtomicReference;

public class AtomicReferenceExample {
    static class Person {
        String name;

        Person(String name) {
            this.name = name;
        }
    }

    public static void main(String[] args) {
        AtomicReference<Person> atomicReference = new AtomicReference<>(new Person("John"));

        Person newPerson = new Person("Doe");
        // 设置新的对象引用
        atomicReference.set(newPerson);

        // 比较并设置：如果当前引用是expect，则更新为update
        atomicReference.compareAndSet(newPerson, new Person("Jane"));
        System.out.println("更新后的对象引用的名字: " + atomicReference.get().name);
    }
}
```

### 3. 使用`AtomicIntegerFieldUpdater`
`AtomicIntegerFieldUpdater`用于原子更新对象的`int`字段，这个字段必须使用`volatile`修饰符声明。

```java
import java.util.concurrent.atomic.AtomicIntegerFieldUpdater;

public class AtomicIntegerFieldUpdaterExample {
    static class Candidate {
        volatile int score;
    }

    public static void main(String[] args) {
        AtomicIntegerFieldUpdater<Candidate> updater = AtomicIntegerFieldUpdater.newUpdater(Candidate.class, "score");
        Candidate candidate = new Candidate();

        // 以原子方式将给定值添加到字段
        updater.addAndGet(candidate, 10);
        System.out.println("分数更新后: " + candidate.score);

        // 如果当前值==预期值，则以原子方式将该字段设置为给定的更新值
        boolean updated = updater.compareAndSet(candidate, 10, 20);
        System.out.println("是否成功更新: " + updated + ", 当前分数: " + candidate.score);
    }
}
```

通过这些示例，你可以看到JUC原子类如何在并发编程中提供线程安全的变量操作，
以及它们如何利用CAS机制来实现高效的同步。这些原子类是构建高性能并发应用的重要工具。

要体验线程安全性，我们可以通过创建多个线程来同时更新相同的对象或变量，然后验证最终结果是否符合预期。
以下是对之前例子的重写，以展示`AtomicInteger`、`AtomicReference`和`AtomicIntegerFieldUpdater`在多线程环境下的线程安全性。

### 1. 使用`AtomicInteger`
```java
import java.util.concurrent.atomic.AtomicInteger;

public class AtomicIntegerExample {
    private static final AtomicInteger atomicInteger = new AtomicInteger(0);

    public static void main(String[] args) throws InterruptedException {
        Runnable task = () -> {
            for (int i = 0; i < 1000; i++) {
                atomicInteger.incrementAndGet();
            }
        };

        Thread t1 = new Thread(task);
        Thread t2 = new Thread(task);

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println("Expected 2000, Actual: " + atomicInteger.get()); // 应该输出2000
    }
}
```
为了演示数组类型原子类的线程安全性，我们将使用`AtomicIntegerArray`。这个示例将创建多个线程，每个线程都会对数组中的元素进行一系列的原子操作，以展示最终结果的一致性和预期性，从而证明其线程安全性。

### 2. 使用`AtomicIntegerArray`

我们将创建一个包含10个元素的`AtomicIntegerArray`，并启动多个线程同时增加数组中每个元素的值。通过这个过程，你可以体验到数组类型原子类如何在并发场景下保持线程安全。

```java
import java.util.concurrent.atomic.AtomicIntegerArray;

public class AtomicIntegerArrayExample {
    private static final int SIZE = 10;
    private static final AtomicIntegerArray atomicArray = new AtomicIntegerArray(SIZE);

    public static void main(String[] args) throws InterruptedException {
        Runnable incrementTask = () -> {
            for (int i = 0; i < atomicArray.length(); i++) {
                atomicArray.getAndIncrement(i); // 对数组的每个元素执行自增操作
            }
        };

        // 创建并启动5个线程
        Thread[] threads = new Thread[5];
        for (int i = 0; i < threads.length; i++) {
            threads[i] = new Thread(incrementTask);
            threads[i].start();
        }

        // 等待所有线程完成
        for (Thread t : threads) {
            t.join();
        }

        // 打印每个元素的最终值
        System.out.println("Final values in the array:");
        for (int i = 0; i < atomicArray.length(); i++) {
            System.out.println("Element at index " + i + ": " + atomicArray.get(i));
        }
        // 由于有5个线程，每个线程对数组的每个元素执行了一次自增操作，所以最终每个元素的值应为5。
    }
}
```

在这个例子中，我们定义了一个大小为10的`AtomicIntegerArray`，然后创建了5个线程，每个线程对数组中的每个元素进行自增操作。因为所有操作都是通过`AtomicIntegerArray`的原子方法执行的，所以即使多个线程并发修改数组元素，每个元素的最终值也将准确地反映出总的增量操作次数，这里是5次。这样就通过`AtomicIntegerArray`演示了如何在并发编程中安全地处理整数数组，确保数据的一致性和线程安全。
### 3. 使用`AtomicReference`
```java
import java.util.concurrent.atomic.AtomicReference;

public class AtomicReferenceExample {
    static class Person {
        String name;

        Person(String name) {
            this.name = name;
        }
    }

    private static final AtomicReference<Person> atomicReference = new AtomicReference<>(new Person("John"));

    public static void main(String[] args) throws InterruptedException {
        Runnable updateTask = () -> atomicReference.set(new Person("Jane"));

        Thread t1 = new Thread(updateTask);
        Thread t2 = new Thread(updateTask);

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println("Current Name: " + atomicReference.get().name); // 应该输出Jane
    }
}
```

### 4. 使用`AtomicIntegerFieldUpdater`
```java
import java.util.concurrent.atomic.AtomicIntegerFieldUpdater;

public class AtomicIntegerFieldUpdaterExample {
    static class Candidate {
        volatile int score;
    }

    private static final AtomicIntegerFieldUpdater<Candidate> updater = AtomicIntegerFieldUpdater.newUpdater(Candidate.class, "score");
    private static final Candidate candidate = new Candidate();

    public static void main(String[] args) throws InterruptedException {
        Runnable incrementScoreTask = () -> {
            for (int i = 0; i < 1000; i++) {
                updater.getAndIncrement(candidate);
            }
        };

        Thread t1 = new Thread(incrementScoreTask);
        Thread t2 = new Thread(incrementScoreTask);

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println("Expected 2000, Actual: " + candidate.score); // 应该输出2000
    }
}
```

在这些例子中，我们创建了两个线程来并发地执行更新操作。对于`AtomicInteger`和`AtomicIntegerFieldUpdater`，每个线程执行1000次自增操作，期望最后的结果是2000。对于`AtomicReference`，尽管更新操作是由多个线程执行的，但使用`AtomicReference`确保了引用更新操作的原子性。
这些例子展示了在多线程环境下，JUC原子类如何保证操作的原子性和线程安全性。

## ABA
ABA问题是在并发编程中使用CAS（比较并交换）操作时可能遇到的问题。它发生在一个线程读取某个值`A`，准备将这个值更新为`B`时，
另一个线程也修改了这个值，但最终又将其改回了原始值`A`。当第一个线程继续进行CAS操作时，它看到的值仍然是`A`，
因此认为这个值没有被其他线程改变过，进而成功完成CAS操作。这可能会导致第一个线程漏掉中间的状态变化，进而基于错误的假设执行操作。

为了解决ABA问题，`java.util.concurrent`包提供了`AtomicStampedReference`类。这个类通过维护每个变量的“版本号”或“时间戳”来解决ABA问题，
每次变量更新时，除了更新变量的值外，还会更新这个时间戳。因此，即使变量的值被改回了原始值，时间戳的改变也能防止发生ABA问题。
初始状态：账户余额为100元。
操作序列：
线程A读取账户余额，得到100元，准备增加50元。
在线程A操作之前，线程B也读取了账户余额100元，并决定将余额转移给另一个账户，余额变为0。
然后线程B又将100元存回同一个账户，账户余额再次变为100元。
线程A执行其CAS操作，因为它检测到账户余额仍然是其最初读取的100元，所以它认为账户状态没有变化，进而将余额更新为150元。
### `AtomicStampedReference`示例

下面的示例展示了如何使用`AtomicStampedReference`来避免ABA问题：

```java
import java.util.concurrent.atomic.AtomicStampedReference;

public class AtomicStampedReferenceExample {
    public static void main(String[] args) throws InterruptedException {
        String initialRef = "initial value";
        int initialStamp = 0;

        AtomicStampedReference<String> atomicStampedRef = new AtomicStampedReference<>(initialRef, initialStamp);

        String newRef = "new value";
        int newStamp = initialStamp + 1;

        // 模拟线程A
        Thread threadA = new Thread(() -> {
            int stamp = atomicStampedRef.getStamp();
            System.out.println("Thread A initial stamp: " + stamp);
            atomicStampedRef.compareAndSet(initialRef, newRef, stamp, stamp + 1);
            System.out.println("Thread A new value: " + atomicStampedRef.getReference());
        });

        // 模拟线程B
        Thread threadB = new Thread(() -> {
            try {
                Thread.sleep(50); // 确保线程A先执行
                int stamp = atomicStampedRef.getStamp();
                System.out.println("Thread B initial stamp: " + stamp);
                atomicStampedRef.compareAndSet(newRef, initialRef, stamp, stamp + 1);
                stamp = atomicStampedRef.getStamp();
                System.out.println("Thread B reverted to initial value, new stamp: " + stamp);
                atomicStampedRef.compareAndSet(initialRef, "final value", stamp, stamp + 1);
                System.out.println("Thread B final value: " + atomicStampedRef.getReference());
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        threadA.start();
        threadB.start();

        threadA.join();
        threadB.join();

        System.out.println("Final reference: " + atomicStampedRef.getReference() + ", final stamp: " + atomicStampedRef.getStamp());
    }
}
```

在这个示例中，`AtomicStampedReference`使用一个时间戳（或称为“stamp”）来跟踪每次修改。即使值被修改回了原始值，时间戳也会不同，从而使得尝试基于旧时间戳的CAS操作失败，避免了ABA问题。这种方法特别适用于需要解决或避免ABA问题的场景，提供了一种更安全的并发修改方式。