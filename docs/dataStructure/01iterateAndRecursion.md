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

## 回溯

通过试错来寻找问题的解决方案，需要遍历所有的候选结果

回溯通常是在递归的基础上进行状态的回退。比如在选择一个数字后，进入下一层递归，当递归返回时，需要撤销当前的选择，以便尝试其他可能的选项。

剪枝是回溯算法中优化效率的关键步骤。比如在组合问题中，当剩余的数字不足以凑成所需的组合大小时，可以提前终止当前路径的搜索，减少不必要的递归

### 核心思想

1. 试探性选择：逐步构建候选解，每一步选择一个可能的选项。
2. 约束检查：若当前选择满足所有约束条件，则继续递归构建下一步。
3. 回退：若当前选择导致后续无法满足条件，则撤销该选择（回溯），回到上一步尝试其他选项。
