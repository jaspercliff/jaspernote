# spec

## key

- 业务模块 : 对象类型 : 唯一标识 : 属性
- 长度不超过44个字节最好

Valkey 存储字符串（Key 也是字符串）时，主要使用两种编码方式：embstr（嵌入式字符串）和 raw。

- embstr (≤ 44 字节)：Key 的元数据（redisObject）和实际字符串存储在连续的内存块中。
- raw (> 44 字节)：元数据和字符串被分配在两个不连续的内存块中。

raw 编码的 Key 在查询时比 embstr 慢约 10% - 20%，因为 CPU 忙于在内存里“跳来跳去”

```zsh
# 查看 name的编码
object encoding name
```

## value  big key

bigkey serialize 会占用大量cpu
对元素较多的hash list set 做运算会很耗时
少量的qps就会占满带宽

string < 10kb
list/set < 5000个元素
zset < 3000个元素

```zsh
valkey-cli --bigkeys #查看bigkeys 各种类型的第一名
```

DEL 是一个同步阻塞操作。如果你删除一个包含百万成员的 Hash 或几百 MB 的 String，主线程会被卡死，直到删除完成，期间所有客户端的请求都会超时

UNLINK 会将 Key 从键空间中逻辑删除，而真正的内存释放操作会交给后台线程异步执行 unlink name

## type choose

String,简单的 Key-Value,缓存、计数器、分布式锁,最快、最省内存。如果数据是独立的，选它。
Hash,对象 field-value 映射,用户资料、配置信息,节省空间。将同类数据打包，比存多个 String 更省内存。
List,有序、可重复列表,消息队列、最新动态,两端读写极快。适合做简单的异步任务分发。
Set,无序、唯一集合,点赞去重、共同好友,自带去重。适合交集（SINTER）、差集（SDIFF）运算。
ZSet,有序、唯一集合,排行榜、限流器,带权重的排序。需要按时间或分数值排序时必选。

不要在 Hash/Set/ZSet 中存储过多的成员。 如果成员超过 5000 个，它会从底层的紧凑结构（ziplist/listpack）升级为哈希表（dict/skiplist），内存占用会激增

HyperLogLog：统计 UV（去重计数）。存 1 亿个 IP 只需要 12KB 内存，误差约 0.81%，极其节省空间。
Bitmap (位图)：统计签到、在线状态。1 个 bit 代表一个用户，1 亿个用户仅占 12.5MB。
Geospatial (地理位置)：附近的人、距离计算。底层基于 ZSet 封装，专门处理经纬度。
