# 数据流重定向

- 0 标准输入 stdin： 0 `<` `<<`
- 1 标准输出 stdout: 1 > >>
- 2 标准错误输出 stderr： 2 2> 2>>

`>` 重定向 文件不存在则创建，存在则覆盖该文件内容
`>>` 重定向 向文件追加内容
`<<` 是 Here Document (在此处输入文档)，是给命令提供一种“多行输入”的方式
`<` 的作用是：告诉命令不要从键盘读取输入，而是从文件里读取内容

```zsh
# 将schema.sql的sql一条一条发给数据库执行
maridb -u root -p my_database < schema.sql
```

## demo

```zsh
touch 1.txt 2.txt 
chown root:root 2.txt 
chmod 700 2.txt 
cat 1.txt 2.txt
```

```zsh
#hello
#cat: 2.txt: Permission denied
```

```zsh
# 正确输出到y 错误输出到n
cat 1.txt 2.txt 1>y 2>n
```

```zsh
cat y n
hello
cat: 2.txt: Permission denied
```

## /dev/null

"黑洞" 虚拟设备，任何到这的数据都会被丢弃

```zsh
cat 1.txt 2.txt  2>/dev/null
# hello
```

## 清空文件

```zsh
> 1.txt  需要手动终止 
:>1.txt  ：在shell什么都不做，不需要自己手动终止
cat /dev/null > 1.txt
```

## 1 2输出到一个文件

2>&1和&> 将正确输出和错误输出到一个文件
把 错误信息 (2) 扔进 正常输出 (1) 的渠道

```zsh
cat 1.txt 2.txt > all 2>&1
cat all
#hello
#cat: 2.txt: Permission denied
```

cat 1.txt 2.txt > all 2>&1
先把正确流指向all 然后把错误流指向正确流的的输出
cat 1.txt 2.txt 2> all 1>&2
先把错误流指向all 然后给正常流指向错误流的渠道

## cat

```zsh
# cat 命令如果没有指定输入文件，它默认会读取标准输入（stdin）
cat > catfile >> EOF
```
