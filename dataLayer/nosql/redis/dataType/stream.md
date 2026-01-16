# stream

类似于append-only log ，O(1)的随机访问，复杂的消费策略

## common  command

- xadd s1 `*` k1 v1 自动生成队列id（时间戳+序列号组成）
- xlen s1       s1的长度
- xread count 1 block 0 streams s1 0/$   block 阻塞(0 无限阻塞)  0 从大于0的开始读  $ 从当前开始读

## consumer group

将多个消费者划分到一个组，监听同一个队列

- 消息会分流给组内的不同消费者
- 会维护一个标识，记录最后一个被处理的消息，消费者宕机重启，会继续读消息，不会丢失消息
- 获取消息之后，消息处于pending状态，存入pendinglist，处理完成之后需要xack，才会移除 brpoplpush  

- XGROUP CREATE s1 g1 0            0/$ 从头/最新
- XREADGROUP GROUP group consumer [COUNT count] [BLOCK milliseconds]
[NOACK] STREAMS key [key ...] id [id ...] id >下一个未消费的消息开始/ 根据id从pending-list
中获取已消费但未确认的消息
XREADGROUP group g1 c1 count 1 block 2000 streams s1 >
- xack s1 g1 1768574649290-0
- XPENDING s1 g1 - + 5  查看已消费未确认的消息  - + 全部
- XREADGROUP group g1 c1 count 1 block 2000 streams s1 0 重新读取pendinglist中消费失败的数据
