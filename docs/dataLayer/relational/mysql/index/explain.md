
```sql
EXPLAIN SELECT * FROM your_table WHERE some_column = 'some_value';
```

1. **id：** 查询的序列号，如果有多个表，表示查询中的第几个表。
2. **select_type：** 查询的类型，可能的值有：
   - SIMPLE: 简单查询，不包含子查询或 UNION。
   - PRIMARY: 最外层的查询。
   - SUBQUERY: 子查询。
   - DERIVED: 衍生表，FROM 子句中的子查询。
   - UNION: UNION 中的第二个及后续查询。
   - UNION RESULT: UNION 的结果。
3. **table：** 显示查询的表名。
4. **type：** 表示连接类型，常见的值有：
   - system > const > eq_ref > ref > range > index > ALL
   - ALL: 全表扫描。
   - index: 索引扫描。
   - range: 范围扫描，例如使用 BETWEEN、IN、>、< 等条件。
   - ref: 使用非唯一索引进行查找。
   - eq_ref: 使用唯一索引进行查找。
   - const: 表示在查询时，表的某个部分是常数。
   - system: 表示表只有一行（例如，对于系统表）。
5. **possible_keys：** 显示可能应用在这张表中的索引，但不一定会应用。
6. **key：** 实际使用的索引。
7. **key_len：** 表示索引中使用的字节数。
8. **ref：** 显示索引的哪一列被使用了，如果可能的话。
9. **rows：** 表示 MySQL 认为必须检查的行数。
10. **filtered：** 表示返回结果的行占总行数的百分比。
11. **Extra：** 包含额外的信息，例如使用了哪个索引、是否使用了临时表等。

## type = index 不行 

通常在查询的字段被索引覆盖，但无法利用索引进行快速定位（没有触发索引的B+树二分查找）时，就会触发 index
EXPLAIN SELECT age, name FROM user WHERE name = 'Tom'

为什么是 index？ 因为没有提供 age，MySQL 无法在 B+ 树中进行二分查找定位。但它发现你 SELECT 和 WHERE 里的字段（age, name）全都包含在 idx_age_name 这个索引里了。
MySQL 的抉择： 既然不用回表，那就把这颗二级索引树从头到尾扫一遍（index）来找 'Tom' 吧，这总比去扫整张大表（ALL）强。
