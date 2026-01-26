# usage

ZooKeeper 是一个开源的分布式协调服务，广泛应用于分布式系统中，用于解决多节点间的一致性、同步和协调问题。

---

## ZooKeeper 的主要用途（Usage）

### 1. **配置管理（Configuration Management）**

- 集中管理分布式系统的配置信息。
- 支持配置动态更新，客户端可以监听配置变更事件，实现配置的实时同步。

### 2. **命名服务（Naming Service）**

- 为分布式系统中的资源或服务提供统一的命名和查找机制。
- 类似于分布式环境中的目录服务。

### 3. **分布式锁（Distributed Lock）**

- 多个分布式节点间实现互斥访问，防止资源竞争。
- 常用于分布式任务调度、资源抢占等场景。

### 4. **选主服务（Leader Election）**

- 在分布式系统中选举出一个主节点，负责协调全局任务。
- 保证系统中只有一个主节点在工作，避免数据冲突。

### 5. **分布式队列（Distributed Queue）**

- 实现任务的排队和顺序处理。
- 可以保证任务在分布式环境中的顺序执行。

### 6. **集群管理（Cluster Management）**

- 跟踪集群中节点的状态（上线、下线）。
- 实现节点的动态加入和退出管理。

### 7. **元数据管理（Metadata Management）**

- 管理和同步分布式系统的元数据。
- 例如 Hadoop HDFS 使用 ZooKeeper 管理 NameNode 的元数据信息。

---

## 典型使用案例

| 项目/系统            | ZooKeeper 的具体作用         |
|------------------|-------------------------|
| **Hadoop HDFS**  | 管理 NameNode 的状态和高可用     |
| **Apache Kafka** | 维护集群元数据，选举 Controller   |
| **Apache HBase** | 管理 RegionServer 状态和负载均衡 |
| **Dubbo**        | 服务注册与发现（老版本使用）          |
| **Flink**        | JobManager 高可用协调        |
| **SolrCloud**    | 集群状态管理和选主               |

---