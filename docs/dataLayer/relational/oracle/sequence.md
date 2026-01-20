# sequence 

在 Oracle 数据库中，`NEXTVAL` 是序列（Sequence）对象的一个伪列，用于生成序列的下一个值。序列是一种数据库对象，通常用于生成唯一的数字序列值，例如主键值。

---

### **什么是序列？**
序列是一个数据库对象，可以自动生成一系列按顺序递增或递减的数字。它常用于需要唯一标识符的场景，例如生成表的主键值。

---

### **语法**
要使用 `NEXTVAL`，首先需要创建一个序列对象。以下是创建序列的语法：

``` sql
CREATE SEQUENCE sequence_name
[START WITH initial_value]
[INCREMENT BY interval]
[MAXVALUE max_value | NOMAXVALUE]
[MINVALUE min_value | NOMINVALUE]
[CYCLE | NOCYCLE]
[CACHE cache_size | NOCACHE]
[ORDER | NOORDER];
```

- **`sequence_name`**：序列的名称。
- **`START WITH`**：指定序列的起始值（默认为 1）。
- **`INCREMENT BY`**：指定序列每次递增或递减的步长（默认为 1）。
- **`MAXVALUE`/`NOMAXVALUE`**：指定序列的最大值，或者不限制最大值。
- **`MINVALUE`/`NOMINVALUE`**：指定序列的最小值，或者不限制最小值。
- **`CYCLE`/`NOCYCLE`**：指定序列达到最大值或最小值后是否循环。
- **`CACHE`/`NOCACHE`**：指定是否缓存序列值以提高性能。
- **`ORDER`/`NOORDER`**：指定是否保证序列值的顺序。

---

### **NEXTVAL 的用法**
`NEXTVAL` 是序列对象的一个伪列，用于获取序列的下一个值。

#### 示例：
假设我们有一个名为 `my_sequence` 的序列，可以通过以下方式获取其下一个值：
``` sql
SELECT my_sequence.NEXTVAL FROM dual;
```

- 第一次执行时返回序列的起始值。
- 每次执行时返回递增后的值。

---

### **`CURRVAL` 的用法**
`CURRVAL` 是序列对象的另一个伪列，用于获取当前已经分配的序列值。

#### 注意：
- 在首次使用 `CURRVAL` 之前，必须先调用一次 `NEXTVAL` 来初始化序列值。
- 如果直接使用 `CURRVAL` 而未先调用 `NEXTVAL`，会抛出错误。

#### 示例：
``` sql
-- 先获取下一个值
SELECT my_sequence.NEXTVAL FROM dual;

-- 再获取当前值
SELECT my_sequence.CURRVAL FROM dual;
```

---

### **示例：创建和使用序列**

#### 1. 创建序列
``` sql
CREATE SEQUENCE my_sequence
START WITH 1
INCREMENT BY 1
NOMAXVALUE
NOMINVALUE
NOCYCLE
CACHE 20;
```

#### 2. 使用 `NEXTVAL`
``` sql
-- 获取序列的下一个值
SELECT my_sequence.NEXTVAL FROM dual;
```

#### 3. 插入数据时使用序列
假设有一张表 `employees`，其中 `employee_id` 是主键，可以使用序列生成唯一的主键值：
``` sql
INSERT INTO employees (employee_id, name)
VALUES (my_sequence.NEXTVAL, 'John Doe');
```

---

### **注意事项**

1. **并发性**：
    - 序列是线程安全的，多个会话可以同时使用同一个序列而不会产生冲突。
    - 如果启用了 `CACHE`，Oracle 会在内存中缓存一定数量的序列值以提高性能，但如果系统崩溃，可能会丢失一些未使用的缓存值。

2. **序列值的连续性**：
    - 即使启用了 `CACHE`，序列值也不一定是连续的，因为缓存中的值可能因事务回滚或系统故障而丢失。

3. **删除序列**：
    - 如果不再需要某个序列，可以使用以下命令删除：
      ``` sql
      DROP SEQUENCE sequence_name;
      ```

4. **修改序列**：
    - 可以通过 `ALTER SEQUENCE` 修改序列的属性，例如递增值、最大值等：
      ``` sql
      ALTER SEQUENCE my_sequence INCREMENT BY 5;
      ```

---

### **应用场景**

1. **生成主键值**：
    - 在设计表时，如果主键需要唯一且递增的整数，可以使用序列生成主键值。

2. **批量插入数据**：
    - 在批量插入数据时，可以结合序列生成唯一的标识符。

3. **计数器功能**：
    - 序列可以用作简单的计数器，记录某些操作的次数。

通过合理使用序列和 `NEXTVAL`，可以简化数据库开发中的许多任务，并确保数据的唯一性和一致性。