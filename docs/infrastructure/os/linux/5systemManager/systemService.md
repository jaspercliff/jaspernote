# system service

系统服务：通常指在后台运行的程序，在技术上以守护进程(daemons)实现，与任何终端和用户会话分离，名称通常以d结尾，类似sshd,httpd,crondn
作用：等待事件发生（网络请求，定时任务等），在事件发生时执行其指定功能

## 管理系统服务：Init 系统

在 Linux 中，管理和控制这些系统服务（守护进程）启动、停止、重启以及配置它们的启动顺序的工具被称为 Init 系统（Initialization  
System)。它是内核启动后运行的第一个进程（PID 1），负责启动所有其他进程和系统服务

### Systemd (现代标准)

现状： 它是当前大多数主流 Linux 发行版（如 Ubuntu, CentOS/RHEL, Debian, Fedora 等）采用的标准 Init 系统。

![initSystem](assets/initSystem.png)

并行启动： 能够同时启动多个服务，大大加快了系统启动速度。

基于单元 (Units)： 服务、挂载点、设备等都被抽象为单元 (Units)。最常见的服务单元是 .service 文件。

依赖管理： 它可以清晰地定义服务之间的依赖关系，确保服务按正确的顺序启动。

- status,查看服务的当前状态（是否运行、PID、日志等）,sudo systemctl status sshd
- start,启动一个服务,sudo systemctl start httpd
- stop,停止一个正在运行的服务,sudo systemctl stop httpd
- restart,重启一个服务,sudo systemctl restart nginx
- enable,设置服务在系统启动时自动运行,sudo systemctl enable firewalld
- disable,禁止服务在系统启动时自动运行,sudo systemctl disable firewalld
- systemctl cat sshd.service  查看配置文件

## 自定义一个system service

```bash
man systemd.service
man systemd.Units
man systemd.target
```

```bash
sudo vim /etc/systemd/system/redis.service
```

```service
[Unit]
Description=Redis In-Memory Data Store
After=network.target

[Service]
User=redis             ; 🚨 注意：推荐为 Redis 创建一个专用用户，而不是使用 root
Group=redis            ; 🚨 注意：推荐为 Redis 创建一个专用用户组
ExecStart=/usr/local/redis/bin/redis-server /usr/local/redis/etc/redis.conf
ExecStop=/usr/local/redis/bin/redis-cli shutdown
PIDFile=/var/run/redis_6379.pid
Restart=always
RestartSec=5s
TimeoutStopSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

```bash
# 创建 redis 用户和组，不分配 shell
sudo addgroup --system redis
sudo adduser --system --shell /bin/nologin --home /var/lib/redis --ingroup redis redis
```

```bash
sudo systemctl daemon-reload
```
