# Collectors

## toMap

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