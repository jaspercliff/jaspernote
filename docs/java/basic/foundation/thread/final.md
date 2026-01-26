# final

In java items with the final modifier cannot be changed!
final class final variables and final methods

- A final class cannot be extended by other classs
- A final variable cannot be reassigned another value
- A final method cannot be overRide
## final 重排序
在Java内存模型中，`final`字段有特殊的处理规则，这些规则旨在减少对`final`字段的读写操作中的重排序，从而保证一致性和安全性。`final`字段的重排序规则确保了对象一旦被构造完成，它的`final`字段就不会被看到改变，即它们对任何线程都是可见的。这意味着，一旦对象的引用被发布，其他线程访问该对象的`final`字段时，保证看到的是构造函数中设置的值。

### `final`字段的重排序规则

Java内存模型对`final`字段提供了两个重要保证：

1. **写入`final`字段的重排序规则**：在构造函数内对一个`final`字段的写入，与随后把这个被构造对象的引用赋值给一个引用变量，这两个操作之间不能重排序。这个规则确保了对象引用为任何线程可见之前，对象的`final`字段已经被正确初始化过。

2. **读取`final`字段的重排序规则**：初次读取包含`final`字段的对象引用，如果是在构造函数完成后发生的，那么看到的任何`final`字段的值都必须是`final`字段被写入的值，就好像这些值在构造对象前就已经确定下来了一样。这意味着，`final`字段一旦在构造器中被初始化完成，并且构造器自身没有把`this`（对象引用）逸出（即在构造器内部有其他线程直接使用到该对象），那么在其他线程中看到的`final`字段的值都将是一致的。

### 为什么`final`字段特殊处理

`final`字段的这种特殊规则主要是为了支持不可变对象的创建，使得在对象构造完成后，它的所有`final`字段保持不变。这对于创建线程安全的不可变对象非常重要，因为一旦一个不可变对象被正确创建，它的状态就不会改变，因此无需进一步同步就可以被多个线程安全地访问。

### 示例

```java
public class FinalFieldExample {
    private final int x;
    private int y;
    public static FinalFieldExample f;

    public FinalFieldExample() {
        x = 3;  // 对final字段的写入
        y = 4;  // 对非final字段的写入
    }

    public static void writer() {
        f = new FinalFieldExample();
    }

    public static void reader() {
        if (f != null) {
            int i = f.x;  // 读取final字段
            int j = f.y;  // 读取非final字段
        }
    }
}
```

在上述代码中，一旦`FinalFieldExample`对象通过`writer`方法构造完成并对外发布，其他线程通过`reader`方法访问`x`（`final`字段）保证看到的是构造函数中设置的值（即3），而`y`（非`final`字段）的值则没有这样的保证。

## QA
```java
final byte b1=1;
final byte b2=3;
byte b3=b1+b2;//不会出错
```
在Java中，`final`关键字用于声明一个常量，表示该变量的值一旦被初始化后就不能被改变。当`final`变量是基本数据类型时，这个变量实际上是一个编译时常量。


`b1`和`b2`都被声明为`final`类型，并且在声明时就被初始化。因此，它们都是编译时常量。当Java编译器在编译时遇到一个表达式，其中包含的全部操作数都是编译时常量时，它会执行常量折叠（constant folding）。这意味着编译器会在编译时直接计算出表达式的结果，而不是在运行时。

因此，在上述代码中，表达式`b1+b2`会在编译时被计算为4，然后这个计算结果（编译时常量）被赋值给`b3`。由于结果是编译时确定的，并且结果值在`byte`类型的有效范围内（-128到127），所以这行代码不会出错。

此外，Java在处理`b1+b2`时，即使`b1`和`b2`都是`byte`类型，它们的和也会首先被提升为`int`类型（这是Java的类型提升规则）。但是，由于`b1`和`b2`都是编译时常量，因此这里的和也是编译时常量，编译器能够确保这个常量值可以被安全地赋值给`byte`类型的变量（假设这个值在`byte`的范围内），所以不需要显式的类型转换。

总之，这段代码之所以不出错，是因为编译器在编译时就计算出了`b1+b2`的结果，并且确认了这个结果可以安全地赋值给一个`byte`类型的变量。这是Java语言规范定义的行为，旨在使得使用`final`常量的表达式在编译时更加高效和确定。