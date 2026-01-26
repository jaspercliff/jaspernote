--- 
layout: home
---

# transaction

## 事务消息的使用限制

1. 事务消息不支持延时消息和批量消息。
2. 为了避免单个消息被检查太多次而导致半队列消息累积，我们默认将单个消息的检查次数限制为 15 次，但是用户可以通过 Broker 配置文件的 transactionCheckMax参数来修改此限制。如果已经检查某条消息超过 N 次的话（ N = transactionCheckMax ） 则 Broker 将丢弃此消息，并在默认情况下同时打印错误日志。用户可以通过重写 AbstractTransactionalMessageCheckListener 类来修改这个行为。
3. 事务消息将在 Broker 配置文件中的参数 transactionTimeout 这样的特定时间长度之后被检查。当发送事务消息时，用户还可以通过设置用户属性 CHECK_IMMUNITY_TIME_IN_SECONDS 来改变这个限制，该参数优先于 transactionTimeout 参数。
4. 事务性消息可能不止一次被检查或消费。
5. 提交给用户的目标主题消息可能会失败，目前这依日志的记录而定。它的高可用性通过 RocketMQ 本身的高可用性机制来保证，如果希望确保事务消息不丢失、并且事务完整性得到保证，建议使用同步的双重写入机制。
6. 事务消息的生产者 GroupName 不能与其他类型消息的生产者 GroupName 共享。与其他类型的消息不同，事务消息允许反向查询、MQ服务器能通过它们的生产者 GroupName 查询到生产者。

## 事务回查的工作原理

1. 半事务消息：当生产者发送一条事务消息时，这条消息首先会被标记为“半事务消息”，此时它不会被消费者消费。
2. 本地事务执行：接着，生产者会执行与这条消息关联的本地事务逻辑。
3. 提交状态确认：生产者需要向RocketMQ服务端提交该事务的状态（提交COMMIT_MESSAGE或回滚ROLLBACK_MESSAGE）。如果因为某些原因（如网络问题、生产者崩溃等），RocketMQ服务端未能接收到这个提交状态，那么这条消息就会处于不确定状态。
4. 事务回查：在这种情况下，RocketMQ的服务端会在一段时间后（根据配置的参数），对这条未决的消息进行回查。它会调用生产者实现的回查接口（checkLocalTransaction方法），询问这条消息对应的本地事务最终状态是什么。
回查结果处理：根据回查的结果，生产者再次向RocketMQ服务端提交正确的事务状态。如果是提交，则该消息可以被消费者消费；如果是回滚，则该消息会被丢弃。

```java
package com.jasper.transaction;

import lombok.extern.slf4j.Slf4j;
import org.apache.rocketmq.client.exception.MQBrokerException;
import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.client.producer.LocalTransactionState;
import org.apache.rocketmq.client.producer.TransactionListener;
import org.apache.rocketmq.client.producer.TransactionMQProducer;
import org.apache.rocketmq.common.message.Message;
import org.apache.rocketmq.common.message.MessageExt;
import org.apache.rocketmq.remoting.exception.RemotingException;

/**
 * 使用场景
 * 当生产者成功发送了消息但本地事务失败时，或者消费者已经消费了消息但是后续的本地处理失败了。
 */
@Slf4j
public class TransactionProducer {
    public static void main(String[] args) throws MQClientException, MQBrokerException, RemotingException, InterruptedException {
        TransactionMQProducer producer = new TransactionMQProducer("transaction_producer_group");
        producer.setNamesrvAddr("localhost:9876");
        producer.setTransactionListener(
                new TransactionListener() {

                    @Override
                    public LocalTransactionState executeLocalTransaction(Message msg, Object arg) {
                        try {
                            System.out.println("更新订单状态和库存");
                            int temp = 3/0;
                            return LocalTransactionState.COMMIT_MESSAGE;
                        } catch (Exception e) {
                            log.info("执行出现异常");
                            return LocalTransactionState.ROLLBACK_MESSAGE;
                        }
                    }

                    @Override
                    public LocalTransactionState checkLocalTransaction(MessageExt msg) {
                        log.info("回查本地事务状态");
                        return LocalTransactionState.COMMIT_MESSAGE;
                    }
                }
        );

        producer.start();

        Message message = new Message("orderTopic", "tagA", "keyA", "order".getBytes());
        producer.sendMessageInTransaction(message, null);

        producer.shutdown();
    }
}
```

```java
package com.jasper.transaction;

import lombok.extern.slf4j.Slf4j;
import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.client.producer.SendResult;
import org.apache.rocketmq.client.producer.TransactionListener;
import org.apache.rocketmq.client.producer.TransactionMQProducer;
import org.apache.rocketmq.common.message.Message;
import org.apache.rocketmq.remoting.common.RemotingHelper;

import java.io.UnsupportedEncodingException;
import java.util.concurrent.*;
@Slf4j
public class TransactionProducer1 {
    public static void main(String[] args) throws MQClientException, InterruptedException {
        TransactionMQProducer producer = getTransactionMQProducer();
        String[] tags = new String[] {"TagA", "TagB", "TagC", "TagD", "TagE"};
        for (int i = 0; i < 10; i++) {
            try {
                Message msg =
                        new Message("orderTopic", tags[i % tags.length], "KEY" + i,
                                ("Hello RocketMQ " + i).getBytes(RemotingHelper.DEFAULT_CHARSET));
                SendResult sendResult = producer.sendMessageInTransaction(msg, null);
                System.out.printf("%s%n", sendResult);
                Thread.sleep(10);
            } catch (MQClientException | UnsupportedEncodingException e) {
                log.info(e.getMessage());
            }
        }
        for (int i = 0; i < 100000; i++) {
            Thread.sleep(1000);
        }
        producer.shutdown();
    }

    private static TransactionMQProducer getTransactionMQProducer() throws MQClientException {
        TransactionListener transactionListener = new OrderTransactionListener();
        TransactionMQProducer producer = new TransactionMQProducer("transaction_producer_group");
        producer.setTransactionListener(transactionListener);
        producer.setNamesrvAddr("127.0.0.1:9876");
        ExecutorService executorService = new ThreadPoolExecutor(2, 5, 100, TimeUnit.SECONDS, new ArrayBlockingQueue<Runnable>(2000), new ThreadFactory() {
            @Override
            public Thread newThread(Runnable r) {
                Thread thread = new Thread(r);
                thread.setName("client-transaction-msg-check-thread");
                return thread;
            }
        });
        producer.setExecutorService(executorService);

        producer.start();
        return producer;
    }
}

```

