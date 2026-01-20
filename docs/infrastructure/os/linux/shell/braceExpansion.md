# brace expansion

大括号扩展（brace expansion）是一个 Shell 特性，允许用户在命令中使用大括号 {} 来生成一组类似的字符串或文件名。它的作用是通过列出多个选项来一次性生成多个可能的组合。

## 基本语法

```shell
echo {a,b,c}
# a b c
```

## 扩展多个部分

```shell
echo {a,b,c}{1,2,3}
# a1 a2 a3 b1 b2 b3 c1 c2 c3
```

## 带有路径的扩展

```shell
mkdir /home/user/{docs,images,videos}
# 创建三个目录：/home/user/docs, /home/user/images, 和 /home/user/videos。
```

## 扩展范围

```shell
echo {A..Z}
#A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
```

## 组合数字和字母

```shell
echo {file{1..3},file{a..c}}
# file1 file2 file3 filea fileb filec
```

## 应用场景

• 批量创建文件或目录：例如，可以一次性创建多个目录或文件。
• 命令简化：帮助简化命令输入，如多次调用相似的命令时。
• 自动化脚本：在编写 Shell 脚本时，能快速生成一组文件或路径。

## 注意事项

• 大括号扩展只会发生在命令行解析时，因此它不会影响命令的执行，只是在执行前生成字符串。
• 大括号扩展在不同的 Shell 中表现一致，但在不同操作系统的 Shell 中可能略有差异。

## 应用场景1

```shell
mv ~/.local/share/nvim{,.bak}
```

`{,.bak}` 是大括号扩展的一个特殊用法，常见于 Shell 命令中，用来在原有文件名或路径基础上生成不同的变种。在这个例子中，它用于将原文件或目录重命名或移动时，添加 .bak 后缀。

解释：
• `{,.bak}`：这里的 `{}` 表示大括号扩展，它的作用是生成两种字符串：
• 第一个是空的（即原文件或路径名本身）。
• 第二个是 .bak（表示备份文件的后缀）。

通过大括号扩展，Shell 会将命令解析成两种形式：原文件和添加 .bak 后缀的文件。

该命令会将 ~/.local/share/nvim 目录重命名为 ~/.local/share/nvim.bak。这实际上是通过大括号扩展，Shell 将 `{,.bak}` 展开为两个部分：

1. ~/.local/share/nvim
2. ~/.local/share/nvim.bak

过程：

1. Shell 会首先解析命令 mv ~/.local/share/nvim`{,.bak}`，并将 `{,.bak}` 展开为 ~/.local/share/nvim 和 ~/.local/share/nvim.bak。
2. 然后，mv 命令会将 ~/.local/share/nvim 移动或重命名为 ~/.local/share/nvim.bak，通常用于备份文件或目录。

总结：

`{,.bak}` 是一个常见的用法，主要用于重命名或备份文件。它通过大括号扩展生成两个不同的路径，其中一个是原始路径，另一个是带有 .bak 后缀的路径。
