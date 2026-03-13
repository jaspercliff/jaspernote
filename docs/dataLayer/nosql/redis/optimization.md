# optimization

## slow query

```conf
# The following time is expressed in microseconds, so 1000000 is equivalent to 1 second.
# Note that -1 disables the slow log, while 0 forces logging of every command.
# 超过10ms 为slow query
commandlog-execution-slower-than 10000
# Record the number of commands.
# There is no limit to this length. Just be aware that it will consume memory.
# You can reclaim memory used by the slow log with SLOWLOG RESET or COMMANDLOG RESET SLOW.
# queue len 
commandlog-slow-execution-max-len 128
```

valkey的日志是存储在内存的，只能通过命令查看,执行时间不包括 I/O 操作，例如与客户端通信、发送回复等，而仅包括实际执行命令所需的时间

- slowlog len 慢查询日志长度
- slowlog get n 查询n条慢查询日志
- slowlog reset 清空慢查询日志

```text
1) 1) (integer) 0                        id 
   2) (integer) 1773395826               timestamp 
   3) (integer) 4963                     4.963ms 
   4) 1) "keys"
      2) "*"
   5) "172.20.0.1:50598"
   6) ""
```
