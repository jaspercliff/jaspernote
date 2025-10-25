# tuple

元组是一种不可变的序列类型，可以存储任意类型的元素

```python
# tuple是一种不可变的序列类型（一旦创建，就不能修改其中的元素） 可以存储不同的数据类型

tpl = (1, 2, 3, 4, 5,'hello')
print(tpl, type(tpl))  # 输出：(1, 2, 3, 4, 5) <class 'tuple'>

# 访问元组元素
print(tpl[0])  # 输出：1

# 元组切片
tpl_slice = tpl[1:4]
print(tpl_slice)  # 输出：(2, 3, 4)

# tpl[0] = 2 'tuple' object does not support item assignment

# 元组解构赋值
print("元组解构赋值")
t = (1,2,3)
a,b,c = t
print(a)
print(b)
print(c)

# 使用下划线来忽略元组中的值
e,_,f = t
print(e)
print(f)
# 元组解构赋值与函数
def test():
    return 10,20
j,h = test()
print(j)
print(h)
# 可变数量的元组解构赋值
t1 = (1,2,3,4,5)
h,i,*res= t1
print(h)
print(i)
print(res)

# 元组解构赋值与交换变量
a1 = 10
a2 = 20

a1,a2 = a2,a1
print(a1)
print(a2)

```
