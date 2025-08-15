# function 
Java 8 引入了 `Function` 接口作为其函数式编程特性的一部分。`Function` 接口是 Java 8 中新增的重要功能之一，它允许你编写简洁且易于理解的代码。下面是对 `Function` 接口的详细介绍：

### Function 接口简介
`Function` 接口定义了一个从一种类型转换为另一种类型的函数。它包含一个抽象方法 `apply()`，该方法接受一个参数并返回一个结果。接口定义如下：
```java
@FunctionalInterface
public interface Function<T, R> {
    R apply(T t);
}
```
这里 `T` 是输入参数的类型，`R` 是返回值的类型。
### 基本使用
你可以使用 `Function` 接口来创建一个简单的转换函数，例如将字符串转换为整数：
```java
import java.util.function.Function;

public class FunctionExample {
    public static void main(String[] args) {
        Function<String, Integer> stringToInteger = Integer::valueOf;
        
        String numberAsString = "123";
        Integer numberAsInteger = stringToInteger.apply(numberAsString);
        
        System.out.println("Converted integer: " + numberAsInteger);
    }
}
```

### 方法引用

如果你有一个现有的方法可以用来实现 `Function` 接口，可以使用方法引用来简化代码：

```java
import java.util.function.Function;

public class MethodReferenceExample {
    public static int toInteger(String s) {
        return Integer.parseInt(s);
    }

    public static void main(String[] args) {
        Function<String, Integer> stringToInteger = MethodReferenceExample::toInteger;
        
        String numberAsString = "456";
        Integer numberAsInteger = stringToInteger.apply(numberAsString);
        
        System.out.println("Converted integer: " + numberAsInteger);
    }
}
```

### 链接多个函数

你可以链接多个 `Function` 实例来创建更复杂的转换流程。例如，可以先将字符串转换为整数，然后再将整数转换为字符串：

```java
import java.util.function.Function;

public class ChainFunctionExample {
    public static void main(String[] args) {
        Function<String, Integer> stringToInteger = Integer::valueOf;
        Function<Integer, String> integerToString = Integer::toString;
        
        String numberAsString = "789";
        Integer numberAsInteger = stringToInteger.apply(numberAsString);
        String numberAsStringAgain = integerToString.apply(numberAsInteger);
        
        System.out.println("Original string: " + numberAsString);
        System.out.println("Converted integer: " + numberAsInteger);
        System.out.println("Converted back to string: " + numberAsStringAgain);
    }
}
```

### 使用预定义的方法

Java 提供了一些预定义的方法，可以直接使用，例如 `String::toUpperCase` 或 `Integer::parseInt`。

### 复合函数

你还可以通过调用 `andThen` 或 `compose` 方法来组合多个 `Function` 对象：

```java
import java.util.function.Function;

public class ComposeFunctionExample {
    public static void main(String[] args) {
        Function<String, Integer> stringToInteger = Integer::valueOf;
        Function<Integer, Integer> multiplyByTwo = i -> i * 2;
        
        // 将字符串转换为整数，然后乘以2
        Function<String, Integer> composedFunction = stringToInteger.andThen(multiplyByTwo);
        
        String numberAsString = "100";
        Integer result = composedFunction.apply(numberAsString);
        
        System.out.println("Result: " + result); // 输出 200
    }
}
```

```java
public class FunctionDemo {
    public static void main(String[] args) {
        Function<String,Integer> stringToInteger  = Integer::valueOf;
        Function<Integer,Integer> integerToInteger = x -> x * x;
        Integer apply = stringToInteger.andThen(integerToInteger).apply("10");
        System.out.println("apply = " + apply);

        Function<Integer,Integer> integerToInteger1 = x -> x * x;
        Function<Integer,Integer> inergerToInteger2 = x -> x + x;

        Function<Integer,Integer> andThen = integerToInteger1.andThen(inergerToInteger2);
        Function<Integer,Integer> compose = integerToInteger1.compose(inergerToInteger2);

        Integer addThenResult= andThen.apply(10);
        System.out.println("addThenResult = " + addThenResult); // 200
        Integer composeResult = compose.apply(10);
        System.out.println("composeResult = " + composeResult);//400
    }
}
```
compose：先执行前一个函数，再执行当前函数。
andThen：先执行当前函数，再执行后一个函数。

## identity
在Java 8中，`Function.identity()` 是一个静态方法，它返回一个特殊的函数实例，
这个实例会作为标识函数来使用。标识函数的特点是它返回的值与传入的参数相同，即对于任何输入`x`，都有`f(x) = x`。

这个方法通常用于当你需要一个函数对象，但实际上并不需要对输入进行任何处理的时候。
这样的场景可能出现在集合流操作中，例如当你要创建一个映射但是实际上不需要改变元素本身的时候。

``` java
Student a = new Student().setName("jasper").setAge("18");
Student a1 = new Student().setName("jasper").setAge("18");
Student b = new Student().setName("jasper1").setAge("18");
Student c = new Student().setName("jasper2").setAge("18");

List<Student> list = Arrays.asList(a, a1, b, c);
Map<String, Student> collect1 = list.stream().collect(Collectors.toMap(Student::getName, Function.identity(), (e, f) -> e));
System.out.println("collect1 = " + collect1);

```