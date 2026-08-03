# 窗口函数 

MySQL **窗口函数（Window Function，也叫分析函数）** 是 MySQL 8.0 引入的一个非常重要的功能。

它的核心作用：

> **在不改变原始行数的情况下，对一组数据进行聚合、排序、排名、累计计算等操作。**

简单理解：

- `GROUP BY`：聚合后会减少行数
- **窗口函数**：计算后保留每一行

---

##  基本语法

```sql
函数名() OVER (
    PARTITION BY 分组字段
    ORDER BY 排序字段
    ROWS BETWEEN 范围
)
```

例如：

```sql
SELECT
    name,
    salary,
    AVG(salary) OVER() avg_salary
FROM employee;
```


普通聚合：

```sql
SELECT AVG(salary)
FROM employee;
```

只有一行。

窗口函数：

```sql
AVG(salary) OVER()
```

每行都有平均值。

基础聚合窗口：SUM()、AVG()、COUNT()、MAX()、MIN() 配合 OVER() 使用

---

##   PARTITION BY 分组窗口

类似 `GROUP BY`，但是不会合并数据。


表：

employee

|id|name|dept|salary|
|-|-|-|-|
|1|张三|技术部|10000|
|2|李四|技术部|8000|
|3|王五|销售部|9000|
|4|赵六|销售部|7000|


查询：

```sql
SELECT
    name,
    dept,
    salary,
    AVG(salary) OVER(
        PARTITION BY dept
    ) avg_salary
FROM employee;
```

结果：

|name|dept|salary|avg_salary|
|-|-|-|-|
|张三|技术部|10000|9000|
|李四|技术部|8000|9000|
|王五|销售部|9000|8000|
|赵六|销售部|7000|8000|


意思：

> 每个部门计算平均工资，但是保留员工明细。

---

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

