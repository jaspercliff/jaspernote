# 全局唯一id

原子性： INCR 命令在 Redis 中是单线程执行的，保证了多个客户端同时请求时，每个请求都会得到一个唯一的、连续递增的数字，避免了竞态条件。
持久性： 结合 Redis 的持久化机制（RDB 或 AOF），可以保证在 Redis 重启后，ID 仍然能从上次的值继续递增。

```java
@Component
@RequiredArgsConstructor
public class RedisGlobalId {

    private static final long BEGIN_TIMESTAMP =1765929600L;
    public static final int COUNT_BITS= 32;
    public  final StringRedisTemplate stringRedisTemplate;


    /**
     * 符号位0(正数，当前时间戳减去begin大于0 32位 2^31-1 大约68年 )+时间戳31+序列号32
     * Redis 的 INCR 返回的 Long 类型最大值约为 2^63-1。如果序列号 count 超过 2^32-1（约 42 亿），
     * 它将溢出低 32 位,一天内，最多只能生成 $2^{32}-1$ 个 ID
     * @param keyPrefix keyPrefix
     * @return id
     */
    public long nextId(String keyPrefix){
        // 生成时间戳
        LocalDateTime now = LocalDateTime.now();
        long nowSecond = now.toEpochSecond(ZoneOffset.UTC);
        long timeStamp = nowSecond- BEGIN_TIMESTAMP;
        // 生成序列号
        String date = now.format(DateTimeFormatter.ofPattern("yyyy:MM:dd"));
        Long count = stringRedisTemplate.opsForValue()
                .increment("icr:" + keyPrefix + ":" + date);
        return timeStamp << COUNT_BITS | count;
    }

    public static void main(String[] args) {
        LocalDateTime localDateTime = LocalDateTime.of(2025, 12, 17, 0, 0, 0);
        long epochSecond = localDateTime.toEpochSecond(ZoneOffset.UTC);
        System.out.println("epochSecond = " + epochSecond);
    }
}
```
