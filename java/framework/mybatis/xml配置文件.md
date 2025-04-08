# xml 配置文件


 sql 可重用代码
 

## 参数 

传入对象会自动获取它的属性值
要指定的话使用`@param`注解
```java
    void insertUsers(Users users);
    void insertUsersWithParam(@Param("user") Users users);
```
``` xml
    <insert id="insertUsers" parameterType="com.jasper.pojo.Users">
       insert into users values(null,#{name}, #{age}, #{city})
    </insert>

    <insert id="insertUsersWithParam" parameterType="com.jasper.pojo.Users">
        insert into users values(null,#{user.name}, #{user.age}, #{user.city})
    </insert>
```

## 结果映射
