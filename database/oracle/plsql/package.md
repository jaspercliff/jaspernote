# package

在PL/SQL中，包（Package）是一种将相关联的过程、函数、变量、常量、游标以及异常等组织在一起的方式。
包有助于提高代码的模块化程度和可维护性，
并且能够隐藏实现细节，只暴露必要的接口给外部使用。一个包由两部分组成：包规范（Package
Specification）和包体（Package Body）。这里主要介绍包规范。

### 包规范

包规范定义了包的公共接口，即可以从包外部访问的内容。它包括了子程序（过程和函数）的声明、游标的声明、类型定义、常量和变量等。
但是，在包规范中不包含具体实现逻辑，这些实现在包体中定义。

#### 包规范的基本结构

```plsql
CREATE OR REPLACE PACKAGE package_name AS
  -- 公共类型的声明
  TYPE type_name IS RECORD (
    field1 datatype,
    field2 datatype,
    ...
  );

  -- 常量声明
  constant_name CONSTANT datatype := value;

  -- 变量声明
  variable_name datatype;

  -- 游标声明
  CURSOR cursor_name (parameter_list) RETURN return_type;

  -- 函数声明
  FUNCTION function_name (parameter_list) RETURN return_type;

  -- 过程声明
  PROCEDURE procedure_name (parameter_list);

END package_name;
/
```

/工具用来识别一个语句块结束的命令


```plsql
create PACKAGE EMPLOYEE_PACKAGE AS
    -- 自定义记录类型用于存储员工公开信息
    TYPE employee_info IS RECORD
                          (
                              employee_id NUMBER(6),
                              first_name  employees.first_name%TYPE,
                              last_name   employees.last_name%TYPE
                          );

    -- 常量，表示默认的薪资增长百分比
    c_default_raise CONSTANT NUMBER(3, 2) := 0.10;

    -- 函数：根据ID获取员工的所有信息
    FUNCTION get_employee_by_id(p_employee_id IN EMPLOYEES.employee_id%TYPE)
        RETURN employees%ROWTYPE;

    -- 函数：根据ID获取员工的公开信息
    FUNCTION get_employee_public_by_id(p_employee_id IN EMPLOYEES.employee_id%TYPE)
        RETURN employee_info;

    -- 过程：更新员工的薪资
    PROCEDURE update_salary(
        p_employee_id IN EMPLOYEES.employee_id%TYPE,
        p_new_salary IN EMPLOYEES.salary%TYPE
    );

    -- 过程：增加指定员工的薪资
    PROCEDURE increase_salary(
        p_employee_id IN employees.employee_id%TYPE,
        p_increase_percentage IN NUMBER DEFAULT c_default_raise
    );
    -- 过程：打印所有员工的信息
    PROCEDURE print_all_employees;
    -- 自定义异常，表示找不到员工
    e_employee_not_found EXCEPTION;
END EMPLOYEE_PACKAGE;
/

create PACKAGE BODY EMPLOYEE_PACKAGE AS

    -- 实现 根据id获取员工信息
    FUNCTION get_employee_by_id(p_employee_id IN employees.EMPLOYEE_ID%TYPE)
        RETURN employees%ROWTYPE IS
        v_employee_info employees%ROWTYPE;
    BEGIN
        SELECT *
        INTO v_employee_info
        FROM employees
        WHERE EMPLOYEE_ID = p_employee_id;

        RETURN v_employee_info;

    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20001, 'Employee not found');
    END get_employee_by_id;

    -- 根据id获取公开信息
    FUNCTION get_employee_public_by_id(p_employee_id IN employees.employee_id%TYPE)
        RETURN employee_info IS
        v_employee_public_info employee_info;
    BEGIN
        SELECT EMPLOYEE_ID, FIRST_NAME, LAST_NAME
        INTO v_employee_public_info
        FROM employees
        WHERE EMPLOYEE_ID = p_employee_id;

        RETURN v_employee_public_info;

    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20001, 'Employee not found');
    END get_employee_public_by_id;

    -- 更新员工薪资
    PROCEDURE update_salary(p_employee_id IN EMPLOYEES.EMPLOYEE_ID%TYPE,
                            p_new_salary IN EMPLOYEES.salary%TYPE) IS
        rows_affected NUMBER;
    BEGIN
        UPDATE EMPLOYEES
        SET SALARY = p_new_salary
        WHERE EMPLOYEE_ID = p_employee_id;

        rows_affected := SQL%ROWCOUNT;
        IF rows_affected = 0 THEN
            RAISE_APPLICATION_ERROR(-20001, 'Employee not found');
        END IF;
    END update_salary;

    -- 给指定员工增加salary
    PROCEDURE increase_salary(p_employee_id IN employees.employee_id%TYPE,
                              p_increase_percentage IN NUMBER DEFAULT c_default_raise) IS
        v_current_salary employees.salary%TYPE;
    BEGIN
        SELECT SALARY
        INTO v_current_salary
        FROM employees
        WHERE EMPLOYEE_ID = p_employee_id;

        UPDATE EMPLOYEES
        SET SALARY = SALARY + (SALARY * p_increase_percentage)
        WHERE EMPLOYEE_ID = p_employee_id;

        IF SQL%NOTFOUND THEN
            RAISE e_employee_not_found;
        END IF;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE e_employee_not_found;
    END increase_salary;


-- 实现 打印所有员工的信息
    PROCEDURE print_all_employees IS
        -- 声明游标
        CURSOR employee_cur IS
            SELECT employee_id, first_name, last_name
            FROM employees;
        -- 定义一个记录变量，用于存储从游标中获取的数据行
        employee_rec employee_cur%ROWTYPE;
    BEGIN
        -- 打开游标
        OPEN employee_cur;
        -- 循环遍历游标中的每一行数据
        LOOP
            -- 从游标中获取一行数据到记录变量中
            FETCH employee_cur INTO employee_rec;
            -- 检查是否已经到达结果集末尾
            EXIT WHEN employee_cur%NOTFOUND;
            -- 打印当前员工的信息
            DBMS_OUTPUT.PUT_LINE('Employee ID: ' || employee_rec.employee_id
                || ', Name: ' || employee_rec.first_name
                || ' ' || employee_rec.last_name);
        END LOOP;
        -- 关闭游标
        CLOSE employee_cur;
    EXCEPTION
        WHEN OTHERS THEN
            -- 如果出现异常，则关闭游标并重新抛出异常
            IF employee_cur%ISOPEN THEN
                CLOSE employee_cur;
            END IF;
            RAISE;
    END print_all_employees;

END EMPLOYEE_PACKAGE;
/

```