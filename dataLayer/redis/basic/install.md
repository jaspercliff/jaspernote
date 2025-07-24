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

## config redis.conf

- daemonize yes 守护进程 


 