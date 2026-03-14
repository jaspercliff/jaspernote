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
   1) (integer) 1773395826               timestamp 
   2) (integer) 4963                     4.963ms 
   3) 1) "keys"
      1) "*"
   4) "172.20.0.1:50598"
   5) ""
```

## memory

- info memory

### data memory 数据内存

redis 存的数据

### process memory 进程内存

redis主进程占用的内存

### buffer

#### 复制积压缓冲区 (Replication Backlog Buffer)

当从节点（Replica）短时间断开连接时，主节点会将期间产生的写命令存入这个缓冲区。等从节点连回来，尝试进行“增量同步”（Partial Resync），而不是耗时巨大的“全量同步”,一个固定长度的循环队列

#### 复制输出缓冲区 (Replication Output Buffer)

在全量同步期间，主节点会将新接收到的写命令缓存起来，等 RDB 文件传输完成后发给从节点

#### AOF 缓冲区 (AOF Buffer & AOF Rewrite Buffer)

写命令执行后，先放入这里，再根据 appendfsync 策略刷盘。

#### 客户端输出缓冲区 (Client Output Buffer)

- info clients
- client list

Valkey 处理完命令后，将结果先放入缓冲区，再通过网络发给客户端

#### 客户端输入缓冲区 (Query Buffer)

暂存客户端发来但还没被解析执行的原始命令。
