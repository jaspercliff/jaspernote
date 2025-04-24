# mybatis-spring

> [官网](https://mybatis.org/spring/zh_CN/getting-started.html)

## @MapperScan

在使用 MyBatis 时，Mapper 接口（比如 UserMapper）是我们调用 SQL 的关键。但这些接口默认只是接口，没有注解、没有实现类，Spring 是不会自动识别为 Bean 的。
所以需要用 @MapperScan 告诉 Spring：
🗣️ “把这个包里的接口当成 Mapper，并生成代理类注入到 Spring 容器中。”    省掉手动写@mapper的过程

```java
    /**
     * 和@MapperScan 注解作用一致
     */
    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer() {
        MapperScannerConfigurer scanner = new MapperScannerConfigurer();
        scanner.setBasePackage("com.jasper.mapper.mapper"); // 指定 Mapper 接口包
        return scanner;
    }
```

``` java
// 设置别名包  在这个包下的所有类，注册为别名（type alias），在写 mapper XML 时就可以用简短的类名来引用这些实体类
        factory.setTypeAliasesPackage("com.jasper.pojo");
```

