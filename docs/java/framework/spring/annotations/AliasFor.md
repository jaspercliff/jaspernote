# AliasFor


`@AliasFor` 是 Spring 框架中的一个元注解（meta-annotation），用于声明注解中属性之间的别名关系。
这意味着当一个注解属性被标记为 `@AliasFor`，它就可以作为另一个注解属性的别名。这样可以在使用注解时提供更大的灵活性，
并允许开发者以不同的方式指定相同的属性值。

### 示例用法

假设有一个自定义注解 `@MyCustomAnnotation` 如下：

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface MyCustomAnnotation {
    String value() default "";
    @AliasFor("value")
    String name() default "";
}
```

在这个例子中，`name()` 方法通过 `@AliasFor("value")` 被标记为 `value()` 属性的别名。这意味着如果我们在类上使用这个注解并设置 `name` 属性，那么它也会自动应用于 `value` 属性：

```java
@MyCustomAnnotation(name = "exampleName")
public class MyClass {
    // ...
}
```

等价于：

```java
@MyCustomAnnotation(value = "exampleName")
public class MyClass {
    // ...
}
```

### 使用场景

1. **简化配置**：

   - 当注解有多个可选名称表示同一含义时（如 `value` 和 `name`）。
2. **迁移兼容性**：

   - 当需要支持旧版本的属性名称时。
3. **复合注解**：

   - 当创建复合注解时，可以使用 `@AliasFor` 来避免在内部注解中重复相同的属性名称。
4. **别名传递性**：

   - 如果 `@One#name` 显示覆盖了 `@Two#nameAlias`，而 `@Two#nameAlias` 又显示覆盖了 `@Three#nameAlias`，则因为别名的传递性，`@One#name` 实际上也覆盖了 `@Three#nameAlias`。
5. **与 `@Inherited` 结合使用**：

   - 如果一个子注解需要继承父注解的某些属性，则可以在子注解中使用 `@AliasFor` 标记这些属性。

### 注意事项

- `@AliasFor` 只能用于 Spring 的注解处理逻辑，它不是 Java 标准的一部分。
- `@AliasFor` 不影响编译时的行为，它主要用于运行时处理注解的工具和框架。


### 实际应用

> [Spring 中的 @AliasFor 注解 - spring 中文网 (springdoc.cn)](https://springdoc.cn/spring-aliasfor-annotation/)

使用框架的 `@RequestMapping` 注解作为元注解：

创建一个组合注解 `@MyMapping`，使用框架的 `@RequestMapping` 注解作为元注解：

```java
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@RequestMapping
public @interface MyMapping {
    @AliasFor(annotation = RequestMapping.class, attribute = "method")
    RequestMethod[] action() default {};
}
```

在 `@MyMapping` 中，`action` 是 `@RequestMapping` 中属性 `method` 的显式别名。
也就是说，组合注解中的 `action` 重写了元注解中的 `method`。

与注解中的别名类似，元注解属性别名也必须具有相同的返回类型。例如，在本例中就是 `RequestMethod[]`。
另外，属性 `annotation` 应引用元注解，在本例中就是 `annotation = RequestMapping.class`。

接下来，创建一个名为 `MyMappingController` 的 Controller 类，使用自定义注解来进行演示。

如下，这里只为 `@MyMapping` 添加两个属性：`route` 和 `action`：

```java
@Controller
public class MyMappingController {

    @MyMapping(action = RequestMethod.PATCH, route = "/test")
    public void mappingMethod() {}
  
}
```
