# 变量

变量是存储数据值的名称

## 变量的命名

数字、字母、下划线组成，不能以数字开头

## 变量的赋值

```shell
name="zhangSan"
```
等号俩侧避免有空格 可能会导致错误,有空格可能导致将name解析为一个命令 

## 变量的引用

```shell
name="zhangSan"
echo $name
echo ${name}
```

## 只读变量

```shell
  1   name='jasper'
  1   echo $name
  2   echo ${name}
  3
  4   name='cliff'
  5   echo $name
  6
  7   readonly name-
  8   name='haha'
```
varDemo: line 9: name: readonly variable

## 删除变量
unset 命令用于删除变量 但是不能删除只读变量
```shell
      unset name
      echo $name
```

## 变量类型
### 整数变量
```shell
declare -i  a=30
echo ${a}
```
### 字符串
''中任何东西都会原样输出 
""中可以有变量
```shell
first_name="jasper"
last_name="cliff"

echo 'full name ${first_name} ${last_name}'
echo "full name: ${first_name} ${last_name}"

str='abcd'
# 获取字符串长度
echo " 字符串长度为：${#str}"

# 提取子字符串
echo "子字符串1-2:${str:1:2}"

# 查找子字符串
a="this is a str"
b="is"
# $() 用于命令替换
c=$(awk -v a="${a}" -v b="${b}" 'BEGIN{print index(a,b)}')
echo ${c}
```
full name ${first_name} ${last_name}
full name: jasper cliff
字符串长度为：4
子字符串1-2:bc
3

### 数组
```shell
my_arr=(1,2,3,4,5)
echo ${my_arr}
```

###  关联数组  
bash 4.0 版本之后支持关联数组
```shell
declare -A my_arr
my_arr=([name]='jasper' [age]=18)
echo ${my_arr[name]}
echo ${my_arr[age]}
```

### 数组demo
```shell
my_arr=(1 2 3 4 5)
# 获取整个数组
echo ${my_arr[@]}
# 获取第一个元素
echo ${my_arr[0]}

declare -A ass_arr
ass_arr=([name]='jasper' [age]=20)
echo ${ass_arr[name]}
```
