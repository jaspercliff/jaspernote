# logback

Spring Boot 集成 Logback 是一个常见的配置，因为 Spring Boot 默认就使用 Logback 作为日志框架，
如果你的项目中已经包含了 Spring Boot Starter Logging 或者其他的 Spring Boot Starter 包，那么你实际上已经在使用 Logback 了。

## 1. 添加依赖

确保你的项目中有以下依赖（如果是 Maven 项目）：

```xml

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-logging</artifactId>
    </dependency>
</dependencies>
```

如果是 Gradle 项目，应该包含这样的依赖：

```groovy
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-logging'
}
```

通常情况下，Spring Boot 会自动添加这个依赖，所以你可能不需要显式添加。

### 2. 配置 Logback

你可以通过创建 `logback-spring.xml` 文件来自定义日志配置。将此文件放在 `src/main/resources` 目录下。例如：

配置文件

```yaml
logging:
  config: classpath:logback-spring.xml
```

```xml

<configuration>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logs/app.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>logs/app.%d{yyyy-MM-dd}.log</fileNamePattern>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>%date %level [%thread] %logger{10} [%file:%line] %msg%n</pattern>
        </encoder>
    </appender>

    <root level="INFO">
        <appender-ref ref="STDOUT"/>
        <appender-ref ref="FILE"/>
    </root>
</configuration>
```

注意这里使用了 `logback-spring.xml` 文件名，这告诉 Spring Boot 使用这个文件作为 Logback 的配置。如果你使用的是
`logback.xml`，Spring Boot 将不会应用某些特定的 Spring Boot 配置，比如 Profile 切换等。

### 3. 测试配置

启动你的 Spring Boot 应用程序，然后检查控制台输出和文件输出是否符合预期。如果出现问题，可以检查 Spring Boot
的日志文档或者查看错误消息以调试问题。

## MDC mapped diagnostic context

MDC (Mapped Diagnostic Context) 是 Logback
提供的一个功能，用于记录与当前线程相关的诊断信息。它允许你在日志中添加额外的上下文信息，这些信息通常与每个请求或事务相关联，
这对于分布式系统中的调试和监控非常有用。

### MDC 的用途

MDC 主要用于以下场景：

1. **跟踪请求**：在多线程环境中，可以通过 MDC 在每个请求开始时设置一些标识符（如请求 ID），并在日志中记录这些信息，以便跟踪请求的整个生命周期。
2. **附加信息**：为每个日志条目附加额外的元数据，如用户 ID、交易 ID 等，这有助于后续的日志分析。
3. **调试**：在复杂的系统中，MDC 可以帮助你更容易地定位问题，因为它可以在日志中提供更多的上下文信息。

### 如何使用 MDC

```java
import org.slf4j.MDC;

public void handleRequest(String requestId) {
  MDC.put("requestId", requestId);
  try {
    // 执行业务逻辑
    log.info("Processing request");
  } finally {
    MDC.remove("requestId"); // 清除 MDC 以避免污染其他请求
  }
}
```

在 `logback-spring.xml` 文件中配置如何使用 MDC 字段。例如：

```xml

<configuration>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %X{requestId} - %msg%n</pattern>
        </encoder>
    </appender>

    <root level="INFO">
        <appender-ref ref="STDOUT"/>
    </root>
</configuration>
```

%X{key} 允许指定一个键来获取 MDC 中的值
这里 `%X{requestId}` 表示从 MDC 中获取名为 `requestId` 的值。
`

### 注意事项

- **线程安全性**：MDC 是基于线程的，这意味着每个线程都有自己的 MDC 映射表。因此，在多线程环境中，确保在每个请求结束后清除 MDC
  信息是很重要的。
- **性能考虑**：频繁地向 MDC 写入和读取可能会对性能产生影响，尤其是在高并发场景下。

尽管每个线程有自己的 MDC 映射表，但在某些情况下，如果不适当管理 MDC，还是会出现问题：

- 线程池的重用：
大多数服务器使用线程池来处理请求。
当一个请求完成后，线程并不会立即销毁，而是返回到线程池等待处理下一个请求。
如果你不清除 MDC 中的信息，那么当这个线程被重用时，之前设置的 MDC 信息仍然存在，可能会被错误地记录在新的请求的日志中。
- 异步任务：
在处理请求的过程中，你可能会启动一些异步任务。
如果这些异步任务使用了相同的线程池，那么它们可能会继承主线程的 MDC 信息。
如果你不清除这些信息，那么这些异步任务的日志中可能会包含不属于它们的上下文信息。

## 配置文件

- %thread 表示线程
- %highlight 是一个用于突出显示日志输出中特定部分
- -5level 表示将日志级别（%level）减去 5
- %boldMagenta`{...}` 用于改变日志输出中特定部分的样式，使其以粗体紫色（magenta）显示
- %logger{36} 表示日志记录器的名字，其中 {36} 表示最大宽度为 36 个字符
- %cyan`{...}` 用于改变日志输出中特定部分的颜色，使其以青色（cyan）显示
- %msg%n：这部分表示日志消息和换行符，%msg 表示实际的日志消息文本，而 %n 表示换行符。

```text
%black{控制台} %red`{%d{yyyy-MM-dd HH:mm:ss.SSS}} %green{[ %thread ]} %highlight{%-5level} %boldMagenta{[%logger{36}]} - %cyan{%msg%n}`
```

- %method：输出调用日志记录方法的方法名。
- %line：输出调用日志记录方法所在的行号。
- %file：输出调用日志记录方法所在的文件名。

