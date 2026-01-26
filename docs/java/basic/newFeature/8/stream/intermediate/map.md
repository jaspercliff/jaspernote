# map

map 方法用于将一个流中的元素转换为另一种形式。它接受一个函数作为参数，这个函数被应用到流的每个元素上，将其映像成一个新的形式。结果是一个包含新形式元素的新流
```java
public class MapDemo {
    public static void main(String[] args) {
        // 将流中的元素转换为另外一种形式 接受一个Function,应用到每个元素
        final List<String> list = Arrays.asList("1", "2", "3");
        final Stream<Integer> integerStream = list.stream().map(Integer::parseInt);
        integerStream.forEach(System.out::println);
    }
}
```