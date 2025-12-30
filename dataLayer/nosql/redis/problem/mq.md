# message queue

1. list  blpush brpop
2. pubsub
3. stream

## list

- 无法避免消息丢失(消费者brpop之后没有来得及处理宕机消息丢失了
(activemq 有ack机制，只有消费完成收到ack之后消息才会被删除)
,AOF 刷盘未完成)
- 只支持单消费者

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

- BRPOPLPUSH Pops an element from a list, pushes it to another list and returns it.
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

- 支持多生产多消费
- 不支持持久化，
- 会有消息丢失 publish 之后 如果没有人subscribe 就没有这条消息了
- 消息堆积有上限
