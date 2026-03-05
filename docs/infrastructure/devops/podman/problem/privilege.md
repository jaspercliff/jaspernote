# privilege

解决volume没有权限修改的问题

```zsh
podman unshare chown -R 999:999 ./conf ./data
podman unshare chmod -R 755 ./conf ./data
```

Podman Rootless 权限映射带来的副作用：为了让容器内的 999 用户有权写入，宿主机上的普通用户会发现自己失去了对该文件的控制权（因为文件所有者变成了映射后的高位 UID，如 100998）

在执行 podman unshare chown 的同时，给文件一个“组可写”或“所有人可写”的权限

```zsh
podman unshare find ./conf ./data -type d -exec chmod 775 {} +
podman unshare find ./conf ./data -type f -exec chmod 664 {} +
```

在很多官方容器镜像中，为了安全，程序不会以 root（UID 0）身份运行，而是以一个普通的系统用户运行。999 是许多主流数据库镜像默认分配给服务用户的编号：

valkey: 默认使用 UID 999

## user namespace

User Namespace（用户命名空间），它的核心文件在你的宿主机系统里,它允许进程拥有属于自己的 UID/GID 视图。在这个空间里，进程可以觉得自己是 Root，但对系统其他部分来说，它只是个普通进程

UID Mapping (UID 映射)：这是实现命名空间时的具体配置数据。它告诉内核：“把容器里的 ID X 转换成宿主机的 ID Y

/etc/subuid: 定义用户的 UID 映射范围。  
/etc/subgid: 定义用户的 GID 映射范围。

 cat /etc/subuid  
 jasper:100000:65536

从宿主机的真实 UID 100000 开始，往后的 65536 个数字，全都分配给用户 jasper 在容器里“用户命名空间”用。

宿主机实际UID=映射起始值+容器内UID−1

容器内的 Root (UID 0)：
对应宿主机的你本人（比如 UID 1000）。

我们要找的 999 (UID 999)：
对应宿主机的 100000+999−1=100998。

1. 容器内的进程：“ UID 999，要写文件。”
2. 内核查看该容器的 User Namespace 里的 UID Mapping。
3. 内核计算：100000+(999−1)=100998。
4. 内核以宿主机 100998 的身份去操作磁盘上的文件。

```txt
❯ ls -al  
drwxrwxr-x 1 100998 100998   80 Mar  5 20:17 conf  
drwxrwxr-x 1 100998 100998   46 Mar  5 20:21 data  
```
