# ssh

SSH（Secure Shell）是一种用于远程登录和安全数据传输的网络协议，主要用于在不安全的网络环境中提供安全的管理访问

## ssh-keygen

生成ssh密钥对的工具

```bash
ssh-keygen -t rsa -b 4096
```
将公钥pub放到服务器的./ssh/authorization_keys文件中

## sshd_config

```bash
cd /etc/ssh
vim sshd_config
```

- PubkeyAuthentication yes 公钥认证
- PermitRootLogin yes 允许root用户登陆
- PasswordAuthentication no 不允许密码登陆

## config
可以使用 SSH 配置文件 (~/.ssh/config) 来保存服务器信息
在config中文件添加服务器信息
```
Host myserver
    HostName 服务器IP或域名
    User 用户名
    Port 端口号（默认为22）
    IdentityFile ~/.ssh/id_rsa  # 如果使用密钥登录
```
## mac skill

- 添加密钥到 Keychain 不需要每次输入passphrase
```bash
ssh-add --apple-use-keychain ~/.ssh/id_rsa
```
