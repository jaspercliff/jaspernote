# iterate and recursion


## 迭代 

迭代本质就是调用循环，直至满足某个条件


## 递归

函数直接或者间接的调用自己的情况

缺点： 
- 递归可能会导致大量的函数调用栈

```java
public class Factorial {
    public static int factorial(int n) {
        if (n == 0 || n == 1) { // 基准情况
            return 1;
        } else {
            return n * factorial(n - 1); // 递归情况
        }
    }

    public static void main(String[] args) {
        System.out.println(factorial(5)); // 输出: 120
    }
}
```
## 尾递归

函数的返回值直接是递归调用的结果，递归调用是函数执行的最后一步 

```python
def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n - 1) # 递归调用不是最后的操作，因为它之后还有乘法操作
```
```python
def factorial(n, accumulator=1):
    if n == 0 or n == 1:
        return accumulator
    else:
        return factorial(n - 1, n * accumulator) # 递归调用是最后的操作
```