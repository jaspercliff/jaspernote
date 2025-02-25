# SUBSTR
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
``` sql
SELECT SUBSTRING('Hello, World!', 7) AS result;
```

输出：
```
result
-------
World!
```

``` sql
SELECT SUBSTRING('Hello, World!', 7, 5) AS result;
```

输出：
```
result
-------
World
```