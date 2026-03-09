# grep

`grep` 是一个非常强大且常用的命令行工具，用于在文件中搜索指定的字符串模式（正则表达式）。它在Linux及其他Unix-like系统中广泛使用。

### 基本用法

- 搜索文件中的文本：`grep "search_pattern" filename`
    - 这会在`filename`指定的文件中查找包含`search_pattern`的所有行，并输出这些行。

### 常用选项

- `-i`: 忽略大小写。
- `-v`: 反转匹配，即只显示不匹配的行。
- `-r` 或 `-R`: 递归地在目录下的所有文件中查找。
- `-n`: 显示匹配行及其行号。
- `-w`: 匹配整个单词。
- `-A n`, `-B n`, `-C n`: 分别显示匹配行之后、之前、前后各`n`行的内容。

### 示例

1. **忽略大小写搜索**：
   ```
   grep -i "hello" myfile.txt
   ```
   此命令会忽略大小写，在`myfile.txt`中搜索“hello”。

2. **反向匹配**：
   ```
   grep -v "pattern" myfile.txt
   ```
   输出`myfile.txt`中不包含“pattern”的所有行。

3. **递归搜索**：
   ```
   grep -r "pattern" /path/to/directory/
   ```
   在指定目录下的所有文件中递归查找“pattern”。

4. **显示匹配行的行号**：
   ```
   grep -n "pattern" myfile.txt
   ```
   输出匹配行时，同时显示它们在文件中的行号。

5. **显示上下文**：
   ```
   grep -C 2 "pattern" myfile.txt
   ```
   输出匹配行以及其上下各2行的内容。

6. **结合管道使用**：
   ```
   cat myfile.txt | grep "pattern"
   ```
   使用管道将前一个命令的输出作为`grep`的输入进行过滤。


## 实际使用

一天有很多个日志文件，在所有的日志文件查找包含这个唯一流水号的文件     -l 显示文件名
```bash
grep -lr  seqno
```
