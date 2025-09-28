# 流程控制

## if  else

if else 的 [...] 判断语句中大于使用 -gt，小于使用 -lt。

[ ] 是 test 命令的别名，test 命令用于检查文件类型和比较值。

```shell
如果使用 ((...)) 作为判断语句，大于和小于可以直接使用 > 和 <。

-ne 不等于，-eq 等于，-ge 大于等于，-le 小于等于。
```shell
a=20
b=20
if [ $a -eq $b ]
then 
  echo "a等于b"
elif [ $a -gt $b ]
then 
  echo "a 大于b"
elif [ $a -lt $b ] 
then 
  echo "a 小于 b"
else
  echo "没有符合的条件"
fi

```

## for 循环

```shell
for i in 1 2 3 4 5
  do 
    echo "for loop: $i"
  done

for i in this is a str
  do 
    echo "for loop:$i"
  done

```

## while 循环

while : 无限循环
while true 无限循环

```shell
i = 1 
while (($i <= 5))
  do 
    echo "while loop: $i"
    let i++
  done
```

while 可以循环读取键盘输入

```shell
echo '按下ctrl + D 退出'
echo 'please enter your favorite website'
while read website
  do
    echo " $website is a good website"
  done
```

## util 循环

```shell
j=2
until [ $j -gt 5 ]
do
  echo "util loop: $j "
  let j++
done

```

## case 循环

```shell
echo "please enter a number between 1 and 4"
read n
case $n in
1) echo "you choose 1"
;;
2) echo "you choose 2"
;;
3) echo "you choose 3"
;;
4) echo "you choose 4"
;;
*) echo "you choose other"
;;
esac
```

## break continue

break 退出所有循环 continue 跳出当前循环

```shell
while :
  do 
    echo "please enter a numer between 1 and 5"
    read n
    case $n in 
        1|2|3|4|5)
        echo "you enter $n"
        ;;
        *) 
        echo "not 1 - 5"
        # break
        continue
      ;;
    esac
  done


```
