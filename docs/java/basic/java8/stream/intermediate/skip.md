# skip
skip 方法在 Java Stream API 中主要用于跳过流中的前 n 个元素，返回一个新的流，这个新的流包含了原始流中剩下的元素。
skip 方法通常在以下几种情况下使用：
- `分页`：
当你需要处理大量数据并且只关心某些特定部分时，比如实现数据的分页展示，可以使用 skip 结合 limit 方法来实现。例如，如果你有一组数据要分页显示，每页显示 10 条记录，那么第二页的数据可以通过先跳过前 10 条记录（使用 skip(10)），然后限制接下来的 10 条记录（使用 limit(10)）来获取。
- `过滤数据`：
如果你想要过滤掉数据流开始处的一些特定元素，可以使用 skip 方法。例如，如果一个列表的前几个元素是你不想处理的，你可以使用 skip 方法来忽略这些元素。

```java
public class SkipDemo {
    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(1, 1, 2, 3, 4, 5, 6);
        List<Integer> collect = list.stream().skip(2).collect(Collectors.toList());
        System.out.println("collect = " + collect);


        List<Integer> list1 = Arrays.asList(1, 1, 2, 3, 4, 5, 6);
        int pageNum = 2;
        int pageSize = 3;
        List<Integer> collect1 = list1.stream().skip((pageNum - 1) * pageSize).limit(pageSize).collect(Collectors.toList());
        System.out.println("第二页的数据为" + collect1);
    }
}
//collect = [2, 3, 4, 5, 6]
//第二页的数据为[3, 4, 5]
```