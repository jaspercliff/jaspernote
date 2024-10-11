# function


## to_char

在 Oracle 中，`TO_CHAR` 函数用于将日期或数字转换为字符串格式。它非常灵活，可以使用各种格式模型来控制输出的样式。
### 日期转换为字符串
假设你有一个日期类型的字段 ` hire_date `，你希望将其转换为特定的字符串格式：

``` sql
SELECT TO_CHAR(hire_date, 'YYYY-MM-DD') AS formatted_date
FROM employees;
```
这个例子中，`hire_date` 字段将被转换为如 `"2023-10-10"` 这样的字符串格式。

### 数字转换为字符串

对于数字类型的数据，`TO_CHAR` 同样可以用来格式化输出：

``` sql
SELECT TO_CHAR(salary, '999,999.99') AS formatted_salary
FROM employees;
```
在这个例子中，`salary` 字段将被转换为带有千位分隔符和两位小数的字符串格式，如 `"123,456.78"`。

### 更多格式模型

- **日期格式模型**：
    - `'YYYY'`：四位数的年份
    - `'MM'`：月份（01 到 12）
    - `'DD'`：日期（01 到 31）
    - `'HH24'`：小时（24 小时制，00 到 23）
    - `'MI'`：分钟（00 到 59）
    - `'SS'`：秒（00 到 59）

- **数字格式模型**：
    - `'9'`：表示数字的位置，如果该位置上没有数字则为空
    - `'0'`：表示数字的位置，如果该位置上没有数字则显示为 0
    - `','`：千位分隔符
    - `'.'`：小数点

### 示例

假设我们有一个表 `orders`，其中包含 `order_date`（日期类型）和 `amount`（数字类型）两个字段，我们可以使用 `TO_CHAR` 来格式化这些字段：

``` sql
SELECT 
    TO_CHAR(order_date, 'YYYY-MM-DD HH24:MI:SS') AS formatted_order_date,
    TO_CHAR(amount, '999,999.99') AS formatted_amount
FROM orders;
```

这将输出类似于以下的结果：

```
FORMATTED_ORDER_DATE | FORMATTED_AMOUNT
--------------------|-----------------
2023-10-10 12:34:56 | 1,234.56
2023-10-11 13:45:01 | 2,345.67
```


## SUBSTR
在 Oracle 中，`SUBSTR` 函数用于从字符串中提取子字符串。它的语法和用法相对简单，但功能强大。

### 语法

``` sql
SUBSTR(string, start_position, [length])
```

#### 参数
- `string`：源字符串，从中提取子字符串。
- `start_position`：开始提取的位置。位置从 1 开始计数。如果为负数，则从字符串末尾向前计数。
- `length`（可选）：提取的子字符串长度。如果不指定，则从 `start_position` 开始提取到字符串末尾。

### 示例

#### 示例 1：基本用法
假设有一个字符串 `'Hello, World!'`，我们从第 7 个字符开始提取：

``` sql
SELECT SUBSTR('Hello, World!', 7) AS result FROM dual;
```

输出：
```
RESULT
-------
World!
```

#### 示例 2：指定长度
从第 7 个字符开始，提取 5 个字符：

``` sql
SELECT SUBSTR('Hello, World!', 7, 5) AS result FROM dual;
```

输出：
```
RESULT
-------
World
```

#### 示例 3：从字符串末尾开始提取
从字符串末尾向前第 6 个字符开始提取：

``` sql
SELECT SUBSTR('Hello, World!', -6, 5) AS result FROM dual;
```

输出：
```
RESULT
-------
World
```

#### 示例 4：提取单个字符
从第 1 个字符开始，提取 1 个字符：
``` sql
SELECT SUBSTR('Hello, World!', 1, 1) AS result FROM dual;
```

输出：
```
RESULT
-------
H
```

### 注意事项
- `start_position` 从 1 开始计数，而不是从 0 开始。
- 如果 `start_position` 为负数，从字符串末尾向前计数。
- 如果 `length` 超过了字符串的剩余长度，`SUBSTR` 函数会返回从 `start_position` 开始到字符串末尾的所有字符。

### 与 MySQL 的 `SUBSTRING` 函数对比

在 MySQL 中，`SUBSTRING` 函数的功能与 Oracle 的 `SUBSTR` 函数类似，但语法稍有不同：

#### MySQL 语法
``` sql
SUBSTRING(str, pos, [length])
```

#### 示例
```sql
SELECT SUBSTRING('Hello, World!', 7) AS result;
```

输出：
```
result
-------
World!
```

```sql
SELECT SUBSTRING('Hello, World!', 7, 5) AS result;
```

输出：
```
result
-------
World
```