# ApplicationContext 


## AnnotationConfigApplicationContext

AnnotationConfigApplicationContext 是 Spring 提供的一个 纯注解驱动的容器类，用于在没有 XML 配置的情况下，基于 Java 配置类 (@Configuration) 创建和管理 Spring 应用上下文。
它是 Spring 的 ApplicationContext 接口的一种实现，适用于非 Web 应用（例如桌面应用、控制台程序、测试类、脚本）中启动 Spring 容器。

🧠 作用
•	加载和解析使用 @Configuration、@ComponentScan 等注解定义的配置类
•	扫描 @Component、@Service、@Repository、@Controller 等组件
•	完全基于注解的方式启动 Spring 应用上下文

