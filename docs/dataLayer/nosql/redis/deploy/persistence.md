# persistence

- RDB: redis database backup file redis数据快照会按指定的时间间隔对数据集执行时间点快照

## RDB

- save 主动进行快照备份（该命令由redis 主进程执行，会blocking所有command
- bgsave background saving start 开启子进程执行rdb
- redis停机时会执行一次rdb

```zsh
systemctl stop valkey
journalctl -u valkey
```

```text
Mar 04 10:29:58 arch valkey-server[892]: 892:M 04 Mar 2026 10:29:58.524 * Saving the final RDB snapshot before exiting.
Mar 04 10:29:58 arch valkey-server[892]: 892:M 04 Mar 2026 10:29:58.528 * DB saved on disk
Mar 04 10:29:58 arch valkey-server[892]: 892:M 04 Mar 2026 10:29:58.528 # Valkey is now ready to exit, bye bye...
Mar 04 10:29:58 arch systemd[1]: valkey.service: Deactivated successfully.
Mar 04 10:29:58 arch systemd[1]: Stopped Advanced key-value store.
Mar 04 10:29:58 arch systemd[1]: valkey.service: Consumed 2.846s CPU time over 45min 39.132s wall clock time, 10.8M memory peak.
```

### rdb config

- save 触发机制 save 3600 1 300 100 60 10000
- stop-writes-on-bgsave-error yes 当bgsave失败后禁止写入命令
- rdbcompression yes 压缩rbd file
- rdbchecksum yes RDB 文件增加一个校验码，防止你加载了一个已经损坏的备份文件
在 RDB 文件的末尾，Valkey 会计算并放置一个 CRC64 校验和（Checksum）
- rdb-version-check strict 当 Valkey 遇到版本号比自己更高的 RDB 备份文件时，表现得是“宽容”还是“严厉 文件顶部有版本号
- dbfilename dump.rdb rbb file name
- rdb-del-sync-files no 主从复制 从节点通过“磁盘同步”模式从主节点接收完 RDB 文件并加载到内存后，是否要把那个临时下载的 RDB 文件删掉
- dir /var/lib/valkey/ rbd 快照文件存储位置

### rdb 原理

当 Redis 需要生成 RDB 快照时，它不会在主进程里慢吞吞地写磁盘（那样会阻塞所有客户端指令），而是调用系统的 $fork()$ 系统调用。

1. 创建子进程：主进程调用 fork()，产生一个子进程。
2. 共享内存：此时，子进程和主进程共享物理内存。子进程拥有主进程在这一瞬间的“内存镜像”。
3. 写时复制 (COW)：如果主进程只读数据，大家相安无事。如果有客户端发来写指令（比如 SET key value），操作系统会为该页内存(发生改变，不是全部数据)创建一个副本供主进程修改，而子进程看到的依然是 fork 瞬间的旧数据。
4. 持久化：子进程将它看到的旧数据写入 .rdb 文件，写完后退出

fork 复制页表时，会阻塞主进程

#### 页表

程序看到的内存地址都是虚拟地址，数据真正存放的地方是内存条，页表就是虚拟地址和物理地址之间的映射表
fork 子进程的时候，为了共享数据，会复制一份页表（不能复制全部的数据给子进程）

#### 写时复制 COW

copy on write
在复制页表时，内核会将页表标记为只读，主进程要修改数据，发现页表为只读，触发了一个缺页异常Page Fault，
内核发现fork 产生的冲突，于是找了个新物理地址，将原来的数据复制过去，更新主进程的页表（将这个页表改为可写）

### rdb 缺点

- 窗口期丢失，比如五分钟备份一次，正好4分钟的时候valkey奔溃，此时数据全部丢失
- fork可能失败，sys认为系统剩余的内存不足以cow的开销，fork就会失败
- cow 导致 oom fork后，主进程有大量的写操作，此时会疯狂cow，导致oom，此时可能kill 子进程甚至主进程

## AOF

append only file 追加文件：redis 的每一个写的命令都会记录到aof文件，可以看作是命令日志文件

### aof config

- appendonly yes 开启aof
- appendfilename "appendonly.aof" aof file name
- appenddirname "appendonlydir" aof dir name
- appendfsync aways/everysec/no 每执行一次就记录到aof file everysec 先放到aof缓冲区，然后每隔1秒将命令写入aof
写完放到缓冲区不管，由操作系统决定什么时候刷盘写入aof
- no-appendfsync-on-rewrite no 在子进程重写 AOF 或生成 RDB 期间，主进程要不要暂时放下“每秒刷盘”的坚持
no 主进程可能会因为 fsync 被阻塞，导致 Redis 出现几十毫秒甚至几秒的卡顿
yes 当有子进程在后台重写时，主进程只调用 write（写到系统缓存就返回），而不调用强制刷盘的 fsync(数据有丢失风险)
- auto-aof-rewrite-percentage 100 相比上次文件体积超出100%则rewrite aof
- auto-aof-rewrite-min-size 64mb aof文件体积达到64mb 则rewrite
- aof-load-truncated yes 忽略断电导致的文件末尾损坏 保证服务可以起来
- aof-use-rdb-preamble yes 当触发重写bgrewriteaof 时，会把当前内存中的数据以rdb的形式写入aof（二进制）新的命令以aof的格式
- aof-timestamp-enabled no 要不要在 AOF 记录中每隔一段时间插入一个 时间戳标记 记录时间信息用于精确恢复

### aof 缺点

- aof 文件比rdb文件大的多，aof会记录对同一个key的多次写操作，但是只有最后一次写操作有意义
redis-cli bgrewriteaof 会优化aof文件，用最少的命令达到相同的效果

## rdb and aof

RDB（速度快，但不全）和 AOF（数据全，但恢复慢）
rdb 主要占用cpu和内存 aof主要占用的磁盘io

rdb 默认配置不需要改 aof 只需要改 appendonly yes
