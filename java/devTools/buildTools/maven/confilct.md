# conflict

spring-boot-starter-jdbc 导入了 spring-boot-autoconfigure，其他地方也可能会导入 同一个 jar 包。
 多个 starter 引入同一个依赖，会不会重复？

不会。因为构建工具（如 Maven）有 依赖传递机制 + 去重机制，比如：
•	你导入了：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>

<dependency>
<groupId>org.springframework.boot</groupId>
<artifactId>spring-boot-starter-web</artifactId>
</dependency>

```

这两个 starter 都会传递性地依赖 spring-boot-autoconfigure，但 Maven 会 自动去重，只保留一个版本的 jar。


## 如何确认依赖是否重复？

你可以执行：

mvn dependency:tree

来看项目实际依赖了哪些 jar，会看到类似这样：

```txt
[INFO] +- org.springframework.boot:spring-boot-starter-jdbc:3.2.4
[INFO] |  +- org.springframework.boot:spring-boot-autoconfigure:3.2.4
[INFO] +- org.springframework.boot:spring-boot-starter-web:3.2.4
[INFO] |  +- org.springframework.boot:spring-boot-autoconfigure:3.2.4 (omitted for duplicate)
```

它会标记 (omitted for duplicate)，表示不会重复引入。


🤔 如果版本不一致怎么办？

如果两个 starter 引入了 spring-boot-autoconfigure 的 不同版本，就会触发 “依赖冲突”。

这时：
•	Maven 会默认使用第一个声明的版本；
•	你可以使用 dependencyManagement 手动指定版本，统一依赖版本；

问题	结论
多个地方导入了同一个包（如 spring-boot-autoconfigure）怎么办？	Maven/Gradle 会自动去重，只保留一个
会不会冲突？	正常情况下不会；如果版本冲突你需要手动管理
怎么看项目到底用了哪个版本？	mvn dependency:tree 查看依赖树

