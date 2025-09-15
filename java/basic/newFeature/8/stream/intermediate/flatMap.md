# flatMap

```java
public class FlatMapDemo {
    public static void main(String[] args) {
        // 对每个元素 生成一组新元素 然后将所有元素连起来 为一个没有嵌套的新流
        final List<List<String>> nest = Arrays.asList(Arrays.asList("a", "b"), Arrays.asList("c", "d"));
        final Stream<String> stringStream = nest.stream().flatMap(list -> list.stream().map(String::toUpperCase));
        stringStream.forEach(System.out::println);
    }
}
```