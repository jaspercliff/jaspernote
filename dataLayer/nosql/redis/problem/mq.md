# message queue

1. list  blpush brpop
2. pubsub
3. stream

## list

- 无法避免消息丢失(消费者brpop之后没有来得及处理宕机消息丢失了
(activemq 有ack机制，只有消费完成收到ack之后消息才会被删除)
,AOF 刷盘未完成)
- 只支持单消费者

## pubsub

- 支持多生产多消费
- 不支持持久化，
- 会有消息丢失 publish 之后 如果没有人subscribe 就没有这条消息了
- 消息堆积有上限
