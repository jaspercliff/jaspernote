# tdsql

TDSQL（Tencent Distributed SQL）是腾讯自研的 分布式数据库系统，目标是满足大型互联网、金融级场景的高可靠、高一致、高扩展需求。

| 特性           | **分区 Partition**            | **分片 Shard**                   |
| -------------- | ----------------------------- | -------------------------------- |
| 所属层级       | 单个表内部                    | 整个库/集群内部                  |
| 目的           | 优化大表管理与查询性能        | 实现分布式水平扩展               |
| 数据是否跨机器 | ❌ 通常在同一台机器、同一实例 | ✅ 不同节点、不同物理机          |
| 解决的问题     | 大表太大 → 管理困难/查询慢    | 单库承载不够 → 需要扩展容量/并发 |
| 对应用透明度   | 应用无感（依然是一张表）      | 需要 shardkey，SQL 需注意路由    |
| 创建方式       | `PARTITION BY ...`            | `shardkey (xxx)`                 |
| 典型动机       | 按天/月分区、快速删除历史数据 | 分库分表，解决高并发/大数据量    |

## 分片

✔ 分片 = 分库分表 = 数据分布到多台机器
TDSQL 是真正的分布式数据库，它的核心能力是：把同一张逻辑表的数据拆到多个物理节点（机器、实例）上。

指定： shardkey = clientNo

TDSQL 根据 clientNo 把数据路由到不同节点，实现：

- 水平扩容
- 多机并行
- 极高 QPS
- TB~PB 级数据投入

## 分区

✔ 分区 = 单表内部的数据切分（仍在同一节点）

分区属于 MySQL 原生能力，TDSQL 继承了它。

例如按日期：

PARTITION BY RANGE (TO_DAYS(tran_date))

分区的作用：

- 提高大表的查询效率（只扫描某些分区）
- 快速删除历史数据（DROP PARTITION）
- 让维持大表索引更高效

```sql
PARTITION BY RANGE (amount) (
    PARTITION p0 VALUES LESS THAN (1000),
    PARTITION p1 VALUES LESS THAN (5000),
    PARTITION pmax VALUES LESS THAN (MAXVALUE)
);
```

MAXVALUE = 无穷大（无限上界） 特殊关键字
所有 大于前一个分区范围 的值，都会落到 MAXVALUE 这个分区中
