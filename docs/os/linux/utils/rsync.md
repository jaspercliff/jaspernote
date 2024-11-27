# rsync
   rsync 是另一个常用的文件同步工具，它比 scp 更高效，支持增量传输、压缩等功能，适合传输大文件或大量文件。

从本地传输文件到远程：
bash
复制代码
rsync -avz /path/to/local/file username@remote_host:/path/to/remote/directory
从远程传输文件到本地：
bash
复制代码
rsync -avz username@remote_host:/path/to/remote/file /path/to/local/directory
其中：

-a：归档模式，保留符号链接、文件权限等。
-v：详细模式，输出更多信息。
-z：压缩传输。
同步整个目录：
bash
复制代码
rsync -avz /path/to/local/directory username@remote_host:/path/to/remote/directory


# scp

1. scp（Secure Copy Protocol）
   scp 是一种通过SSH协议在本地和远程计算机之间复制文件的工具，支持文件夹的传输。

从本地传输文件到远程服务器：
bash
复制代码
scp /path/to/local/file username@remote_host:/path/to/remote/directory
例如，将本地文件 file.txt 传输到远程服务器的 /home/user/ 目录：

bash
复制代码
scp file.txt user@192.168.1.100:/home/user/
从远程服务器传输文件到本地：
bash
复制代码
scp username@remote_host:/path/to/remote/file /path/to/local/directory
例如，从远程服务器下载 file.txt 到本地：

bash
复制代码
scp user@192.168.1.100:/home/user/file.txt /home/localuser/
传输整个目录：
使用 -r 参数递归传输目录。

bash
复制代码
scp -r /path/to/local/directory username@remote_host:/path/to/remote/directory