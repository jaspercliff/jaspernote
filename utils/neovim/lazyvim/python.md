# python开发

npm i -g pyright（微软开发的一个 Python 静态类型检查器和语言服务器（LSP））
:LazyExtra 安装python
安装dap.core 进行debug
pip install debugpy 是 Python 的调试适配器，nvim-dap 调用 Python 时依赖它来实现调试功能

| 分类 | 名称 / 特性 | 说明 |
| :------ | :------------ | :------ |
| 协议 | DAP (Debug Adapter Protocol) | 定义调试器客户端和服务端如何通信的规范（JSON格式） |
| 客户端 | nvim-dap | DAP 客户端，在 Neovim 端实现 DAP ，将按键操作转换成 DAP 消息 |
| 服务端 | debugpy | DAP 适配器，在 Python 端实现 DAP 协议将DAP 消息转换为Python 底层调试器可理解的命令 |

| 特性 | DAP (Debug Adapter Protocol) | LSP (Language Server Protocol) |
| ------ | ---------------------------- | ------------------------------- |
| 目标 | 调试 (Debugging) | 代码理解与增强 (Intellisense) |
| 功能 | 断点、单步执行、变量检查、调用栈、程序状态控制 | 自动补全、定义跳转、引用查找、重命名、代码格式化、类型检查 |
| 协议双方 | 编辑器 (Client) ↔ 调试适配器 (Server) | 编辑器 (Client) ↔ 语言服务器 (Server) |
| 处理数据 | 程序运行时状态（内存、寄存器、变量值） | 静态代码文件（AST、符号表、类型信息） |
| 关键程序 | Python: debugpy、Node: js-debug | Python: pyright/pylsp |

gd 跳转到定义
gr 跳转到引用

from object_oriented.Cat import Cat
from object_oriented.Dog import Dog
