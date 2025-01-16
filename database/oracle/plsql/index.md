# PL/sql


基本结构
``` oracle
DECLARE
  -- 声明部分
BEGIN
  -- 执行部分
EXCEPTION
  -- 异常处理部分
END;
```


``` oracle
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