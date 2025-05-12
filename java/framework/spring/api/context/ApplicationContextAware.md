# applicationContextAware

运行时根据某些条件动态选择依赖的 bean 时，通过 ApplicationContext 获取 bean 可以提供更大的灵活性。

`ApplicationContextAware` 是 Spring 提供的一个接口，用于让一个 **Bean 获取 Spring 的 `ApplicationContext` 容器对象**
。当你实现了这个接口并注册为 Spring Bean 后，Spring 会在容器启动时自动将 `ApplicationContext` 注入给你，从而可以在代码中使用它来获取其他
Bean 或操作容器。

---

### 🌱 使用场景

你可能会用 `ApplicationContextAware` 来：

- 在非 Spring 管理的类中获取 Bean
- 动态获取 Bean 实例
- 做一些与容器相关的高级功能（如事件发布、自定义扫描等）

---

### ✅ 注意事项：

- `ApplicationContextAware` 的实现类必须是 Spring 托管的 Bean（比如加上 `@Component` 注解）才能生效。
- 不建议滥用，用于全局 Bean 获取或测试等情况还可以，但若大量使用可能意味着设计上有待优化。

## setApplicationContext 
当 Spring 容器初始化该 Bean 时，自动调用该方法，并把当前的 ApplicationContext 传进来