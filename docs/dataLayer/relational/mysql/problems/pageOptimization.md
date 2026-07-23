# 分页优化 

当数据量非常大时（例如 LIMIT 1000000, 10），MySQL 需要先扫描前 1000010 条记录，然后丢弃前 1000000 条，性能会非常差

```sql 
-- ============================ deep pagination
SELECT
  *
FROM
  test_user AS tu
LIMIT
  0, 10;

SELECT
  *
FROM
  test_user AS tu
LIMIT
  10, 10;

-- 当数据量非常大时（例如 LIMIT 1000000, 10），MySQL 需要先扫描前 1000010 条记录，然后丢弃前 1000000 条，性能会非常差
SELECT
  *
FROM
  test_user AS tu
LIMIT
  10000000, 10;
-- 覆盖索引 如果分页查询中涉及的字段都在同一个索引中，MySQL 可以直接从索引树中获取数据，而不需要回表查询 1000w 依然很慢 

SELECT id,username FROM test_user AS tu LIMIT 10000000,10;
-- 延迟关联  先通过索引定位主键 然后通过主键关联原表   1000w 依然很慢 
SELECT
  *
FROM
  test_user t
  INNER JOIN (
    SELECT
      id
    FROM
      test_user
    ORDER BY
      id
    LIMIT
      10000000, 10
  ) tmp ON t.id=tmp.id;

-- 记录上次查询的最大 ID （针对单调递增的主键） 这里id主键 聚簇索引 查出来就是排好的
SELECT
  *
FROM
  test_user AS tu
WHERE
  tu.id>10000000
LIMIT
  10;

-- 游标分页 利用上一页最后一条记录的唯一标识（如主键 ID 或时间戳）作为查询条件，直接定位到下一页的起点 缺点就是不能跳页 只能上一页 下一页
SELECT
  *
FROM
  test_user AS tu
WHERE
  id>10000000
ORDER BY
  id 
LIMIT
  10;


```
