# user and privilege

## privilege

Oracle数据库权限系统用于控制用户对数据库资源的访问。权限分为两大类：**系统权限**和**对象权限**。

### 系统权限

系统权限控制用户执行某些数据库操作的能力，比如创建表、删除任何表等。一些常见的系统权限包括但不限于：

- `CREATE SESSION`：允许用户连接到数据库。
- `CREATE TABLE`：允许用户创建表。
- `CREATE ANY TABLE`：允许用户在任何模式中创建表。
- `DROP ANY TABLE`：允许用户删除任何模式中的表。
- `SELECT ANY TABLE`：允许用户查询任何模式中的表的数据。
- `INSERT ANY TABLE`：允许用户向任何模式中的表插入数据。
- `UPDATE ANY TABLE`：允许用户更新任何模式中的表的数据。
- `DELETE ANY TABLE`：允许用户删除任何模式中的表的数据。
- `CREATE VIEW`：允许用户创建视图。
- `CREATE PROCEDURE`：允许用户创建存储过程或函数。
- `CREATE USER`：允许用户创建其他用户。
- `DROP USER`：允许用户删除其他用户。

### 对象权限

对象权限是针对特定数据库对象（如表、视图、序列等）的权限。例如：

- `SELECT`：允许用户查询表或视图的数据。
- `INSERT`：允许用户向表或视图插入数据。
- `UPDATE`：允许用户更新表或视图的数据。
- `DELETE`：允许用户从表或视图删除数据。
- `EXECUTE`：允许用户执行存储过程或函数。
- `REFERENCES`：允许用户在一个表上定义外键约束。

### 角色

角色是一组权限的集合，可以简化权限管理。Oracle提供了一些预定义的角色，例如：

- `CONNECT`：包含基本的连接和查询权限。
- `RESOURCE`：包含创建表、序列等的权限。
- `DBA`：拥有几乎所有的系统权限，主要用于数据库管理员。

## 创建用户

```sql
-- 创建用户
CREATE USER c##jasper identified by passwd;
```

## 权限查询

USER_TAB_PRIVS：显示当前用户所拥有的表级权限。
USER_ROLE_PRIVS：列出当前用户被授予的角色。
USER_SYS_PRIVS：显示当前用户的系统权限。
DBA_TAB_PRIVS：如果拥有适当的权限，可以查看数据库中所有对象的权限信息。
DBA_ROLE_PRIVS：列出数据库中所有用户被授予的角色。
DBA_SYS_PRIVS：显示数据库中所有用户的系统权限。

## 配额

配额是指用户在一个特定表空间上能够使用的最大磁盘空间量。这是为了限制用户的存储使用，防止一个用户占用过多的空间而影响其他用户。
配额可以设置为具体的大小（例如100M），也可以设为无限制（UNLIMITED），这意味着用户可以在该表空间上使用尽可能多的空间，
直到达到表空间的最大容量

``` sql
-- 查看当前配额
SELECT * FROM dba_ts_quotas WHERE username = 'C##JASPER';
-- 授予无限配额
ALTER USER C##JASPER QUOTA UNLIMITED ON USERS;
-- 或者指定具体的配额
ALTER USER C##JASPER QUOTA 100M ON USERS;
```

## 表空间

表空间是Oracle数据库中的一个逻辑存储结构。它是数据库中最大的逻辑容器，用于存储数据。每个Oracle数据库至少有一个表空间，即系统表空间（SYSTEM）。
表空间可以包含多个数据文件，这些数据文件实际存在于操作系统级别，用来物理地存储数据库的数据

``` sql
-- 查看默认表空间
SELECT username, default_tablespace
FROM dba_users
WHERE username = 'C##JASPER';
```