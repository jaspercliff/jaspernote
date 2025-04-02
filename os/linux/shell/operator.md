# operator

## 关系运算符
- gt 大于
- lt 小于
- eq 等于
- ne 不等于
- ge 大于等于
- le 小于等于

## 布尔运算符
- ! 逻辑非
- && 逻辑与
- || 逻辑或


## 文件测试运算符
- -e 文件存在
- -f 文件存在且是一个普通文件
- -d 文件存在且是一个目录


## 字符串运算符

- -z 字符串长度为 0
- -n 字符串长度不为 0
- -$ 字符串不为空

```shell
a="123"
b=""

if [ -z $b ]
then
    echo " -z determine whether the str length = 0"
fi

if [ -n $a ]
then
  echo "-n determine whether the str length != 0"
fi

if [ $b ]
  then
  echo '$ determine whether the str is not null'
fi
if [ $a ]
  then
  echo '$ determine whether the str is not null'
fi

```