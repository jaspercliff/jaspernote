# sql 优化 

## 索引 

1. 开启慢查询日志  slow_query_log=ON
2. apm 工具，mysql   看到当前 MySQL 数据库中所有正在执行的线程 SHOW FULL PROCESSLIST;
3. explain 分析索引
4. 给where, group by,join,order by 加索引
5. 建立联合索引时，查询条件必须从最左边开始(mysql 优化器会优化)，不要缺失最左边,遇到范围查询或者缺失某一列会发生部分匹配
6. 尽量使用覆盖索引（让索引的叶子节点包含所要的数据），避免回表
7. 尽量避免[索引失效](./invalid.md)
