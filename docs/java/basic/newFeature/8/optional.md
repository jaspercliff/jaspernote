# optional

在Java中，`Optional` 是一个容器类，表示值可能存在也可能不存在。它可以作为一个方法的返回结果，用来表示该方法可能没有返回任何内容。
这样可以避免使用null，并且可以更好地处理那些可能不存在的值。使用 `Optional` 可以帮助开发者更好地避免空指针异常。

## Optional 的基本用法

- Optional.of(value) of要求value不为null
- Optional.ofNullable(value) 接受 null参数

```java
Optional<String> optValue = Optional.of("Hello");
Optional<String> optNullValue = Optional.ofNullable(null);
```

```java
public String getUserEmail(User user) {
    return Optional.of(user)
            .map(User::getEmail) // getEmail() 可能返回 null
            .orElse("default@example.com"); // 如果 email 为 null，提供默认值
}
//在这个例子中，即使 user 不会为 null，我们仍然使用 Optional.of() 来开始一个链式调用，确保如果 getEmail() 返回 null，我们可以提供一个默认值
```

- 检查值是否存在：可以使用 `isPresent()` 方法来检查是否有值存在。
  这个方法允许你传入一个 `Consumer`，当 `Optional` 包含值时执行某些操作。

``` java
Optional<String> errorDetails = Optional.ofNullable(getErrorDetails());
// 只有在错误详情存在时才记录日志
errorDetails.ifPresent(details -> logger.error("Error occurred: " + details));
```

- ifPresentOrElse (Java 9+)
从 Java 9 开始，Optional 还提供了一个新的方法 `ifPresentOrElse(Consumer<? super T> action, Runnable emptyAction)`，它允许你在 Optional 包含值时执行一个操作，在 Optional 为空时执行另一个操作
- 获取值：
如果值存在，可以通过 `get()` 方法获取它；但如果值不存在，则会抛出 `NoSuchElementException` 异常。

```java
String value = optValue.get();
```

为了避免这种异常，通常会结合 `isPresent()` 方法使用或者使用 `orElse()` 或 `orElseGet()` 方法来提供一个默认值。

```java
String defaultValue = optNullValue.orElse("Default Value");
```

#### 使用 `orElseGet()` 方法

`orElseGet()` 方法与 `orElse()` 类似，但是它允许延迟加载默认值。

``` java
String defaultValueLazy = optNullValue.orElseGet(() -> "Computed Default Value");
```

#### 使用 `map()` 和 `flatMap()` 方法

这些方法允许对 `Optional` 中的值进行转换。

```java
Optional<Integer> length = optValue.map(String::length);
```

`flatMap` 则是用于将当前 `Optional` 映射到另一个 `Optional`。

```java
Optional<Integer> lengthFlat = optValue.flatMap(str -> Optional.of(str.length()));
```

### 注意事项

虽然 `Optional` 是一个很有用的功能，但它并不总是适合所有情况。
例如，在需要返回多个值或错误信息的情况下，可能需要考虑其他设计模式或数据结构。此外，过度使用 `Optional` 可能会导致代码变得难以阅读和维护。
因此，应当谨慎地选择何时以及如何使用 `Optional`。
