# env

`env` 命令是一个在 Unix 和类 Unix 系统（如 Linux 和 macOS）上常用的命令，它主要用于运行一个程序或脚本，
并且可以在运行时临时修改或设置环境变量。

`env` 命令的主要功能包括：

1. **运行程序并设置环境变量**：
    - 你可以使用 `env` 命令来临时设置或修改环境变量，然后运行一个程序或脚本。

2. **列出当前环境变量**：
    - 如果不带任何参数运行 `env`，它会列出当前的环境变量及其值。

## 基本用法

### 1. 列出当前环境变量

```bash
env
```

这将输出当前环境中的所有变量及其值。

### 2. 运行程序并设置环境变量

```bash
env VAR1=value1 VAR2=value2 command arg1 arg2 ...
```

这里，`VAR1` 和 `VAR2` 是你要设置的环境变量，`value1` 和 `value2` 是它们的值，`command` 是你要运行的程序，`arg1` 和 `arg2` 是传递给程序的参数。

#### 3. 清除所有环境变量并运行程序

```bash
env -i command arg1 arg2 ...
```

使用 `-i` 选项可以清除所有环境变量，只保留 `PATH` 变量（除非你也明确清除它），然后运行指定的程序。

### 示例

#### 示例 1：列出当前环境变量

```bash
env
```

输出示例：

``
HOME=/home/user
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
TERM=xterm-256color
LANG=en_US.UTF-8
... (更多环境变量)

```

#### 示例 2：设置环境变量并运行程序

假设你有一个 Python 脚本 `script.py`，你希望在运行时设置一个环境变量 `DEBUG` 为 `true`：

```bash
env DEBUG=true python3 script.py
```

在这个例子中，`DEBUG=true` 会被设置为环境变量，然后 `python3` 会运行 `script.py`。

#### 示例 3：清除所有环境变量并运行程序

假设你希望在一个完全干净的环境中运行一个程序，可以使用 `-i` 选项：

```bash
env -i sh -c 'echo $PATH'
```

在这个例子中，`-i` 选项清除了所有环境变量，`sh -c 'echo $PATH'` 会
运行一个 shell 命令来输出 `PATH` 变量的值。由于环境变量被清除了，`PATH` 变量将为空。

### 在 Shebang 中的使用

在脚本的 shebang 行中使用 `env` 是一种常见的做法，可以确保脚本能够找到并使用正确的解释器，而不需要硬编码解释器的路径。例如：

```python
#!/usr/bin/env python3

print("Hello, World!")
```

在这个例子中，`#!/usr/bin/env python3` 告诉操作系统使用 `env` 命令来查找并执行 `python3` 解释器。这样可以确保脚本在不同系统上都能正确运行，即使
`python3` 的路径在不同的系统上有所不同。

### 总结

`env` 命令是一个非常有用的工具，可以用于临时设置环境变量、运行程序，以及确保脚本的便携性。希望这些示例和解释能帮助你更好地理解和使用 `env` 命令。如果有任何其他问题，请随时提问。
