# @import 

`@Import` 是一个**非常核心且强大的注解**，它的主要作用是**向 Spring 的 IoC 容器中导入组件**。

它通常用框架级别的模块化装配，是 Spring 中各种 `@Enable*` 注解（如 `@EnableScheduling`、`@EnableCaching`）以及 **Spring Boot 自动配置**的底层基石。

`@Import` 注解接收一个 `Class<?>[]` 类型的参数，根据你传入的类的类型不同，它有 **4 种截然不同的用法**：


### 1. 导入普通类（直接注册为 Bean）
如果你传入的是一个**普通的 Java 类**（没有加 `@Component`、`@Service` 等注解），Spring 会直接将这个类注册为容器中的 Bean。
*   **适用场景**：引入第三方库中的类，且无法修改其源码添加 `@Component` 注解时。
```java
@Configuration
@Import(MyThirdPartyService.class) // MyThirdPartyService 会被自动注册为 Bean
public class AppConfig {
}
```

### 2. 导入配置类（解析其中的 @Bean）
如果你传入的是一个带有 `@Configuration` 注解的**配置类**，Spring 会解析该配置类，并将其内部通过 `@Bean` 定义的所有 Bean 注册到容器中。
*   **适用场景**：模块化配置，将不同功能的配置类拆分，然后按需导入。
```java
@Configuration
@Import(DatabaseConfig.class) // 导入数据库配置类，里面的 @Bean 会被加载
public class AppConfig {
}
```

### 3. 导入 `ImportSelector` 的实现类（动态批量导入）
这是**最常用的高级用法**。如果你传入的类实现了 `ImportSelector` 接口，Spring 会调用其 `selectImports()` 方法，该方法返回一个字符串数组（类的全限定名），Spring 会将这些类全部导入到容器中。
*   **适用场景**：需要根据某些条件**动态、批量**地导入多个配置类。Spring Boot 的自动装配底层就是用的这个机制。
```java
public class MyImportSelector implements ImportSelector {
    @Override
    public String[] selectImports(AnnotationMetadata importingClassMetadata) {
        return new String[] {ServiceA.class.getName(), ServiceB.class.getName()};
    }
}

@Configuration
@Import(MyImportSelector.class)
public class AppConfig {
}
```

### 4. 导入 `ImportBeanDefinitionRegistrar` 的实现类（动态注册 BeanDefinition）
这是**最灵活、最底层**的用法。如果你传入的类实现了 `ImportBeanDefinitionRegistrar` 接口，Spring 会在解析配置类时回调 `registerBeanDefinitions()` 方法。你可以在这个方法中**通过代码编程的方式，动态地构建和注册 `BeanDefinition`**。
*   **适用场景**：需要完全控制 Bean 的注册过程，比如动态生成 Bean 的名称、设置作用域、或者根据某些规则批量生成代理对象（如 MyBatis 的 `@MapperScan` 底层原理）。
```java
public class MyBeanRegistrar implements ImportBeanDefinitionRegistrar {
    @Override
    public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {
        // 动态创建一个 BeanDefinition
        RootBeanDefinition beanDefinition = new RootBeanDefinition(MyDynamicService.class);
        // 注册到容器中，指定 bean 的名称
        registry.registerBeanDefinition("dynamicService", beanDefinition);
    }
}

@Configuration
@Import(MyBeanRegistrar.class)
public class AppConfig {
}
```

### 🔍 底层执行原理
`@Import` 的处理是由 Spring 内部的 `ConfigurationClassPostProcessor`（一个 `BeanFactoryPostProcessor`）完成的。
当 Spring 扫描到 `@Configuration` 类时，会解析其上的 `@Import` 注解：
1. 如果是普通类/配置类，直接解析并注册。
2. 如果是 `ImportSelector`，调用其方法获取类名，然后递归解析这些类。
3. 如果是 `ImportBeanDefinitionRegistrar`，将其实例化并暂存，等所有配置类解析完毕后，统一回调其 `registerBeanDefinitions` 方法向容器注册 BeanDefinition。

### 总结对比
*   **`@ComponentScan`**：基于**包路径**进行无差别扫描，适合业务代码的 Bean 管理。
*   **`@Import`**：基于**精确的类或逻辑**进行导入，可控性极强，适合**框架开发、中间件集成、自动装配**。
