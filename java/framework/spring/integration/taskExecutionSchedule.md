# spring 定时任务

## Spring 定时任务的基本原理

Spring 定时任务是基于 ScheduledExecutorService（Java 自带的线程池定时器）+ @Scheduled 注解实现的。

整个流程：
1.	Spring 启动时扫描到 @Scheduled 注解的方法。
2.	Spring 用默认的定时调度器（单线程）去定时触发这些方法执行。
3.	任务调度器是 ThreadPoolTaskScheduler（实际上底层是线程池）。


## 配置定时任务
1. 在配置类上加 @EnableScheduling

    ```java
    @EnableScheduling
    @SpringBootApplication
    public class Application {
    public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
    }
    }
    ```
2. 编写定时任务方法

```java
@Component
public class MyTask {

    @Scheduled(fixedRate = 5000)  // 每5秒执行一次（固定频率）
    public void fixedRateTask() {
        System.out.println("fixedRate 任务执行：" + System.currentTimeMillis());
    }

    @Scheduled(fixedDelay = 5000) // 上一个任务执行完后等5秒再执行
    public void fixedDelayTask() {
        System.out.println("fixedDelay 任务执行：" + System.currentTimeMillis());
    }

    @Scheduled(initialDelay = 3000, fixedRate = 5000) // 启动延迟3秒后执行，然后每5秒一次
    public void initialDelayTask() {
        System.out.println("initialDelay 任务执行：" + System.currentTimeMillis());
    }

    @Scheduled(cron = "0/10 * * * * ?") // 每10秒执行一次（使用cron表达式）
    public void cronTask() {
        System.out.println("cron 任务执行：" + System.currentTimeMillis());
    }
}
```

## @Scheduled 注解详细参数解释

fixedRate	每次任务开始执行计时，间隔多久再执行	fixedRate = 5000（5秒）
fixedDelay	每次任务执行完毕计时，间隔多久再执行	fixedDelay = 5000
initialDelay	第一次延迟多久执行	initialDelay = 10000（10秒）
cron	按 cron 表达式执行	cron = "0/10 * * * * ?"

注意：
•	fixedRate 和 fixedDelay 单位是毫秒（ms）。
•	cron 是字符串，按时间表达式控制。

## Cron 表达式详细讲解

cron表达式格式：

秒 分 时 日 月 星期 年(可选)

每个字段的取值范围：

字段	取值范围	说明
秒	0-59	必填
分	0-59	必填
时	0-23	必填
日	1-31	必填
月	1-12	必填
星期	0-7（0或7都是周日）	必填
年	可选

常见例子：
•	"0/5 * * * * ?"：每5秒执行一次
•	"0 0/1 * * * ?"：每1分钟执行一次
•	"0 0 12 * * ?"：每天中午12点执行
•	"0 0 0 1 * ?"：每月1日0点执行

*/n（比如 */5 或 0/5）是步进符号，指定一个时间单位每隔n单位执行一次任务。例如：*/5 表示每5分钟执行一次。

## 自定义线程池，让定时任务并发执行

默认情况下，Spring 定时任务是单线程，任务之间互相影响，比如一个任务慢了，其他任务也排队。

为了让定时任务并发运行，可以配置自定义线程池：

1. 配置线程池

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

@Configuration
@EnableScheduling
public class SchedulerConfig {

   @Bean
   public ThreadPoolTaskScheduler taskScheduler() {
      ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
      scheduler.setPoolSize(10); // 线程池大小
      scheduler.setThreadNamePrefix("scheduled-task-"); // 线程名称前缀
      scheduler.setWaitForTasksToCompleteOnShutdown(true); // 关闭时等待任务完成
      scheduler.setAwaitTerminationSeconds(60); // 关闭前最大等待时间
      return scheduler;
   }
}
```
这样，多个 @Scheduled 任务可以同时执行，不会互相影响了。

六、常见问题总结

问题	解决方案
任务方法有参数？	定时任务方法必须是无参的
想要动态开启/关闭任务？	需要配合 SchedulingConfigurer 动态注册调度器
任务时间太长导致错过下一次？	使用线程池或优化任务逻辑