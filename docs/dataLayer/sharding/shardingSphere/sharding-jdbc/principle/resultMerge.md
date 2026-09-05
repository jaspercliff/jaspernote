# 结果归并 


## 1. 为什么需要结果归并？

因为一条逻辑 SQL 可能被路由成多条真实 SQL。

比如：

```sql
SELECT *
FROM t_order
ORDER BY id
LIMIT 10;
```

假设：

```text
t_order_0
t_order_1
```

ShardingSphere 可能执行：

```sql
SELECT * FROM t_order_0 ORDER BY id LIMIT 10;
SELECT * FROM t_order_1 ORDER BY id LIMIT 10;
```

现在有两个结果集：

```text
t_order_0:
1
3
5
7
9
...

t_order_1:
2
4
6
8
10
...
```

但用户真正想得到的是：

```text
1
2
3
4
5
6
7
8
9
10
```

所以 ShardingSphere 必须把多个分片的结果**重新组合成一个逻辑结果集**。

这就是：

> **结果归并（Merge）**

---

# 2. 结果归并有哪些类型？

ShardingSphere 主要可以从几个维度理解。

### ① 直接归并

最简单。

例如：

```sql
SELECT id, name
FROM t_order;
```

没有：

```text
ORDER BY
GROUP BY
DISTINCT
聚合函数
```

那么多个分片结果直接拼起来即可：

```text
t_order_0
   ↓
1
3
5

t_order_1
   ↓
2
4
6

        ↓

最终
1
3
5
2
4
6
```

这种比较简单。

---

# 3. 排序归并

例如：

```sql
SELECT *
FROM t_order
ORDER BY id;
```

每个分片内部可能已经排序：

```text
t_order_0:
1  3  5  7

t_order_1:
2  4  6  8
```

ShardingSphere 不能简单拼：

```text
1 3 5 7 2 4 6 8 ❌
```

而要进行类似**多路归并排序**：

```text
t_order_0 ── 1 ── 3 ── 5 ── 7 ──┐
                                ├── 1 2 3 4 5 6 7 8
t_order_1 ── 2 ── 4 ── 6 ── 8 ──┘
```

这就是 **Order By 归并**。

使用的堆 


---

# 4. 分页归并

这个非常重要。

假设：

```sql
SELECT *
FROM t_order
ORDER BY id
LIMIT 10, 10;
```

意思是：

```text
跳过 10 条
取 10 条
```

但是现在有两个分片。

如果直接给每个分片：

```sql
LIMIT 10, 10
```

可能就错了。

因为全局排序需要知道两个分片的数据。

ShardingSphere 通常会对实际 SQL 做分页改写，例如把实际查询范围扩大，然后在归并阶段进行最终的：

```text
ORDER BY
OFFSET
LIMIT
```

所以：

```text
数据库分片结果
      ↓
归并排序
      ↓
全局分页
      ↓
返回 10 条
```

这也是为什么**分库分表后的深分页性能通常比较差**。

例如：

```sql
LIMIT 1000000, 20
```

多个分片都可能需要扫描/返回大量数据，然后 ShardingSphere 再进行归并。

---

# 5. 聚合归并

例如：

```sql
SELECT COUNT(*)
FROM t_order;
```

有：

```text
t_order_0 → 100
t_order_1 → 200
```

不能直接返回：

```text
100
```

而应该：

```text
100 + 200 = 300
```

最终：

```text
COUNT(*) = 300
```

这就是**聚合归并**。

类似：

```sql
SUM(amount)
AVG(amount)
MAX(amount)
MIN(amount)
COUNT(*)
```

都可能涉及归并。

---

# 6. GROUP BY 归并

例如：

```sql
SELECT user_id, COUNT(*)
FROM t_order
GROUP BY user_id;
```

假设：

```text
分片 0：

user_id | count
--------|------
100     | 3
200     | 5
```

分片 1：

```text
user_id | count
--------|------
100     | 7
300     | 2
```

ShardingSphere 需要进一步归并：

```text
100 → 3 + 7 = 10
200 → 5
300 → 2
```

最终：

```text
user_id | count
--------|------
100     | 10
200     | 5
300     | 2
```

所以 **GROUP BY + 分片** 的成本通常明显高于简单查询。

---

# 7. 结果归并和前面两个模式的关系

你刚才问的：

```text
内存限制模式
连接限制模式
```

其实和**结果归并**是直接相关的。

假设：

```text
SQL
 ↓
路由
 ↓
4 个分片
 ↓
4 个 ResultSet
 ↓
结果归并
```

问题来了：

> 这 4 个 ResultSet 是同时保持着，还是一个一个处理？

这就涉及执行引擎的连接模式。

### 内存限制模式

可以理解成更倾向：

```text
连接
 ↓
ResultSet
 ↓
归并时流式读取
 ↓
减少 JVM 内存
```

但需要保持更多数据库连接。

### 连接限制模式

更倾向：

```text
连接 1
 ↓
读取结果
 ↓
放进 JVM 内存
 ↓
释放连接

连接 2
 ↓
读取结果
 ↓
放进 JVM 内存
 ↓
释放连接
```

所以：

```text
连接限制
    ↓
数据库连接少
    ↓
JVM 内存压力可能增加

内存限制
    ↓
JVM 内存压力较小
    ↓
数据库连接占用可能增加
```

---

# 8. 你可以把 ShardingSphere 的整个过程串起来

这是你现在学习 ShardingSphere 最应该掌握的一条链：

```text
                    SQL
                     │
                     ▼
                SQL 解析
                     │
                     ▼
                SQL 路由
                     │
             ┌───────┴───────┐
             ▼               ▼
           ds0               ds1
             │                 │
             ▼                 ▼
       t_order_0          t_order_1
             │                 │
             └───────┬─────────┘
                     ▼
                  SQL 执行
                     │
             多个 ResultSet
                     │
                     ▼
                结果归并
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
      排序归并     聚合归并     分组归并
        │            │            │
        └────────────┼────────────┘
                     ▼
                最终结果集
                     │
                     ▼
                  应用
```

所以你可以把 **结果归并** 简单理解成：

> **数据库分片之后，每个分片只负责自己的结果，ShardingSphere 负责把这些“局部结果”重新组合成用户看到的“全局结果”。**

其中最值得你重点研究的是：

**排序归并 → 分页归并 → 聚合归并 → GROUP BY 归并**

这几个弄明白以后，ShardingSphere 为什么在 `ORDER BY / LIMIT / GROUP BY / COUNT` 场景下会有额外性能开销，就基本理解了。