```java
package com.jasper.transaction;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
import org.apache.rocketmq.client.consumer.listener.MessageListenerConcurrently;
import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.common.message.MessageExt;

import java.util.List;

public class TransactionConsumer {
    private static final Log log = LogFactory.getLog(TransactionConsumer.class);

    public static void main(String[] args) throws MQClientException {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("transaction_consumer_group");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("orderTopic","*");
        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                msgs.forEach(message -> {
                    System.out.println(new String(message.getBody()));
                });
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });
        consumer.start();
        log.info("Consumer Started");
    }
}

```

```java
package com.jasper.transaction;

import org.apache.rocketmq.client.producer.LocalTransactionState;
import org.apache.rocketmq.client.producer.TransactionListener;
import org.apache.rocketmq.common.message.Message;
import org.apache.rocketmq.common.message.MessageExt;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * 官方示例
 */
public class TransactionListenerImpl implements TransactionListener {

    private final AtomicInteger transactionIndex =  new AtomicInteger(0);
    private final ConcurrentHashMap<String, Integer> localTrans  = new ConcurrentHashMap<>();
    @Override
    public LocalTransactionState executeLocalTransaction(Message msg, Object arg) {
        int value = transactionIndex.incrementAndGet();
        int status= value%3;
        localTrans.put(msg.getTransactionId(), status);
        return LocalTransactionState.UNKNOW;
    }

    @Override
    public LocalTransactionState checkLocalTransaction(MessageExt msg) {
        Integer status = localTrans.get(msg.getTransactionId());
        if (status != null){
            switch (status){
                case 0: return LocalTransactionState.UNKNOW;
                case 1: return LocalTransactionState.COMMIT_MESSAGE;
                case 2: return LocalTransactionState.ROLLBACK_MESSAGE;
            }
        }
        return LocalTransactionState.UNKNOW;
    }
}

```

```java
package com.jasper.transaction;

import org.apache.rocketmq.client.producer.LocalTransactionState;
import org.apache.rocketmq.client.producer.TransactionListener;
import org.apache.rocketmq.common.message.Message;
import org.apache.rocketmq.common.message.MessageExt;

import java.util.concurrent.ConcurrentHashMap;

public class OrderTransactionListener implements TransactionListener {

    // 模拟数据库或其他持久化存储
    private final ConcurrentHashMap<String, Integer> localTrans = new ConcurrentHashMap<>();

    /**
     * 执行本地事务
     */
    @Override
    public LocalTransactionState executeLocalTransaction(Message msg, Object arg) {
        String transactionId = msg.getTransactionId();
        try {
            // 假设这里进行一些数据库操作，比如更新订单状态和扣减库存
            boolean updateOrderStatusSuccess = updateOrderStatus(msg);
            boolean deductStockSuccess = deductStock(msg);

            if (updateOrderStatusSuccess && deductStockSuccess) {
                // 如果所有操作都成功，则标记为COMMIT_MESSAGE
                localTrans.put(transactionId, 1); // 1代表成功
                return LocalTransactionState.COMMIT_MESSAGE;
            } else {
                // 如果有任何一步失败，则回滚事务
                localTrans.put(transactionId, 2); // 2代表失败
                return LocalTransactionState.ROLLBACK_MESSAGE;
            }
        } catch (Exception e) {
            // 记录异常日志
            System.err.println("本地事务执行失败: " + e.getMessage());
            localTrans.put(transactionId, 2); // 2代表失败
            return LocalTransactionState.ROLLBACK_MESSAGE;
        }
    }

    /**
     * 事务回查
     */
    @Override
    public LocalTransactionState checkLocalTransaction(MessageExt msg) {
        String transactionId = msg.getTransactionId();
        Integer status = localTrans.get(transactionId);

        if (status == null) {
            // 如果没有找到对应的事务状态，说明可能是未完成的事务，暂时返回UNKNOW
            return LocalTransactionState.UNKNOW;
        } else if (status == 1) {
            // 如果之前的状态为成功，则提交事务
            return LocalTransactionState.COMMIT_MESSAGE;
        } else if (status == 2) {
            // 如果之前的状态为失败，则回滚事务
            return LocalTransactionState.ROLLBACK_MESSAGE;
        }

        // 默认情况下返回UNKNOW
        return LocalTransactionState.UNKNOW;
    }

    /**
     * 更新订单状态模拟方法
     */
    private boolean updateOrderStatus(Message msg) {
        // 这里应该是与数据库交互的逻辑
        // 假设总是成功
        return true;
    }

    /**
     * 扣减库存模拟方法
     */
    private boolean deductStock(Message msg) {
        // 这里应该是与数据库交互的逻辑
        // 假设总是成功
        return true;
    }
}
```

