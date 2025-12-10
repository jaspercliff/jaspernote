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


