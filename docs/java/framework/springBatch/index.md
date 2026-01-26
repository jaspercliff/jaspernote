# spring batch

Spring Batch 是一个专门处理批处理任务（batch jobs）的框架，属于 Spring 生态。
它不是调度框架（即它不负责“什么时候执行”这个问题），通常会和调度系统（如 cron、Quartz）配合使用。

## 常见场景

- 每天/每周处理大量数据
- 从一个系统迁移数据到另一个系统、定时导入/导出文件
-数据清洗等。


## 常见功能：
事务管理、读写跳过（skip）、重试（retry）、作业重启（restart）、作业状态追踪、分块（chunk）处理、分区（partition）并发等。
