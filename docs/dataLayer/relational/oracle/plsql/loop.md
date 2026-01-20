# 循环

在 PL/SQL（Procedural Language for SQL）中，循环结构用于重复执行一段代码块。PL/SQL 提供了多种类型的循环，以满足不同的需求。以下是常见的三种循环类型及其用法：

---

### **1. 基本 `LOOP` 循环**

这是最简单的循环结构，没有明确的终止条件，必须通过 `EXIT` 或 `RETURN` 语句来退出循环。

#### **语法**

```plsql
LOOP
    -- 循环体
    EXIT WHEN 条件;
END LOOP;
```

#### **示例**

```plsql
DECLARE
    v_counter NUMBER := 1; -- 初始化计数器
BEGIN
    LOOP
        DBMS_OUTPUT.PUT_LINE('当前值: ' || v_counter);
        v_counter := v_counter + 1; -- 更新计数器
        EXIT WHEN v_counter > 5; -- 当计数器大于 5 时退出循环
    END LOOP;
END;
/
```

**输出：**

```
当前值: 1
当前值: 2
当前值: 3
当前值: 4
当前值: 5
```

---

### **2. `WHILE` 循环**

`WHILE` 循环根据指定的条件来决定是否继续执行循环体。如果条件为 `TRUE`，则执行循环；否则退出循环。

#### **语法**

```plsql
WHILE 条件 LOOP
    -- 循环体
END LOOP;
```

#### **示例**

```plsql
DECLARE
    v_counter NUMBER := 1; -- 初始化计数器
BEGIN
    WHILE v_counter <= 5 LOOP
        DBMS_OUTPUT.PUT_LINE('当前值: ' || v_counter);
        v_counter := v_counter + 1; -- 更新计数器
    END LOOP;
END;
/
```

**输出：**

```
当前值: 1
当前值: 2
当前值: 3
当前值: 4
当前值: 5
```

---

### **3. `FOR` 循环**

`FOR` 循环是一种带有明确范围的循环，通常用于迭代固定次数的操作。它会自动初始化、递增和终止计数器。

#### **语法**

```plsql
FOR 循环变量 IN [REVERSE] 起始值 .. 结束值 LOOP
    -- 循环体
END LOOP;
```

- **`REVERSE`**：可选关键字，用于反向迭代（从大到小）。
- **`起始值` 和 `结束值`**：定义循环的范围。

#### **示例 1：正向迭代**

```plsql
BEGIN
    FOR i IN 1..5 LOOP
        DBMS_OUTPUT.PUT_LINE('当前值: ' || i);
    END LOOP;
END;
/
```

**输出：**

```
当前值: 1
当前值: 2
当前值: 3
当前值: 4
当前值: 5
```

#### **示例 2：反向迭代**

```plsql
BEGIN
    FOR i IN REVERSE 5..1 LOOP
        DBMS_OUTPUT.PUT_LINE('当前值: ' || i);
    END LOOP;
END;
/
```

**输出：**

```
当前值: 5
当前值: 4
当前值: 3
当前值: 2
当前值: 1
```

---

### **4. 嵌套循环**

可以在一个循环内部嵌套另一个循环，用于处理更复杂的逻辑。

#### **示例**

```plsql
BEGIN
    FOR i IN 1..3 LOOP
        FOR j IN 1..3 LOOP
            DBMS_OUTPUT.PUT_LINE('i=' || i || ', j=' || j);
        END LOOP;
    END LOOP;
END;
/
```

**输出：**

```
i=1, j=1
i=1, j=2
i=1, j=3
i=2, j=1
i=2, j=2
i=2, j=3
i=3, j=1
i=3, j=2
i=3, j=3
```

---

### **5. 使用 `CONTINUE` 跳过当前迭代**

从 Oracle 12c 开始，PL/SQL 引入了 `CONTINUE` 语句，用于跳过当前循环的剩余部分并直接进入下一次迭代。

#### **示例**

```plsql
BEGIN
    FOR i IN 1..5 LOOP
        IF MOD(i, 2) = 0 THEN
            CONTINUE; -- 跳过偶数
        END IF;
        DBMS_OUTPUT.PUT_LINE('当前值: ' || i);
    END LOOP;
END;
/
```

**输出：**

```
当前值: 1
当前值: 3
当前值: 5
```

---

### **6. 总结对比**

| 循环类型           | 特点                              |
|----------------|---------------------------------|
| **基本 `LOOP`**  | 最灵活，但需要手动控制退出条件 (`EXIT`)。       |
| **`WHILE` 循环** | 根据条件决定是否继续执行，适合不确定循环次数的场景。      |
| **`FOR` 循环**   | 固定范围的迭代，适合已知循环次数的场景，且自动管理计数器。   |
| **嵌套循环**       | 用于多层迭代，适用于复杂逻辑。                 |
| **`CONTINUE`** | 跳过当前迭代，简化逻辑（从 Oracle 12c 开始支持）。 |

根据具体需求选择合适的循环类型，可以提高代码的可读性和效率。