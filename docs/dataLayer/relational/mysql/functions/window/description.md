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

