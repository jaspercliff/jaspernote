# jenv

JEnv 是一个用于管理 Java 开发环境的工具，它可以帮助开发者轻松切换不同版本的 Java JDK，并且支持与多种构建工具（如 Maven、Gradle 等）无缝集成。

1. **Java 版本管理**：可以安装和管理多个 JDK 版本，并根据需要快速切换。
2. **全局与局部版本设置**：可以为整个系统设置全局的 Java 版本，也可以为特定项目设置局部的 Java 版本。
3. **自动检测**：支持自动检测项目中的 `.version` 文件，并根据文件内容切换到指定的 Java 版本。
4. **插件扩展**：可以通过插件扩展 JEnv 的功能，例如支持 Maven 和 Gradle 的版本管理。
5. **命令行工具**：提供简单易用的命令行接口，方便用户操作。

### 安装 JEnv
```bash
brew install jenv
```

### mac
添加下面内容到～/.zshrc
```bash
export PATH="$HOME/.jenv/bin:$PATH"
eval "$(jenv init -)"
```

### 常用命令

- **添加 JDK**：
  ```bash
  jenv add /path/to/your/jdk
  jenv add /Library/Java/JavaVirtualMachines/jdk1.8.0_441.jdk/Contents/Home
  jenv add /opt/homebrew/opt/openjdk@23/libexec/openjdk.jdk/Contents/Home
  ```
  这会将指定路径的 JDK 添加到 JEnv 中。

- **列出所有已安装的 JDK**：
  ```bash
  jenv versions
  ```

- **设置全局 JDK 版本**：
  ```bash
  jenv global <version>
  ```

- **设置局部 JDK 版本（针对当前目录）**：
  ```bash
  jenv local <version>
  ```

- **查看当前使用的 JDK 版本**：
  ```bash
  java -version
  ```

- **卸载 JDK**：
  ```bash
  jenv remove <version>
  ```

### 注意事项

1. 确保在安装完 JEnv 后正确配置了环境变量，否则可能无法正常工作。
2. 如果使用的是非标准路径的 JDK，请确保路径正确无误。
3. 在某些情况下，可能需要重启终端或重新加载 shell 配置文件以使更改生效。


## problems 

mac  ln: /Users/jasper/.jenv/versions/openjdk64-23.0.2: No such file or directory

手动创建.jenv/versions



