# function

## 函数
函数是一个可以重复使用的代码块，它可以接收输入参数并返回输出结果。函数在脚本中可以帮助我们组织代码，提高可读性和可维护性。

### 定义函数
在 Bash 中定义函数的基本语法如下：

```bash
function_name() {
    # 函数体
    echo "Hello, World!"
}
```

## usage()

`usage()` 函数通常用来定义如何显示脚本的使用帮助信息。当用户需要查看脚本的正确用法或参数选项时，可以通过调用这个函数来获得相关信息

### `usage()` 函数的基本结构：

```bash
usage() {
    # 这里是帮助信息的内容
    echo "Usage: scriptname [options] arg1 arg2"
    echo "Options:"
    echo "  -h, --help      Display this help message."
    echo "  -v, --version   Show version information."
    # 更多选项...
}
```

### 使用示例：

假设你有一个名为 `myscript.sh` 的脚本，其中包含了 `usage()` 函数，该脚本接受一些命令行参数。你可以这样定义 `usage()` 函数：

```bash
#!/bin/bash

usage() {
    echo "Usage: $0 [-h] [--version] arg1 arg2" >&2
    echo "This script does something useful." >&2
    echo "  -h, --help     Show this help message and exit." >&2
    echo "  -v, --version  Output version information and exit." >&2
}

# 主程序开始
while [[ $# -gt 0 ]]; do
    case "$1" in
        -h|--help)
            usage
            exit 0
            ;;
        -v|--version)
            echo "myscript version 1.0"
            exit 0
            ;;
        *)
            break
            ;;
    esac
done

# 检查必要的参数是否提供
if [[ $# -ne 2 ]]; then
    usage
    exit 1
fi

# 接下来是脚本的主要逻辑...

```

在这个例子中，如果用户执行 `myscript.sh -h`，将会调用 `usage()` 函数并显示帮助信息;

### 如何调用 `usage()` 函数：

1. 当用户请求帮助信息时调用 `usage()`，比如使用 `-h` 或 `--help` 参数。
2. 当用户提供的参数不正确或不足时，可以调用 `usage()` 并退出脚本。

通常情况下，当检测到错误的参数使用方式时，会先调用 `usage()` 显示正确的使用方法，然后通过 `exit` 命令结束脚本执行。
