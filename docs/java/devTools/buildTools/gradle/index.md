# gradle

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

| **关键字**              | **作用**                           | **适用场景**                 |
|----------------------|----------------------------------|--------------------------|
| `implementation`     | 当前模块可用，依赖不会传递给依赖当前模块的其他模块。       | 大多数依赖都适合使用这一选项。          |
| `api`                | 当前模块和依赖当前模块的其他模块都可以使用该依赖，依赖会被传播。 | 如果某个依赖是模块 API 的一部分，需要传播。 |
| `compileOnly`        | 当前模块编译时可用，但运行时不会包含此依赖。           | 提供仅编译阶段需要的依赖（如注解处理器）。    |
| `runtimeOnly`        | 运行时需要的依赖，编译时不可见。                 | 仅运行时需要的库，如 JDBC 驱动。      |
| `testImplementation` | 仅在测试代码中可用，不会影响生产代码。              | 测试框架和测试工具的依赖。            |

---

### 代码示例

假设有一个模块 `library`，它依赖 `commons-lang3`，而另一个模块 `app` 依赖 `library`：

- 如果 `library` 中用 `implementation` 声明依赖：

  ```gradle
  // library/build.gradle
  dependencies {
      implementation 'org.apache.commons:commons-lang3:3.12.0'
  }
  ```

    - 在 `library` 模块中可以使用 `commons-lang3` 的类。
    - 但在 `app` 模块中，`commons-lang3` 不会被传递，必须手动添加依赖。

- 如果 `library` 中用 `api` 声明依赖：

  ```gradle
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