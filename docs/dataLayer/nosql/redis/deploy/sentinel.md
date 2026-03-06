# sentinel

- 监控 。Sentinel 会持续检查您的主实例和副本实例是否按预期运行
- 通知 。Sentinel 可以通过 API 通知系统管理员或其他计算机程序，受监控的 Valkey 实例之一出现问题
- 自动故障转移 。如果主服务器无法正常工作，Sentinel 可以启动故障转移流程，将一个副本提升为主服务器，重新配置其他副本以使用新的主服务器，并通知使用 Valkey 服务器的应用程序在连接时要使用的新地址
- 配置提供程序 。Sentinel 作为客户端服务发现的权威来源：客户端连接到 Sentinel 以获取负责特定服务的当前 Valkey 主节点的地址。如果发生故障转移，Sentinel 将报告新的地址

## conf

```conf

sentinel announce-ip 192.168.31.36
sentinel announce-port 26382

# 监控一个mymaster的集群 名字随便起 主节点ip和端口(有了announce之后，这里不能写容器内的ip或者容器名称了) 以及法定人数
sentinel monitor mymaster 192.168.31.36 6381 2
# sentinel 连接主节点
sentinel auth-pass mymaster passwd
```

这里一定要写本机ip地址 客户端连接的时候会通过哨兵提供的地址来连接主节点，如果不写，
客户端就会拿到一个容器内网地址连接不上

```conf
replica-announce-ip 192.168.31.36
replica-announce-port 6380

```

## 监控

- 主观下线 (Subjective Down, SDOWN)： 单个哨兵发现主节点 PING 不通了。它会想：“可能是我自己的网断了，先标记一下。
- 客观下线 (Objective Down, ODOWN)：这个哨兵会去问其他哨兵：“你们看主节点还活着吗？”如果法定人数 (Quorum) 的哨兵都认为主节点挂了，才会正式启动切换流程。
- 注意：通常 Quorum 设置为 哨兵总数 / 2 + 1（例如 3 个哨兵，Quorum 设为 2）。

主节点确认挂了，但现在有 3 个或 5 个哨兵，谁来负责指挥这次切换呢？

1. 哨兵会进行一次内部投票，使用的是类 Raft 协议。
2. 每个哨兵都想当“指挥官（Leader）”，它们会互相拉票。
3. 规则：谁获得的票数超过半数（比如 3 个哨兵里至少拿 2 票），谁就当选。这个 Leader 负责执行接下来的所有操作

挑选新的master

1. 先看状态： 已经断开连接太久的从节点——淘汰（数据太旧）。
2. 看优先级 (replica-priority)： 配置文件里可以给每个从节点打分。分数越小（但不为 0），优先级越高。分小者胜出。
3. 看进度 (replication-offset)：如果优先级一样，就看谁同步的数据多。Offset 越大（同步越全）的胜出。
4. 看身份证号 (replication-id)：如果上面都一样，那就看启动时随机生成的 ID。字母序靠前的胜出（纯属随机挑选，保底手段）

## log

+sdown,Subjective Down,主观下线,单个哨兵连不上目标了，可能是网络抖动。
-sdown,Clear SDown,撤销下线,节点恢复响应，哨兵重新把它标记为在线。
+odown,Objective Down,客观下线,达到法定人数（Quorum）的哨兵都认为老大挂了，准备开会选举。
-odown,Clear ODown,撤销客观下线,主节点在选举前奇迹般恢复了，取消故障转移。
+new-epoch,New Epoch,新纪元/版本,集群版本号加 1，防止旧的过时配置干扰新主节点。
+try-failover,Try Failover,尝试故障转移,哨兵开始走选举流程。
+vote-for-leader,Vote Leader,投票选班长,哨兵们在选谁来执行具体的切换动作。
+elected-leader,Elected Leader,班长选出,某个哨兵胜出，拿到了指挥切换的权杖。
+selected-slave,Select Slave,选中从节点,哨兵从剩下的副本里挑出了一个最优秀的准备提拔。
+promoted-slave,Promoted Slave,晋升完成,选中的从节点正式执行了 slaveof no one 变成了新王。
+switch-master,Switch Master,主从切换成功,最重要的标志！ 集群正式完成了从旧 IP 到新 IP 的更替。
+slave-reconf-sent,Slave Reconf,发送重配命令,哨兵要求其他从节点或刚归队的老主节点去同步新王。
+tilt,Tilt Mode,保护模式,哨兵发现系统时钟异常或严重卡顿，进入只看而不操作的自保状态。

## podman

解决volume没有权限修改的问题

```zsh
podman unshare chown -R 999:999 ./conf ./data
podman unshare chmod -R 755 ./conf ./data

```

Podman Rootless 权限映射带来的副作用：为了让容器内的 999 用户有权写入，宿主机上的普通用户会发现自己失去了对该文件的控制权（因为文件所有者变成了映射后的高位 UID，如 100998）

```zsh
# 这会让你以“容器 root”的身份启动一个 shell
podman unshare vi ./conf/primary/valkey.conf
```

在执行 podman unshare chown 的同时，给文件一个“组可写”或“所有人可写”的权限

```zsh
podman unshare find ./conf ./data -type d -exec chmod 775 {} +
podman unshare find ./conf ./data -type f -exec chmod 664 {} +
```
