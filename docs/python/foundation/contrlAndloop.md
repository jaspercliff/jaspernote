# 控制循环

## 控制

### 条件判断

```python
if condition:
    # 条件为真时执行
elif another_condition:
    # 前面的条件为假且该条件为真时执行
else:
    # 上面的条件都为假时执行
```

### 布尔表达式与比较运算

常见比较运算符：

 • == 相等，!= 不等
 • `<`, `<=`, `>`, `>=`
 • is, is not —— 比较对象身份（是否是同一个对象），不要用 is 比较数值/字符串内容
逻辑运算：

 • and、or、not（短路求值）

判断浮点数：

print(0.1 + 0.2 == 0.3)
print(math.isclose(0.1 + 0.2, 0.3))

### 三元表达式、match（Python 3.10+）

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

## 循环

### for and while

```pythonfruits = ["apple", "banan", "watermelon"]
# list
for i in fruits:
    print(i)
# string 遍历
for c in "hello":
    print(c)
# range
for i in range(3):
    print(i)  # 0 1 2
for i in range(1, 10, 2):
    print(i)  # 1 3 5 7 9
# 多重变量解包（遍历元组/列表的元素对）
pairs = [(1, "a"), (2, "c")]
for num, ch in pairs:
    print(num, ch)

n = 3
while n < 5:
    print("========n = ", n)
    n += 1
else:
    print("for and while 没有执行break会走到else")
```

### 常用模式和内置工具

```python
# 遍历可迭代对象 获取索引和值
# 0 1
# 1 2
# 2 3
lst = [1, 2, 3]
for idx, val in enumerate(lst, 0):
    print(idx, val)

# 并行遍历多个序列，组合起来返回一个元组 length以最短序列为准
# 1 jasper
# 2 cliff
lst1 = ["jasper", "cliff"]
for id, name in zip(lst, lst1):
    print(id, name)

# 倒序 排序
for x in reversed([1, 2, 3]):
    print(x)
for x in sorted([1, 3, 2]):
    print(x)

print("================")
d = {1: "a", 2: "b"}
# key
for k in d:
    print(k)
# key
for k in d.keys():
    print(k)
# values
for v in d.values():
    print(v)
# key and values
for k, v in d.items():
    print(k, v)
```

### list/set/dict 推导式

```python
# list/set/dict 推导式
# 循环（for）、条件（if） 和 生成新元素 的过程压缩成一行
# [表达式 for 变量 in 可迭代对象 if 条件] 列表

lst = [1, 2, 3, 4]

lst1 = [x * x for x in lst if x % 2 == 0]
print(lst1)  # [4, 16]

# {表达式 for 变量 in 可迭代对象 if 条件} 集合

set1 = {1, 2, 3}
set2 = {x * x for x in set1 if x % 2 == 0}
print(set2)  # {4}

words = ["apple", "banan", "watermelon"]
dict = {x: len(x) for x in words if len(x) > 3}
print(dict)  # {'apple': 5, 'banan': 5, 'watermelon': 10}

```

### 生成器表达式与生成器函数

```python
# 生成器表达式 生成器函数
# 生成器表达式
# (expr for x in iterable)
# 和列表推导式相似 [] 更换为（） 惰性求职 需要的时候才计算
g = (x * x for x in [1, 2, 3])
print(g)  # <generator object <genexpr> at 0x1094c2f60>
for x in g:
    print(x)  # 1 4 9
# 生成器函数
# 边执行边产出的函数 使用yield替换return 调用时，不会立即执行 而是会返回一个生成器对象使用next 或者for继续向下执行
# 遇到yield时，会暂停在这行 保持当前所有局部变量、栈等 下次继续执行时，从当前yield继续执行
# 适合大数据处理，不需要一次将所有内容加载到内存中


def gen():
    print("start")
    yield 1
    print("medium")
    yield 2
    print("end")
    yield 3


g = gen()
print(next(g))
print(next(g))
print(next(g))
print(next(g))  # 抛 StopIteration，自动关闭
# g.close() 手动关闭
```

### itertools

itertools 是 Python 内置的高性能迭代器工具库，专门用来处理各种“迭代”“组合”“排列”“无限序列”等场景。它的实现都是用 C 写的，因此比自己写循环更快、更省内存。
