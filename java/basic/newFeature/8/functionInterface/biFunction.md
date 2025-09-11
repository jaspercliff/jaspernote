# BiFunction

类似于function，但是接受俩个参数，返回一个结果的函数式接口

```java
public class BiFunctionDemo {
    public static void main(String[] args) {
        BiFunction<Integer,Integer,Integer> biFunction = Integer::sum;

        final Integer result = biFunction.apply(1, 2);
        System.out.println("result = " + result);
    }
}
```