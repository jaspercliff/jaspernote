# lazyVim

neovim的各种常用插件的集合，相当于一键安装了许多常用插件
## 安装

- https://lazy.folke.io/installation

LazyVim 和一些插件可能会使用特殊的图标或符号，这些符号需要特定的字体来显示。你可以安装一些常见的 Nerd Fonts，支持更多符号显示。可以通过以下链接下载并安装：
安装完成后，记得在终端或编辑器中选择支持这些字体的配置。

安装nead fonts
https://github.com/ryanoasis/nerd-fonts?tab=readme-ov-file#option-2-homebrew-fonts



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




## python开发 

npm i -g pyright（微软开发的一个 Python 静态类型检查器和语言服务器（LSP））
:LazyExtra 安装python
安装dap.core 进行debug


gd 跳转到定义
gr 跳转到引用
