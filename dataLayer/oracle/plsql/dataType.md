# data type 

在PL/SQL中定义变量可以通过指定变量名及其数据类型来完成。变量的定义通常位于`DECLARE`部分（对于匿名块）或包、过程、函数等的声明部分。
你可以直接指定数据类型，也可以使用数据库表列的数据类型或已有变量的数据类型（通过`%TYPE`和`%ROWTYPE`）。

## 标量类型

- boolean:true false null
  - 不能将数据库列插入boolean，也不能将列值保存到boolean变量中
- 日期：date
- 数字：number dec（38）float（38）real（18）
- 字符：varchar2、varchar、string（只能pl/sql使用）、char、long


## 变量声明

```
var_name type [constant][not null][:=value]
```

```plsql
declare
    v_system_date date :=SYSDATE;
    v_system_date_char varchar2(100);
begin
    v_system_date_char:=to_char(v_system_date,'yyyy-mm-dd');
    DBMS_OUTPUT.PUT_LINE('current date is'||v_system_date_char);
end;
```
> || 字符串连接运算符  将俩个字符串拼接在一起

> %TYPE 是一个属性，用于引用数据库列或已有变量的数据类型。使用 %TYPE
的主要优点是它提供了数据类型的动态引用，这意味着如果将来数据库表的结构发生变化（例如，列的数据类型被修改），只要使用了
`%TYPE` 来定义变量类型，就不需要手动更新这些变量的声明

>当需要处理一整行的数据时，可以使用 `%ROWTYPE` 属性来定义记录变量，该变量的结构与表或视图的行结构相匹配。


## specification

1. **前缀（Prefixes）**：
    - 使用前缀来表示变量的类型或作用域。例如：
        - `v_`：表示这是一个局部变量（variable）。
        - `c_`：表示这是一个常量（constant）。
        - `g_`：表示这是一个全局变量（global variable）。
        - `l_`：表示这是一个局部变量（local variable），类似于`v_`。
        - `p_`：用于过程或函数的参数（parameter）。

2. **后缀（Suffixes）**：
    - 有时候也会使用后缀来提供额外的信息，比如数据类型。不过这不如前缀常见。

3. **驼峰命名法（CamelCase）** 或 **下划线分隔（underscore_separated）**：
    - 驼峰命名法是将单词首字母大写，其余小写，不使用分隔符。例如：`employeeId`。
    - 下划线分隔则是用下划线连接单词，全部小写。例如：`employee_id`。


### 1. 直接指定数据类型

这是最基础的变量定义方式，直接为变量指定一个明确的数据类型。

```plsql
DECLARE
  v_id NUMBER(6); -- 定义一个数字类型的变量，长度为6位
  v_name VARCHAR2(50); -- 定义一个变长字符串类型的变量，最大长度为50
  v_hire_date DATE; -- 定义一个日期类型的变量
BEGIN
  -- 可以在这里编写使用这些变量的逻辑
END;
/
```

### 2. 使用 `%TYPE` 属性

当你希望变量的数据类型与数据库表中的某一列相同，或者与另一个已定义的变量相同，可以使用 `%TYPE` 属性。

```plsql
DECLARE
  v_first_name employees.first_name%TYPE; -- 与employees表的first_name列具有相同的类型
  v_salary employees.salary%TYPE := 5000; -- 初始化变量并赋予默认值
BEGIN
  -- 使用变量进行操作
END;
/
```

### 3. 使用 `%ROWTYPE` 属性

当你需要处理一整行的数据时，可以使用 `%ROWTYPE` 属性来定义记录变量，该变量的结构与表或视图的行结构相匹配。

```plsql
DECLARE
  v_employee employees%ROWTYPE; -- 定义一个与employees表行结构相同的记录变量
BEGIN
  SELECT * INTO v_employee FROM employees WHERE employee_id = 100;
  -- 现在v_employee包含了指定员工的所有列的数据
END;
/
```

### 4. 定义和初始化复合数据类型

除了基本数据类型，还可以定义和初始化复合数据类型如记录（`RECORD`）或集合（如嵌套表、VARRAY）。

**定义记录类型并初始化：**

```plsql
DECLARE
  TYPE employee_info_type IS RECORD (
    id employees.employee_id%TYPE,
    name employees.first_name%TYPE,
    salary employees.salary%TYPE
  );
  v_employee_info employee_info_type;
BEGIN
  v_employee_info.id := 100;
  v_employee_info.name := 'John Doe';
  v_employee_info.salary := 7000;
  -- 使用v_employee_info进行操作
END;
/
```

### 5. 定义常量

如果要定义一个不可更改其值的变量，即常量，可以使用 `CONSTANT` 关键字，并在声明时为其赋值。

```plsql
DECLARE
  c_tax_rate CONSTANT NUMBER(3,2) := 0.20; -- 定义一个名为c_tax_rate的常量，值为0.20
BEGIN
  -- 常量可以在逻辑中使用，但不能被重新赋值
END;
/
```

### 总结

- **直接指定数据类型** 是最常用的方法，适用于所有基本数据类型。
- **使用 `%TYPE`** 提供了一种灵活的方式，使得变量的数据类型与数据库表中的列保持一致。
- **使用 `%ROWTYPE`** 对于需要处理整行数据的情况非常有用。
- **定义和初始化复合数据类型** 如记录或集合，适用于复杂的数据结构。
- **定义常量** 用于那些在整个程序执行期间都不应改变的值。
