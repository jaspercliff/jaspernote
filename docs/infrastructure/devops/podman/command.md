# common command 

## 1. 基本信息与帮助

```bash
podman --version               # 查看版本
podman info                    # 查看详细系统信息（存储位置、cgroup 等）
podman -h                      # 总帮助
podman 子命令 --help           # 具体命令帮助，例如 podman run --help
```

## 2. 镜像相关（最常用）

| 用途               | 命令示例                                      | 说明                              |
|----------------------|-----------------------------------------------|-------------------------------------|
| 搜索镜像            | `podman search nginx`                        | 在 Docker Hub 等仓库搜索          |
| 拉取镜像            | `podman pull nginx`                          | 默认 latest，也可写 `nginx:1.25` |
| 列出本地镜像        | `podman images`                              | `-a` 包含中间层                   |
| 查看镜像历史        | `podman history nginx`                       | 看各层大小和创建命令              |
| 删除镜像            | `podman rmi nginx` `podman rmi -f imageID` | `-f` 强制（即使有容器在使用）   |
| 构建镜像            | `podman build -t myapp:1.0 .`                | 使用当前目录的 Containerfile/Dockerfile |
| 给镜像改 tag        | `podman tag localhost/myapp:1.0 docker.io/用户名/myapp:1.0` | 准备推送到远程仓库 |
| 推送镜像            | `podman push docker.io/用户名/myapp:1.0`    | 需要先 podman login               |

## 3. 容器生命周期（最常用）

| 用途                     | 命令示例                                          | 常用选项说明                             |
|--------------------------|---------------------------------------------------|------------------------------------------|
| 运行新容器（最重要）     | `podman run -d --name nginx -p 8080:80 nginx`    | `-d` 后台、`-p` 端口映射                |
| 交互式临时容器           | `podman run -it --rm ubuntu bash`                | `--rm` 退出自动删除                     |
| 列出运行中的容器         | `podman ps`                                      |                                          |
| 列出所有容器（含停止的） | `podman ps -a`                                   |                                          |
| 启动已停止容器           | `podman start nginx`                             |                                          |
| 停止容器                 | `podman stop nginx`                              |                                          |
| 重启容器                 | `podman restart nginx`                           |                                          |
| 强制杀死容器             | `podman kill nginx`                              |                                          |
| 删除容器                 | `podman rm nginx` `podman rm -f nginx`      | `-f` 可删除运行中的容器                 |
| 批量清理停止的容器       | `podman rm $(podman ps -aq --filter status=exited)` | 非常实用                              |

## 4. 进入 & 日志 & 执行命令

```bash
podman logs -f nginx           # 查看日志（-f 实时跟踪）
podman exec -it nginx bash     # 进入运行中的容器
podman exec -it nginx sh       # alpine 等常用 sh 而不是 bash
podman attach nginx            # 附加到主进程（较少用）
```

## 5. 资源 & 调试常用

```bash
podman inspect nginx           # 查看容器/镜像完整 json 信息
podman inspect -f '{{.State.Pid}}' nginx   # 只看 PID
podman top nginx               # 查看容器内进程（类似 top）
podman stats                   # 实时资源使用情况（CPU/内存）
podman port nginx              # 查看端口映射
podman diff nginx              # 查看容器文件系统与镜像的差异
```

## 6. 卷（volume）与存储常用

```bash
podman volume ls
podman volume create mydata
podman run -d -v mydata:/app/data --name app ...
podman run -d -v /host/path:/container/path ...
```

## 7. Pod（k8s 风格的多容器组）常用

```bash
podman pod ls
podman pod create --name mypod
podman run --pod mypod -d nginx
podman run --pod mypod -d redis
podman pod stop mypod
podman pod rm mypod
```

## 8. 快速清理常用组合

```bash
# 删除所有停止的容器
podman rm $(podman ps -aq --filter status=exited)

# 删除所有未使用的镜像
podman image prune

# 删除所有未使用的资源（很危险！）
podman system prune -a --volumes
```





