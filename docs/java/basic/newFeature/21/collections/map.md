# map 

## Hashmap.newHashMap

在 JDK 19 及之后的版本（包括 JDK 21）中，引入了更科学的初始化方法。

以前的问题：如果你想放 100 个元素，`new HashMap<>(100)` 实际上会把初始容量设为 100。但由于负载因子（0.75），当你放到 75 个时就会触发扩容。

JDK 21 的做法：使用 HashMap.newHashMap(100)。它内部会自动计算出能够容纳 100 个元素而不触发扩容的最佳初始容量

```java
    public static <K, V> HashMap<K, V> newHashMap(int numMappings) {
        if (numMappings < 0) {
            throw new IllegalArgumentException("Negative number of mappings: " + numMappings);
        }
        return new HashMap<>(calculateHashMapCapacity(numMappings));
    }
    static int calculateHashMapCapacity(int numMappings) {
        return (int) Math.ceil(numMappings / (double) DEFAULT_LOAD_FACTOR);
    }
```
