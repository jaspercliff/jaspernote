# 单调栈 

monotonic stack： 它在普通栈（先进后出）的基础上，额外保持一个单调性：

* 要么栈内元素从栈底到栈顶单调递增  
* 要么单调递减

当推入新元素时，与栈顶比较，如果破坏了单调性，就一直pop 直到恢复单调性，然后推入新元素

For arr[] = [1, 7, 9, 5]:

Push 1 → [1]
Push 7 → [1, 7] (since 7 > 1, order holds)
Push 9 → [1, 7, 9] (since 9 > 7, order holds)
Push 5 → pop 9, pop 7, then push 5 → [1, 5]


## scene 

- 在流式数据中，快速找到“最近的更大/更小”并淘汰无效数据
- 需要找到左边或右边第一个比自己大/小的数。
- 需要计算以某个值为最值的最大区间。
- 需要处理“凹陷”或“凸起”的结构（如雨水、矩形面积）

### 1475. 商品折扣后的最终价格


```text 
给你一个数组 prices ，其中 prices[i] 是商店里第 i 件商品的价格。

商店里正在进行促销活动，如果你要买第 i 件商品，那么你可以得到与 prices[j] 相等的折扣，其中 j 是满足 j > i 且 prices[j] <= prices[i] 的 最小下标 ，如果没有满足条件的 j ，你将没有任何折扣。

请你返回一个数组，数组中第 i 个元素是折扣后你购买商品 i 最终需要支付的价格。

󰛨 示例 1：

	│ 输入：prices = [8,4,6,2,3]
	│ 输出：[4,2,4,2,3]
	│ 解释：
	│ 商品 0 的价格为 price[0]=8 ，你将得到 prices[1]=4 的折扣，所以最终价格为 8 - 4 = 4 。
	│ 商品 1 的价格为 price[1]=4 ，你将得到 prices[3]=2 的折扣，所以最终价格为 4 - 2 = 2 。
	│ 商品 2 的价格为 price[2]=6 ，你将得到 prices[3]=2 的折扣，所以最终价格为 6 - 2 = 4 。
	│ 商品 3 和 4 都没有折扣。
```

单调递增栈

8  push 8 
4 pop 8 push 4 
6 push 6 
2 while(pop 6 pop 4) push 2 
3 push 3 


```java 
class Solution {
    public int[] finalPrices(int[] prices) {
        int n = prices.length;
        int[] res = Arrays.copyOf(prices, n);
        ArrayDeque<Integer> stack = new ArrayDeque<Integer>();

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && prices[i] <= prices[stack.peek()]) {
                int id = stack.pop();
                res[id] -= prices[i];
            }
            stack.push(i);
        }
        return res; // 最终栈中 [3 4 ] ->[2,3]
    }
}
```

### 84 柱状图中最大的矩形

给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。

输入：heights = [2,1,5,6,2,3]
输出：10
解释：最大的矩形为图中红色区域，面积为 10
```java
class Solution {
    public int largestRectangleArea(int[] heights) {
        int area = 0;
        ArrayDeque<Integer> stack = new ArrayDeque<Integer>();
        int n = heights.length;
        int[] newHeights = new int[n + 2];
        System.arraycopy(heights, 0, newHeights, 1, n);
        int h = 0, w = 0;
        for (int i = 0; i < newHeights.length; i++) {
            while (!stack.isEmpty() && newHeights[i] < newHeights[stack.peek()]) {
                Integer pop = stack.pop();
                h = newHeights[pop];
                w = i - stack.peek() - 1;
                area = Math.max(area, h * w);
            }
            stack.push(i);
        }
        return area;
    }
}
```
