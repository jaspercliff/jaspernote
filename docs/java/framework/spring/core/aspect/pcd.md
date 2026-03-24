# pointcut designators 

:::danger 
定义了多个 @Pointcut，但如果其中一个切点表达式写错了或者无法解析，有时会导致整个 Aspect 类（甚至整个 AOP 链）加载异常，或者让 Spring 在匹配时出现“静默失败”
:::

## execution 

```txt 
execution(modifiers-pattern?
			ret-type-pattern
			declaring-type-pattern?name-pattern(param-pattern)
			throws-pattern?)
```

- modifiers-pattern: 插件修饰符（如 public, protected）。
- returns-pattern: 返回值类型（如 void, String, 或 * 代表任意类型）。
- declaring-type-pattern: 类全路径名。
- name-pattern: 方法名（可以使用 * 通配符）。
- param-pattern: 参数列表。
- throws-pattern: 抛出的异常。

:::info 
? 如果不写 则代表全部任意   
`*` 匹配任意数量的字符，但在路径中仅代表一级。  
`..` 在包路径中代表当前包及其子包；在参数列表中代表任意数量、任意类型的参数  
`+` 匹配指定类及其所有的子类或接口实现类。
:::

- (*)：匹配且仅有一个任意类型的参数。
- (*, String)：匹配有两个参数，第一个任意，第二个必须是 String。
- (..)：匹配零个或多个任意类型的参数

```java
    /**
     * public method
     * * any return type
     * com.jasper.controller..* package and sub-packages
     * .* any method name
     * (..) any parameters
     */
    @Pointcut("execution(public * com.jasper.controller..*.*(..))")
    public void exePcd() {
    }
```

## annotation 

匹配带有特定注解的方法。这在处理日志、权限或事务时非常高效。
- 示例：@annotation(com.jasper.Loggable)
- 匹配所有标注了 @Loggable 的方法。

## within

限定特定类型内部的所有方法执行。
- 示例：within(com.jasper.service..*)
- 匹配 service 包及其子包下所有类的方法。


## @within 

- 匹配类上面是否带有指定的注解。
- @within(org.springframework.web.bind.annotation.RestController)

## args 

args 不关注方法签名中的声明类型，而是关注运行时传入的实际参数类型
args(String)：只要运行时传进来的对象是 String（即使方法声明的是 Object），也能匹配

:::danger 
     * 这可能会扫到 Spring 内部的 Bean、第三方库的 Bean，
     * 如果这些 Bean 有 final 方法，CGLib 就会报错
     * 给它加一个包路径限制
:::

```java
    @Pointcut("within(com.jasper..*)")
    public void inMyPackage() {}

    /**
     * 这可能会扫到 Spring 内部的 Bean、第三方库的 Bean，
     * 如果这些 Bean 有 final 方法，CGLib 就会报错
     * 给它加一个包路径限制
     */
    @Pointcut("inMyPackage() && args(com.jasper.models.entity.User, ..)")
    public void userParamPcd() {}
```


## this 

this(com.jasper.service.UserService) 检查 生成的代理对象 是否是 UserService 类型。

## target 

target(com.jasper.service.UserService)	检查 被代理的原始对象 是否是 UserService 类型


:::info 
this 指向代理对象（Proxy），target 指向目标对象（实现类实例）。
:::

