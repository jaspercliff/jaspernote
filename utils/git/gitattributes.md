# .gitattributes

用来控制 Git 如何处理不同类型的文件

- 文本文件的换行符（LF / CRLF）
- 文件的合并策略
- diff 显示方式
- LFS（Git Large File Storage）追踪
- 文件的语言识别、导出行为等

## 控制换行符格式（防止跨系统冲突）

不同系统的换行符：

- macOS / Linux → LF (\n)
- Windows → CRLF (\r\n)
  可以强制统一格式：

### 所有文本文件使用 LF

- text=auto eol=lf

### 或者针对特定类型

_.sh text eol=lf
_.bat text eol=crlf
