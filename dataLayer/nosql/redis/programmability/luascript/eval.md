# eval

## EVAL 的标准指令格式

EVAL "脚本内容" 参数个数 [KEY1] [KEY2]... [ARGV1] [ARGV2]...

- 脚本内容：一段完整的 Lua 代码。
- 参数个数：指明后面紧跟着多少个是 Key（剩下的全是 Value/参数）。
- KEYS 数组：操作的键名。必须大写 lua大小写敏感
- ARGV 数组：业务参数（如 UUID、过期时间等）。

 在 Java (Spring Boot) 中调用 EVAL
在实际开发中，你不需要手动拼字符串。StringRedisTemplate 提供了封装好的方法。

示例：安全解锁的完整代码

```java
public void unlock(String lockKey, String requestId) {
    // 1. 定义 Lua 脚本
    String script = "if redis.call('get', KEYS[1]) == ARGV[1] then " +
                   "return redis.call('del', KEYS[1]) " +
                   "else return 0 end";

    // 2. 封装脚本对象
    DefaultRedisScript<Long> redisScript = new DefaultRedisScript<>();
    redisScript.setScriptText(script);
    redisScript.setResultType(Long.class); // 设置返回值类型

    // 3. 执行 EVAL (底层自动处理)
    // 参数1：脚本对象
    // 参数2：KEYS 列表
    // 参数3：ARGV 数组
    Long result = redisTemplate.execute(redisScript, 
                                       Collections.singletonList(lockKey), 
                                       requestId);
    
    if (Long.valueOf(1).equals(result)) {
        System.out.println("解锁成功");
    }
}
```

## EVAL 的进阶版：EVALSHA

EVAL 每次都要发送整个脚本字符串，如果脚本很长，会浪费网络带宽。为此，Redis 提供了一个优化方案：

- 加载脚本：先用 SCRIPT LOAD 将脚本存入 Redis。Redis 会返回一个 40 位的 SHA1 校验码（例如 abc123...）
- 调用脚本：之后只需发送 EVALSHA abc123... 即可。

SCRIPT LOAD 加载的脚本不会自动同步到集群的所有节点。
Redis 的脚本缓存是永久有效的（除非执行了 SCRIPT FLUSH 或重启）

```lua
> SCRIPT LOAD "return redis.call('get','name')"
"52da8c7de39385e305fb1af2a8ffd21534af996f"

> EVALSHA 52da8c7de39385e305fb1af2a8ffd21534af996f 0
"jasper"

SCRIPT LOAD "return redis.call('set',KEYS[1],ARGV[1])"
EVALSHA c686f316aaf1eb01d5a4de1b0b63cd233010e63d 1 name cliff
```

Spring Boot 自动优化：当你使用 redisTemplate.execute(redisScript, ...) 时，Spring 会默认先尝试 EVALSHA。
如果 Redis 提示脚本不存在，它会自动降级使用 EVAL 重新加载。这对开发者是透明的。

## Java 端的预热方案(并发极高，提前预热)

在 Spring 容器启动后（onApplicationEvent），手动调用一下 scriptLoad：

```java
@EventListener(ContextRefreshedEvent.class)
public void preloadScripts() {
    // 这里的 script 是你的分布式锁或限流脚本
    String sha1 = redisTemplate.getConnectionFactory()
                               .getConnection()
                               .scriptLoad(myScript.getScriptAsString().getBytes());
    log.info("Redis 脚本预热完成，SHA1: {}", sha1);
}
```

```java
@Autowired
private StringRedisTemplate redisTemplate;

@EventListener(ContextRefreshedEvent.class)
public void preloadScripts() {
    String script = "return redis.call('get', KEYS[1])"; // 你的脚本
    byte[] scriptBytes = script.getBytes();

    // 1. 获取集群连接
    RedisClusterConnection clusterConnection = redisTemplate.getConnectionFactory().getClusterConnection();
    
    // 2. 获取所有主节点 (Master Nodes)
    Iterable<RedisClusterNode> masters = clusterConnection.clusterGetNodes();
    
    for (RedisClusterNode master : masters) {
        if (master.isMaster()) {
            try {
                // 3. 在每个主节点上加载脚本
                String sha1 = clusterConnection.scriptingCommands()
.scriptLoad(scriptBytes, master);
                System.out.println("节点 " + master.asString() + " 预热成功，SHA1: " + sha1);
            } catch (Exception e) {
                System.err.println("节点 " + master.asString() + " 预热失败: " + e.getMessage());
            }
        }
    }
}
```
