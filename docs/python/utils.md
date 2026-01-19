# utils

## venv

`venv` 是 Python 中的一个模块，用于创建虚拟环境。虚拟环境是一个隔离的 Python 运行环境，可以让你在同一台机器上同时管理多个 Python 项目，而不必担心不同项目之间的依赖冲突。每个虚拟环境都有自己独立的 Python 解释器和安装的包，这样可以确保不同项目的依赖完全隔离开来。

以下是 `venv` 的主要功能和使用方法：

### 功能

1. **隔离项目依赖**：虚拟环境使每个项目都有自己独立的依赖包，不会与系统全局的 Python 包发生冲突。
2. **多项目管理**：在同一台机器上，可以为每个项目创建独立的虚拟环境，从而使用不同版本的 Python 解释器和依赖包。
3. **轻松迁移项目**：虚拟环境可以通过 `requirements.txt` 文件记录下项目所需的所有依赖，方便迁移到其他机器或部署到服务器上。

### 使用方法

1. **创建虚拟环境**：

   在项目目录中运行以下命令来创建一个虚拟环境：

   ```bash
   python -m venv env_name
   ```

   这里 `env_name` 是虚拟环境的名称，通常命名为 `venv` 或 `env`。-m 这个选项告诉 Python 运行指定的模块，作为脚本来执行。在这个命令中，`venv` 是一个模块，用于创建虚拟环境
2. **激活虚拟环境**：

   - **在Windows上**，运行以下命令激活虚拟环境：

     ```bash
     .\env_name\Scripts\activate
     ```
   - **在macOS和Linux上**，运行以下命令激活虚拟环境：

     ```bash
     source env_name/bin/activate
     ```

   激活后，你会在终端提示符前看到虚拟环境的名称，这表示你已经进入了虚拟环境。
3. **安装依赖包**：

   虚拟环境激活后，所有使用 `pip` 安装的包都会安装到这个虚拟环境中。你可以像往常一样安装包，例如：

   ```bash
   pip install package_name
   ```
4. **退出虚拟环境**：

   要退出虚拟环境，可以运行以下命令：

   ```bash
   deactivate
   ```
5. **记录依赖**：

   可以使用以下命令将当前虚拟环境中的所有依赖包记录到 `requirements.txt` 文件中：

   ```bash
   pip freeze > requirements.txt
   ```
6. **从 `requirements.txt` 安装依赖**：

   如果你需要在另一个环境中安装这些依赖，只需运行：

   ```bash
   pip install -r requirements.txt
   ```

### 总结

`venv` 是一个非常有用的工具，特别是在开发多个 Python 项目时，通过使用虚拟环境可以避免依赖冲突，并简化项目的部署和管理。


`pip`是Python的包安装器，它是一个命令行工具，用于安装、升级和管理Python包。包是Python代码的集合，用于执行特定的任务。使用`pip`，你可以从Python包索引（Python Package Index, PyPI）以及其他索引中安装成千上万的包。

### 基本使用方法

1. **安装包**：要安装一个包，你可以使用以下命令，其中`somepackage`是你想要安装的包的名称。

    ```
    pip install somepackage
    
    ```

2. **升级包**：要升级已安装的包，使用以下命令。

    ```
    pip install --upgrade somepackage
    
    ```

3. **卸载包**：要卸载一个包，使用以下命令。

    ```
    pip uninstall somepackage
    
    ```

4. **列出已安装的包**：要查看已经安装的包及其版本，可以使用以下命令。

    ```
    pip list
    
    ```

5. **查找包**：要查找可用的包，可以使用以下命令。

    ```
    pip search somepackage
    
    ```

6. **显示包信息**：要查看关于已安装包的详细信息，包括它的依赖关系，可以使用以下命令。

    ```
    pip show somepackage
    
    ```

7. **检查哪些包需要更新**：要检查所有已安装的包是否有可用的更新，可以使用以下命令。

    ```
    pip list --outdated
    
    ```


### 注意事项

- 使用`pip`前，请确保你已经安装了Python。`pip`通常与Python一起安装。
- 建议使用虚拟环境（如`venv`或`conda`）来管理项目依赖，避免不同项目之间的依赖冲突。
- 有时可能需要以管理员（或在Linux/Mac上使用`sudo`）权限运行`pip`命令，尤其是在全局安装包时。

通过这些基本命令，你可以开始使用`pip`来管理Python环境中的包了。