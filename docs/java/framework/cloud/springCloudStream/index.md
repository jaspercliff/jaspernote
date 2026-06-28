# Spring cloud stream


## Spring Cloud Stream 简介

Spring Cloud Stream 是一个用于构建事件驱动微服务的框架，它通过消息中间件（如 Kafka、RabbitMQ、Pulsar）进行数据传输。
Spring Cloud Stream 提供了一层消息绑定抽象，简化了消息的生产和消费，使开发者无需关注底层的具体消息系统。

## 核心特点
1.	Binder 抽象层：解耦业务逻辑与具体的消息系统，支持Kafka、RabbitMQ、Pulsar 等多种中间件。
2.	声明式事件绑定：使用**@Input、@Output、@StreamListener** 等注解绑定消息通道，简化开发。
3.	自动配置与集成：与 Spring Boot 深度集成，减少手动配置，提供自动装配能力。
4.	消息编程模型：
•	生产者（Producer）：发布消息到消息通道（如 Kafka Topic）
•	消费者（Consumer）：监听并消费来自消息通道的消息
5.	可扩展性：支持消息分区、事务消息、持久化消息等高级特性，可用于大规模分布式系统。

## Spring Cloud Stream 架构

Spring Cloud Stream 主要由以下几个核心组件组成：
1.	Binder（绑定器）
负责与底层消息中间件（Kafka、RabbitMQ 等）进行交互。Spring Cloud Stream 提供了多种 Binder 实现，如：
•	spring-cloud-stream-binder-kafka
•	spring-cloud-stream-binder-rabbit
2.	Binding（绑定）
绑定是应用程序与消息通道的连接方式，Spring Cloud Stream 通过 @EnableBinding 或 @Bean 方式定义通道。
3.	Message（消息）
采用 Spring 消息编程模型（MessageChannel、Message），支持消息转换、消息路由等功能。

## Spring Cloud Stream RocketMQ 示例

Spring Cloud Stream 可以与 Apache RocketMQ 集成，实现生产者和消费者的消息通信。下面是基于 RocketMQ 的 Spring Cloud Stream 示例。


1. 添加依赖

在 pom.xml 中引入 Spring Cloud Stream RocketMQ Binder 依赖：
```
<dependency>
    <groupId>org.apache.rocketmq</groupId>
    <artifactId>rocketmq-spring-boot-starter</artifactId>
    <version>2.2.1</version>
</dependency>

<dependency>
<groupId>org.springframework.cloud</groupId>
<artifactId>spring-cloud-starter-stream-rocketmq</artifactId>
</dependency>
```

## 配置 application.yml

```yaml
spring:
  cloud:
    stream:
      rocketmq:
        binder:
          name-server: localhost:9876  # RocketMQ NameServer 地址
      bindings:
        myInput:
          destination: my-topic
          group: my-consumer-group
          content-type: application/json
        myOutput:
          destination: my-topic
          content-type: application/json
```
说明：
•	rocketmq.binder.name-server：配置 RocketMQ NameServer 地址。
•	bindings.myInput.destination：定义 RocketMQ Topic my-topic 作为输入通道。
•	bindings.myInput.group：消费组名称 my-consumer-group。
•	bindings.myOutput.destination：定义 RocketMQ Topic my-topic 作为输出通道。

## 生产者（发送消息）

```java
import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.web.bind.annotation.*;

@RestController
public class RocketMQProducer {

    private final MessageChannel output;

    public RocketMQProducer(@Output("myOutput") MessageChannel output) {
        this.output = output;
    }

    @GetMapping("/send/{message}")
    public String sendMessage(@PathVariable String message) {
        Message<String> msg = MessageBuilder.withPayload(message).build();
        output.send(msg);
        return "RocketMQ 消息已发送：" + message;
    }
}
```

说明：
•	@Output("myOutput")：绑定 RocketMQ 生产者 发送到 my-topic。
•	MessageChannel output：Spring Cloud Stream 绑定的消息通道。
•	output.send(MessageBuilder.withPayload(message).build())：构建并发送消息。

## 消费者（接收消息）

```java

import org.springframework.cloud.stream.annotation.Input;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.messaging.SubscribableChannel;
import org.springframework.stereotype.Component;

@Component
public class RocketMQConsumer {

    @StreamListener("myInput")
    public void handleMessage(String message) {
        System.out.println("收到 RocketMQ 消息：" + message);
    }
}
```
说明：
        •	@StreamListener("myInput")：监听 my-topic，自动消费消息。
        •	handleMessage(String message)：打印接收到的消息内容。
```
Spring Cloud Stream + RocketMQ 结合使用时，开发者无需关心 RocketMQ 的底层 API，只需使用 Spring Cloud Stream 的绑定机制，即可轻松实现消息的生产和消费。

适用于：
✅ 分布式微服务架构
✅ 事件驱动系统
✅ 异步消息处理
