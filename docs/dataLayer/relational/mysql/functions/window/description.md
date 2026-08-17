---
sidebar_position: 1
---

# 窗口函数 


##   排名函数（最常用）

### ROW_NUMBER()

连续排名，不允许并列。


```sql
SELECT
 name,
 salary,
 ROW_NUMBER() OVER(
    ORDER BY salary DESC
 ) rank_num
FROM employee;
```


结果：

|name|salary|rank_num|
|-|-|-|
|张三|10000|1|
|王五|9000|2|
|李四|8000|3|
|赵六|7000|4|


---

### RANK()

允许并列，会跳号。


数据：

|name|salary|
|-|-|
|张三|10000|
|李四|8000|
|王五|8000|
|赵六|7000|


SQL：

```sql
SELECT
 name,
 salary,
 RANK() OVER(
   ORDER BY salary DESC
 ) rank_num
FROM employee;
```


结果：

|name|salary|rank|
|-|-|-|
|张三|10000|1|
|李四|8000|2|
|王五|8000|2|
|赵六|7000|4|


---

### DENSE_RANK()

允许并列，不跳号。


结果：

|name|salary|rank|
|-|-|-|
|张三|10000|1|
|李四|8000|2|
|王五|8000|2|
|赵六|7000|3|

### PERCENT_RANK

```sql 
-- 当前行在分区的百分比排名   rank-1 / rows(total rows) -1
SELECT us.name,us.age,
RANK() OVER (ORDER BY age) as randNum,
PERCENT_RANK() OVER(ORDER BY age) as perNum
FROM learn.user_simple AS us;
```

---

####  查询每个部门工资最高的人


以前：

```sql
SELECT *
FROM employee e
WHERE salary = (
    SELECT MAX(salary)
    FROM employee
    WHERE dept=e.dept
);
```


窗口函数：

```sql
SELECT *
FROM (
    SELECT
        *,
        ROW_NUMBER() OVER(
            PARTITION BY dept
            ORDER BY salary DESC
        ) rn
    FROM employee
)t
WHERE rn=1;
```

---

# 5. 累计求和

例如订单金额累计：

订单表：

|date|amount|
|-|-|
|1号|100|
|2号|200|
|3号|300|


SQL：

```sql
SELECT
 date,
 amount,
 SUM(amount) OVER(
    ORDER BY date
 ) total
FROM orders;
```


结果：

|date|amount|total|
|-|-|-|
|1号|100|100|
|2号|200|300|
|3号|300|600|


---

##  前后数据比较

### LAG()

获取上一行。


例如：

每天销售额和昨天比较：

```sql
SELECT
 date,
 amount,
 LAG(amount) OVER(
    ORDER BY date
 ) yesterday
FROM sales;
```


结果：

|date|amount|yesterday|
|-|-|-|
|1号|100|null|
|2号|200|100|
|3号|300|200|


---

### LEAD()

获取下一行：

```sql
SELECT
 date,
 amount,
 LEAD(amount) OVER(
    ORDER BY date
 ) tomorrow
FROM sales;
```

---

## first last nth 

```sql 
-- =========================== first and last and nth 
-- 每个部门age最大的  
SELECT *
FROM user_simple AS us WHERE age = (SELECT max(age) FROM user_simple AS us2 WHERE us2.dept_id = us.dept_id);

-- 每个部门age最大的  效率高于第一个子查询  子查询相当于 双层循环 但是窗口函数只会进行一次全表扫描
SELECT *
FROM (
SELECT *,ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY age desc) as maxAgeInDept
FROM user_simple AS us)
as dep WHERE dep.maxAgeInDept = 1;
```

### FIRST_VALUE
```sql 

-- 每个部门年龄最大的人，取出名字 在每一行显示
SELECT name,dept_id,
FIRST_VALUE(name) OVER (PARTITION BY dept_id ORDER BY age desc) as maxAgeInDept
FROM user_simple AS us ;

```

### LAST_VALUE

```sql 
-- 如果不显式指定窗口帧（frame_clause），MySQL 默认的窗口帧是： ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
-- 对于每一行来说，当前窗口的“最后一行”
-- 一般使用first_value order by倒过来就好

SELECT name,dept_id,
LAST_VALUE(name) OVER (PARTITION BY dept_id ORDER BY age desc) as maxAgeInDept
FROM user_simple AS us ;

-- 每个部门年龄最小的人，取出名字 在每一行显示
SELECT name,dept_id,
LAST_VALUE(name) OVER (PARTITION BY dept_id ORDER BY age desc
ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) as minAgeInDept
FROM user_simple AS us ;
```

### NTH_VALUE

```sql
-- NTH_VALUE 和last_value  一样 需要重新指定frame clause
SELECT name,dept_id,
NTH_VALUE(name,2) OVER (PARTITION BY dept_id ORDER BY age desc
ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) as minAgeInDept
FROM user_simple AS us ;
```

## other 

### NTILE 
```sql 
-- =========================== NTILE 
-- 将分区中的有序数据均匀地划分为指定数量的桶  不能整除N时 余数会从第一个数字开始每个bucket分一个
-- 5 / 2 = 2 余 1    11  22   111 22
SELECT us.name,us.age,
NTILE(2) OVER ( ORDER BY age) as bucket_id
FROM learn.user_simple AS us;
-- 5 / 3 = 1 余2   1  1 1          1+1 2+1 3
SELECT us.name,us.age,
NTILE(3) OVER ( ORDER BY age) as bucket_id
FROM learn.user_simple AS us;
```

### CUME_DIST

```sql 
-- 计算当前行在所有数据中所处的“百分比位置”（即有多少比例的数据的值小于或等于当前行的值） 1/5 = 0.2

SELECT *,CUME_DIST() OVER( ORDER BY balance desc ) as ba_percent,
CASE
  WHEN CUME_DIST() OVER( ORDER BY age desc) <= 0.2   THEN "diamond member"
  ELSE "common member"
END
FROM user_simple ;
```
