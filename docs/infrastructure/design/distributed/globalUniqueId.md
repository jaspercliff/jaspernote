# 全局唯一id

- 全局唯一性 (Uniqueness)： 最基本要求，ID 在整个分布式系统中不能重复。
- 高性能 (High Performance)： ID 生成速度要快，对系统负担小。
- 高可用性 (High Availability)： 即使部分服务节点故障，ID 服务也能持续提供服务。
- 趋势递增 (Trend Incremental)： ID 最好是趋势递增的，有利于数据库索引的优化（避免页分裂），提高写入性能。
- 安全（不暴露信息）： 最好不要暴露业务信息，例如总用户量、订单量等。

## 实现

### uuid

### redis 实现

- [redis imple](/docs/dataLayer/nosql/redis/problem/globalId.md)

### snowflake
