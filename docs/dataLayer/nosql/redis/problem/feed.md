# feed

向几万人推送博客，在架构上已经脱离了“简单的数据库读写”，进入了**“异步分发”**和**“流量削峰”**的范畴。

实现的核心思想是：**不要让发博的人等待推送完成，而是把推送任务丢给后台慢慢处理。**

---

## 1. 核心模型：推模式 (Push) vs 拉模式 (Pull)

针对几万人的规模，你需要决定如何把消息送到他们手中。

### 方案 A：推模式 (Push / 写扩散)

当博主发布文章时，系统主动把消息写到这几万个粉丝的“收件箱”里。

* **做法**：遍历粉丝列表，给每个人的 Redis `List` 或 `ZSet` 里插入这条博客的 ID。
* **优点**：粉丝看博客时极快（直接读自己的收件箱）。
* **缺点**：如果粉丝有 100 万，发一条博就要写 100 万次，瞬间产生大量写操作。

### 方案 B：拉模式 (Pull / 读扩散)

粉丝登录时，系统去查询他关注的所有博主，现场拉取最新博文。

* **做法**：粉丝打开页面 -> 查询 `following` 表 -> 聚合这些博主的最新博文。
* **优点**：发博时很轻松。
* **缺点**：粉丝多的人，拉取时开销大（需要聚合多个人的数据）。

**结论**：对于“几万人”的规模，**推模式（Push）** 是最常见的做法。

---

### 2. 技术实现路径：消息队列 (MQ) + 异步处理

为了保证系统的稳定性，绝对不能在 `publish` 接口里写 `for` 循环发消息。

#### 步骤一：发布与入队

博主点击“发布”，后台将博客存入 MySQL，并向消息队列（如 **Kafka** 或 **RabbitMQ**）发送一个“发博事件”消息，包含 `blog_id` 和 `author_id`。

#### 步骤二：异步分发 (Worker)

后台起多个消费者（Worker）来处理这条消息：

1. 从数据库/缓存中查出该博主的 5 万个粉丝 ID。
2. **分批处理**：将 5 万人拆成 50 组（每组 1000 人）。
3. **写入缓存**：将 `blog_id` 写入这 5 万人的 Redis `List` 中。

* `LPUSH feed:user:{user_id} {blog_id}`
* 通常每个人的 `feed` 只保留最近的 500 条，多余的剔除。

---

### 3. 如何处理“大 V” (针对几万到几十万人的优化)

如果以后粉丝变成了几十万甚至几百万，单纯的推模式会崩。业界通用的方案是 **“推拉结合”**：

* **普通用户**：使用推模式。
* **大 V (粉丝极多)**：
* 发博时不推给所有人，只推给最近 3 天活跃的在线粉丝。
* 不活跃的粉丝上线时，采用“拉模式”去合并大 V 的新博文。

---

### 4. 实时推送（通知栏弹窗）

如果你指的是手机通知栏的“弹窗”推送：

1. **第三方推送 (推荐)**：使用极光推送、个推等。你只需调用它们的 API，把 5 万个 `DeviceToken` 发过去，由它们负责与手机厂商的通道交互。
2. **WebSocket**：如果是在网页端或 App 内即时提示，可以使用 WebSocket。通过 **Netty** 维护长连接，将消息推送到已登录用户的 Client 端。

---

### 5. 关键代码逻辑 (Java 伪代码)

```java
public void publishBlog(Blog blog) {
    // 1. 存入数据库
    blogMapper.insert(blog);
    
    // 2. 发送异步任务到 MQ
    rabbitTemplate.convertAndSend("blog.exchange", "blog.push", blog.getId());
}

// MQ 消费者处理分发
@RabbitListener(queues = "blog.push.queue")
public void handlePush(Long blogId) {
    Long authorId = getAuthorByBlog(blogId);
    List<Long> followerIds = followService.getFollowers(authorId);
    
    // 分片处理，防止 Redis 压力过大
    Lists.partition(followerIds, 1000).forEach(batch -> {
        stringRedisTemplate.executePipelined((RedisCallback<Object>) connection -> {
            for (Long followerId : batch) {
                String key = "feed:" + followerId;
                connection.lPush(key.getBytes(), String.valueOf(blogId).getBytes());
                connection.lTrim(key.getBytes(), 0, 499); // 只留500条
            }
            return null;
        });
    });
}

```

---

### 总结

1. **不要同步执行**：用 MQ 异步化。
2. **Redis 管道 (Pipeline)**：批量写入粉丝 Feed 流，提升性能。
3. **Feed 流存储**：Redis 的 `List` 或 `ZSet` 是存“收件箱”最合适的结构。

* 写扩散 (Push)：用户发博后，异步任务把 blog_id 写入粉丝的 Redis ZSet。
* 容量限制：每个粉丝的 Redis ZSet 只保留最近的 500 条数据（热数据）。
* 读操作：用户打开 App，直接查 Redis ZSet，秒开。
* 回源 (兜底)：如果用户是个“考古达人”，一直往下刷，刷过了 500 条。此时 Redis 没数据了，系统再去 MySQL 查历史旧数据。
