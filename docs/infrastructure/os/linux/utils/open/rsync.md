# rsync
rsync 是另一个常用的文件同步工具，它比 scp 更高效，支持增量传输、压缩等功能，适合传输大文件或大量文件。

从本地传输文件到远程：
```shell
rsync -avz /path/to/local/file username@remote_host:/path/to/remote/directory
```
从远程传输文件到本地：
```shell
rsync -avz username@remote_host:/path/to/remote/file /path/to/local/directory
```
其中：
-a：归档模式，保留符号链接、文件权限等。
-v：详细模式，输出更多信息。
-z：压缩传输。
同步整个目录：
```shell
rsync -avz /path/to/local/directory username@remote_host:/path/to/remote/directory
```

