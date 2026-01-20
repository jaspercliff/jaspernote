# sortedset

类似java中的treeset，sortedset中的元素有score属性,根据score排序，底层使用跳表+hash表实现

- 可排序
- 不可重复
- 查询快(hash)

## 常用命令

- zadd
- zrem
- zscore: Returns the score of a member in a sorted set.
- zcard: Returns the number of members in a sorted set.
- zrank: Returns the index of a member in a sorted set ordered by
ascending(升序的) scores.
- zcount key min max: Returns the count of members in a sorted set
that have scores within a range.
- zrange key min max: Returns members in a sorted set within a range of **indexes**.
- zrangebyscore: Returns members in a sorted set within a range of **scores**.
- zincrby: Increments the score of a member in a sorted set.
- zinter: Returns the intersect of multiple sorted sets. zinter numberkeys z1 z2
- zdiff
- zunion

排序默认都是升序，rev倒序  在zrevrange

## 应用场景

- 排行榜
