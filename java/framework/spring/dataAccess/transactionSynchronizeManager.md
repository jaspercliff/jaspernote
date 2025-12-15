# TransactionSynchronizationManager

用于管理和协调线程级别的事务同步操作。

它允许开发者将一些非事务性的资源操作（如 Redis 缓存删除、发送消息、清理资源等）绑定到当前的数据库事务上，确保这些操作只有在事务成功提交后才执行，或者在事务完成时执行特定的清理工作

- 延迟发送 MQ
- 事务提交后更新缓存
- 事务成功后发事件

需要实现或使用实现了 TransactionSynchronization 接口的类，并将其实例注册到 TransactionSynchronizationManager中。这个接口定义了你在事务不同生命周期要执行的回调方法：
void suspend(),事务挂起时（例如，当前事务被另一个事务挂起）。,挂起事务相关的资源。
void resume(),事务恢复时。,恢复事务相关的资源。
void beforeCommit(boolean readOnly),事务即将提交前。,执行提交前的校验或准备工作。
void beforeCompletion(),事务即将完成前（无论是提交还是回滚）。,释放资源、清理 ThreadLocal 变量等。
void afterCommit(),事务成功提交后（Commit）。,最常用：删除缓存、发送消息队列、发布事件等。
void afterCompletion(int status),事务完成时（无论 Commit 或 Rollback）。,最终的资源清理工作。status 参数用于区分提交还是回滚。

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
