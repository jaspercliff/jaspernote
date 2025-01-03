# basic

## AOP
Spring Framework 中的 AOP (Aspect-Oriented Programming，面向切面编程) 提供了一种强大的方式来分离关注点，
特别是将横切关注点（如日志、事务管理、安全等）从业务逻辑中分离出来。在 Spring 中，AOP 是通过代理模式实现的，
主要支持两种代理方式：基于JDK的动态代理和基于CGLIB的代理。

- oop 关注的是class
- aop关注的是aspect

### 核心概念
- **切面 (Aspect)**：包含切点和增强的组件
- **切点 (Pointcut)**：匹配连接点的断言,定义了切面应该在哪里被应用
- **连接点 (Join point)**：程序执行过程中的某个特定点，如方法的调用或异常的抛出。
- **通知\增强 (Advice)**：在切面的某个特定的连接点上执行的动作。有多种类型的通知：
    - **前置通知**（Before advice）：在某连接点之前执行，但这不能阻止连接点前的执行除非它抛出一个异常。
    - **返回后通知**（After returning advice）：在某连接点正常完成后执行。
    - **抛出异常后通知**（After throwing advice）：如果方法通过抛出异常退出，则执行。
    - **后置通知**（After (finally) advice）：当某连接点退出的时候执行（无论是正常返回还是异常退出）。
    - **环绕通知**（Around advice）：包围一个连接点的通知，如方法调用。这是最强大的一种通知类型。可以在方法调用前后完成自定义的行为，甚至可以决定是否执行方法。
- **目标对象 (Target object)**：被一个或多个切面所通知的对象。
- **织入 (Weaving)**：是将切面与其他应用程序类型或对象链接创建一个被通知的对象的过程。这可以在编译时、加载时或运行时完成。

假设我们有一个应用程序，其中包含多个服务类，每个服务类都有自己的业务逻辑。现在，我们希望对所有服务方法的调用进行日志记录。在这种情况下：

- 每个服务方法的调用都是一个连接点。
- 如果我们决定只记录那些标记为@Loggable注解的方法调用，那么这个选择条件就是一个切点。
- 实际的日志记录逻辑就是一个增强。
- 日志记录功能本身可以看作是一个切面，因为它封装了切点和增强。
- 被标记为@Loggable的服务类方法所在的对象就是目标对象。


## 切点表达式
Spring AOP（面向切面编程）中使用的切点表达式是用来定义哪些类的哪些方法需要应用切面逻辑的一种方式。通过切点表达式，
可以非常灵活地指定拦截规则。下面是一些常用的切点表达式及其语法：

### 基本语法

- **execution**：用于匹配方法执行的连接点。这是最常用的一种切点表达式。
  - `execution(<修饰符模式>? <返回类型模式> <方法名模式>(<参数模式>) <异常模式>?)`
  - 示例：`execution(* com.example.service.*.*(..))` 匹配com.example.service包下所有类的所有方法。
  - ? 可选
  - 第一个星号 该包下的所有类
  - 第二个星号 该包下的所有方法
  - .. 表示任意数量和类型的参数
  - (String, int) 表示匹配接收一个字符串和一个整数

- **within**：用于匹配特定类型的任何连接点。
  - 示例：`within(com.example.service.*)` 匹配com.example.service包下的所有类中的所有方法。

- **this**：用于匹配bean引用类型为给定类型的任何连接点。
  - 示例：`this(com.example.service.UserService)` 匹配所有引用类型为UserService的bean的方法。

- **target**：用于匹配目标对象类型为给定类型的任何连接点。
  - 示例：`target(com.example.service.UserService)` 匹配所有目标对象类型为UserService的方法。

- **args**：用于匹配参数类型为给定类型的任何连接点。
  - 示例：`args(java.util.Date)` 匹配所有第一个参数类型为java.util.Date的方法。

- **@within**：用于匹配带有特定注解的类型的任何连接点。
  - 示例：`@within(org.springframework.transaction.annotation.Transactional)` 匹配所有带有@Transactional注解的类的方法。

- **@target**：用于匹配目标对象类型带有特定注解的任何连接点。
  - 示例：`@target(org.springframework.stereotype.Service)` 匹配所有目标对象类型带有@Service注解的方法。

- **@args**：用于匹配参数带有特定注解的任何连接点。
  - 示例：`@args(com.example.annotation.MyAnnotation)` 匹配所有第一个参数带有MyAnnotation注解的方法。

- **@annotation**：用于匹配带有特定注解的方法。
  - 示例：`@annotation(com.example.annotation.MyAnnotation)` 匹配所有带有MyAnnotation注解的方法。


    within 用于匹配特定类或接口中的所有方法，不关心方法是否有注解。
    @annotation 用于匹配带有特定注解的方法，不关心方法所在的类或接口

### 组合使用

切点表达式支持组合使用，例如：
- `execution(* com.example.service.*.*(..)) && args(java.util.Date)` 匹配com.example.service包下所有类中第一个参数为Date类型的方法。
- `execution(* com.example.service.*.*(..)) || @annotation(com.example.annotation.MyAnnotation)` 匹配com.example.service包下所有类的所有方法，或任何带有MyAnnotation注解的方法。

通过这些表达式，你可以非常精确地控制AOP切面的应用范围。在实际开发中，合理地设计切点表达式能够帮助我们更好地实现业务逻辑与横切关注点的分离。


## proxy

配置优先：
- spring.aop.proxy-target-class=true，则强制使用 CGLIB 代理。
- spring.aop.proxy-target-class=false，则强制使用 JDK 动态代理。
自动选择：
如果没有配置 spring.aop.proxy-target-class，Spring AOP 会根据目标对象的特性自动选择代理方式：
目标对象实现了至少一个接口：默认使用 JDK 动态代理。
目标对象没有实现任何接口：使用 CGLIB 动态代理

DefaultAopProxyFactory



1.8 
