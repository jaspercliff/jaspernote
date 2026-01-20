# 常见通用命令  

- [official website](https://redis.io/docs/latest/commands/)

- keys `<`pattern|查看符合模板的所有key keys `*` keys `a*`  不建议在生产使用 是单线程，影响其他命令执行
- msetAtomically creates or modifies the string values of one or more keys
mset k1 v1 k2 v2
- del [key...]: Deletes one or more keys. del k1
- exists : Determines whether one or more keys exist. exists name
- expire: Sets the expiration time of a key in seconds. expire k1 20
- ttl: Returns the expiration time in seconds of a key. ttl k1     -1 没有有效期 -2 key不存在
