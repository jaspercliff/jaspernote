# keymap


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

## markdown

:LazyExtra 安装markdown
npm install -g markdownlint-cli

- pngpaste 从系统剪贴板（Clipboard）中提取非文本的原始图片数据  img-clip plugin  leader+p

## nvim-tree

- ? 查看快捷键
- o 在文件管理器打开（finder）
- 剪切文件 tab 选择文件 然后移动光标到要移动的文件夹 然后m 移动
- y复制文件 p粘贴文件
- enter 展开collapse 文件夹
- shift+h 显示隐藏文件

## problems

- [ubuntu安装ruff失败](./ruff.md)

## 快捷键

leader+c+d 查看当前行的警告

按ctrl + / 可以打开终端

普通模式下gcc 注释当前行
视觉模式下gc 注释选中行
