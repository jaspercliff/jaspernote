# Collections

## emptyList 
返回一个空的，不可变的List

- 避免空指针异常
- 语义清晰

## singletonList

返回一个单个元素、不可变的list

- 只传递包含一个元素的list，且不希望接收方修改它
- 需要高性能的不可变的单个元素的list

``` java
Collections.SingletonList("hello")
```

## map

### 不可变map 

只有值是不可变对象的时候 map才是真正的不可变 否则原对象改变的时候map还是可变的 

- Collections.unmodifiableMap(map);
- ImmutableMap.copyOf(map); // since jdk 10
- Map.copyOf(map);

```java
@Slf4j
public class ShallowImmutableMap {
    public static void main(String[] args) {
        final HashMap<String, Person> map = new HashMap<>();
        final Person jasper = new Person(1, "jasper");
        final Person cliff = new Person(2, "cliff");
        map.put("1",jasper);
        map.put("2",cliff);

        jasper.setName("jasper1");

        final Map<String, Person> collectionsMap = Collections.unmodifiableMap(map);
        log.info("collectionMap:{}", collectionsMap);
        final ImmutableMap<String, Person> guavaMap = ImmutableMap.copyOf(map);
        log.info("guavaMap:{}", guavaMap);
        // since jdk 10
        final Map<String, Person> mapMap = Map.copyOf(map);
        log.info("mapMap:{}", mapMap);
    }
}
```