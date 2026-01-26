# stream

Java Stream API 是 Java 8 引入的一个强大的功能，用于处理数据流（如集合内容）的工具。Stream API 可以极大简化对集合的操作，
并且支持函数式编程风格。它提供了很多操作方法，可以分为中间操作（Intermediate operations）和终端操作（Terminal operations）两大类。

### 中间操作（Intermediate operations）

中间操作返回的是一个新的 Stream。这类操作是懒加载的，即它们不会立即执行，只有当终端操作被执行时才会触发整个流水线的执行。

- `filter(Predicate<T> predicate)` - 过滤出符合条件的元素。
- [`map(Function<T, R> mapper)`](intermediate/map.md) - 将每个元素转换成另一个元素。
- [`flatMap(Function<T, Stream<R>> mapper)`](intermediate/flatMap.md) - 将每个元素转换为多个元素，然后将这些元素扁平化到一个流中。
- `distinct()` - 去除重复的元素。
- `limit(long maxSize)` - 获取指定数量的元素。
- [`skip(long n)`](intermediate/skip.md) - 跳过前n个元素。
- `sorted(Comparator<? super T> comparator)` - 按照特定的比较器排序元素。
- `peek(Consumer<? super T> action)` - 对每个元素执行一个操作并返回新的 Stream。

### 终端操作（Terminal operations）

终端操作会从流的流水线中产生结果或副作用。一旦执行了终端操作，就不能再从原始流中提取更多的值。

- `forEach(Consumer<? super T> action)` - 对每个元素执行一个操作。
- `toArray()` - 将流转换为数组。
- [`reduce(BinaryOperator<T> accumulator)`](terminal/reduce.md) - 将流中的元素累积起来，产生一个结果。
- [`collect(Collector<? super T,A,R> collector)`](terminal/collect.md) - 使用 Collector 收集结果。
- `min(Comparator<? super T> comparator)` - 返回最小元素。
- `max(Comparator<? super T> comparator)` - 返回最大元素。
- `anyMatch(Predicate<? super T> predicate)` - 如果至少有一个元素满足给定的条件，则返回 true。
- `allMatch(Predicate<? super T> predicate)` - 如果所有元素都满足给定的条件，则返回 true。
- `noneMatch(Predicate<? super T> predicate)` - 如果没有元素满足给定的条件，则返回 true。
- `count()` - 返回流中元素的数量。
- `findFirst()` - 返回第一个元素。
- `findAny()` - 返回任意一个元素。

### 创建 Stream

创建 Stream 的方式有多种，包括但不限于：

- 从集合创建：`List<String> list = Arrays.asList("a", "b", "c"); Stream<String> stream = list.stream();`
- 从数组创建：`String[] array = {"a", "b", "c"}; Stream<String> stream = Arrays.stream(array);`
- 使用 `Stream.of()` 方法：`Stream<String> stream = Stream.of("a", "b", "c");`
- 使用 `IntStream.range()` 或 `IntStream.rangeClosed()` 创建数值流。
- 通过文件读取创建 Stream，例如使用 `Files.lines()` 方法。

### 并行流 Parallel Streams

Stream API 还支持并行处理（parallel streams），这可以通过调用 `stream.parallel()` 或直接从集合调用 `collection.parallelStream()` 来实现。并行流可以利用多核处理器的优势来加速处理过程。

以上就是 Java Stream API 的一些主要用法。实际使用时，可以根据具体需求组合不同的操作来达到预期的效果。