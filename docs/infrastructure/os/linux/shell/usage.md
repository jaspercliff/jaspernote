# usage

## func

运行c语言  gcc main.c -o main      ./main 执行

```shell
crun() {
    name="${1%.*}"       # 去掉 .c 后缀
    gcc "$1" -o "$name" && "./$name"
}
```

$1 第一个参数
