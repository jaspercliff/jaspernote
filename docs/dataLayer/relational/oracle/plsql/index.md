# index

PL/SQL（Procedural Language extensions to SQL）是Oracle数据库对结构化查询语言（SQL）的扩展，它结合了过程化编程和数据操作功能。

- [hello world](helloworld.md)
- [数据类型](dataType.md)
- [loop](loop.md)
- [包](package.md)

## 基本语法

- PL/SQL块结构：包括声明部分、执行部分和异常处理部分。
- 注释使用：单行注释使用`--`，多行注释使用`/* */`。

## 变量与常量

- 声明变量和常量，以及理解不同的数据类型，如NUMBER, VARCHAR2, DATE等。
- 变量赋值使用`:=`符号。

## **流程控制语句**

- 条件语句：IF-THEN, IF-THEN-ELSE, ELSIF。
- 循环语句：LOOP, WHILE-LOOP, FOR-LOOP。
- 退出循环或跳过当前迭代：EXIT, CONTINUE。

## **游标（Cursors）**

- 显式游标用于处理查询返回的一组行。
- 隐式游标由PL/SQL自动管理，用于处理单行查询。

## **异常处理**

- 预定义异常、非预定义异常和用户定义异常。
- 使用EXCEPTION块捕捉并处理运行时错误。

## **存储过程与函数**

- 创建和调用存储过程和函数以封装可重用的代码逻辑。
- 参数传递方式：IN, OUT, IN OUT。

## **包（Packages）**

- 包括包规范（Package Specification）和包体（Package Body），用于组织相关的存储过程、函数和其他元素。

## **触发器（Triggers）**

- 定义在特定数据库事件上自动执行的代码，如DML操作（INSERT, UPDATE, DELETE）。

## **集合与记录**

- 集合类型包括嵌套表（Nested Tables）、VARRAYs和关联数组（Associative Arrays）。
- 记录类型用于处理一行数据作为一个单元。

## **动态SQL**

- 使用EXECUTE IMMEDIATE执行动态构建的SQL语句。

## **事务管理**

- COMMIT, ROLLBACK等命令来管理数据库事务。

## **安全性**

- 理解如何通过角色和权限来保护数据库对象。

## **性能优化**

- 学习索引、绑定变量、批量收集(BULK COLLECT)和FORALL等技术来提高PL/SQL程序的性能。
