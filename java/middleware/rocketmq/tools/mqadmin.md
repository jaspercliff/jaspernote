# `mqadmin`

`mqadmin` 是 Apache RocketMQ 提供的一个命令行管理工具，主要用于管理和监控 RocketMQ 消息队列的运行状态。

### 1. **集群管理**
- 查看 RocketMQ 集群的状态，包括 NameServer 和 Broker 的运行情况。
- 示例命令：
  ```bash
  mqadmin clusterList -n <nameserver_address>
  ```
  这个命令可以列出当前 RocketMQ 集群中的所有 Broker 和 NameServer。

---

### 2. **主题管理**
- 创建、删除或更新主题（Topic）。
- 查询某个主题的详细信息，例如消息存储位置、分区数量等。
- 示例命令：
  ```bash
  mqadmin updateTopic -n <nameserver_address> -c <cluster_name> -t <topic_name>
  ```
  这个命令可以创建或更新一个主题。
```bash
sh mqadmin updatetopic -n 127.0.0.1:9876 -t TopicTest 
```

---

### 3. **消费者组管理**
- 查看消费者组（Consumer Group）的状态，包括订阅的主题、消费进度等。
- 示例命令：
  ```bash
  mqadmin consumerProgress -n <nameserver_address> -g <consumer_group>
  ```
  这个命令可以查看某个消费者组的消费进度。

---

### 4. **消息查询**
- 查询特定的消息内容或消息轨迹。
- 示例命令：
  ```bash
  mqadmin queryMsgByUniqueKey -n <nameserver_address> -t <topic_name> -k <msg_key>
  ```
  这个命令可以根据消息的唯一键查询消息内容。

---

### 5. **延迟消息管理**
- 管理延迟消息队列，查看延迟消息的状态。
- 示例命令：
  ```bash
  mqadmin messageStats -n <nameserver_address>
  ```

---

### 6. **Broker 管理**
- 查看 Broker 的详细信息，如存储路径、队列状态等。
- 示例命令：
  ```bash
  mqadmin brokerStatus -n <nameserver_address> -b <broker_name>
  ```

---

### 7. **其他功能**
- **调整参数**：修改 RocketMQ 配置参数。
- **监控统计**：获取消息吞吐量、延迟等统计信息。
- **日志管理**：查看 RocketMQ 的运行日志。

---

### 使用场景
- 在开发阶段，使用 `mqadmin` 测试消息发送和接收。
- 在生产环境中，用于监控 RocketMQ 集群的健康状况。
- 故障排查时，通过 `mqadmin` 查看消息堆积、消费延迟等问题的原因。

---

如果你需要更具体的命令或配置示例，请告诉我你的具体需求！