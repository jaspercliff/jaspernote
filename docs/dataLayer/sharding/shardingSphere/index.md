# shardingjdbc

- 广播表 ： 所有分片数据库中都存在的表

sql解析 sql路由 sql改写 sql执行 结果归并


##  解析 

词法解析 + 语法解析 转换为ast 抽象语法树

## sql执行 
内存限制模式 连接限制模式

JVM 内存
限制同时访问分片数据库的连接/查询数量，避免一次 SQL 把大量分片连接全部占满

## 结果归并 



- [自动化执行引擎](https://shardingsphere.apache.org/blog/cn/material/engine/)
