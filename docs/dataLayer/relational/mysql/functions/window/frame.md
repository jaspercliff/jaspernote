---
sidebar_position: 2
---
# frame 

当前这一行计算时，要看窗口的哪些行

SUM、AVG、COUNT 这些聚合窗口函数，以及 FIRST_VALUE、LAST_VALUE、NTH_VALUE 这些函数，都不是直接看整个窗口，而是只看当前行对应的 frame

操作整个分区的窗口函数不应包含 frame 子句。MySQL 允许此类函数包含 frame 子句，但会忽略它。即使指定了 frame，这些函数也会使用整个分区:

- CUME_DIST()
- DENSE_RANK()
- LAG()
- LEAD()
- NTILE()
- PERCENT_RANK()
- RANK()
- ROW_NUMBER()

##  窗口范围 ROWS

例如：

最近三天平均：

```sql
SELECT
 date,
 amount,
 AVG(amount) OVER(
    ORDER BY date
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
 ) avg_amount
FROM sales;
```


含义：

```
当前行
+
前两行
```

比如：

|日期|金额|平均|
|-|-|-|
|1|100|100|
|2|200|150|
|3|300|200|
|4|400|300|


```sqls 
-- ========================= rows  
-- rows 按照物理行的顺序一行一行地累加 相同年龄的数值不会  同时累加进总和 UNBOUNDED PRECEDING 无边界的往前  到当前行
SELECT *, 
       SUM(age) OVER(ORDER BY age ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as total
FROM user_simple AS us;

-- 计算是前一行+当前行+后一行
SELECT *, 
       SUM(age) OVER(ORDER BY age ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING) as total
FROM user_simple AS us;

-- 当前行+前面的所有行
SELECT *, 
       SUM(age) OVER(ORDER BY age ROWS BETWEEN current row  AND  unbounded FOLLOWING ) as total
FROM user_simple AS us;
```

