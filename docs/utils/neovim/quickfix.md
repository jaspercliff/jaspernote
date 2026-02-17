# quickfix 

**quickfix 就是一个“位置列表” + “结果展示窗口”**，用来收集各种命令的输出结果（主要是带有文件路径 + 行号 + 列号 + 描述的信息），然后让你在 Neovim 里快速跳转、查看、修改这些位置。

它最经典的用途是：

编译出错 → 快速跳到出错的每一行去修复  
但现在远不止编译了，几乎成了 Neovim 里最强大的“多结果导航器”。

### quickfix 常见的三大使用场景

| 场景               | 典型命令                          | 结果进入 quickfix 的方式          | 实际用途举例                              |
|---------------------|------------------------------------|-------------------------------------|--------------------------------------------|
| 编译/构建错误       | `:make`, `:Make` (asyncrun 等)     | 自动解析编译器错误输出              | C/C++/Rust/go 等编译错误快速定位          |
| 项目内搜索          | `:vimgrep /pattern/ **/*`         | 搜索结果自动进入 quickfix           | 类似 grep 但能直接跳转                     |
| 模糊搜索 / grep     | `:grep`, `:Grep` (telescope/ripgrep) | 通过 'grepformat' 解析              | 全项目找字符串、TODO、FIXME 等             |
| LSP 诊断/引用/定义  | `:lua vim.diagnostic.setqflist()` | LSP 插件把诊断/引用结果塞进去       | 替换 :copen 查看所有报错                   |
| 其他工具输出        | ctags, lint, test, cscope 等       | 通过 errorformat 或插件手动 setqflist | 几乎任何能输出「文件:行:列:信息」的工具   |

### 核心命令速查（最常用的几个）

| 命令       | 作用                              | 常用缩写 |
|------------|-----------------------------------|----------|
| `:copen`   | 打开 quickfix 窗口                | :cope    |
| `:cclose`  | 关闭 quickfix 窗口                | :ccl     |
| `:cnext`   | 跳到下一个错误/结果               | :cn      |
| `:cprev`   | 跳到上一个                        | :cp      |
| `:cfirst`  | 跳到第一个                        | :cfir    |
| `:clast`   | 跳到最后一个                      | :cla     |
| `:cwindow` | 有结果才打开窗口，没结果不打开    | :cw      |
| `:cfile file.err` | 从文件读取 quickfix 内容   |          |

在 quickfix 窗口里最常用的快捷键（默认）：

- `<Enter>`   → 跳转到该行对应的文件位置
- `q`         → 关闭 quickfix 窗口
- `o` / `O`   → 打开但不关闭 quickfix 窗口（预览）

## trouble.nvim


