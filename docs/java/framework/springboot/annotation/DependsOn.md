# DependsOn

`@DependsOn` 是 Spring 框架中的一个注解，用于控制 Bean 的初始化顺序。当一个 Bean 的初始化依赖于另一个或多个 Bean 的初始化完成时，
可以使用 `@DependsOn` 来指定这种依赖关系。

### 使用场景

当你有多个 Bean，其中一个 Bean 的初始化逻辑依赖于另一个 Bean 已经初始化完成的情况下，
可以使用 `@DependsOn` 注解来确保依赖的 Bean 先被初始化。

### 如何使用

`@DependsOn` 可以应用在 `@Bean` 方法上，也可以应用在 XML 配置文件中。以下是两种情况下的使用示例。

#### Java 配置示例

假设我们有两个 Bean，`DatabaseConfig` 和 `ApplicationService`。`ApplicationService` 的初始化需要依赖于 `DatabaseConfig` 的初始化。

```java
@Configuration
public class AppConfig {

    @Bean
    @DependsOn("databaseConfig")
    public ApplicationService applicationService() {
        return new ApplicationService();
    }

    @Bean
    public DatabaseConfig databaseConfig() {
        return new DatabaseConfig();
    }
}
```

在这个例子中，`applicationService` Bean 的初始化将等待 `databaseConfig` Bean 初始化完成之后才开始。

#### XML 配置示例

在 XML 配置文件中，可以使用 `depends-on` 属性来达到类似的效果：

```xml
<beans>
    <bean id="databaseConfig" class="com.example.DatabaseConfig"/>

    <!-- applicationService 的初始化依赖于 databaseConfig -->
    <bean id="applicationService" class="com.example.ApplicationService" depends-on="databaseConfig"/>
</beans>
```

### 注意事项

1. **初始化顺序**：
    - `@DependsOn` 只保证了初始化顺序，但并不意味着被依赖的 Bean 必须先于依赖它的 Bean 加载。也就是说，依赖关系仅在初始化阶段生效，在销毁阶段不起作用。

2. **单例 vs 原型**：
    - 如果被依赖的 Bean 是单例（singleton）模式，那么它会在第一次被请求时创建并缓存，后续的依赖关系只会等待初始化完成，而不会重新创建。
    - 如果被依赖的 Bean 是原型（prototype）模式，那么每次依赖都会重新创建一个新的实例。

3. **循环依赖**：
    - 如果两个或多个 Bean 形成循环依赖，Spring 会抛出异常。因此，在设计依赖关系时要避免形成循环依赖。

4. **与 `@Autowired` 的区别**：
    - `@Autowired` 用于自动装配 Bean，而 `@DependsOn` 用于控制 Bean 的初始化顺序。`@Autowired` 解决的是“谁”注入的问题，而 `@DependsOn` 解决的是“何时”注入的问题。

5. **与 `@PostConstruct` 的区别**：
    - `@PostConstruct` 标记的方法会在依赖注入完成后调用，但它并不关心其他 Bean 是否已经初始化。`@DependsOn` 则确保依赖的 Bean 已经初始化完成之后再执行标注的方法。

通过使用 `@DependsOn`，你可以更好地控制 Spring 应用程序中各组件之间的依赖关系，从而确保应用程序能够按照预期的方式启动和运行。