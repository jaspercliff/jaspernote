# 常用命令 

## docker search 
- docker search 命令来搜索 Docker Hub 上的镜像

[docker配置镜像](https://blog.csdn.net/Lichen0196/article/details/137355517)

docker info 命令提供了关于 Docker 主机和守护进程的详细信息，包括系统状态、存储驱动、网络配置、插件等

## docker cp

- docker cp 命令用于在容器和主机之间复制文件或目录

当然可以，下面我将详细讲解 `docker cp` 命令的用法，包括语法、示例、使用场景、注意事项等，适合初学者或希望深入理解的开发者。

---

## 📌 二、语法格式

```bash
docker cp [OPTIONS] 容器路径 本地路径
docker cp [OPTIONS] 本地路径 容器路径
```
### ✅ 1. 从容器中复制文件到主机
```bash
docker cp my-container:/app/app.jar /home/user/
```
> 把容器 `my-container` 中的 `/app/app.jar` 文件复制到主机的 `/home/user/` 目录。
---

### ✅ 2. 把主机文件复制到容器中
```bash
docker cp ./my-local-file.txt my-container:/data/
```
> 把当前目录下的 `my-local-file.txt` 复制到容器 `/data/` 目录下。

---

### ✅ 3. 复制整个目录
```bash
docker cp my-container:/var/log /home/user/logs
```
> 会将 `/var/log` 整个目录复制到本地的 `/home/user/logs` 目录中。

---
