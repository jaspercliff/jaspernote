# pipeline  

通过一次性发出多个命令而无需等待每个命令的响应来提高性能的技术,大量数据导入

数据包从客户端传输到服务器，再从服务器返回客户端，都需要时间才能完成响应传输,这个时间称为往返时间 (RTT)。很容易看出，当客户端需要连续执行多个请求时（例如，向同一个列表中添加多个元素，或向数据库中填充多个键），
RTT 会如何影响性能。例如，如果 RTT 时间为 250 毫秒（在互联网连接速度非常慢的情况下），
即使服务器每秒能够处理 10 万个请求，我们最多也只能每秒处理四个请求。

只有mset 和 hmset(hset replace),速度比pipeline快,mset是原子性的,但是只有string和hash支持，
其他数据类型也支持插入多个，但是只能在一个key下,mset和hset是一个key一个value

pipeline 不建议一次携带太多命令,同时不能保证原子性，如果需要原子性，则使用redis的事务

```java
    @Test
    public void testFor() {
        Stopwatch stopWatch = Stopwatch.createStarted();
        for (int i = 1; i < 100000; i++) {
            jedis.set("test:key" + i, "value" + i);
        }
        stopWatch.stop();
        System.out.println(stopWatch.elapsed(TimeUnit.MILLISECONDS)); // 693ms
    }

    @Test
    public void testMset() {
        String[] arr = new String[2000];
        int j;
        Stopwatch stopwatch = Stopwatch.createStarted();
        for (int i = 1; i < 100000; i++) {
            // arr = key value key value key value
            // 相当于 * 2
            j = (i % 1000) << 1;
            arr[j] = "test:key" + i;
            arr[j + 1] = "value" + i;
            if (j == 0) {
                // 当满1000个 mset一次
                jedis.mset(arr);
            }
        }
        System.out.println(stopwatch.elapsed(TimeUnit.MILLISECONDS)); // 49ms
    }

    @Test
    void testPipeline() {
        Pipeline pipeline = jedis.pipelined();
        Stopwatch stopwatch = Stopwatch.createStarted();
        for (int i = 0; i < 100000; i++) {
            pipeline.set("test:key", "value_" + i);
            if (i % 1000 == 0) {
                pipeline.sync();
            }
        }
        System.out.println(stopwatch.elapsed(TimeUnit.MILLISECONDS));// 74ms
    }

```

pipelined 的命令在集群模式下必须保证 key落在一个slot上,hashtag,user:{123}:profile 和 user:{123}:account
但是这样会导致数据倾斜,如果大量数据都落在一个slot上,就会导致这个slot所在的节点压力过大,其他节点压力过小,所以不建议在集群模式下使用pipeline

准备一个 `Map<Node, List<Command>>`。
遍历 Key，算出对应的节点并分组。
对每个 Node 开启多线程或轮询执行 Pipeline。

lettuce 和spring-boot-starter-redis 都提供了集群模式下的pipeline,底层实现就是上面说的,
自动分组和执行
