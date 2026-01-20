# lsof

lsof（List Open Files）是一个强大的工具，可以列出系统当前打开的所有文件，包括网络连接（它将网络连接视为一种文件）。

```bash
sudo lsof -i :端口号
```

示例：查看端口 3306 (MySQL) 被哪个程序占用

```bash
sudo lsof -i :3306
```

-i: 筛选出网络文件（Internet files）。
:3306: 指定端口号。

输出示例解析:

COMMAND     PID    USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
mysqld    98765   mysql   23u  IPv4 999999      0t0  TCP *:mysql (LISTEN)

COMMAND: 应用程序名称是 mysqld。
PID: 进程 ID 是 98765。

ps -fp PID
强制结束 (Kill) 该进程： 如果该进程是多余或恶意的，您可以使用 kill 命令来停止它。

kill -9 PID
注意： kill -9 是强制终止，可能会导致数据丢失或损坏，请谨慎使用。
