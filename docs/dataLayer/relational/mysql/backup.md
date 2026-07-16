# backup

- 备份
``` sql
mysqldump -h 192.168.1.100 -P 3307  -u root -p sub > sub.sql 
```

- 恢复
``` sql
mysql -u root -p sub < sub.sql
```


