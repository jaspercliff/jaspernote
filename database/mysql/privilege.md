``` sql
GRANT ALL PRIVILEGES ON *.* TO 'your_username'@'%' IDENTIFIED BY 'your_password' WITH GRANT OPTION;
```

```
*.*   database.table
`WITH GRANT OPTION`: 允许用户将其获得的权限授予其他用户。
```

## user

| host       | func          |
|------------|---------------|
| %          | every address |
| localhoast | 本机            |
