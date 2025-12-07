# lazyVim

neovim的各种常用插件的集合，相当于一键安装了许多常用插件

## 安装

- <https://lazy.folke.io/installation>

LazyVim 和一些插件可能会使用特殊的图标或符号，这些符号需要特定的字体来显示。你可以安装一些常见的 Nerd Fonts，支持更多符号显示。可以通过以下链接下载并安装：
安装完成后，记得在终端或编辑器中选择支持这些字体的配置。

安装nead fonts
<https://github.com/ryanoasis/nerd-fonts?tab=readme-ov-file#option-2-homebrew-fonts>

rm -rf ~/.local/share/nvim/lazy
rm -rf ~/.cache/nvim
rm -rf ~/.config/nvim/plugin
nvim

空格 [   b 打开多个文件切换
空格 ｜ 打开多个文件垂直切分
空格 - 打开多个文件horizon split 拆分之后 ctrl+h+j+k+l切换

H  L   在缓冲区之前切换 左右

:Mason  查看插件

space +e/E

e root dir 项目根目录
E cwd current working directory 当前文件所在目录

checkhealth 查看everything is ok？

wqa  write+quit+all 保存所有并退出
]b 右边buffer
[b 左边buffer

space+ctrl+｜  split right window
space+ctrl+-   split below window
ctrl + h j k l 切换 split window

space+g+g lazygit

keymap.lua 配置 option+方向键 切换buffer 大小

按ctrl + / 可以打开终端 space+f+t

普通模式下gcc 注释当前行
视觉模式下gc 注释选中行

## buffer

- leader+b+r close right 右边buffer
- leader+b+l close left 右边buffer
- leader+b+p pin tab
- leader+b+P close unpinned tab

## plugins

- img-clip 从系统剪贴板（Clipboard）中提取非文本的原始图片数据  leader+p

## util

- pyright python LSP
- fd  查找工具 比find更好用
- pngpaste 从系统剪贴板（Clipboard）中提取非文本的原始图片数据  img-clip plugin  leader+p

## python开发

npm i -g pyright（微软开发的一个 Python 静态类型检查器和语言服务器（LSP））
:LazyExtra 安装python
安装dap.core 进行debug
pip install debugpy 是 Python 的调试适配器，nvim-dap 调用 Python 时依赖它来实现调试功能

| 分类 | 名称 / 特性 | 说明 |
|------|------------|------|
| 协议 | DAP (Debug Adapter Protocol) | 定义调试器客户端和服务端如何通信的规范（JSON格式） |
| 客户端 | nvim-dap | DAP 客户端，在 Neovim 端实现 DAP 协议，将按键操作转换成 DAP 消息 |
| 服务端 / 适配器 | debugpy | DAP 适配器，在 Python 端实现 DAP 协议，将 DAP 消息转换为 Python 底层调试器（如 PDB）可理解的命令 |

| 特性 | DAP (Debug Adapter Protocol) | LSP (Language Server Protocol) |
|------|----------------------------|-------------------------------|
| 目标 | 调试 (Debugging) | 代码理解与增强 (Intellisense) |
| 功能 | 断点、单步执行、变量检查、调用栈、程序状态控制 | 自动补全、定义跳转、引用查找、重命名、代码格式化、类型检查 |
| 协议双方 | 编辑器 (Client) ↔ 调试适配器 (Server) | 编辑器 (Client) ↔ 语言服务器 (Server) |
| 处理数据 | 程序运行时状态（内存、寄存器、变量值） | 静态代码文件（AST、符号表、类型信息） |
| 关键程序 | Python: debugpy、Node: js-debug | Python: pyright/pylsp、Rust: rust-analyzer |

gd 跳转到定义
gr 跳转到引用

from object_oriented.Cat import Cat
from object_oriented.Dog import Dog

## markdown

:LazyExtra 安装markdown

- pngpaste 从系统剪贴板（Clipboard）中提取非文本的原始图片数据  img-clip plugin  leader+p

## nvim-tree

- ? 查看快捷键
- o 在文件管理器打开（finder）
- 剪切文件 tab 选择文件 然后移动光标到要移动的文件夹 然后m 移动
- y复制文件 p粘贴文件
- enter 展开collapse 文件夹


## problems

- [ubuntu安装ruff失败](./lazyvim/ruff.md)
