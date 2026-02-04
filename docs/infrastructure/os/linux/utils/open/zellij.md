# zellij

## zellij command

- zellij ls 查看所有session
- zellij -s note 打开一个session 命名为note
- zellij attach note 打开note会话
- zellij delete-all-sessions 删除所有session
- zellij delete-session test 删除test session

## alt

alt+ h/j/k/l 可以切换所有pane
alt+i 切换tab位置

## lock

- ctrl+g lock模式 当在neovim中，按下ctrl+s 会先执行zellij的，neovim中ctrl+s失效 ，在该模式下，zellij除了ctrl+g 全部都会失效

## session

session让终端工作状态永生，只要电脑没有关机，即使终端退出了，所有原来的布局，进程，未保存的文本都会在后台运行

- ctrl+o session

### session status

- 已退出： 就是布局、标签、工作目录保存但是进程退出了
- active 就是布局、标签、工作目录都存在 必须是detach 不能是ctrl+q 退出的

## tab

- sync 将标签改为sync模式，该标签下的所有pane都会执行相同的命令

## pane

- ctrl+p  f  pane全屏之后，alt+h/l 可以切换所有pane
- ctrl+p s   stack 把一组 Pane 堆在一起，只露出它们的标题栏（Title Bar），像一叠文件一样
