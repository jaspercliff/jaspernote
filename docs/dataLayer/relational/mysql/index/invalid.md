---
sidebar_position: 1
title: 索引失效的场景
---

- 对索引列使用函数
- 索引列参与运算 
- 隐式类型转换 数据类型不一样 int类型 参数为字符串
- like %开头
- 联合索引违反最左原则(缺失最左边)
- or 俩边有一个列没有索引就会失效

```sql
-- ============================================================ 索引失效 

-- =====对索引列使用函数
EXPLAIN SELECT *
FROM user_simple AS us WHERE us.hire_date = '2026-07-13';
EXPLAIN SELECT *
FROM user_simple AS us WHERE year(us.hire_date) = '2026';

-- =====对索引列进行计算
EXPLAIN SELECT *
FROM user_simple AS us WHERE us.age+1 = '25';

-- =====隐式类型转换 
EXPLAIN SELECT *
FROM user_simple AS us WHERE us.name = 123
LIMIT 100;
-- 有效
EXPLAIN SELECT *
FROM user_simple AS us WHERE us.name = '123'
LIMIT 100;

-- ===== like %xxx
EXPLAIN SELECT *
FROM user_simple AS us WHERE us.name like '%tom'
LIMIT 100;
EXPLAIN SELECT *
FROM user_simple AS us WHERE us.name like 'tom%'
LIMIT 100;

-- =====  联合索引失效

EXPLAIN SELECT * FROM `test_user` WHERE  `score` = 80 AND  `level`= 2;

-- 部分匹配 
-- key_len = 4 只有age走了索引 
EXPLAIN SELECT * FROM `test_user` WHERE `age` = 18 AND  `score` = 80;

-- >, <, BETWEEN, LIKE 'xxx%' 范围查询阻断了 停止匹配 
-- Using index condition 索引下推  key_len = 8 一个int 4个字节  只有age和level生效了 
EXPLAIN SELECT * FROM `test_user` WHERE `age` = 18 AND `level` > 2 AND `score` = 80;


-- =====  or  可以使用 UNION ALL 代替 OR

EXPLAIN SELECT *
FROM test_user AS tu WHERE tu.username = 'test_user_1' or tu.age = '37'
LIMIT 100;

EXPLAIN SELECT *
FROM test_user AS tu WHERE tu.username = 'test_user_1'
UNION ALL 
SELECT *
FROM test_user AS tu WHERE tu.age = '37'
```
