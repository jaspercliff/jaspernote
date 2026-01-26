# mybatis plugin

pageHelper插件
```xml
<!-- https://mvnrepository.com/artifact/com.github.pagehelper/pagehelper -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>6.1.0</version>
</dependency>
```

## 注解作用

@Intercepts：用来声明当前插件要拦截哪些方法。它接受一个或多个 @Signature 注解。
@Signature：用来具体描述要拦截的方法。你需要指定以下三个参数：
type：接口类型，这里是 Executor.class，表示要拦截实现了这个接口的对象的方法。
method：方法名，这里是 "update"，即我们想要拦截的方法名称。
args：方法参数类型数组，这里是 {MappedStatement.class, Object.class}，表示被拦截方法的参数列表。

## 示例

```java
package com.jasper.plugins;

import org.apache.ibatis.cache.CacheKey;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;

import java.util.Properties;

@Intercepts({
        @Signature(
                type = Executor.class,
                method = "query",
                args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class}
        )
})
public class ExamplePlugin implements Interceptor {
  private Properties properties = new Properties();

  @Override
  public Object intercept(Invocation invocation) throws Throwable {
    System.out.println("Before query");
    Object returnObject = invocation.proceed();
    System.out.println("After query");
    return returnObject;
  }

  @Override
  public void setProperties(Properties properties) {
    this.properties = properties;
  }
}
```
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <plugins>
        <plugin interceptor="com.jasper.plugins.ExamplePlugin">
            <property name="someProperty" value="100"/>
        </plugin>
    </plugins>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/learn?serverTimezone=UTC"/>
                <property name="username" value="root"/>
                <property name="password" value="1q2w3e4r"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="com/jasper/mapper/SystemNoticeMapper.xml"/>
    </mappers>

</configuration>

```


## 拦截器的使用
MyBatis插件的 `@Signature` 注解可以拦截以下四种类型的接口方法：

1. Executor 接口的方法：
``` java
@Intercepts({
    @Signature(
        type = Executor.class,
        method = "query",
        args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class}
    ),
    @Signature(
        type = Executor.class,
        method = "update",
        args = {MappedStatement.class, Object.class}
    )
})
```

2. ParameterHandler 接口的方法：
``` java
@Intercepts({
    @Signature(
        type = ParameterHandler.class,
        method = "setParameters",
        args = {PreparedStatement.class}
    )
})
```

3. ResultSetHandler 接口的方法：
``` java
@Intercepts({
    @Signature(
        type = ResultSetHandler.class,
        method = "handleResultSets",
        args = {Statement.class}
    )
})
```

4. StatementHandler 接口的方法：
``` java
@Intercepts({
    @Signature(
        type = StatementHandler.class,
        method = "prepare",
        args = {Connection.class, Integer.class}
    ),
    @Signature(
        type = StatementHandler.class,
        method = "parameterize",
        args = {Statement.class}
    )
})
```

主要特点：
1. 可以同时拦截多个方法
2. 必须严格匹配方法名和参数类型
3. 参数类型顺序必须完全一致


## 核心接口
在 MyBatis 中，有四个核心接口可以被拦截器（`Interceptor`）所拦截，分别是 `Executor`、`ParameterHandler`、`ResultSetHandler` 和 `StatementHandler`。每个接口负责不同的职责，并且允许开发者通过自定义插件来增强或修改其默认行为。下面分别介绍这四个接口的作用和它们通常如何被使用。

### 1. Executor 接口

**作用**：`Executor` 是 MyBatis 执行 SQL 的最顶层接口，它主要负责执行 SQL 语句、管理事务等操作。

- **方法示例**：
    - `query(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler)`：用于执行查询操作。
    - `update(MappedStatement ms, Object parameter)`：用于执行插入、更新或删除操作。

**应用场景**：通过拦截 `Executor`，可以实现如性能监控、SQL 执行前后的日志记录、动态数据源切换等功能。

### 2. ParameterHandler 接口

**作用**：`ParameterHandler` 负责处理 SQL 参数的设置，即将 Java 方法参数转换为数据库能够理解的形式，并将其绑定到 SQL 语句中。

- **方法示例**：
    - `setParameters(PreparedStatement ps)`：将参数设置到 `PreparedStatement` 中。

**应用场景**：通过拦截 `ParameterHandler`，可以在参数设置之前进行加密、格式化或其他预处理工作。

### 3. ResultSetHandler 接口

**作用**：`ResultSetHandler` 负责处理从数据库返回的结果集，将其转换为期望的对象形式（例如 Java Bean 或 Map）。

- **方法示例**：
    - `handleResultSets(Statement stmt)`：处理结果集，将 `ResultSet` 转换为合适的对象类型。

**应用场景**：通过拦截 `ResultSetHandler`，可以对查询结果进行额外的处理，比如对敏感信息进行脱敏处理或者结果集的转换逻辑。

### 4. StatementHandler 接口

**作用**：`StatementHandler` 负责 JDBC 层面的操作，包括创建 `Statement` 对象（如 `PreparedStatement`）、设置参数、执行 SQL 语句以及关闭 `Statement` 等。

- **方法示例**：
    - `prepare(Connection connection, Integer transactionTimeout)`：创建一个 `PreparedStatement`。
    - `parameterize(Statement statement)`：设置 `PreparedStatement` 的参数。

**应用场景**：通过拦截 `StatementHandler`，可以实现在 SQL 执行前后添加额外的逻辑，比如 SQL 性能分析、动态表名替换、SQL 注入防护等。

### 总结

- **Executor** 主要关注于 SQL 的执行和事务管理。
- **ParameterHandler** 关注于 SQL 参数的设置。
- **ResultSetHandler** 负责处理从数据库获取的数据并将其转换为目标对象。
- **StatementHandler** 则涉及到与数据库交互的具体细节，如创建和配置 `Statement` 对象。

这些接口提供了丰富的扩展点，使得 MyBatis 可以根据具体需求灵活定制，无论是为了满足特定业务逻辑还是提高系统性能。通过编写适当的拦截器，你可以轻松地增强 MyBatis 的功能，同时保持代码的简洁性和可维护性。