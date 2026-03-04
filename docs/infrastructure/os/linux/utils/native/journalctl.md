# journalctl

Systemd 系统的核心日志管理工具
几乎所有的系统消息、内核错误、服务启动/停止日志都会汇聚到这个“大池子”里,
可以通过时间、优先级、服务名称等多种维度进行极速过滤

- journalctl -b  查看本次开机之后的日志
- journalctl -u  Show logs from the specified unit: journalctl -u valkey
- journalctl -f   Follow the journal : tail -f
