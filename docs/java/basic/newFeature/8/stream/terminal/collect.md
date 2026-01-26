# collect

## Collectors.toMap

`Collectors.toMap()` 是 Java 8 中引入的一个工具方法，用于将流中的元素收集成一个 `Map`。它属于 `Collectors` 类，该类提供了许多收集器（Collector）来汇总流中的元素。

`toMap()` 方法有几种重载形式，具体取决于你需要如何构建 `Map`。下面是几个常见的用法：

1. **无冲突检查的基本形式**：
   ```java
   Map<KeyType, ValueType> result = stream.collect(Collectors.toMap(
       keyMapper,
       valueMapper
   ));
   ```
   这个形式接受两个参数：
    - `keyMapper`：一个函数，用于从流中的元素产生键。
    - `valueMapper`：一个函数，用于从流中的元素产生值。

2. **解决键冲突的形式**：
   ```java
   Map<KeyType, ValueType> result = stream.collect(Collectors.toMap(
       keyMapper,
       valueMapper,
       mergeFunction
   ));
   ```
   这个形式除了上面两个参数外，还接受第三个参数：
    - `mergeFunction`：一个二元操作符（BiFunction），用于合并具有相同键的两个值。当流中有多个元素映射到同一个键时，这个函数会被用来决定存储哪个值。

3. **使用已有的Map实现形式**：
   ```java
   Map<KeyType, ValueType> result = stream.collect(Collectors.toMap(
       keyMapper,
       valueMapper,
       mergeFunction,
       mapSupplier
   ));
   ```
这个形式除了前三个参数外，还接受第四个参数：
- `mapSupplier`：一个函数，用于创建要收集到的 `Map` 类型。默认情况下，它会使用 `HashMap`。

### 示例

如果我们想要根据每个人的名字来创建一个 `Map`，其中键是名字，值是 `Person` 对象，我们可以这样做：

``` java
Student a = new Student().setName("jasper").setAge("18");
Student a1 = new Student().setName("jasper").setAge("18");
Student b = new Student().setName("jasper1").setAge("18");
Student c = new Student().setName("jasper2").setAge("18");

List<Student> list = Arrays.asList(a, a1, b, c);
Map<String, Student> collect1 = list.stream().collect(Collectors.toMap(Student::getName, Function.identity(), (e, f) -> e));
System.out.println("collect1 = " + collect1);

Map<String, Student> collect2 = list.stream().
collect(Collectors.toMap(Student::getName, Function.identity(), (e, f) -> e,LinkedHashMap::new));
System.out.println("collect2 = " + collect2);

```


## Collectors.groupingBy

`Stream.groupingBy` 是 Java 8 中引入的一个非常有用的方法，它位于 `java.util.stream.Collectors` 类中。这个方法用于将流中的元素根据某个条件（或属性）进行分组，并返回一个 `Map`，其中键是分组的依据，值则是与该键对应的元素集合。

### 基本用法

`groupingBy` 方法的基本形式如下：

```java
Map<K, List<T>> map = stream.collect(Collectors.groupingBy(classifier));
```

这里：
- `K` 表示键的类型。
- `T` 表示流中元素的类型。
- `classifier` 是一个函数，用于确定如何对每个元素进行分组。这个函数通常是一个 lambda 表达式或方法引用，返回值决定元素应该归入哪个组。

### 进阶用法

除了基本的分组功能外，`groupingBy` 还支持更复杂的操作，例如使用 `Collectors` 的其他方法来进一步处理每个分组的结果：

#### 使用 `counting()` 计算每个组的数量

```java
Map<Integer, Long> countByAge = people.stream()
    .collect(Collectors.groupingBy(Person::getAge, Collectors.counting()));
```
#### 使用 `reducing()` 或 `summingInt()` 等聚合函数

```java
Map<Integer, Integer> totalAgeByAgeGroup = people.stream()
    .collect(Collectors.groupingBy(Person::getAge, 
        Collectors.summingInt(Person::getAge)));
```
这些例子展示了 `groupingBy` 的灵活性和强大功能，能够满足多种数据处理需求。

```java
public class GroupingByDemo {
   public static void main(String[] args) {
      List<Cup> list = Arrays.asList(
              new Cup("hh", 1),
              new Cup("bb", 1),
              new Cup("gg", 1),
              new Cup("cc", 2)
      );
      Map<Integer, List<Cup>> collect = list.stream().collect(Collectors.groupingBy(Cup::getHigh));
      System.out.println("collect = " + collect);

      Map<Integer, Long> collect1 = list.stream().collect(Collectors.groupingBy(Cup::getHigh, Collectors.counting()));
      System.out.println("collect1 = " + collect1);

      Map<Integer, IntSummaryStatistics> collect2 = list.stream().collect(Collectors.groupingBy(Cup::getHigh, Collectors.summarizingInt(Cup::getHigh)));
      System.out.println("collect2 = " + collect2);
   }
}
//collect = {1=[Cup(name=hh, high=1), Cup(name=bb, high=1), Cup(name=gg, high=1)], 2=[Cup(name=cc, high=2)]}
//collect1 = {1=3, 2=1}
//collect2 = {1=IntSummaryStatistics{count=3, sum=3, min=1, average=1.000000, max=1}, 2=IntSummaryStatistics{count=1, sum=2, min=2, average=2.000000, max=2}}
```

## partitioningBy

`partitioningBy` 是 `Collectors` 类中的一个静态方法，用于将流中的元素根据某个条件进行二元分区。
它返回一个 `Map<Boolean, List<T>>`，其中键是布尔值（`true` 或 `false`），值是满足条件或不满足条件的元素列表。


## Collectors.collectingAndThen
Collectors.collectingAndThen 它允许你在收集完结果之后，对结果再做一次转换或处理

```java
Map<String, Integer> countMap = list.stream()
    .collect(Collectors.groupingBy(
        Person::getName,
        Collectors.collectingAndThen(Collectors.counting(), Long::intValue)
    ));
```