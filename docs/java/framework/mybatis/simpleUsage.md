# simple usage 

> [源代码地址](https://github.com/jaspercliff/javaLearn/blob/master/mybatisLearn/src/main/java/com/jasper/SimpleUsage.java)

MyBatis 是一个优秀的持久层框架，它简化了 JDBC 的操作，并且支持定制化 SQL、存储过程以及高级映射。

### 1. 添加依赖

首先，在你的项目中添加 MyBatis 和数据库驱动的依赖。如果你使用的是 Maven，可以在 `pom.xml` 文件中加入如下依赖：

```xml
  <dependencies>
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.5.19</version>
    </dependency>
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <version>8.3.0</version>
    </dependency>
</dependencies>
```

### 2. 配置 MyBatis

创建一个 `mybatis-config.xml` 文件来配置 MyBatis，包括数据源、事务管理器等信息：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
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

### 3. 创建实体类和 Mapper 接口

假设我们有一个用户表 `users`，可以创建相应的实体类 `User` 和 Mapper 接口 `UserMapper`。

**User.java**
```java
@Data
public class  SystemNotice {
    private int id;
    private String title;
}

```

**SystemNoticeMapper.java**
```java
public interface SystemNoticeMapper {

    SystemNotice selectSystemNoticeById(Integer id);

    @Select("select * from system_notice where id = #{id}")
    SystemNotice selectById(Integer id);
}
```

### 4. 编写 XML 映射文件

在资源目录下创建与 Mapper 接口对应的 XML 映射文件 `SystemNoticeMapper.xml`。
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.jasper.mapper.SystemNoticeMapper">
    <select id="selectSystemNoticeById" resultType="com.jasper.pojo.SystemNotice">
        select * from system_notice where id = #{id}
    </select>
</mapper>
```

### 5. 使用 MyBatis

最后，在代码中使用 SqlSessionFactory 来获取 SqlSession 并执行数据库操作。

```java
package com.jasper;

import com.jasper.mapper.SystemNoticeMapper;
import com.jasper.pojo.SystemNotice;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

public class SimpleUsage {
    public static void main(String[] args) throws IOException {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        try (SqlSession session = sqlSessionFactory.openSession()) {
            SystemNoticeMapper mapper = session.getMapper(SystemNoticeMapper.class);
            SystemNotice systemNotice = mapper.selectSystemNoticeById(1);
            SystemNotice systemNotice1 = mapper.selectById(2);
            System.out.println(systemNotice.getTitle());
            System.out.println(systemNotice1.getTitle());
        }
    }
}
```

## SqlSessionFactory
SqlSessionFactory 一旦被创建就应该在应用的运行期间一直存在，没有任何理由丢弃它或重新创建另一个实例。 使用 SqlSessionFactory 的最佳实践是在应用运行期间不要重复创建多次，多次重建 SqlSessionFactory 被视为一种代码“坏习惯”。因此 SqlSessionFactory 的最佳作用域是应用作用域。 有很多方法可以做到，最简单的就是使用单例模式或者静态单例模式。

## SqlSession
每个线程都应该有它自己的 SqlSession 实例。SqlSession 的实例不是线程安全的，因此是不能被共享的，所以它的最佳的作用域是请求或方法作用域。 绝对不能将 SqlSession 实例的引用放在一个类的静态域，甚至一个类的实例变量也不行。