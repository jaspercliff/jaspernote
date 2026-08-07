# window

MySQL **窗口函数（Window Function，也叫分析函数）** 是 MySQL 8.0 引入的一个非常重要的功能。

它的核心作用：

> **在不改变原始行数的情况下，对一组数据进行聚合、排序、排名、累计计算等操作。**

简单理解：

窗口函数对一组查询行执行类似聚合的操作。但是，聚合操作将查询行分组到单个结果行中，而窗口函数则为每个查询行生成一个结果

- `GROUP BY`：聚合后会减少行数
- **窗口函数**：计算后保留每一行

eg: 

```sql
SELECT SUM(profit)  as total_profit
FROM sales AS sl;

SELECT country,SUM(profit) as country_profit
FROM sales AS sl
group by country ORDER BY country;

-- window operations do not collapse groups of query rows to a single output row. Instead, they produce a result for each row
SELECT year,country,product,profit,
SUM(profit) OVER() as total_profit,
SUM(profit) OVER(PARTITION BY country) as country_profit
FROM sales AS sl
ORDER BY  country ,year ,product ,profit ;
```

--- 
| total_profit |
| ------------ |
| 7410         |

| country | country_profit |
| ------- | -------------- |
| Finland | 1610           |
| India   | 1350           |
| USA     | 4450           |

| year | country | product    | profit | total_profit | country_profit |
| ---- | ------- | ---------- | ------ | ------------ | -------------- |
| 2000 | Finland | Computer   | 1500   | 7410         | 1610           |
| 2000 | Finland | Phone      | 100    | 7410         | 1610           |
| 2001 | Finland | Phone      | 10     | 7410         | 1610           |
| 2000 | India   | Calculator | 150    | 7410         | 1350           |
| 2000 | India   | Computer   | 1200   | 7410         | 1350           |
| 2000 | USA     | Computer   | 1500   | 7410         | 4450           |
| 2001 | USA     | Computer   | 2700   | 7410         | 4450           |
| 2001 | USA     | TV         | 250    | 7410         | 4450           |
--- 

## term

- window: 与当前行相关的查询行  PARTITION BY：决定哪些行属于同一个窗口
- [frame: 当前这一行计算时，要看窗口的哪些行](./frame.md)


##  基本语法

```sql
{OVER (window_spec) | OVER window_name}

window_spec:
    [window_name] 
    [partition_clause] 
    [order_clause] 
    [frame_clause]

函数名() OVER (
    PARTITION BY 分组字段
    ORDER BY 排序字段
    ROWS BETWEEN 范围
)

可以使用聚合函数（sum，max） 或者窗口函数（cume_dist,rank dense_rank)
sum() over() as 1 
rand() over as 1

如果 OVER() 为空，则窗口包含所有查询行，窗口函数将使用所有行计算结果,否则，括号内的子句将决定使用哪些查询行来计算函数结果，以及如何对它们进行分区和排序
```

```sql 
SELECT year,country,product,profit,
SUM(profit) OVER w as country_profit, -- window name and partition_clause
SUM(profit) OVER() as total_profit, -- 全表 window
SUM(profit) OVER(
PARTITION BY  country                               -- 根据country分window
ORDER BY year                                       -- 窗口内部按year 排序
rows BETWEEN UNBOUNDED PRECEDING and current row   -- 定义取哪些行             之前无边界到当前行 
) as till  -- 到当前行所有profit 为多少
FROM sales AS sl 
window w as (PARTITION BY country)
ORDER BY  country ,year ,product ,profit;
```

result: 

| year | country | product    | profit | country_profit | total_profit | till |
| ---- | ------- | ---------- | ------ | -------------- | ------------ | ---- |
| 2000 | Finland | Computer   | 1500   | 1610           | 7410         | 1500 |
| 2000 | Finland | Phone      | 100    | 1610           | 7410         | 1600 |
| 2001 | Finland | Phone      | 10     | 1610           | 7410         | 1610 |
| 2000 | India   | Calculator | 150    | 1350           | 7410         | 150  |
| 2000 | India   | Computer   | 1200   | 1350           | 7410         | 1350 |
| 2000 | USA     | Computer   | 1500   | 4450           | 7410         | 1500 |
| 2001 | USA     | Computer   | 2700   | 4450           | 7410         | 4200 |
| 2001 | USA     | TV         | 250    | 4450           | 7410         | 4450 |
