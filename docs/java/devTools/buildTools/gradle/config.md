# config

## gradle.properties

gradle.properties 是一个全局或项目级的属性配置文件，用来定义 Gradle 的行为参数。
它类似于 .env 或 .ini 文件，可以设置：

- 构建性能参数（如缓存、并行）
- 环境变量（如版本号、仓库用户名密码）
- JVM 参数（如内存）
- 自定义变量（在 build.gradle 中引用）

Gradle 会在以下三个地方自动读取 gradle.properties（按优先级顺序）：

位置 作用范围
$GRADLE_USER_HOME/gradle.properties 全局配置（通常在用户目录 ~/.gradle）
项目根目录/gradle.properties 当前项目配置
命令行参数 -P 临时配置（优先级最高）

