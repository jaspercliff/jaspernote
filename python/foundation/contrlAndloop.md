# 控制循环

## 条件判断

```python
if condition:
    # 条件为真时执行
elif another_condition:
    # 前面的条件为假且该条件为真时执行
else:
    # 上面的条件都为假时执行
```

## 布尔表达式与比较运算

常见比较运算符：

 • == 相等，!= 不等
 • <, <=, >, >=
 • is, is not —— 比较对象身份（是否是同一个对象），不要用 is 比较数值/字符串内容
逻辑运算：

 • and、or、not（短路求值）

判断浮点数：

print(0.1 + 0.2 == 0.3)
print(math.isclose(0.1 + 0.2, 0.3))

## 三元表达式、match（Python 3.10+）

```python
b = "yes" if a >= 10 else "no"
print(b)
```

```python
c = "2"
match c:
    case 1:
        print("c=1")
    case "2":
        print("c is '2' ")
    case 10:
        print("c is 10 ")
    case _:
        print("no match")
```
