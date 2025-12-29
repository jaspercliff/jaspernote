# list

是一个双向列表结构，类似java中的linkedlist

- 有序
- 可以重复
- 插入删除快 查询慢

## 常见命令

- lpush: Prepends(在前面加上) one or more elements to a list.
- lpop:  Returns the first elements in a list after removing it.
Deletes the list if the last element was popped 会删除队列中的值
- rpush: Appends(在后面加上) one or more elements to a list.
- rpop: Returns and removes the last elements of a list.
Deletes the list if the last element was popped.
- lrange: Returns a range of elements from a list.
lrange key start end   lrange 0 1   lrange -1 -2   左边1 2 和右边1 2
lrange 0 -1 全部的数据 不会删除队列中的值
- blpop/brpop: Removes and returns the first element in a list.(只能取一个)
Blocks until an element is available otherwise.
Deletes the list if the last element was popped.

## 应用场景

实现栈  lpush+lpop rpush+rpop 入口出口在一边
实现队列 lpush+rpop rpush+lpop          入口出口不同
实现阻塞队列 lpush+brpop rpush+blpop

- [实现消息队列](../problem/mq.md)
