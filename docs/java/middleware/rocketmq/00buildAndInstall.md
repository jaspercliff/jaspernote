# rocketmq 启动和部署

- [遇到的问题](problems.md)

## 下载源码
```shell
$ unzip rocketmq-all-5.3.1-source-release.zip
$ cd rocketmq-all-5.3.1-source-release/
$ mvn -Prelease-all -DskipTests -Dspotbugs.skip=true clean install -U
$ cd distribution/target/rocketmq-5.3.1/rocketmq-5.3.1
```

-Prelease-all 用于打包所有的模块，-DskipTests 跳过测试，-Dspotbugs.skip=true 跳过代码检查，-U 强制更新依赖。

profiles 是一种可以让你根据不同的环境或需求执行不同配置的方式，通常定义在 pom.xml 或 profiles.xml 中。
-Prelease-all 的含义： -P 选项用于激活某个 Profile，release-all 是 Profile 的名称。

![img.png](assets/profile.png)

## 启动namesrv
- 启动namesrv
```bash
nohup sh bin/mqnamesrv &
```
- 验证namesrv是否启动成功
```bash
tail -f ~/logs/rocketmqlogs/namesrv.log
 ```
2025-03-19 20:56:26 INFO main - The Name Server boot success. serializeType=JSON, address 0.0.0.0:9876

### 指定端口

listenPort=9875
```bash
nohup sh mqnamesrv -c ../conf/namesrv.conf &
```

## 启动broker and proxy
```bash
nohup sh mqbroker -n localhost:9876 --enable-proxy &
```
- 验证是否启动成功
```bash
tail -f ~/logs/rocketmqlogs/broker.log
```
## 停止
```bash
sh mqshutdown broker
sh mqshutdown namesrv
```

## jps

也可以使用jps来查看是否启动成功
> [jps](/java/basic/jdk/monitor/jps.md)

## 测试发送消息
```bash
export NAMESRV_ADDR=localhost:9876
sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer
sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
```


## 集群部署

> [官网地址](https://rocketmq.apache.org/zh/docs/deploymentOperations/01deploy)

local模式下broker和proxy同进程部署
cluster模式下broker和proxy分开部署

### namesrv

namesrv是无状态的，namesrv之间没有消息同步

### broker

1. 单master    broker 挂了就不能使用
2. 多master    任一broker宕机，不影响其他broker        崩溃了之后消息可能丢失   非核心业务
3. 多master 多slave 异步复制。    性能较高  存在消息丢失风险                   默认   大多数通用业务
4. 多master 多slave 同步复制。    性能较低  不存在消息丢失风险                 核心业务 对数据可靠性较高

local
```bash
#3
### 在机器A，启动第一个Master，例如NameServer的IP为：192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876;127.0.0.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-async/broker-a.properties --enable-proxy &

### 在机器B，启动第二个Master，例如NameServer的IP为：192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-async/broker-b.properties --enable-proxy &

### 在机器C，启动第一个Slave，例如NameServer的IP为：192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-async/broker-a-s.properties --enable-proxy &

### 在机器D，启动第二个Slave，例如NameServer的IP为：192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-async/broker-b-s.properties --enable-proxy &
```
cluster
```bash
### 在机器A，启动第一个Master，例如NameServer的IP为：192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-async/broker-a.properties &

### 在机器B，启动第二个Master，例如NameServer的IP为：192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-async/broker-b.properties &

### 在机器C，启动第一个Slave，例如NameServer的IP为：192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-async/broker-a-s.properties &

### 在机器D，启动第二个Slave，例如NameServer的IP为：192.168.1.1
$ nohup sh bin/mqbroker -n 192.168.1.1:9876 -c $ROCKETMQ_HOME/conf/2m-2s-async/broker-b-s.properties &
```
## 如果一台机器启动的话

### broker
必须修改端口号和storePathRootDir

listenPort=10911
storePathRootDir=/opt/services/rocketmq/rocketmq-all-5.3.2-master/stores

```bash
nohup sh mqbroker -n "117.72.97.254:9875;117.72.97.254:9876" -c ../conf/2m-2s-async/broker-a.properties &
```
配置文件中修改
namesrvAddr=117.72.97.254:9875;117.72.97.254:9876
```bash
nohup sh mqbroker -c ../conf/2m-2s-async/broker-a.properties &
```
> master的brokerId必须是0。slave必须大于0


### proxy
RocketMQ Proxy 是 RocketMQ 的一个组件，主要用于支持多语言客户端的接入。它允许非 Java 客户端（如 Go、Python、Node.js 等）通过 HTTP 或 gRPC 协议与 RocketMQ 进行交互。
```bash
nohup sh bin/mqproxy -n 192.168.1.1:9876 &
```
指定配置文件
```bash
nohup sh mqproxy -pc ../conf/rmq-proxy.json &
```
rmq-proxy.json
```json
{
  "rocketMQClusterName": "DefaultCluster",
  "namesrvAddr": "117.72.97.254:9875;117.72.97.254:9876"
}
```

### controller

[//]: # (todo 后面在实现)
提供主备自动切换的功能，需要部署三副本以上 遵循raft的多数派协议（5个节点需要三个节点同意）
