# 函数式接口

> 接口中只有一个抽象方法的接口（可以包含多个默认方法或静态方法),让函数可以像参数一样可以传递 

## 常见的四个函数式接口
```
1. **Predicate<T>**：接收一个参数，返回一个布尔值。通常用于测试条件。
    - 抽象方法: `boolean test(T t)`

2. **Function<T, R>**：接收一个参数，返回一个结果。用于对输入应用某种转换。
    - 抽象方法: `R apply(T t)`

3. **Consumer<T>**：接收一个参数，不返回结果。表示接受一个输入参数并执行某些操作的函数。
    - 抽象方法: `void accept(T t)`

4. **Supplier<T>**：不接收参数，返回一个结果。用来创建对象或生成某个值。
    - 抽象方法: `T get()`
```
- [Function](function.md)
- [Supplier](supplier.md)
- [Consumer](consumer.md)
- [Predicate](predicate.md)

## 其他函数式接口
```
1. **UnaryOperator<T>**：继承自`Function<T, T>`，表示一个参数相同类型的函数。适用于“一元操作”。
    - 抽象方法: `T apply(T t)`

2. **BinaryOperator<T>**：也是`Function`的一个特殊版本，接收两个同类型的参数并返回一个相同类型的结果。适合于需要处理两个输入的情况。
    - 抽象方法: `T apply(T t, T u)`
3. **BiPredicate<T, U>**：类似于`Predicate`，但是接收两个参数，并返回一个布尔值。
    - 抽象方法: `boolean test(T t, U u)`

4. **BiConsumer<T, U>**：类似于`Consumer`，但接收两个输入参数。
    - 抽象方法: `void accept(T t, U u)`

5. **BiFunction<T, U, R>**：类似于`Function`，但是接收两个输入参数，并返回一个结果。
    - 抽象方法: `R apply(T t, U u)`
```

- [BiFunction](biFunction.md)
- [BiConsumer](BiConsumer.md)