# mysql

## 数据库三大范式
数据库设计的三大范式（Normal Forms，简称NF）是关系数据库设计中的基本原则，旨在减少数据冗余、提高数据的一致性，并使数据库结构更加清晰。下面是这三大范式的详细说明：

1. **第一范式（1NF）：确保每个列的原子性**
    - 第一范式要求表中的每个字段都是不可分割的原子数据项，即字段不可再分成其他几个字段。每一列都是独立的，不可以有重复组合或多值属性，例如，一个联系电话字段就不应该包含多个电话号码。
    - 实现第一范式是关系模型的基础，未满足第一范式的数据库表通常不被认为是关系表。

2. **第二范式（2NF）：消除部分函数依赖**
    - 第二范式在第一范式的基础上进一步要求，表必须有一个主键，并且非主键字段必须完全依赖于主键，而不是依赖于主键的一部分（针对复合主键）。
    - 简单地说，就是非主键字段必须与整个主键有关系，而不能仅与主键中的部分字段有关系。
    - 例如，如果一个表有一个由两个字段组成的复合主键，那么表中的其他字段应该与这两个字段全部相关，而不是仅与其中一个字段相关。
    ``` mysql
    CREATE TABLE Orders (
        OrderID INT,
        ProductID INT,
        OrderDate DATE,
        Quantity INT,
        PRIMARY KEY (OrderID, ProductID)
    );
    ```
3. **第三范式（3NF）：消除传递函数依赖**
    - 第三范式要求表中的所有字段不仅完全依赖于主键，而且还必须直接依赖于主键，消除非主键字段对其他非主键字段的依赖（传递依赖）。
    - 例如，如果表中有“A影响B，B影响C”的情况，其中A是主键，那么按照第三范式，C应该直接依赖于A，而不是通过B依赖于A。

遵循这三大范式可以帮助数据库设计者避免许多数据存储问题，例如更新异常、插入异常和删除异常，从而使数据库操作更高效、数据更加一致。
然而，在实际应用中，过度规范化可能会导致查询性能下降，因此在具体情况下可能需要适当的反规范化来平衡数据库的设计。

## 和权限（权限管理）有关的表
在MySQL中，和权限（权限管理）相关的数据主要存储在MySQL的系统数据库 `mysql` 中的几个特定表中。这些表负责存储用户账户信息、权限信息、密码及其他安全相关的配置。了解这些表对于管理MySQL的安全性和访问控制非常重要。

以下是MySQL中几个与权限管理密切相关的核心表：

1. **`user` 表**：
   - 存储用户账户及其全局权限的信息。每一行代表一个用户账户，包含用户的登录信息（如用户名和主机名）及其全局级别的权限。

2. **`db` 表**：
   - 存储用户对特定数据库的权限。这些权限仅限于特定数据库。

3. **`tables_priv` 表**：
   - 存储用户对特定数据库中特定表的权限。

4. **`columns_priv` 表**：
   - 存储用户对特定数据库中特定表的特定列的权限。

5. **`procs_priv` 表**：
   - 存储用户对存储过程和函数的权限。

6. **`roles_mapping` 表**：（没看到）
   - 存储角色与用户的映射关系，这是MySQL 8.0引入的角色功能的一部分。

7. **`global_grants` 表**：
   - 用于存储全局级别的动态权限。这是MySQL 8.0及更高版本中新增的表，用于更细粒度的权限控制。

8. **`role_edges` 表**：
   - 存储角色之间的授权关系，这是MySQL 8.0引入的角色功能的一部分。

这些表构成了MySQL权限和安全策略的核心，可以通过直接编辑这些表或使用MySQL提供的SQL命令（如 `GRANT`、`REVOKE` 等）来管理这些权限。使用SQL命令是推荐的做法，因为它们会正确处理权限的变更，并确保所有相关的缓存和内部状态都得到更新。

对这些权限表的直接更改应该非常谨慎，因为错误的更改可能会导致安全漏洞或访问控制问题。在进行更改之前，确保对当前的权限设置有充分的了解，并在生产环境中进行适当的备份和测试。

## mysql的执行顺序

1. FROM
2. join
3. where
4. group by
5. having
6. select
7. order by
8. limit
