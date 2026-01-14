# fd

fd 是一个比系统自带的 find 命令更快、更用户友好的搜索工具，许多 Neovim 插件（尤其是 Telescope，LazyVim 默认的文件查找器）都依赖它来实现高性能的文件查找

fd -t d . /var/www/hmdp -x chmod 755
fd -t f . /var/www/hmdp -x chmod 644
