# utils

## podman unshare

podman unshare 是让你在不使用 root 权限的情况下，进入一个特殊的“马甲”环境
在 Linux 中，非特权用户（普通用户）运行容器时，Podman 使用了 User Namespace（用户命名空间） 技术。

- 容器内： 你可能是 root (UID 0)。
- 宿主机上： 这个 root 其实对应的是你普通用户下的一个映射 UID（比如 100000）。

如果你在宿主机上直接用普通用户去改容器卷里的文件，经常会遇到 Permission denied。podman unshare 让你跳进那个映射空间，临时变身成“容器视角的 root”，从而轻松修改、删除或创建这些文件。
