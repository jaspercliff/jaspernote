# scp

scp（Secure Copy Protocol）: scp 是一种通过SSH协议在本地和远程计算机之间复制文件的工具，支持文件夹的传输。

---

从本地传输文件到远程服务器：

```shell
scp /path/to/local/file username@remote_host:/path/to/remote/directory
```

例如，将本地文件 file.txt 传输到远程服务器的 /home/user/ 目录：

```shell
scp file.txt user@192.168.1.100:/home/user/
```

文件夹

```bash
scp -r /path/to/local/folder username@remote:/path/to/remote/destination
```

scp  可以识别本地ssh config配置的服务器信息

```zsh
scp -r dist jd:/var/www/note
```

---

从远程服务器传输文件到本地：

```shell
scp username@remote_host:/path/to/remote/file /path/to/local/directory
```

例如，从远程服务器下载 file.txt 到本地：

```shell
scp user@192.168.1.100:/home/user/file.txt /home/local/
```

传输整个目录：使用 -r 参数递归传输目录。

```shell
scp -r /path/to/local/directory username@remote_host:/path/to/remote/directory
```
