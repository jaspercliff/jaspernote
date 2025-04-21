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
3. 实体类实现 Serializable 接口（缓存对象需要可序列化）

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

