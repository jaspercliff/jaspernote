# 缓存击穿 cache breakdown

热点key，被高并发访问并且缓存重建的过程比较复杂的key突然实效了，大量请求到达数据库（同时去新建缓存）

## solution

- 互斥锁 性能不好 cp
- 逻辑过期 不保证一致性 ap

### mutex

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

### logic expire

```java
    /**
     * 缓存击穿 使用逻辑过期 ： 热点数据手动维护
     * @param id  id
     * @return result
     */
    public Result queryShopByIdWithCacheBreakDownLogicExpire(Long id) {
        String key = RedisConstants.CACHE_SHOP_KEY + id;
        String cacheShopStr = redisTemplate.opsForValue().get(key);
        if (StrUtil.isBlank(cacheShopStr)) {
            return null; //查询不到缓存直接认为是null
        }

        String lockKey = RedisConstants.LOCK_SHOP_KEY + id;

        RedisData redisData = JSONUtil.toBean(cacheShopStr, RedisData.class);
        LocalDateTime expireTime = redisData.getExpireTime();
        JSONObject data = (JSONObject) redisData.getData();
        Shop cacheShop = JSONUtil.toBean(data, Shop.class);
        if (expireTime.isAfter(LocalDateTime.now())) {
            return Result.ok(cacheShop);//没有过期直接返回
        }

        Boolean isLock = tryLock(lockKey);
        if (isLock) {
        //     缓存重建 使用一个新的线程去重建缓存
            taskExecutor.submit(()->{
                try {
                    this.saveData2Redis(id, 30L);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                } finally {
                    releaseLock(lockKey);
                }
            });
        }
        return Result.ok(cacheShop);
    }
```
