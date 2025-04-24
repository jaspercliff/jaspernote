# stream 

Redis Stream 是 Redis 5.0 引入的一种强大的消息队列数据结构，可以实现类似 Kafka 的“持久化队列”功能，支持：

✅ 消息持久化  
✅ 消息确认（ack）机制  
✅ 消费组（consumer group）  
✅ 支持回溯读取旧消息  
✅ 一条消息可被多个消费者独立消费

---

## 🧱 Stream 基本结构

Redis Stream 中的每条消息都有一个唯一的 **ID**（类似时间戳+序号）和一个 **键值对数据体**。

```bash
XADD mystream * name Alice age 20
```

`*` 表示自动生成 ID，消息内容是 `name=Alice`，`age=20`

---

## 🔧 常用命令速览

| 命令                     | 说明               |
|------------------------|------------------|
| `XADD`                 | 添加消息             |
| `XRANGE` / `XREVRANGE` | 按范围读取消息（正序 / 反序） |
| `XREAD`                | 拉取最新消息（阻塞或非阻塞）   |
| `XGROUP CREATE`        | 创建消费者组           |
| `XREADGROUP`           | 消费者组方式读取消息       |
| `XACK`                 | 确认消息处理完毕         |
| `XDEL`                 | 删除消息（可选）         |

---

## 💡 示例：简单添加和读取

```bash
# 添加消息
XADD mystream * username bob msg "hello"
# 自定义id
XADD race:usa 0-1 racer Castilla  
# seq 自增   7版本以上
XADD race:usa 0-* racer Prickett

# 拉取消息（从头读1条）
XRANGE mystream - + COUNT 1

# 0 从最开始读    $从最新的消息开始读
# 读取历史消息
XREAD STREAMS mystream 0

# 从流的末尾开始，最多读取 100 个新的流条目(只要有一条消息可读，就会立刻返回)，如果未写入任何条目，则阻塞长达3s   $ 表示“从现在起监听”，所以之前的历史消息不会读到
XREAD COUNT 100 BLOCK 3000 STREAMS race:france $


```

| -                             | + |
|-------------------------------|---|
| 最早的消息stream的起始｜最新的消息stream的结束 |


##  消费者组

适合构建高可靠的消息队列、事件驱动架构等。


###  📌 一、什么是消费组（Consumer Group）

消费组是 Redis Stream 专为**消息可靠消费**设计的：

| 特性          | 说明                                     |
|-------------|----------------------------------------|
| **消息持久化**   | 每条消息写入后不会立即丢失，除非手动确认已消费                |
| **多消费者**    | 一个组中可以有多个消费者（Consumer）协作处理消息           |
| **消费进度可追踪** | 消费组会记录每个消费者“看到哪了”                      |
| **ACK 机制**  | 消费者处理完要 `XACK`，未确认的可以被其他消费者接管（防止宕机丢消息） |
| **阻塞式拉取**   | 支持 `XREADGROUP BLOCK` 方式阻塞等待新消息        |

---

###  🧠 二、与 XREAD 的区别

| 功能          | `XREAD` | `XREADGROUP`                  |
|-------------|---------|-------------------------------|
| 是否记录消费进度    | ❌ 不记录   | ✅ 自动记录                        |
| 是否支持多个消费者协作 | ❌       | ✅（同一个组下多个消费者分工合作）             |
| 是否可以处理未确认消息 | ❌       | ✅ 可用 `XPENDING` + `XCLAIM` 恢复 |

---

## ✅ 三、使用流程



###  创建消费组（只需一次）

```bash
XGROUP CREATE mystream mygroup $ MKSTREAM
```

说明：
- `mygroup` 是组名
- `$` 表示从现在之后的新消息开始消费（用 `0` 可以消费旧消息）
- MKSTREAM 不存在时会自动创建该stream

###  消费者读取消息

```bash
XREADGROUP GROUP mygroup consumer1 COUNT 2 BLOCK 5000 STREAMS mystream >
```

说明：
- `GROUP mygroup consumer1`：表示“我是 `mygroup` 的一个叫 `consumer1` 的消费者”
- `COUNT`：最多拉 2 条
- `BLOCK`：最多阻塞 5 秒
- `>` 表示“读取尚未被任何消费者读取过的新消息”

###  stream 并添加消息

```bash
XADD mystream * name jasper
XADD mystream * name alice
XADD mystream * name bob
```
### 处理完成后确认消息

```bash
XACK mystream mygroup <message_id>
```

说明：你要告诉 Redis 哪条消息你已经处理完了，不然它会一直在待确认列表里。

---

## 💡 四、其他指令

| 指令                          | 用途                           |
|-----------------------------|------------------------------|
| `XPENDING mystream mygroup` | 查看待确认消息（哪些消息还没被 ack）         |
| `XCLAIM`                    | 把某条消息从一个消费者转移给另一个（处理超时或宕机场景） |
| `XDEL`                      | 手动删除 stream 中的消息             |
| `XTRIM`                     | 裁剪 stream，限制消息数量或按 ID 删除旧消息  |

---


```text
1) (integer) 1                             ← 当前待确认消息总数
2) "1745487293419-0"                      ← 待确认消息的最小 ID
3) "1745487293419-0"                      ← 待确认消息的最大 ID
4) 1) 1) "consumer1"                      ← 消费者名字
      2) "1"                              ← 这个消费者未确认的消息数
```

```bash
#  min-idle-time 设置为 0，即使这条消息刚刚被消费，也允许立即抢走
XCLAIM mystream mygroup consumer2 0 1745487293419-0
```

## stream的数据结构

[Radix tree](/dataStructure/tree/radixTree.md)