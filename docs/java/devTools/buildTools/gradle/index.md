# gradlekotlin


- [gradle kotlin dsl](/java/devTools/buildTools/gradle/kotlin/index.md)
- [config](config.md)

.gradle文件夹是缓存文件夹

`implementation` 是 Gradle 中声明依赖的一种方式，它定义了当前模块对某个依赖的引用，同时控制该依赖的可见性和传播性。

### Gradle 中的 `implementation`

1. **含义：**
    - 使用 `implementation` 声明的依赖，当前模块可以使用它们，但这些依赖不会自动暴露给依赖当前模块的其他模块。
    - 换句话说，它的作用域是“模块内部使用”。

2. **优点：**
    - **提高编译速度：** 使用 `implementation` 声明的依赖，Gradle 编译时可以减少任务检查和依赖分析的范围。
    - **隔离依赖：** 限制了依赖的传播，避免下游模块无意间使用当前模块的实现细节。

---

### 常见依赖声明对比

以下是 Gradle 中常用的依赖范围关键词及其作用，以表格形式展示：

| **Gradle 关键词**          | **作用**                                                            | **适用场景**                           |
|-------------------------|-------------------------------------------------------------------|------------------------------------|
| **implementation**      | 编译期和运行期均可用，依赖不会传递到使用当前模块的其他模块中。                                   | 大多数普通依赖使用此范围，如通用工具库、业务代码所需依赖。      |
| **api**                 | 编译期和运行期均可用，依赖会传递到使用当前模块的其他模块中。                                    | 如果当前模块暴露的 API 使用了依赖中的类或方法，应使用此范围。  |
| **compileOnly**         | 仅在编译期可用，运行时不可用。                                                   | 容器提供的库（如 Servlet API）、注解处理器等编译期依赖。 |
| **runtimeOnly**         | 仅运行时可用，编译期不可用。                                                    | 运行时需要但编译时不需要的库（如 JDBC 驱动）。         |
| **testImplementation**  | 测试代码中可用，不会影响生产代码。                                                 | 单元测试框架（如 JUnit、Mockito）或测试工具。      |
| **testRuntimeOnly**     | 测试代码运行时可用，但测试编译期不可用。                                              | 测试阶段运行所需的库（如特定数据库驱动，仅在测试环境中需要）。    |
| **annotationProcessor** | 编译时注解处理器，用于生成代码的库。                                                | 例如 Lombok 或其他需要注解处理器的工具。           |
| **providedCompile**     | （仅在部分插件中支持）类似 `compileOnly`，但会传递到依赖的编译环境中（多用于 Web 应用 WAR 打包时的依赖）。 | Web 应用中需要运行环境（如服务器）提供支持的库。         |
| **providedRuntime**     | （仅在部分插件中支持）运行期依赖，通常由外部环境（如应用服务器）提供。                               | 仅用于 WAR 插件的配置，如 Web 容器运行时库。        |

---

### 代码示例

假设有一个模块 `library`，它依赖 `commons-lang3`，而另一个模块 `app` 依赖 `library`：

- 如果 `library` 中用 `implementation` 声明依赖：

  ```groovy
  // library/build.gradle
  dependencies {
      implementation 'org.apache.commons:commons-lang3:3.12.0'
  }
  ```

    - 在 `library` 模块中可以使用 `commons-lang3` 的类。
    - 但在 `app` 模块中，`commons-lang3` 不会被传递，必须手动添加依赖。

- 如果 `library` 中用 `api` 声明依赖：

  ``` groovy
  // library/build.gradle
  dependencies {
      api 'org.apache.commons:commons-lang3:3.12.0'
  }
  ```

    - 在 `library` 和 `app` 模块中都可以使用 `commons-lang3` 的类。
    - `api` 会暴露 `commons-lang3` 给所有依赖 `library` 的模块。

---

### 总结

`implementation` 是 Gradle 中用于声明模块内部依赖的最佳实践，除非需要显式暴露依赖给其他模块（这种情况用 `api`），大部分场景都应使用
`implementation`。这样可以实现模块间的高内聚和低耦合，同时提高构建效率。

gradlew：这是在 Unix 类系统（包括 macOS 和 Linux）上运行 Gradle 的可执行脚本。它是一个 shell 脚本，用于包装 Gradle
Wrapper，确保使用正确的 Gradle 版本来执行构建任务。
gradlew.bat：这是在 Windows 系统上运行 Gradle 的批处理文件。它是一个批处理脚本，用于包装 Gradle Wrapper，确保使用正确的
Gradle 版本来执行构建任务。
这些文件通常位于项目的根目录下，并且是通过运行 gradle wrapper 命令自动生成的。
