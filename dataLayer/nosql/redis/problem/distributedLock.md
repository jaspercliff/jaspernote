# distributedlock

分布式系统 多进程可见并且互斥

## impl

- set ex nx: 互斥 确保只有一个线程获取锁, set ex 10 nx (保证原子性,添加值和过期时间在一个原子命令中)
- del： 释放锁，加超时时间，防止死锁

---

```java
    /**
     * 缓存击穿 使用互斥锁
     * @param id  id
     * @return result
     */
    public Result queryShopByIdWithCacheBreakDownMutex(Long id) {
        String key = RedisConstants.CACHE_SHOP_KEY + id;
        String cacheShop = redisTemplate.opsForValue().get(key);
        if (StrUtil.isNotBlank(cacheShop)){
            return Result.ok(JSONUtil.toBean(cacheShop,Shop.class));
        }
        if ("".equals(cacheShop)){//额外判断是不是缓存的空值 缓存穿透设置的空值
            throw new BusinessException("shop not exists");
        }
        String lockKey = RedisConstants.LOCK_SHOP_KEY+id;
        Shop shop;
        try {
            while (true){
                Boolean isLock = tryLock(lockKey);
                if (isLock){
                    // 这里重新获取缓存,防止等待锁休眠的50ms 另外一个线程已经维护好shop缓存了
                    String cacheShop1 = redisTemplate.opsForValue().get(key);
                    if (StrUtil.isNotBlank(cacheShop1)){
                        return Result.ok(JSONUtil.toBean(cacheShop1,Shop.class));
                    }
                    if ("".equals(cacheShop1)){//额外判断是不是缓存的空值 缓存穿透设置的空值
                        throw new BusinessException("shop not exists");
                    }
                    shop = getById(id);
                    // 模拟缓存重建时间 长时间
                    Thread.sleep(200);
                    if (shop ==null){
                        redisTemplate.opsForValue().set(key,"", Duration.ofMinutes(2));//缓存空值
                        throw new BusinessException("shop not exists");
                    }
                    redisTemplate.opsForValue().set(key,JSONUtil.toJsonStr(shop)
                    , Duration.ofMinutes(30));
                    break;
                }
                // 获取锁失败 休眠一段时间在重试
                Thread.sleep(50);
            }
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            /*
             * 如果一个线程在业务处理中超时，它的锁被释放，被另一个线程获取。当第一个线程最终到达 releaseLock 时，
             * 它无法判断现在 Redis 中存的锁是不是它自己的。因此，它会错误地执行删除操作，导致误删问题 :缓存值加线程id
             * 这里线程id 会重复，分布式环境下生成的线程id会碰撞，所以使用uuid+线程id 
             */
            releaseLock(lockKey);
        }

        return Result.ok(shop);
    }
```

---

### 误删问题解决

```java
@AllArgsConstructor
public class SimpleRedisLock implements IDistributedLock {

    private String name;
    private final StringRedisTemplate stringRedisTemplate;
    private static final String KEY_PREFIX = "lock:";
    public static final String ID_PREFIX = UUID.randomUUID().toString(true) + "-";

    @Override
    public boolean tryLock(Duration duration) {
        String threadId = ID_PREFIX + Thread.currentThread().threadId();
     Boolean isSuccess=stringRedisTemplate.opsForValue()
.setIfAbsent(KEY_PREFIX+name,threadId, duration);
        return Boolean.TRUE.equals(isSuccess);// 自动拆箱，防止空指针
    }

    @Override
    public void unlock() {
        /*
         * 在判断成功到执行删除之间，如果锁刚好过期并被别人抢占，依然会发生误删。因此，必须使用 Lua 脚本 将“检查”和“删除”合二为一
         * 保证多条命令的原子性
         */
        String threadId = ID_PREFIX + Thread.currentThread().threadId();
        String id = stringRedisTemplate.opsForValue().get(KEY_PREFIX + name);
        if (threadId.equals(id)) {
            stringRedisTemplate.delete(KEY_PREFIX + name);
        }
    }
}

```

---

### 使用lua脚本保证原子性

```Lua
-- 线程id 和存进去的alue值一致就删除锁 保证判断和删除的原子性
if (redis.call('GET', KEYS[1]) == ARGV[1]) then
    return redis.call('DEL', KEYS[1])
end

return 0
```

```java
    public static final DefaultRedisScript<Long> UNLOCK_SCRIPT;

    static {
        UNLOCK_SCRIPT =  new DefaultRedisScript<>();
        UNLOCK_SCRIPT.setLocation(new ClassPathResource("unlock.lua"));
        UNLOCK_SCRIPT.setResultType(Long.class);
    }
    @Override
    public void unlock() {
        // lua脚本保证判断和删除的原子性
        stringRedisTemplate.execute(UNLOCK_SCRIPT,
                Collections.singletonList(KEY_PREFIX + name),
                ID_PREFIX + Thread.currentThread().threadId()
                );
    }
```
