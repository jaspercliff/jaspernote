# basic

构建：编译、运行单元测试、生成文档、打包、部署的过程
构建的步骤：
- 清理 clean：将以前编译得到的旧文件 class 字节码文件删除。
- 编译 compile：将 java 源程序编译成 class 字节码文件。
- 测试 test：自动测试，自动调用 junit 程序。
- 报告 report：测试程序执行的结果。
- 打包 package：动态 Web 工程打 War 包，java 工程打 jar 包。
- 安装 install：将打包得到的文件复制到 “仓库” 中的指定位置（Maven特定的概念）。
- 部署 deploy：将动态 Web 工程生成的 war 包复制到 Servlet 容器下，使其可以运行。


- mvn archetype:generate 使用预定义的模板（称为 archetypes）来生成项目的基本目录结构和必要的配置文件



为该项目添加额外的仓库地址。Maven 在解析依赖时，会同时检查 pom.xml 和 settings.xml 中定义的所有仓库。
```xml
    <!-- 使用 aliyun 的 Maven 源，提升下载速度 -->
    <repositories>
        <repository>
            <id>aliyunmaven</id>
            <name>aliyun</name>
            <url>https://maven.aliyun.com/repository/public</url>
        </repository>
    </repositories>
```


## annotationProcessorPaths

`<annotationProcessorPaths>` 是 Maven `maven-compiler-plugin` 插件配置中的一个**关键元素**，用于**明确指定注解处理器（Annotation Processors）的依赖路径**。

**注解处理器**：

*   **注解（Annotations）**：Java 中的元数据，用 `@` 符号标记（如 `@Override`, `@Deprecated`, `@SpringBootApplication`）。
*   **注解处理器（Annotation Processors）**：在编译期间运行的特殊程序。它们可以：
    *   **读取**源代码中的注解。
    *   **生成**新的 Java 源代码文件（`.java`）或其他文件（如配置文件）。
    *   **验证**代码是否符合某些规则（例如，检查 `@NonNull` 注解的变量是否可能为 `null`）。
    *   常见的框架如 Lombok (`@Data`, `@Getter`), MapStruct (`@Mapper`),  ErrorProne(``) 都依赖注解处理器来工作。

---

### 为什么需要 `<annotationProcessorPaths>`？

在早期的 Maven 配置中，人们常常简单地将注解处理器（如 Lombok）作为普通的 `<dependency>` 添加到 `pom.xml` 的 `<dependencies>` 部分。

**这样做有严重问题：**

1.  **污染运行时类路径**：注解处理器**只在编译时需要**。一旦编译完成，生成的字节码通常不再需要这些处理器库。如果将它们放在 `<dependencies>` 里，它们会被打包进最终的 JAR/WAR 文件，并成为应用运行时的依赖。这增加了应用的体积，可能导致依赖冲突（不同版本的处理器库冲突），甚至引入安全风险。
2.  **依赖管理混乱**：无法清晰区分“编译时工具”和“运行时库”。


---

### `<annotationProcessorPaths>` 的作用

*   **隔离作用域**：它创建了一个独立的、**仅限于编译过程**的类路径（classpath）。
*   **明确意图**：明确告诉 Maven 和编译器（`javac`），列出的这些依赖是**专门用于执行注解处理的**。
*   **防止打包**：Maven 会确保这些路径下的依赖**不会**被打包到最终的应用程序工件（JAR/WAR）中，也不会出现在应用的运行时类路径上。
*   **优先使用**：当存在 `<annotationProcessorPaths>` 时，`javac` 会**优先使用**这里指定的处理器，而不是从主 `<dependencies>` 中查找。这提供了更好的控制和可预测性。

---

### 语法结构

```xml
<configuration>
    ...
    <annotationProcessorPaths>
        <path>
            <groupId>com.example</groupId>
            <artifactId>example-processor</artifactId>
            <version>1.0.0</version>
        </path>
        <path>
            <groupId>another.group</groupId>
            <artifactId>another-processor</artifactId>
            <version>2.1.0</version>
        </path>
        <!-- 可以添加多个 <path> -->
    </annotationProcessorPaths>
    ...
</configuration>
```

*   `<annotationProcessorPaths>` 包含一个或多个 `<path>` 元素。
*   每个 `<path>` 定义一个注解处理器依赖，通过标准的 Maven 坐标（`groupId`, `artifactId`, `version`）来指定。

---


### 总结

`<annotationProcessorPaths>` 是一个最佳实践配置，用于：

1.  **正确管理依赖**：将编译时工具（注解处理器）与运行时库清晰分离。
2.  **减小应用体积**：防止注解处理器库被错误地打包进最终应用。
3.  **避免依赖冲突**：减少运行时类路径上的潜在冲突。
4.  **提高构建清晰度**：明确声明哪些依赖是用于注解处理的。

**简单来说，它就是为“只在编译代码时才需要的工具”专门开辟的一个“工具箱”，确保这些工具用完就收起来，不会混进最终交付的产品里。**