# log

## slf4j

它是一个日志门面（Facade），不是具体的日志实现。
它本身不是一个日志框架（如 Logback、Log4j），而是一个统一的日志接口，需要你手动引入日志框架依赖 

## logback

- logback-core	核心基础库，所有功能的底层支撑
- logback-classic	经典模块，SLF4J 的实现，提供完整的日志功能  已经包含了slf4j依赖
- logback-access	与 Servlet 容器集成，用于记录 HTTP 访问日志