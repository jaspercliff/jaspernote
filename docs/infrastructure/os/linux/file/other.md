# other

## 目录结构

- /usr 系统级软件包管理器
- /usr/local 本地手动安装的软件 不会覆盖影响系统工具  从源码安装推荐该路径
- /opt 第三方软件包和可选应用程序 本地手动安装的软件  从二进制安装推荐

## mkdir

mkdir -p /home/user/{docs,images,videos}

没有-p则不会创建相关文件夹
-p 递归创建目录  如果目录已经存在不会报错，不存在则创建

 使用`>` filename 可以快速清空文件内容。重定向空内容到文件

## > >>

都是重定向符号 将命令的输出重定向到指定文件

`>` 文件存在，会清空文件在写入新内容
`>>` 文件存在，会在文件末尾追加内容

du -sl /path/to/directory  查看这个目录占了多大空间

清空文件内容 > filename

## 软链接

```zsh
sudo ln -s /opt/gradle/gradle-9.1.0 /opt/gradle
```

然后在 .bashrc 中写

```zsh
export PATH=$PATH:/opt/gradle/bin
这样，当你升级到 Gradle 9.2 时，只需：
sudo rm /opt/gradle
sudo ln -s /opt/gradle/gradle-9.2 /opt/gradle
```
