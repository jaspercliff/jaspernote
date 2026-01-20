# message queue

1. list  blpush brpop
2. pubsub
3. stream

| Component | list | pubsub | stream |
| --------------- | --------------- | --------------- | --------------- |
| 消息持久化 | yes | no | yes |
| ack | no(rpoplpush实现) | no | yes |
| 消息回溯 | no(rpoplpush实现) | no | yes |


## list

- 无法避免消息丢失(消费者brpop之后没有来得及处理宕机消息丢失了
(activemq 有ack机制，只有消费完成收到ack之后消息才会被删除)
,AOF 刷盘未完成)
- 只支持单消费者,不支持广播消费

```java
@Component
@RequiredArgsConstructor
public class ListProducer {

    private final StringRedisTemplate stringRedisTemplate;

    @PostConstruct
    public void init(){
        send();
    }

    public void send(){
        stringRedisTemplate.opsForList().leftPush("listmq","hello world!");
    }

}

@Component
@RequiredArgsConstructor
@Slf4j
@DependsOn("listProducer")
public class ListConsumer {

    private final StringRedisTemplate stringRedisTemplate;

    /**
     * 这里没有ack 机制，假如consumer突然宕机了 消息收到了 但是没有处理 这条消息就丢失了
     * 如果aof 刷盘失败 数据也会丢失
     */
    @PostConstruct
    public void receive() {
        String receiveBody = stringRedisTemplate.opsForList().rightPop("listmq",
Duration.ofSeconds(30));
        if (receiveBody != null) {
            log.info(receiveBody);
        }
    }
}
```

- BRPOPLPUSH Pops an element from a list, pushes it to another list and returns
it.
Block until an element is available otherwise. Deletes the list if the last
element was popped.

```java
    @PostConstruct
    public void init(){
        // 从主队列中取出 添加到 processing 队列
        String msg = stringRedisTemplate.opsForList().rightPopAndLeftPush("main",
                "processing", Duration.ofSeconds(30));

        try {
            if (msg!=null){
                log.info("processing");
                log.info(msg);
                // 处理完成之后删除 processing中的任务
                stringRedisTemplate.opsForList().remove("processing",1,msg);
            }
        } catch (Exception e) {
            // 处理失败  不删除 processing   超时机制(定时任务):将processing中的任务重新添加回 main队列
            log.info(e.getMessage());
        }
    }
```

## pubsub

- 支持多生产多消费,广播消费
- 不支持持久化，
- 会有消息丢失 publish 之后 如果没有人subscribe 就没有这条消息了
- 消息堆积有上限

## stream

- [stream](../dataType/stream.md)

xread count 1 block 0 streams s1 $

- 消息可以回溯
- 可以被多个消费者读取
- 可以阻塞读取
- 可能会消息漏读，$从最新开始读，但是只有count 1 个，假如有5条消息同时进来，这里只能读取到1条，漏读4条

---

- XGROUP CREATE s1 g1 0            0/$ 从头/最新
- XREADGROUP group g1 c1 count 1 block 2000 streams s1 >(下一个未消费的消息)
- xack s1 g1 1768574649290-0
- XPENDING s1 g1 - + 5  查看已消费未确认的消息  - + 全部
- XREADGROUP group g1 c1 count 1 block 2000 streams s1 0 重新读取pendinglist中消费失败的数据

- 消息确认机制(只支持消费者)，消息不会丢失

---
