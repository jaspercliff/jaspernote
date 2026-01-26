# 消息过滤

在大多数情况下，TAG是一个简单而有用的设计，其可以来选择您想要的消息。例如：

``` java
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("CID_EXAMPLE");
consumer.subscribe("TOPIC", "TAGA || TAGB || TAGC");
```

消费者将接收包含TAGA或TAGB或TAGC的消息。但是限制是一个消息只能有一个标签，这对于复杂的场景可能不起作用。在这种情况下，可以使用SQL表达式筛选消息。

## sql特性

SQL特性可以通过发送消息时的属性来进行计算。
RocketMQ 的 SQL92 过滤 依赖 Broker 开启消息过滤功能

---
RocketMQ 默认不支持 SQL92 过滤，你需要在 broker.conf 文件中添加如下配置：

```bash
enablePropertyFilter = true
```

```
------------
| message  |
|----------|  a > 5 AND b = 'abc'
| a = 10   |  --------------------> Gotten
| b = 'abc'|
| c = true |
------------
------------
| message  |
|----------|   a > 5 AND b = 'abc'
| a = 1    |  --------------------> Missed
| b = 'abc'|
| c = true |
------------
```

### 5.1 基本语法

RocketMQ只定义了一些基本语法来支持这个特性。你也可以很容易地扩展它。

- 数值比较，比如：`>`，`>=`，`<`，`<=`，BETWEEN，=；**
- 字符比较，比如：=，`<>`，IN；**
- **IS NULL** 或者 **IS NOT NULL；**
- 逻辑符号 **AND，OR，NOT；**

常量支持类型为：

- 数值，比如：**123，3.1415；**
- 字符，比如：**'abc'，必须用单引号包裹起来；**
- **NULL**，特殊的常量
- 布尔值，**TRUE** 或 **FALSE**

**只有使用push模式的消费者**才能用使用SQL92标准的sql语句，接口如下：

```
public void subscribe(finalString topic, final MessageSelector messageSelector)
```

### 5.2 使用样例

#### 1、生产者样例

发送消息时，你能通过`putUserProperty`来设置消息的属性

``` java
package com.jasper.messageFilter;

import org.apache.rocketmq.client.exception.MQBrokerException;
import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.client.producer.DefaultMQProducer;
import org.apache.rocketmq.common.message.Message;
import org.apache.rocketmq.remoting.exception.RemotingException;
public class FilterProducer {
    public static void main(String[] args) throws MQClientException, MQBrokerException, RemotingException, InterruptedException {
        DefaultMQProducer producer = new DefaultMQProducer("filter_producer_group");
        producer.setNamesrvAddr("localhost:9876");
        producer.start();
        Message message = new Message("TopicA", "hello filter".getBytes());
        message.putUserProperty("a",String.valueOf(3));
        message.putUserProperty("b","abc");
        message.putUserProperty("c","true");
        producer.send(message);
        producer.shutdown();
    }
}

```

#### 2、消费者样例

用MessageSelector.bySql来使用sql筛选消息

```java
package com.jasper.messageFilter;

import lombok.extern.slf4j.Slf4j;
import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;
import org.apache.rocketmq.client.consumer.MessageSelector;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
import org.apache.rocketmq.client.consumer.listener.MessageListenerConcurrently;
import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.common.message.MessageExt;

import java.util.List;
@Slf4j
public class FilterConsumer {
    public static void main(String[] args) throws MQClientException {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("filter_consumer_group");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("TopicA", MessageSelector.bySql("a > 2 and b = 'abc' and c = true and d is null "));
        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                for (MessageExt msg : msgs) {
                    System.out.println(new String(msg.getBody()));
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });
        log.info("consumer start");
        consumer.start();
    }
}
``

