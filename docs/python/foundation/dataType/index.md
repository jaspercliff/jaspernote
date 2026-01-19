# data type

## 数字类型

### int float complex

```python
# 整数
a = 10
b = -5
c = 0

print(a, type(a))  # 输出：10 <class 'int'>
print(b, type(b))  # 输出：-5 <class 'int'>
print(c, type(c))  # 输出：0 <class 'int'>

# 浮点数

x = 3.14
y = -0.001
z = 2.0

print(x, type(x))  # 输出：3.14 <class 'float'>
print(y, type(y))  # 输出：-0.001 <class 'float'>
print(z, type(z))  # 输出：2.0 <class 'float'>

# 复数
p = 1 + 2j
q = -3j
r = 4 + 0j

print(p, type(p))  # 输出：(1+2j) <class 'complex'>
print(q, type(q))  # 输出：-3j <class 'complex'>
print(r, type(r))  # 输出：(4+0j) <class 'complex'>
```

## 序列类型

### string

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

### list

列表是一种可变的序列类型，可以存储任意类型的元素

```python
lst = [1, 2, 3, 4, 5]
print(lst, type(lst))  # 输出：[1, 2, 3, 4, 5] <class 'list'>

# 访问列表元素
print(lst[0])  # 输出：1

# 修改列表元素
lst[1] = 10
print(lst)  # 输出：[1, 10, 3, 4, 5]

# 列表切片
lst_slice = lst[1:4]
print(lst_slice)  # 输出：[10, 3, 4]

# 列表方法
lst.append(6)
print(lst)  # 输出：[1, 10, 3, 4, 5, 6]

# 列表中的元素可以是不同的数据类型
my_list = [1, 2, 3, 'hello', 5.0]
print(my_list)
```

### tuple

- [tuple](tuple.md)

## 映射类型

映射类型包括字典（dict），它是一种键值对的集合。

### 字典（dict）

字典用于存储键值对，键必须是唯一的。

```python
d = {'name': 'Alice', 'age': 25, 'city': 'New York'}
print(d, type(d))  # 输出：{'name': 'Alice', 'age': 25, 'city': 'New York'} <class 'dict'>

# 访问字典元素
print(d['name'])  # 输出：Alice

# 修改字典元素
d['age'] = 26
print(d)  # 输出：{'name': 'Alice', 'age': 26, 'city': 'New York'}

# 添加字典元素
d['country'] = 'USA'
print(d)  # 输出：{'name': 'Alice', 'age': 26, 'city': 'New York', 'country': 'USA'}

d['sex'] = 'Male'
print(d)
```

## 集合类型

### 集合（set）

集合用于存储唯一元素。

```python
s = {1,2,3,4,5}

print(s,type(s)) # {1, 2, 3, 4, 5} <class 'set'>
# 添加元素
s.add(6)
print(s) #{1, 2, 3, 4, 5, 6}
# 删除元素
s.remove(6)
print(s) #{1, 2, 3, 4, 5}
```

### frozenset

frozenset是不可变集合，即不能添加或删除元素。

```python
fs = frozenset([1,2,3,4,5])
print(fs,type(fs)) # frozenset({1, 2, 3, 4, 5}) <class 'frozenset'>
```

## 其他内建数据类型

### bool

```python
print(True == 1)
print(False == 0)
```

### None

```python
print(None == 0)
print(None == False)

n = None
print(n,type(n)) # None <class 'NoneType'>
```

## 参考

```python
text = "hello world hello python"

# 任何空白字符（包括空格、换行 \n、回车 \r 等）都将作为分隔符
# maxsplit：指定分割的最大次数。-1（默认值）表示没有限制，即尽可能多地进行分割
words = text.split()

word_count = {}
for word in words:
    if word in word_count:
        word_count[word] += 1
    else:
        word_count[word] = 1

print(word_count)  # 输出：{'hello': 2, 'world': 1, 'python': 1}
```

```python
numbers = [1, 2, 3, 1, 2, 4, 5]
unique_numbers = list(set(numbers))

print(unique_numbers)  # 输出：[1, 2, 3, 4, 5]
```
