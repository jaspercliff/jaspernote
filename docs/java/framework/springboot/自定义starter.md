# 自定义一个springboot starter

> [官方文档](https://docs.spring.io/spring-boot/3.5/reference/features/developing-auto-configuration.html)

所有官方启动器都遵循类似的命名模式;spring-boot-starter-*，其中*是特定类型的应用程序。此命名结构旨在在您需要查找启动器时提供帮助。许多 IDE 中的 Maven 集成允许您按名称搜索依赖项。
如创建自己的 Starter 部分所述，第三方 Starter 不应以 spring-boot 开头，因为它是为官方 Spring Boot 工件保留的。
相反，第三方启动器通常以项目名称开头。例如，一个名为 thirdpartyproject 的第三方启动器项目通常被命名为 thirdpartyproject-spring-boot-starter。


springboot 3.0 版本中。使用`META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`代替spring.factories

## condition annotation

### class condition
- `@ConditionalOnClass`: 该注解用于判断某个类是否在类路径下，如果在，则条件成立。
- `@ConditionalOnMissingClass`: 该注解用于判断某个类是否不在类路径下，如果不在，则条件成立。


### bean condition
- `@ConditionalOnBean`: 该注解用于判断某个 Bean 是否在 Spring 容器中，如果在，则条件成立。
- `@ConditionalOnMissingBean`: 该注解用于判断某个 Bean 是否不在 Spring 容器中，如果不在，则条件成立。

### property condition
- `@ConditionalOnProperty`: 该注解用于判断某个属性是否在配置文件中，如果在，则条件成立。
- `@ConditionalOnMissingProperty`: 该注解用于判断某个属性是否不在配置文件中，如果不在，则条件成立。

### resource condition
- `@ConditionalOnResource`: 该注解用于判断某个资源是否在类路径下，如果在，则条件成立。
- `@ConditionalOnMissingResource`: 该注解用于判断某个资源是否不在类路径下，如果不在，则条件成立。

### web condition
- `@ConditionalOnWebApplication`: 该注解用于判断当前应用是否是一个 Web 应用，如果是，则条件成立。
- `@ConditionalOnNotWebApplication`: 该注解用于判断当前应用是否不是一个 Web 应用，如果不是，则条件成立。

### spel condition
- `@ConditionalOnExpression`: 该注解用于判断某个 SpEL 表达式是否成立，如果成立，则条件成立。

## 创建自己的starter

父工程 (Parent)：统一管理版本。
autoconfigure 模块：放置所有自动配置逻辑、接口和实现。
starter 模块 (多个)：纯依赖模块（例如 starter-minio 和 starter-rustfs），作为用户引入的入口。

```text 
├──  storage-spring-boot-autoconfigure
│   │   ├──  resources
│   │   │   └──  main
│   │   │       └──  META-INF
│   │   │           └──  spring
│   │   │               └──  org.springframework.boot.autoconfigure.AutoConfiguration.imports
│   ├──  build.gradle.kts
│   └── 󰣞 src
│       ├──  main
│       │   ├──  java
│       │   │   └──  com
│       │   │       └──  jasper
│       │   │           ├──  config
│       │   │           │   ├──  StorageAutoConfiguration.java
│       │   │           │   └──  StorageProperties.java
│       │   │           ├──  core
│       │   │           │   └──  StorageService.java
│       │   │           └──  service
│       │   │               ├──  MinioStorage.java
│       │   │               └──  RustfsStorage.java
│       │   └──  resources
│       │       └──  META-INF
│       │           └──  spring
│       │               └──  org.springframework.boot.autoconfigure.AutoConfiguration.imports
└──  storage-spring-boot-starter-minio
    └──  build.gradle.kts
```

```java
@Configuration
@EnableConfigurationProperties(StorageProperties.class)
public class StorageAutoConfiguration {

    @Bean
    @ConditionalOnProperty(name = "storage.type", havingValue = "minio")
    public StorageService minioStorageService(StorageProperties properties) {
        return new MinioStorage();
    }

    @Bean
    @ConditionalOnProperty(name = "storage.type", havingValue = "rustfs")
    public StorageService rustfsStorageService(StorageProperties properties) {
        return new RustfsStorage();
    }
}
```

扫描阶段：启动时，Spring Boot 会扫描类路径下所有 JAR 包中的 META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports 文件。
```text 
com.jasper.config.StorageAutoConfiguration
```
加载阶段：它把文件里的类名读出来，通过反射加载这些类。
判断阶段：加载类后，它会解析类上的注解（如 @ConditionalOnClass）。如果条件不满足，这个类里的所有 Bean 定义都会被跳过。



## annotations

`@AutoConfigureBefore` 在另外一个配置类之前生效
`@AutoConfigureAfter` 在另外一个配置类之后生效
`@AutoConfigureOrder` 该注解用于指定自动配置的顺序，值越小，优先级越高。
`@AutoConfigureBefore` 和 `@AutoConfigureAfter` 注解可以用来指定自动配置的顺序。

