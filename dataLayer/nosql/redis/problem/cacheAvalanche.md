# 缓存雪崩 cache avalanche

同一时间大量缓存key失效或者redis宕机，导致大量请求到达数据库

## solution

- 不同的key添加ttl随机值
- redis集群
- 降级限流
- 多级缓存
