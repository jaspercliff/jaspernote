# 基本组件

在PL/SQL中，过程、函数、变量、常量、游标以及异常是构建数据库应用程序的基本组件。

### 1. 过程（Procedure）

过程是一组完成特定任务的PL/SQL语句集合。与函数不同，过程不返回值（虽然它可以修改参数或执行DML操作）。

**示例：**

```plsql
CREATE OR REPLACE PROCEDURE update_salary(p_employee_id IN employees.employee_id%TYPE, p_new_salary IN employees.salary%TYPE) AS
BEGIN
  UPDATE employees
  SET salary = p_new_salary
  WHERE employee_id = p_employee_id;
END update_salary;
/
```

### 2. 函数（Function）

函数类似于过程，但它必须返回一个值。函数可以在SQL查询中使用，而过程不可以。

**示例：**

```plsql
CREATE OR REPLACE FUNCTION get_employee_salary(p_employee_id IN employees.employee_id%TYPE) RETURN NUMBER AS
  v_salary employees.salary%TYPE;
BEGIN
  SELECT salary INTO v_salary
  FROM employees
  WHERE employee_id = p_employee_id;
  
  RETURN v_salary;
END get_employee_salary;
/
```

### 3. 变量（Variable）

变量用于存储临时数据。它们必须先声明后使用，并且可以指定类型。

**示例：**

```plsql
DECLARE
  v_first_name employees.first_name%TYPE;
BEGIN
  -- 使用变量的逻辑
END;
/
```

### 4. 常量（Constant）

常量是一种特殊的变量，其值一旦赋值之后就不能改变。

**示例：**

```plsql
DECLARE
  c_tax_rate CONSTANT NUMBER(3,2) := 0.20; -- 20% tax rate
BEGIN
  -- 使用常量的逻辑
END;
/
```

### 5. 游标（Cursor）

游标用于处理查询结果集。有两种类型的游标：显式和隐式。显式游标需要手动声明和管理，而隐式游标由PL/SQL自动管理。

**显式游标示例：**

```plsql
DECLARE
  CURSOR emp_cur IS SELECT first_name, last_name FROM employees;
  v_first_name employees.first_name%TYPE;
  v_last_name employees.last_name%TYPE;
BEGIN
  OPEN emp_cur;
  LOOP
    FETCH emp_cur INTO v_first_name, v_last_name;
    EXIT WHEN emp_cur%NOTFOUND;
    -- 处理每一行数据
  END LOOP;
  CLOSE emp_cur;
END;
/
```

### 6. 异常（Exception）

异常处理用于捕捉运行时错误，保证程序能够正常运行或以适当的方式终止。

**示例：**

```plsql
DECLARE
  e_no_data_found EXCEPTION;
BEGIN
  -- 可能引发异常的代码
  IF NOT some_condition THEN
    RAISE e_no_data_found;
  END IF;
EXCEPTION
  WHEN e_no_data_found THEN
    DBMS_OUTPUT.PUT_LINE('No data found');
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('An unexpected error occurred');
END;
/
```

在这个示例中，`e_no_data_found`是一个用户自定义异常，当某些条件不满足时被触发。`WHEN OTHERS THEN`部分用于捕获所有未明确处理的异常。

通过组合使用这些基本组件，你可以构建复杂的PL/SQL程序来处理各种数据库操作和业务逻辑。希望这个介绍对你理解PL/SQL编程有所帮助！如果你有任何进一步的问题，请随时提问。