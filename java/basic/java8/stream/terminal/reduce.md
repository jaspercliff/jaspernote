# reduce
在Java中，`Stream` API提供了一种强大的方式来处理集合数据。`reduce`方法是`Stream` API中的一个重要方法，它用于将流中的元素组合起来，生成一个单一的结果。
`reduce`方法可以接受两种形式的参数：

1. **一个身份元素（identity value）** 和 **一个归约操作（reduction operation）**：
   ``` java
   Optional<U> reduce(U identity, BinaryOperator<U> accumulator)
   ```
   这个形式会返回一个`Optional`对象，包含了通过使用给定的`BinaryOperator`来组合流中元素得到的结果。如果流是空的，则返回
   `Optional.empty()`。

2. **仅仅一个归约操作**：
   ``` java
   U reduce(BinaryOperator<U> accumulator)
   ```
   这个形式没有提供默认值或身份元素，并且如果流为空，则抛出`NoSuchElementException`异常。

``` java
public class ReduceDemo {
    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);

        Integer reduce = list.stream().reduce(3, Integer::sum);
        System.out.println("reduce = " + reduce);

        Optional<Integer> reduce1 = list.stream().reduce((a, b) -> a * b);
        System.out.println("reduce1 = " + reduce1);

        Integer reduce2 = list.stream().reduce(3, (a, b) -> a * b);
        System.out.println("reduce2 = " + reduce2);
    }
}
```

在这个例子中，我们首先创建了一个包含一些整数的列表。然后，我们使用`reduce`
方法计算了这些数的总和，并且还计算了它们的乘积。注意，在计算乘积的时候，因为我们没有提供初始值，所以使用了`Optional`
来处理可能的空流情况。

`reduce`方法的一个关键特性是它能够支持并行流的处理，因为它的操作是无副作用并且可以结合的，这使得它非常适合于并行执行。