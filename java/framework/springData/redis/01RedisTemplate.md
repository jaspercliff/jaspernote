# redis template

默认使用了jdk的序列化，也提供了很多其他的序列化方式，在`org.springframework.data.redis.serializer`包中


## 模版视图
模版视图： 从 RedisTemplate 中专门针对某种 Redis 数据类型（String、Hash、List、Set、ZSet、Stream）提取出来的一组特定操作方法。

如果你希望直接使用特定类型的 Redis 操作（比如操作 Hash、List、Set 这些结构），
那么可以直接声明具体的模板接口（如 HashOperations、ListOperations）作为依赖注入，
Spring 容器会自动帮你从 RedisTemplate 中拿到对应的操作对象，
这样就不用每次手动去调用 opsForX() 方法了，代码更简洁。

🔴 传统写法（手动调用 opsForX()）
```java
@Autowired
private RedisTemplate<String, String> redisTemplate;

public void saveUser() {
    redisTemplate.opsForHash().put("user:1", "name", "jasper");
}
```
这里你要写 redisTemplate.opsForHash() 每次手动调用，很机械。


🟢 推荐的新写法（直接注入特定的操作接口）

```java
@Autowired
private HashOperations<String, String, String> hashOperations;

public void saveUser() {
    hashOperations.put("user:1", "name", "jasper");
}
```

•	这里直接把 HashOperations 注入到你的类中。
•	Spring 容器会自动从 RedisTemplate 里帮你拿到 opsForHash() 对象。
•	你的代码直接操作 Hash，更干净、更清晰。


###  接口对应的 Redis 类型
ValueOperations<K, V>	String（单值）
HashOperations<H, HK, HV>	Hash（哈希表）
ListOperations<K, V>	List（列表）
SetOperations<K, V>	Set（集合）
ZSetOperations<K, V>	ZSet（有序集合）
StreamOperations<K, HK, HV>	Stream（流式消息）


🧠 小总结
•	手动调用 opsForX() → 传统写法，灵活但代码冗长；
•	直接注入具体操作接口 → 推荐新写法，清爽又符合单一职责原则；
•	Spring 自动帮你装配，不需要你自己管理关系。

⸻

## StringRedisTemplate 和 ValueOperations
- 如果你的业务逻辑仅涉及 Redis 中的 String 类型数据，直接注入 ValueOperations<String, String> 是最好的选择，因为它更专注、代码更简洁。
- 如果你需要操作多种 Redis 数据类型（如 List、Set、Hash 等），那么直接注入 StringRedisTemplate 会更方便。