# cache

MyBatis 中的缓存机制分为 一级缓存 和 二级缓存，是提升系统性能的重要手段。下面我会用简洁清晰的方式帮你梳理它们的区别、原理和使用方法。

## 一级缓存（本地缓存）

✅ 特点：
• 默认开启，不需要任何配置
• 基于 SqlSession 级别，同一个 SqlSession 内的查询可以命中缓存
• 缓存范围：同一个 SqlSession、相同的 SQL 和参数

📦 缓存存储结构：

使用的是 HashMap，封装在 BaseExecutor 的 localCache 中



🧪 示例：

SqlSession session = sqlSessionFactory.openSession();
User u1 = session.selectOne("getUser", 1); // 查库
User u2 = session.selectOne("getUser", 1); // 命中缓存

MyBatis 的一级缓存是默认开启的，它的作用范围是 **SqlSession 级别**，也就是说在同一个 SqlSession 中，相同的查询会缓存第一次的结果，后续相同参数的查询将直接从缓存中取出，而不会再次访问数据库。

---

## ✅ 一级缓存的生效条件

想要一级缓存生效，需要满足以下 **全部条件**：

1. **相同的 SqlSession 对象**
一级缓存是绑定在一个 SqlSession 上的，如果 SqlSession 不一样，缓存自然不会共享。

2. **执行的是相同的 SQL 语句，参数也一致**
即 SQL 语句和传入参数都相同，才会命中缓存。

3. **查询期间未执行任何更新操作**
只要执行了 `INSERT`、`UPDATE`、`DELETE` 语句（即便不是同一张表），MyBatis 会出于安全考虑清空当前 SqlSession 的一级缓存。

4. **未手动清除缓存**
如果手动调用了 `sqlSession.clearCache()`，会将当前缓存清空。

5. **Mapper 中未设置 useCache = false**
在 `@Select` 注解或 XML 映射语句中，如果设置了 `useCache = false`，则不会启用缓存（不过这个设置主要针对二级缓存，但也会影响一级缓存行为）。

| 条件              | 说明                            |
|-----------------|-------------------------------|
| 相同 SqlSession   | 不同的 SqlSession 不共享缓存          |
| 相同 SQL 与参数      | 否则缓存无法命中                      |
| 没有执行更新操作        | 更新操作会清空缓存                     |
| 没有手动清除缓存        | `clearCache()` 会清空缓存          |
| flushCache=true | 不要禁用缓存或改为 flushCache=true 的查询 |

---
### 失效场景
📌 何时失效？
1. SqlSession 不同（不同缓存）
2. 执行了 update / insert / delete（会清空缓存）
3. flushCache="true"（默认查询为 false，更新为 true）
4. 手动调用 sqlSession.clearCache()
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

## 二级缓存生效条件
MyBatis 的 **二级缓存（Second

MyBatis 的 **二级缓存** 是作用于 **Mapper 级别** 的缓存，多个 SqlSession 之间可以共享，因此比一级缓存更适合用来提升跨请求、跨事务的查询性能。

---

## ✅ 二级缓存的生效条件（必须全部满足）

| 条件                          | 说明                                                                   |
|-----------------------------|----------------------------------------------------------------------|
| ① 全局开启缓存                    | `mybatis-config.xml` 中 `<setting name="cacheEnabled" value="true"/>` |
| ② Mapper 映射文件中配置 `<cache/>` | 或注解 `@CacheNamespace`，否则该 Mapper 不参与二级缓存                             |
| ③ 查询语句未禁用缓存                 | 即未设置 `useCache = false`（默认为 true）                                    |
| ④ SqlSession 被正确关闭          | 二级缓存是在 `SqlSession.close()` 或 `commit()` 后才写入缓存                      |
| ⑤ 查询参数相同                    | 不同参数不命中缓存（由 CacheKey 判断）                                             |
| ⑥ 查询期间未执行更新操作               | 如果执行了 `INSERT/UPDATE/DELETE`，则对应 Mapper 的缓存会被清除                      |
| ⑦ 返回结果是可序列化的                | 缓存的对象必须支持序列化（Serializable）                                           |
| ⑧ 自定义 Cache 实现时不出错          | 如使用 Redis 等外部缓存时，缓存类要实现 `org.apache.ibatis.cache.Cache` 接口，逻辑正确才会生效  |

---

### 🚫 以下操作会使二级缓存不生效：
- 没有调用 `sqlSession.close()` 或 `sqlSession.commit()`（缓存写入时机）
- 映射文件没有 `<cache/>` 配置
- 查询语句加了 `useCache=false`
- 执行了更新操作（清空 Mapper 对应缓存）


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
