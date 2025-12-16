# 缓存穿透 cache penetration

客户端请求的数据在redis和数据库中都不存在，缓存永远不会生效，请求最终都会到达数据库,缓存不能拦截这些无效的查询

## solution

- 缓存空对象  额外占用内存 可能造成短期不一致(存了个null(ttl=2m)，但是对应id此时正好维护进去了)
- [布隆过滤(判断一个元素是否可能存在于一个集合中) 实现负责 判断不一定准确](/dataStructure/algo/bloomfilter.md)
- 热点参数限流

```java
    @Override
    public Result queryShopById(Long id) {
        String key = RedisConstants.CACHE_SHOP_KEY + id;
        String cacheShop = redisTemplate.opsForValue().get(key);
        if (StrUtil.isNotBlank(cacheShop)){
            return Result.ok(JSONUtil.toBean(cacheShop,Shop.class));
        }
        if ("".equals(cacheShop)){//额外判断是不是缓存的空值
            throw new BusinessException("shop not exists");
        }
        Shop shop = getById(id);
        if (shop ==null){
            redisTemplate.opsForValue().set(key,"", Duration.ofMinutes(2));
            throw new BusinessException("shop not exists");
        }
        redisTemplate.opsForValue().set(key,JSONUtil.toJsonStr(shop), Duration.ofMinutes(30));
        return Result.ok(shop);
    }
```
