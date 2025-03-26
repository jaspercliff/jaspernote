# Parallel Scavenge  PS 收集器（Parallel Scavenge）

1. PS 收集器（Parallel Scavenge）

特点
•	适用于吞吐量优先的场景，即希望 应用花费更多时间处理业务逻辑，而不是垃圾回收。
•	采用 复制算法（Copying） 进行 年轻代垃圾回收，配合 Parallel Old 进行老年代回收。
•	多线程并行执行，适用于多核 CPU 环境，提高垃圾回收效率。
•	自动调整 GC 停顿时间（通过 -XX:+UseAdaptiveSizePolicy），可根据应用运行情况自动调整新生代、老年代等参数。

适用场景
•	适用于 高吞吐量 场景，例如 批量任务处理、日志处理、计算密集型应用，但不适用于对 低延迟有严格要求 的应用。
•	适合 较大的堆内存（如 4GB 以上），但 容易引发长时间的 STW（Stop-The-World）。
