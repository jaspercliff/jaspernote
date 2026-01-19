# 动态规划

动态规划（Dynamic Programming，简称DP）是一种用于解决复杂问题的算法设计方法，特别适用于具有重叠子问题和最优子结构性质的问题。
它的核心思想是通过将**问题分解为更小的子问题，并存储这些子问题的解**（通常通过表格或数组），从而避免重复计算，提高效率。

## 动态规划的基本概念

1. **重叠子问题**：问题可以被分解为多个相似的子问题，这些子问题在求解过程中会被多次重复计算。动态规划通过存储子问题的解来避免重复计算。

2. **最优子结构**：问题的最优解可以通过其子问题的最优解来构造。也就是说，全局最优解依赖于局部最优解。

3. **状态转移方程**：描述如何从子问题的解推导出更大问题的解。状态转移方程是动态规划的核心，通常表示为递推公式。

## 动态规划的步骤

1. **定义状态**：明确问题的状态表示。状态通常用一个或多个变量表示，描述问题的某个阶段或子问题。

2. **确定状态转移方程**：找出状态之间的关系，即如何从一个状态转移到另一个状态。这通常通过递推公式表示。

3. **初始化**：确定初始状态的值，通常是问题的最小规模或边界情况。

4. **计算顺序**：确定计算状态的顺序，通常是从小到大或从简单到复杂，确保在计算某个状态时，其所依赖的子状态已经计算完毕。

5. **返回结果**：根据状态的定义，返回最终问题的解。

## 动态规划的两种实现方式

1. **自顶向下（Top-Down）**：也称为记忆化搜索（Memoization）。从原问题出发，递归地分解为子问题，并在递归过程中存储子问题的解，避免重复计算。通常使用递归函数和缓存（如哈希表）来实现。

2. **自底向上（Bottom-Up）**：从最小的子问题开始，逐步构建更大的问题的解。通常使用迭代和表格（如数组）来实现。

### 动态规划的经典问题

1. **斐波那契数列**：计算第n个斐波那契数。通过存储已经计算过的斐波那契数，避免重复计算。

2. **背包问题**：给定一组物品，每个物品有重量和价值，如何在不超过背包容量的情况下，选择物品使得总价值最大。

3. **最长公共子序列（LCS）**：给定两个序列，找出它们的最长公共子序列。

4. **最短路径问题**：如Dijkstra算法和Floyd-Warshall算法，用于求解图中的最短路径。

### 示例：斐波那契数列

**问题描述**：计算第n个斐波那契数，定义为F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)。

**动态规划解法**：

1. **定义状态**：dp[i]表示第i个斐波那契数。

2. **状态转移方程**：dp[i] = dp[i-1] + dp[i-2]。

3. **初始化**：dp[0] = 0, dp[1] = 1。

4. **计算顺序**：从2到n，依次计算dp[i]。

5. **返回结果**：dp[n]。

**代码实现（自底向上）**：

```java
public class Fibonacci {
    // 自底向上的动态规划实现
    public static int fibonacciBottomUp(int n) {
        if (n == 0) return 0;
        if (n == 1) return 1;

        // 定义dp数组，存储子问题的解
        int[] dp = new int[n + 1];
        dp[0] = 0; // 初始化
        dp[1] = 1; // 初始化

        // 从2到n，逐步计算dp[i]
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2]; // 状态转移方程
        }

        return dp[n]; // 返回结果
    }

    public static void main(String[] args) {
        int n = 10;
        System.out.println("Fibonacci(" + n + ") = " + fibonacciBottomUp(n));
    }
}
```

**代码实现（自顶向下，记忆化搜索）**：

```java
import java.util.HashMap;
import java.util.Map;

public class Fibonacci {
    // 自顶向下的动态规划实现（记忆化搜索）
    public static int fibonacciTopDown(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) { // 如果已经计算过，直接返回
            return memo.get(n);
        }
        if (n == 0) return 0; // 边界条件
        if (n == 1) return 1; // 边界条件

        // 递归计算并存储结果
        int result = fibonacciTopDown(n - 1, memo) + fibonacciTopDown(n - 2, memo);
        memo.put(n, result); // 将结果存入备忘录
        return result;
    }

    public static void main(String[] args) {
        int n = 10;
        Map<Integer, Integer> memo = new HashMap<>(); // 用于存储中间结果
        System.out.println("Fibonacci(" + n + ") = " + fibonacciTopDown(n, memo));
    }
}


```

在斐波那契数列问题中，dp[i] 只依赖于 dp[i-1] 和 dp[i-2]，因此可以优化空间复杂度，只使用两个变量来存储中间结果。

```java
public class Fibonacci {
    // 优化空间复杂度的自底向上实现
    public static int fibonacciOptimized(int n) {
        if (n == 0) return 0;
        if (n == 1) return 1;

        int prev2 = 0; // dp[i-2]
        int prev1 = 1; // dp[i-1]
        int result = 0;

        for (int i = 2; i <= n; i++) {
            result = prev1 + prev2; // 计算dp[i]
            prev2 = prev1; // 更新dp[i-2]
            prev1 = result; // 更新dp[i-1]
        }

        return result;
    }

    public static void main(String[] args) {
        int n = 10;
        System.out.println("Fibonacci(" + n + ") = " + fibonacciOptimized(n));
    }
}
```

### 总结

动态规划是一种强大的算法设计方法，适用于解决具有重叠子问题和最优子结构性质的问题。通过合理地定义状态、确定状态转移方程，并选择合适的计算顺序，可以高效地求解复杂问题。

## 相关题目

- [1](https://leetcode.cn/problems/unique-paths-ii/description/?envType=daily-question&envId=2025-02-08)
