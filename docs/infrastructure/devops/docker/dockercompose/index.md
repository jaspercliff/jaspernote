# docker compose 

## up and start 

Docker Compose Up (创建 + 运行)

当执行 up 时，Docker 会走完一整套流程：

    检查配置：读取 compose.yaml。

    拉取镜像：本地没有就去下载。

    创建容器：按照你的端口映射、环境变量、卷挂载创建一个全新的实例。

    启动：运行容器。

    注意：如果你改了 MariaDB 的密码并再次 up，Docker 会删掉旧容器（连同没挂载的数据一并删掉），然后建个新的。

Docker Compose Start (唤醒)

当执行 start 时，它非常单纯：

    查找容器：寻找之前 stop 掉的容器。

    运行：直接把进程跑起来。
    它不会检查你的 YAML 文件是否改了配置，也不会尝试去拉取新镜像。它就像是给一个待机的电脑按下了开机键。
