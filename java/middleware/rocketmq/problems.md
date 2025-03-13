# problems

## 遇到的问题

--- 

复制官网的docker compose 文件直接启动报错
**Exception in thread "main" org.apache.rocketmq.remoting.exception.RemotingTooMuchRequestException: sendDefaultImpl call timeout**

映射配置文件
broker.conf   添加该配置brokerIP1=127.0.0.1

当 Broker 在 Docker 容器中运行时：
- 默认情况下，RocketMQ Broker 会自动获取容器的内部 IP，而这个 IP 通常是 Docker 的内部网络地址（比如 172.17.x.x）。
- Producer 在 Mac 本机运行，它通过 Namesrv 获取 Broker 地址，但是 Namesrv 返回的 IP 是 Docker 内部 IP，导致 Producer 无法正确连接。
- 设置 brokerIP1=127.0.0.1 可以强制 Broker 使用 127.0.0.1，让本机 Producer 能够正确连接。

---
**CODE: 1  DESC: The broker does not support consumer to filter message by SQL92**

broker.conf   默认不支持sql92标准
#开启过滤消息时支持SQL92标准
enablePropertyFilter=true

---