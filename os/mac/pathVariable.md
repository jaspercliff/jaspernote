# 环境变量

在 macOS 上设置环境变量可以通过修改 shell 的配置文件实现。以下是详细的步骤，具体操作取决于您使用的 shell 类型（例如 `zsh` 或 `bash`）。
macOS 默认使用的是 `zsh`，但如果您手动切换到了其他 shell（如 `bash`），也可以按照相应的方法进行设置。

---

### 方法 1：临时设置环境变量（仅当前终端会话有效）
在终端中直接输入以下命令：
```bash
export VARIABLE_NAME=value
```
例如，设置一个名为 `MY_VAR` 的环境变量：
```bash
export MY_VAR=HelloWorld
```
**注意**：这种方式设置的环境变量只对当前终端会话有效，关闭终端后变量会丢失。

---

### 方法 2：永久设置环境变量（适用于所有终端会话）
要让环境变量永久生效，需要将其添加到 shell 的配置文件中。

#### 如果您使用的是 **zsh**（macOS 默认）：
1. 打开终端。
2. 编辑 `.zshrc` 文件：
   ```bash
   vim ~/.zshrc
   ```
3. 在文件末尾添加以下内容（根据需要替换变量名和值）：
   ```bash
   export VARIABLE_NAME=value
   ```
   例如：
   ```bash
   export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
   export PATH=$JAVA_HOME/bin:$PATH
   ```
4. 保存并退出编辑器
5. 让更改生效：
   ```bash
   source ~/.zshrc
   ```

#### 如果您使用的是 **bash**：
1. 打开终端。
2. 编辑 `.bash_profile` 文件：
   ```bash
   nano ~/.bash_profile
   ```
3. 在文件末尾添加环境变量定义：
   ```bash
   export VARIABLE_NAME=value
   ```
   例如：
   ```bash
   export PATH=/usr/local/bin:$PATH
   ```
4. 保存并退出编辑器。
5. 让更改生效：
   ```bash
   source ~/.bash_profile
   ```

---

### 方法 3：为特定应用程序设置环境变量
如果您只想为某个应用程序设置环境变量，可以将变量定义放在该应用程序的启动脚本中。例如，IntelliJ IDEA 可以通过修改其配置文件来设置环境变量。

---

### 方法 4：系统级别的环境变量设置
如果需要为所有用户和所有 shell 设置全局环境变量，可以编辑 `/etc/paths` 或 `/etc/launchd.conf` 文件。

#### 编辑 `/etc/launchd.conf`：
1. 打开终端。
2. 使用管理员权限编辑 `/etc/launchd.conf` 文件：
   ```bash
   sudo nano /etc/launchd.conf
   ```
3. 添加环境变量定义：
   ```bash
   setenv VARIABLE_NAME value
   ```
   例如：
   ```bash
   setenv JAVA_HOME /Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
   ```
4. 保存并退出编辑器。
5. 重启计算机使更改生效。

**注意**：从 macOS Catalina 开始，`/etc/launchd.conf` 文件可能不再被支持。建议优先使用用户级配置文件（如 `.zshrc` 或 `.bash_profile`）。

---

### 验证环境变量是否生效
无论采用哪种方法，设置完成后都可以通过以下命令验证环境变量是否生效：
```bash
echo $VARIABLE_NAME
```
例如：
```bash
echo $JAVA_HOME
```

如果输出了正确的值，则说明环境变量已成功设置。