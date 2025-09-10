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


## config redis.conf

- daemonize yes 守护进程 


 