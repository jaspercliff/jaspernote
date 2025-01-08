# string

- ''' 或者 """可以表示多行字符串

```python
print("hello world")
print('''hello 
world''')
```

- `+`可以连接字符串       `*`可以重复字符串

```python
print("hello" + "world1")  # 字符串拼接
print("hello" * 3)  # 字符串重复
```

- \可以转义 使用r让反斜杠不发生转义

```python
print("test \n转义")
print(r"test \n转义") 
```

- 从左往右 0开始 从右往左-1开始

```python
str1 = 'jasper'
print(str1[0])  # 打印第一个元素
print(str1[0:-1]) # jaspe
# str1[0] = 's'   字符串不可变 TypeError: 'str' object does not support item assignment
```

- 没有单独的字符类型 字符就是长度为1的字符串 字符串截取   `变量[头下标:尾下标:步长]`

```python
print(str1[2:5:2])  # se  步长为2
```