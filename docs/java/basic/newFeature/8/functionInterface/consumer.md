# consumer 
consumer 接口是一个函数式接口，它接收一个参数并执行某些操作，但不返回结果。它通常用于需要对输入进行处理但不需要返回值的场景。

`Consumer<T>` 是 Java 8 引入的一个函数式接口，它位于 `java.util.function` 包中。这个接口代表了一个接受单个输入参数并且不返回任何结果的操作。
`Consumer<T>` 接口主要用于对一个给定的参数执行某些操作而不需要返回结果，这样的操作往往是带有副作用的，比如修改外部状态、打印日志等。

### 方法

- `void accept(T t)`：应用在此函数上给定的参数。

此外，`Consumer<T>` 接口还提供了一个默认方法：

- `default Consumer<T> andThen(Consumer<? super T> after)`：返回一个首先对此 `Consumer` 执行，然后对指定的 `Consumer` 执行的组合 `Consumer`。
- 如果在调用过程中任一操作抛出异常，则后续操作不会执行，且将相同的异常抛出。

### 使用示例

下面是一个简单的例子，演示了如何使用 `Consumer` 接口来定义一个打印整数的方法，并结合 `andThen` 方法链式调用多个 `Consumer` 实例。

```java
import java.util.function.Consumer;

public class ConsumerExample {
    public static void main(String[] args) {
        // 定义一个Consumer实例，用于打印字符串信息
        Consumer<String> printUpperCase = str -> System.out.println(str.toUpperCase());

        // 定义另一个Consumer实例，用于打印字符串长度
        Consumer<String> printLength = str -> System.out.println("Length: " + str.length());

        // 使用andThen组合两个Consumer操作
        Consumer<String> printUpperCaseAndLength = printUpperCase.andThen(printLength);

        // 应用组合后的Consumer操作
        printUpperCaseAndLength.accept("hello world");
    }
}
```
