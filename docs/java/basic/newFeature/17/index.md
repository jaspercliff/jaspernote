# jdk17


JDK 17 引入了多项新特性和改进，以下是一些主要的新特性：

1. **密封类（Sealed Classes）**：
    - 密封类限制哪些其他类可以继承它们，从而提供更严格的控制和更好的代码组织。这有助于增强模式匹配的准确性，并允许编译器做出更强的假设。

2. **文本块（Text Blocks）**：
    - 文本块是一种多行字符串文字，不需要使用大多数转义序列，并且可以自动设置格式。这让编写包含多行的字符串变得更简单和直观。

3. **模式匹配的 instanceof**：
    - 这个特性允许在使用 `instanceof` 操作符时直接创建对象引用，而无需显式转换。例如：`if (obj instanceof String s) { /* 使用 s */ }`。

4. **记录类（Records）**：
    - 记录类是一种特殊的类，它主要用于存储不可变数据。记录类自动提供实现如 `equals(Object obj)`、`hashCode()` 和 `toString()` 等方法。

5. **ZGC（可扩展低延迟垃圾收集器）增强**：
    - ZGC 是一个可扩展的低延迟垃圾收集器，旨在处理从相对较小的堆到非常大的堆（大小为数TB）。在 JDK 17 中，ZGC 得到了进一步的优化，以提高性能和稳定性。

6. **Switch 表达式的改进**：
    - Switch 表达式在之前的版本中被引入并进行了标准化，在 JDK 17 中继续得到改进，提供了更加简洁和安全的语法来处理复杂的条件逻辑。支持模式匹配
    -  switch 表达式的写法是 Java 12 引入的作为一种改进的、更为简洁的语法形式，称为“增强的switch”或“switch表达式”。它允许switch语句返回一个值，并且可以更加简洁地编写代码
## path variable
``` java
    public static boolean isNUllObj(Object o){
        switch (o) {
            case null -> {
                return true;
            }
            case String str -> {
                return str.isEmpty();
            }
            case Collection<?> collection -> {
                switch (o) {
                    case List<?> list -> {
                        return list.isEmpty();
                    }
                    case Map<?, ?> map -> {
                        return map.isEmpty();
                    }
                    case Set<?> set -> {
                        return set.isEmpty();
                    }
                    default -> {
                    }
                }
            }
            default -> {
            }
        }
        return false;
    }
```

```java
    private static ObjectMapper selectMapper(JsonInclude.Include include) {
        return switch (include) {
            case NON_NULL -> MAPPER_NON_NULL;
            case NON_EMPTY -> MAPPER_NON_EMPTY;
            default -> MAPPER_ALWAYS; // 默认包含所有字段
        };
    }
```