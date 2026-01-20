# serialization

spring-data-redis 不配置序列化默认使用的是[jdk自带的序列化](https://jaspercliff.github.io/jaspernote/java/basic/foundation/IO/BIO.html#%E5%AE%9E%E7%8E%B0%E5%BA%8F%E5%88%97%E5%8C%96)
其产生的 Key/Value 不可读（乱码）
、占用空间大且兼容性差(Java 对象的类型元数据)

## 什么是序列化？

**序列化**是将对象转换成字节流的过程，**反序列化**则是相反的过程。

由于 **Redis** 是一个键值存储系统，它存储的所有数据（包括键 Key 和值 Value）最终都是**字节数组**（byte[]）。
因此，当您使用 `RedisTemplate` 将 Java 对象存入 Redis 时，就需要一个序列化器（Serializer）来完成这个转换工作。

## Spring Data Redis 的核心序列化接口

在 Spring Data Redis 中，核心的序列化接口是 `RedisSerializer<T>`，它定义了两个主要方法：

* `byte[] serialize(T t)`: 将对象 `t` 序列化为字节数组。
* `T deserialize(byte[] bytes)`: 将字节数组反序列化为对象 `T`。

`RedisTemplate` 默认使用 `JdkSerializationRedisSerializer` 进行序列化。

## ✨ 常见的序列化器

* StringRedisSerializer: 序列化为字符串
* GenericJackson2JsonRedisSerializer: 序列化为json

> **提示：** 实际项目中，**Key** 通常配置为 `StringRedisSerializer` 以保证可读性，
而 **Value** 则常选择 `GenericJackson2JsonRedisSerializer`
或 `Jackson2JsonRedisSerializer` 来存储复杂对象。

## 自定义序列化方式

```java
@Configuration
public class RedisConfiguration {

    @Bean
    RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory
        connectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        GenericJackson2JsonRedisSerializer jsonSerializer = new GenericJackson2JsonRedisSerializer();
        template.setConnectionFactory(connectionFactory);

        template.setKeySerializer(RedisSerializer.string());
        template.setValueSerializer(jsonSerializer);

        template.setHashKeySerializer(RedisSerializer.string());
        template.setHashValueSerializer(jsonSerializer);
        return template;
    }
}
```

## StringRedisTemplate

用来简化和优化在 Spring 应用程序中操作 Redis 时的字符串类型数据,
使用GenericJackson2JsonRedisSerializer默认存储的json会存储类的类型，额外占用空间:

```
{
  "@class": "com.jasper.springdataredisdemo.pojo.User",
  "id": "1",
  "name": "jasper"
}
```

可以使用stringRedisTemplate 手动序列化对象，然后存入redis

```java
    void testObject() throws JsonProcessingException {
        User user = new User("2", "cliff");
        String json = mapper.writeValueAsString(user);
        stringRedisTemplate.opsForValue().set("user:2", json);
        String jsonUser = stringRedisTemplate.opsForValue().get("user:2");
        User resultUser = mapper.readValue(jsonUser, User.class);
        System.out.println("resultUser = " + resultUser);
    }
```
