# cache

MyBatis 中的缓存机制分为 一级缓存 和 二级缓存，是提升系统性能的重要手段。下面我会用简洁清晰的方式帮你梳理它们的区别、原理和使用方法。

## 一级缓存（本地缓存）

✅ 特点：
• 默认开启，不需要任何配置
• 基于 SqlSession 级别，同一个 SqlSession 内的查询可以命中缓存
• 缓存范围：同一个 SqlSession、相同的 SQL 和参数

📦 缓存存储结构：

使用的是 HashMap，封装在 BaseExecutor 的 localCache 中

📌 何时失效？

1. SqlSession 不同（不同缓存）
2. 执行了 update / insert / delete（会清空缓存）
3. flushCache="true"（默认查询为 false，更新为 true）
4. 手动调用 sqlSession.clearCache()

🧪 示例：

SqlSession session = sqlSessionFactory.openSession();
User u1 = session.selectOne("getUser", 1); // 查库
User u2 = session.selectOne("getUser", 1); // 命中缓存

## 二级缓存（全局缓存）

✅ 特点：
• 需要手动开启
• 作用域是 Mapper 映射级别（同一个 mapper.xml 的 SQL 可以共享缓存）
• 缓存存储在 PerpetualCache 中，可自定义实现
• 支持与第三方缓存集成（如 ehcache、redis）

1. 在 mybatis-config.xml 开启全局二级缓存：

    ```xml
    <settings>
        <setting name="cacheEnabled" value="true"/>
    </settings>
    ```

2. 在 mapper.xml 中配置二级缓存：

    ```xml
    <cache/>
    ```
   也可以指定缓存实现：
    ```xml
    <cache type="org.mybatis.caches.ehcache.EhcacheCache"/>
    ```
3. *实体类实现 Serializable 接口（缓存对象需要可序列化）*

⚠️ 注意：
• 同样的数据更新后，二级缓存不会自动监听数据库数据变化，只是缓存之前的结果
• 更新操作后会清空对应 Mapper 的缓存

类名 作用
Cache 接口 缓存顶层接口
PerpetualCache 默认实现，使用 HashMap
LruCache 支持最近最少使用（LRU）
TransactionalCacheManager 管理事务中的缓存提交与回滚
CachingExecutor 包装真实的 Executor，负责处理缓存逻辑

## 是否推荐使用二级缓存？

不推荐用于频繁更新的数据表！ 否则会出现缓存脏读问题。

可以用于：
• 数据变动不频繁
• 查询量大、写入少的业务，如地区、商品分类、配置类信息

⸻

🧪 其他缓存扩展
• MyBatis 官方提供了对 EhCache、Redis 的插件支持
• 也可以自定义实现 Cache 接口，扩展自己的缓存逻辑

## 实际案例测试
> [代码地址](https://github.com/jaspercliff/springbootIntegration/blob/b90ec1707ceb1bc82f822ddf27bf437808331f0c/persistenceIntegration/mybatisLearn/src/main/java/com/jasper/cache/CacheDemo.java#L21)
1. 导入logback依赖
   ```xml
           <dependency>
               <groupId>ch.qos.logback</groupId>
               <artifactId>logback-classic</artifactId>
               <version>1.4.14</version>
           </dependency>
           <dependency>
               <groupId>ch.qos.logback</groupId>
               <artifactId>logback-core</artifactId>
               <version>1.4.14</version>
           </dependency>

           <dependency>
               <groupId>org.slf4j</groupId>
               <artifactId>slf4j-api</artifactId>
               <version>2.0.9</version>
           </dependency>
   ```
   ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   <configuration>
       <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
           <encoder>
               <pattern>%d{HH:mm:ss.SSS} %-5level %logger{36} - %msg%n</pattern>
           </encoder>
       </appender>

       <!-- 打印 MyBatis 执行 SQL 的日志 -->
       <logger name="org.apache.ibatis" level="DEBUG"/>
       <logger name="java.sql" level="DEBUG"/>
       <logger name="com.jasper.mapper" level="DEBUG"/>
       <!--展示缓存命中信息-->
       <logger name="org.apache.ibatis.cache" level="DEBUG"/>
       <root level="INFO">
           <appender-ref ref="STDOUT"/>
       </root>

   </configuration>
   ```
2. 开启二级缓存
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.jasper.mapper.UserMapper">

   <!-- 开启二级缓存 -->

           <cache/>

   <select id="getUserById" resultType="com.jasper.pojo.User">
      SELECT * FROM user WHERE id = #{id}
   </select>

</mapper>
```

```java
public class CacheDemo {
    public static void main(String[] args) throws IOException {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(inputStream);

        // 第一阶段：测试一级缓存
        System.out.println("===== 一级缓存测试 =====");
        SqlSession session1 = factory.openSession();
        UserMapper mapper1 = session1.getMapper(UserMapper.class);

        User u1 = mapper1.getUserById(1); // 第一次查询（查数据库）
        User u2 = mapper1.getUserById(1); // 第二次查询（命中一级缓存）

        session1.close(); // 一级缓存随 SqlSession 关闭而失效
    }
}
public class Cache2Demo {
   public static void main(String[] args) throws IOException {
      String resource = "mybatis-config.xml";
      InputStream inputStream = Resources.getResourceAsStream(resource);
      SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(inputStream);
      // 第二阶段：测试二级缓存
      System.out.println("\n===== 二级缓存测试 =====");
      SqlSession session2 = factory.openSession();
      UserMapper mapper2 = session2.getMapper(UserMapper.class);
      User u3 = mapper2.getUserById(1); // 第一次查询（查数据库 or 命中二级缓存）
      session2.close();

      SqlSession session3 = factory.openSession();
      UserMapper mapper3 = session3.getMapper(UserMapper.class);
      User u4 = mapper3.getUserById(1); // 第二次查询（应命中二级缓存）
      session3.close();
   }
}
```

## 自定义一个redis 二级缓存  
