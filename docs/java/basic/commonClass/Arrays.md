# Arrays 

专门用于操作数组（如排序、查找、填充、转换等）。它提供的所有方法都是 静态（static） 的，不需要实例化就能直接使用


```java
@SuppressWarnings({"unused"})
public class Demo {

    public static void main(String[] args) {
        int[] a = {1, 2, 3, 4, 5};
        int[] b = Arrays.copyOf(a, 5);
        System.out.println(Arrays.toString(b));
        // Arrays.asList 无法直接处理 int[]，它会把你得到 List<int[]> 而不是 List<Integer>
        ArrayList<int[]> aList = new ArrayList<>(Arrays.asList(a));

        List<Integer> collect = Arrays.stream(a).boxed().collect(Collectors.toList());
        System.out.println(collect);
    }
}
```
