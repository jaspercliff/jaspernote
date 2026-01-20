# 更新策略

- 内存淘汰机制
- 超时删除  
- 主动更新

低一致性： 使用内存淘汰机制
高一致性： 主动更新，超时删除兜底

## 内存淘汰机制

## 超时删除

## 主动更新

- cache aside 调用者更新数据时更新缓存
- read/write through  数据库和缓存集成为一个服务，调用者调用api，不关心数据库和缓存
- write back crud都针对缓存完成，独立线程异步将数据写到数据库，实现最终一致性

### cache aside

- 删除缓存，更新数据库时删除缓存，查询的时候在去更新缓存

![一致性](assets/一致性.png)
先操作数据库在删除缓存线程安全性问题小一点

```java
    @Override
    @Transactional
    public Result updateShop(Shop shop) {
        // 写入数据库
        updateById(shop);
        // delete cache 这里事务发生回滚了 redis删除的数据不会恢复
        // redisTemplate.delete(RedisConstants.CACHE_SHOP_KEY + shop.getId());
        TransactionSynchronizationManager.registerSynchronization(
            new TransactionSynchronization() {
            @Override
            public void afterCommit() {
                // 确保事务提交成功之后在删除缓存  单体应用  如果是分布式则需使用mq
                redisTemplate.delete(RedisConstants.CACHE_SHOP_KEY + shop.getId());
                TransactionSynchronization.super.afterCommit();
            }
        });
        return Result.ok();
    }
```
