https://dev.mysql.com/doc/refman/8.0/en/replication.html

- binary log file
- global transaction identifier

## binary log file

#### master

``` sql
show master status;

create user slave identified by 'passwd';
grant select,replication slave,replication client on *.* to 'slave'@'%';
grant all privileges on *.* to 'slave'@'%';
flush privileges;
```

#### slave

``` sql
CHANGE MASTER TO MASTER_HOST='122.51.54.43', MASTER_USER='slave', MASTER_PASSWORD='passwd', MASTER_PORT=3307, MASTER_LOG_FILE='mysql-bin.000005', MASTER_LOG_POS=1420, MASTER_CONNECT_RETRY=30;

start slave;
show slave status \G

```