# debug

开发测试环境 使用monitor:实时监控命令,查看redis正在执行的所有命令 但是不推荐在生产使用

在 Lua 脚本中插入日志，信息会出现在 Redis 服务器的日志文件（redis.conf 中定义的 logfile）中

-- 语法: redis.log(loglevel, message)
redis.log(redis.LOG_WARNING, "Debug: current count is " .. tostring(count))

- redis.LOG_DEBUG：非常详细的信息，通常仅在开发阶段使用。
- redis.LOG_VERBOSE：包含一些不常用但有用的信息。
- redis.LOG_NOTICE：适度的详细信息，适合生产环境监控。
- redis.LOG_WARNING：警示信息，发生异常或潜在问题时使用。
