# Supplier

Supplier 是一个函数式接口，它位于 java.util.function 包中。它代表一个不接受参数但返回一个结果的函数。
Supplier 接口非常适用于那些只需要生成或提供值而不需要输入的场景。

Supplier 接口的定义

```java
@FunctionalInterface
public interface Supplier<T> {
    T get();
}
```

• get()：该方法没有参数，返回一个类型为 T 的值。

## 典型用途

Supplier 主要用于懒加载（懒初始化）或者延迟计算的场景，也常用于作为流操作中的生成器，或者替代某些工厂模式中的对象创建方法。

## 示例代码

```java
import java.util.function.Supplier;
public class SupplierExample {
    public static void main(String[] args) {
// 示例1：生成一个随机数
        Supplier<Double> randomNumberSupplier = () -> Math.random();
        System.out.println("Random Number: " + randomNumberSupplier.get());

        // 示例2：生成一个固定值
        Supplier<String> helloSupplier = () -> "Hello, World!";
        System.out.println("Message: " + helloSupplier.get());

        // 示例3：懒初始化（懒加载）
        Supplier<String> lazyInitializationSupplier = new Supplier<String>() {
            private String value;

            @Override
            public String get() {
                if (value == null) {
                    value = "This is a lazily initialized value.";
                }
                return value;
            }
        };

        System.out.println("Lazy Initialization: " + lazyInitializationSupplier.get());
    }
}

```

解释

1. 随机数生成：randomNumberSupplier 是一个 Supplier，它返回一个随机数。
2. 固定值：helloSupplier 返回一个固定的字符串 "Hello, World!"。
3. 懒加载：lazyInitializationSupplier 示例展示了如何利用 Supplier 实现懒初始化，只有在调用 get() 方法时，才会初始化和返回值。

常见应用场景

1. 懒加载：Supplier 用于延迟初始化某些对象，直到需要时才进行创建。
2. 流（Streams）操作：在 Java 8 的 Stream API 中，可以通过 Supplier 来生成集合的元素。例如，```Stream.generate(Supplier<T> s)```方法允许通过 Supplier 创建流。
3. 函数式编程：作为一种函数式接口，可以传递给方法进行惰性计算或作为工厂方法的实现。

小结

Supplier 接口非常简洁和有用，特别是在需要懒加载或者仅依赖于不需要输入参数的对象生成场景中。

## 单例模式使用Supplier

```java
package com.jasper.signle;

import java.util.function.Supplier;

public class LazySingleSupplier {
    //   第一次请求时才实例化
    private static final Supplier<LazySingleSupplier> supplier = LazySingleSupplier::new;
    private LazySingleSupplier() {}
    public static LazySingleSupplier getInstance() {
        return supplier.get();
    }
}

```

```java
package com.jasper.signle;

import java.util.function.Supplier;

public class DoubleCheckSupplierSingle {
    // 使用 Supplier 来管理实例的创建
    private static final Supplier<DoubleCheckSupplierSingle> instanceSupplier = new Supplier<DoubleCheckSupplierSingle>() {
        private volatile DoubleCheckSupplierSingle instance;

        @Override
        public DoubleCheckSupplierSingle get() {
            if (instance == null) {
                synchronized (this) {
                    if (instance == null) {
                        instance = new DoubleCheckSupplierSingle();
                    }
                }
            }
            return instance;
        }
    };

    private DoubleCheckSupplierSingle() {
    }

    // 通过 Supplier 获取单例
    public static DoubleCheckSupplierSingle getInstance() {
        return instanceSupplier.get();
    }
}
```

```java
import java.util.stream.Stream;
import java.util.function.Supplier;

public class StreamGenerateExample {
    public static void main(String[] args) {
        // 创建一个Supplier生成无限的整数流，初始为 1, 2, 3, 4, ...
        Supplier<Integer> integerSupplier = new Supplier<Integer>() {
            private int value = 1;
            
            @Override
            public Integer get() {
                return value++;
            }
        };

        // 使用Stream.generate创建一个流
        Stream<Integer> integerStream = Stream.generate(integerSupplier);

        // 限制流的大小，只取前10个元素
        integerStream.limit(10).forEach(System.out::println);
    }
}
```

