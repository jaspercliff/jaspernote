#other



## truncate

TRUNCATE 是一个用于删除表中所有数据的命令,TRUNCATE 不是逐行删除记录，而是直接删除整个表，然后重新创建，因此执行速度更快，占用系统和事务日志资源更少

``` sql
TRUNCATE TABLE table_name;
```

使用 TRUNCATE 会立即永久性地删除表中的所有数据，无法通过事务回滚来恢复