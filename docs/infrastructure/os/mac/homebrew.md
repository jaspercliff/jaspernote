# homebrew

Homebrew is a package manager for macOS that simplifies the installation and management of software packages.

## content

Cellar 是存放所有已安装软件包的地方，而 opt 提供了一种便捷的方式，
通过符号链接指向 Cellar 中软件包的当前活跃版本，简化了对这些软件包的访问和管理


## service

- brew services  / brew services list  # 查看服务列表
- brew services start service  # 启动服务


brew --prefix jmeter  返回jmeter在系统的安装位置 


/opt/homebrew/opt/redis/bin/redis-server /opt/homebrew/etc/redis.conf


## 安装redis

```shell
brew install redis
echo 'export PATH="/opt/homebrew/opt/redis/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
cp /opt/homebrew/etc/redis.conf /opt/redis
redis-serve -c /opt/redis/redis.conf
```
