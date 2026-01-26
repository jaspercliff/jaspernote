# queues

[jdk文档](https://guava.dev/releases/snapshot/api/docs/com/google/common/collect/Queues.html#drain(java.util.concurrent.BlockingQueue,java.util.Collection,int,long,java.util.concurrent.TimeUnit))
Queues.drain 是 Guava 提供的一个用于批量从队列中提取元素的工具方法，
能简化从 BlockingQueue 中批量拉取数据的操作
比blockingQueue自带的drain更多功能


- 尝试从 BlockingQueue 中取出最多 numElements 个元素，存入 buffer 中。
- 列暂时为空，会阻塞等待，但最多等待指定时间 timeout。
- 取了指定数量的元素，或时间到了，就返回当前取出的元素数量。

```java
package com.jasper.juc.collections.queue;

import com.google.common.collect.Queues;

import java.util.ArrayList;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.TimeUnit;

public class GuavaQueuesDemo {
    public static void main(String[] args) throws InterruptedException {
        final ArrayBlockingQueue<String> data = new ArrayBlockingQueue<>(6);

        for (int i = 0; i < 5; i++) {
            data.offer("data-" + i);
        }

        final ArrayList<String> strings = new ArrayList<>();
        Queues.drain(data,strings,4,3, TimeUnit.SECONDS);
        System.out.println(strings);
    }
}

```

## ✅ `poll()` + 死循环 + 空转的问题

假设你想从 `BlockingQueue` 中**每次最多取出 10 个元素**处理，写了这样的代码：

``` java
while (buffer.size() < 10) {
    E e = queue.poll();
    if (e != null) {
        buffer.add(e);
    }
    // 没有等待逻辑，队列为空时 e 为 null，继续空转
}
```

### ❗ 问题出现了：

- 当队列中暂时没有元素时，`poll()` 会立即返回 `null`。
- `while` 还在等满 10 个元素，于是它继续循环调用 `poll()`。
- 这样会产生**大量无效循环**，CPU 一直在忙着执行循环判断、空值检查，没有实际工作。

这种情况被称为 **空转（busy waiting / spin loop）**，会造成 CPU 资源浪费。

---

## ✅ 那我用 `take()` 就不会空转了吧？

`take()` 是阻塞式的：

``` java
while (buffer.size() < 10) {
    E e = queue.take(); // 阻塞直到有数据
    buffer.add(e);
}
```

这确实可以避免空转，但有新的问题：

### ❗ 主要问题：

- 如果队列中**永远也不会有 10 个元素**，这个方法会**卡住不动**，永远等待。
- 如果你希望“等一会儿，如果凑不齐就先处理已有的”，那么 `take()` 就不合适了。

## ✅ `Queues.drain()` 的优点就是在这里体现出来的：

``` java
Queues.drain(queue, buffer, 10, 2, TimeUnit.SECONDS);
```

- 如果数据充足，立刻取完 10 个。
- 如果数据不足，它会阻塞地等待一段时间（最多 2 秒），直到拿够或超时。
- 超时后就返回已经取到的部分，不会卡死，也不会空转。

---

### ✅ 小结对比

| 方法               | 是否阻塞 | 是否空转 | 能否控制等待时间 | 适合场景         |
|------------------|------|------|----------|--------------|
| `poll()`         | 否    | 是    | 否        | 少量快速尝试取数据    |
| `take()`         | 是    | 否    | 否        | 明确要拿到数据才往下执行 |
| `Queues.drain()` | 是    | 否    | 是        | 批量消费，超时就走人   |

---

如果你有批量处理的需求，并希望控制**最大等待时间**而不是一直等或一直空转，`Queues.drain()` 是理想选择。