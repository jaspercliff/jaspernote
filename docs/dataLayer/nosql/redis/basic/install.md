# install

## mac brew 安装

### brew 启动

会默认使用/opt/homebrew/etc/redis.conf 配置文件  

```shell
brew services start redis
```

### 手动启动

```shell
brew install redis
echo 'export PATH="/opt/homebrew/opt/redis/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
cp /opt/homebrew/etc/redis.conf /opt/redis
redis-serve -c /opt/redis/redis.conf
```

## ubuntu apt 安装

> [redia 官网](https://redis.io/docs/latest/operate/oss_and_stack/install/install-stack/apt/)

## 预编译包安装

- [redis website](https://redis.io/docs/latest/operate/oss_and_stack/install/archive/install-redis/install-redis-from-source/)

术语,类型,解释
TLS,协议 / 标准,做什么：定义了网络安全通信的规则和步骤（加密、认证、完整性）。
OpenSSL,软件库 / 工具,用什么实现：一个开源项目，提供了实现 TLS 协议所需的所有加密算法和代码库。
libssl-dev,开发包 / 依赖,如何使用：是 OpenSSL 库的开发文件，用于编译时将 OpenSSL 的功能集成到其他应用程序（如 Redis）中。

- make,将源代码文件（.c, .h）编译链接成可执行文件，但这些文件仍然在源码目录的本地文件夹中（如 redis-stable/src）
- sudo make install,安装 (Install),将已编译好的可执行文件和配套文件复制到系统目录（如 /usr/local/bin），使其成为系统级的命令。
- make test验证生成的可执行文件功能是否正常。

```bash
redis-serve  打开redis 使用默认的配置文件启动 不是守护进程启动 窗口关闭之后redis服务也停止了
```

### 设置redis自启动

- [system service](/docs/infrastructure/os/linux/5systemManager/systemService.md)

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
sudo adduser --system --shell /bin/nologin --home /var/lib/redis
--ingroup redis redis
```

```bash
sudo systemctl daemon-reload
```

## redis-cli

redis 安装自带的工具 redis-cli [options] [commands]

- -a password 指定密码 也可以 redis-cli 连接上之后 使用auth [password] 授权

redis 默认有15个库 更像命名空间，每个库不会有单独的用户权限等,连接时默认使用的是0库，
可以通过select [database]选择数据库 集群模式下：只支持一个数据库0

help 可以查看命令的使用方式 help keys 直接输入help可以查看help的使用方式
