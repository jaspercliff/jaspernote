# intStream

1. 避免装箱拆箱（Performance）：
普通的 `Stream<Integer>` 会把每个数字包装成 Integer 对象。如果处理 100 万个数字，就会产生 100 万个对象。IntStream 直接操作原始的 int，速度更快，内存占用极低。
2. 内置统计工具：它自带了 sum()、average()、max()、min() 等数学方法，而普通的 Stream 并没有这些

只要你在处理的是数字（int, long, double），永远优先选择对应的 IntStream、LongStream 或 DoubleStream

```java
public class IntStreamDemo {
    public static void main(String[] args) {
        //1-4
        IntStream.range(1,5).forEach(System.out::print);
        System.out.println();
        //1-5
        IntStream.rangeClosed(1,5).forEach(System.out::print);
        System.out.println();

        int[] numbers = {2, 4, 6, 8, 10};
        int sum = IntStream.of(numbers).sum();
        System.out.println("sum = " + sum);
        double average = IntStream.of(numbers).average().orElse(0);
        System.out.println("average = " + average);
        int max = IntStream.of(numbers).max().getAsInt();
        System.out.println("max = " + max);
    }
}

```

虽然 IntStream 避免了装箱，但它毕竟是一套对象抽象逻辑。在极极端的性能测试中，传统的 for(int i...) 依然是最快的，因为它的指令最直接，对编译器的内联优化也最友好
