# PL/sql


基本结构
``` sql
DECLARE
  -- 声明部分
BEGIN
  -- 执行部分
EXCEPTION
  -- 异常处理部分
END;
```


``` sql
DECLARE
  -- 声明部分
  v_name VARCHAR2(100);
BEGIN
	-- 执行部分
  SELECT first_name INTO v_name
  FROM employees
  WHERE employee_id = 100;
  
  DBMS_OUTPUT.PUT_LINE('Employee Name: ' || v_name);
EXCEPTION
  -- 异常处理部分
  WHEN NO_DATA_FOUND THEN
    DBMS_OUTPUT.PUT_LINE('No data found for employee ID 100.');
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('An error occurred.');
END;
/
```

into 指定查询结果存储到那个变量中


- = 用于判断是否相等
- := 用于赋值


- 使用CREATE OR REPLACE TYPE语句可以定义一个新的对象类型或者替换一个已经存在的对象类型
``` sql
CREATE OR REPLACE TYPE EmployeeType AS OBJECT (
  employee_id NUMBER,
  first_name VARCHAR2(50),
  salary NUMBER(10, 2)
);
```


- CREATE OR REPLACE PACKAGE RB_CLASS_ACCT_OPEN AS
  用于定义一个包的规范（也称为包头）。这里的 AS 关键字实际上与 IS 关键字可以互换使用，在这个上下文中它们的功能是相同的。它们用来标识接下来的部分是包的声明部分，包括该包中定义的所有公共变量、类型、游标以及子程序（过程和函数）的签名

- SELECT INTO 在 PL/SQL 中主要用于从数据库表中查询单行数据并将其存入变量

``` sql
DECLARE
  v_employee_id employees.employee_id%TYPE;
  v_first_name employees.first_name%TYPE;
  v_last_name employees.last_name%TYPE;
BEGIN
  SELECT employee_id, first_name, last_name
  INTO v_employee_id, v_first_name, v_last_name
  FROM employees
  WHERE employee_id = 100;

  DBMS_OUTPUT.PUT_LINE('Employee ID: ' || v_employee_id);
  DBMS_OUTPUT.PUT_LINE('Name: ' || v_first_name || ' ' || v_last_name);
END;
/
```



SQL%NOTFOUND 是一个在 SQL 和 PL/SQL（Oracle 数据库使用的编程语言）中的属性，用于检测最近执行的单行 SQL 操作
（如 INSERT、UPDATE、DELETE 或 SELECT INTO）是否影响了任何行。
它是一个布尔属性，当最近的 SQL 操作没有影响到任何行时返回 TRUE；否则返回 FALSE。

NO_DATA_FOUND 是在 PL/SQL 中预定义的一个异常，它会在执行 SELECT INTO 语句但未能返回任何行时被触发。这意味着当你尝试从数据库中
查询数据并期望该查询会返回一行结果到一个或多个PL/SQL变量中，但如果实际上没有找到符合查询条件的数据时，就会抛出这个异常