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

## rdb config

- save 触发机制 save 3600 1 300 100 60 10000
- stop-writes-on-bgsave-error yes 当bgsave失败后禁止写入命令
- rdbcompression yes 压缩rbd file
- rdbchecksum yes RDB 文件增加一个校验码，防止你加载了一个已经损坏的备份文件
在 RDB 文件的末尾，Valkey 会计算并放置一个 CRC64 校验和（Checksum）
- rdb-version-check strict 当 Valkey 遇到版本号比自己更高的 RDB 备份文件时，表现得是“宽容”还是“严厉 文件顶部有版本号
- dbfilename dump.rdb rbb file name
- rdb-del-sync-files no 主从复制 从节点通过“磁盘同步”模式从主节点接收完 RDB 文件并加载到内存后，是否要把那个临时下载的 RDB 文件删掉
- dir /var/lib/valkey/ rbd 快照文件存储位置
