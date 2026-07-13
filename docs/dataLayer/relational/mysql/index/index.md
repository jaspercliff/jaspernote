# index 

一种用于快速查询和检索数据的数据结构，排序好的数据结构

## advantage and disadvantage
- advantage
  - 加快数据检索速度，减少io次数
  - 唯一性索引可以保证每一行数据的唯一性
- disadvantage
  - 占用磁盘空间
  - 对表中的数据进行增删改的时候，如果数据有索引，那么索引也需要动态的修改，会降低 SQL 执行效率

## b+ tree 

一个节点通常 16KB，可以存放几百到上千个索引，因此三层 B+Tree 就能存千万级数据
使用b+树可以明显降低树高  同时支持范围查询


## 聚簇索引 

聚簇索引并不是一种单独的索引类型，而是一种数据的存储方式 —— 它把“索引”和“真实的行数据”紧紧绑在一起，存放在了同一个 B+ 树中  
首选主键：如果你定义了主键（PRIMARY KEY），InnoDB 会自动将主键作为聚簇索引。  
退而求其次（唯一索引）：如果你没建主键，InnoDB 会找第一个定义的唯一且非空（UNIQUE NOT NULL）的索引列作为聚簇索引。  
低调的隐式主键：如果以上两个你都没建，InnoDB 就会在后台悄悄生成一个 6 字节的隐式自增 RowID，并以此来构建聚簇索引。也就是说，无论你建不建，数据表底层都是按照聚簇索引组织的

```sql 
SELECT id, _rowid FROM t_primary;
SELECT u_code, _rowid FROM t_unique;
SELECT id, _rowid FROM t_implicit; -- 这个 RowID 是完全封锁在引擎内部的
```

# 普通索引
普通索引（也就是二级索引，Secondary Index）的叶子节点里，存的就是主键

## 回表 

```sql 
create table user(
    id bigint primary key,
    name varchar(20),
    age int
);
create index idx_name on user(name);

select * from user where name='Tom';
```

id 此时是聚簇索引，name 此时的b+树 数据节点存的是主键 id 

这里就会发生回表 name-> id -> row 俩次b+树查询 

## 覆盖索引 

覆盖索引（Covering Index）是一种索引策略，其特点是索引本身包含了查询所需的所有数据。在使用覆盖索引时，
数据库系统可以直接从索引中获取数据，而无需访问表中的行。这种方式可以显著提高查询性能，尤其是在处理大型数据集时。

```sql 
select id
from user
where name='Tom';
```

因为二级索引叶子已经有 name 和id 不需要回表 

使用了覆盖索引时，explain 后extra 会显示**Using where; Using index**

## 最左匹配原则

在联合索引（多列索引）中，查询条件必须从索引的最左列开始，并且不能跳过中间的列。如果跳过了某那一列，或者在某那一列使用了范围查询，那么索引的匹配就会在那个地方中止

INDEX(a, b, c)

b和c 就是在a排好的情况下才有意义，单独b和c 全局是无效的 

###  全值匹配

```sql 
 SELECT * FROM table WHERE a = 1 AND b = 2 AND c = 3;
SELECT * FROM table WHERE c = 3 AND b = 2 AND a = 1;
```

MySQL 的查询优化器（Optimizer）会自动帮你调整顺序，变成 a, b, c，所以依然能完美匹配

###  缺失最左列

```sql 
SELECT * FROM table WHERE b = 2 AND c = 3;
```

不走索引，全表扫描

### 部分匹配（走部分索引）
```sql 
SELECT * FROM table WHERE a = 1 AND c = 3;
```

只有 a 列走索引，c 列走不了。
利用 a = 1 快速定位到了数据，但因为中间断了 b，在 a = 1 的范围内 c 是无序的，所以 c 无法利用索引过滤，需要回表或者在内存中过滤

### 范围查询阻断（走部分索引）
```sql 
SELECT * FROM table WHERE a = 1 AND b > 2 AND c = 3;
```

结果：a 和 b 走索引，c 无法走索引。

原因：最左匹配原则遇到范围查询（如 `>, <`, BETWEEN, LIKE 'xxx%'）就会停止匹配。因为 b > 2 筛选出来的结果集里，可能有多个不同的 b 值（比如 b=3, b=4），此时 c 的全局顺序又是乱的，无法继续用索引定位 c=3。

## 索引下推  icp  Index Condition Pushdown Optimization

把本来由 Server 层做的条件过滤，下推到 存储引擎层 去做，从而大幅减少回表次数和 Server 层访问存储引擎的次数。
icp 就是在上面的那个基础上 直接拿到c符合条件的几个 减少了回表

如果 WHERE 条件中包含索引中的列，存储引擎在回表之前，先用这个条件过滤掉不满足的索引项，减少回表的次数

```text 
index(name,age)

where
name='Tom'
and age=18
```

找到 name -> 回表 -> 判断 age
icp之后 索引里面直接判断 age -> 减少回表


## index creation 


```sql 
-- 普通索引
CREATE INDEX idx_user_name ON users (user_name);
-- 唯一索引 
CREATE UNIQUE INDEX uidx_email ON users (email);

ALTER TABLE users ADD INDEX idx_user_name (user_name);
ALTER TABLE users ADD PRIMARY KEY (id);
```
