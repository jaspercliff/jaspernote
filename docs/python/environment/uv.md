# uv

uv 是一个新兴的 Python 包管理工具，与 pip 类似，但性能更快。

## uv 的特点

1. 更快的包安装速度：相比 pip，uv 使用 Rust 编写，在解析和安装依赖时速度更快。
2. 与 pip 兼容：可以替代 pip 来安装 Python 包。
3. 更高效的依赖解析：相比 pip-tools，uv 解析 requirements.txt 更快。
4. 跨平台支持：支持 Windows、Linux 和 macOS。

## uv 安装

```shell
curl -LsSf https://astral.sh/uv/install.sh | sh
```

## uv 的基本用法

1. 安装 Python 包

   uv pip install requests

   等效于：

   pip install requests

   但 uv 速度更快。

2. 解析 requirements.txt

   uv pip compile requirements.in -o requirements.txt

   等效于：

   pip-compile requirements.in

   解析依赖的速度比 pip-tools 快。

3. 创建虚拟环境

   uv venv myenv

   等效于：

   python -m venv myenv

4. 运行 Python 脚本

   uv run script.py

   等效于：

   python script.py
5. 全局安装
    ```shell
        uv pip install --system notebook
    ```
   uv pip install → 用 uv 的 pip 兼容模式安装包
   --system → 表示安装到全局环境，而不是某个虚拟环境

6. pipx
    uv 提供了 uv tool install，类似 pipx，用隔离的 venv 管理全局工具。

    ```shell
    uv tool install notebook
    ```

    装完以后也能直接运行：

    jupyter notebook

7. tool
   列出所有通过 uv tool install 安装的全局工具，包括版本号和可用的命令
    ```shell
    uv tool list
    ```