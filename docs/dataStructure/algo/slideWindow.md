# slide the window

## 相关题目

- [3297](https://leetcode.cn/problems/count-substrings-that-can-be-rearranged-to-contain-a-string-i/description/?envType=daily-question&envId=2025-01-09)
- [list](https://leetcode.cn/circle/discuss/0viNMK/)

## concept

主要用于处理数组或列表中的一些连续子集问题。它通过维护一个窗口，这个窗口可以在序列上向右滑动，从而有效地解决问题。
滑动窗口算法通常用于解决需要考虑连续元素的子数组或子串的问题，如查找满足某些条件的最大或最小长度的子数组等

其核心思想是通过在数组或序列上维护一个动态窗口来减少重复计算，从而提高算法效率

## 滑动窗口的两种类型

- 固定大小的滑动窗口：窗口的大小是固定的，通常用于求解最大值、最小值、求和等问题。每次滑动窗口，都会移除窗口最左边的元素，并加入新的元素。

- 可变大小的滑动窗口：窗口大小是可变的，通常用于处理某些动态范围问题，比如最长子串、满足条件的子数组等。在这种情况下，窗口的大小会根据条件的变化动态调整。

## 固定窗口大小

```java
package com.jasper.slidethewindow;

/**
 * @version 1.0
 * @Author jasper
 * @Date 2025-01-09
 * @Description 在数组中查找连续k个元素的最大值
 */
public class Demo1 {
    /**
     * 固定窗口大小   先加出第一个窗口的和currentSum  然后向右移动  左边减去一个currentSum - num[i-k]  右边加一个
     * 3   3-1  3-1+(-3)
     * @param nums 数组
     * @param k  连续k个元素
     * @return max value
     */
    public static int maxSubArraySum(int[] nums, int k) {
        int maxSum = 0;
        int currentSum = 0;
        for (int i = 0; i < k; i++) {
            currentSum += nums[i];
        }
        maxSum = currentSum;
        System.out.println(currentSum);
        for (int i = k; i < nums.length; i++) {
            currentSum = currentSum - nums[i - k] + nums[i];
            maxSum = Math.max(maxSum, currentSum);
            System.out.println(currentSum);  // 3 -1 1 5 14 16
        }
        return maxSum;
    }

    public static void main(String[] args) {
        int[] nums = {1, 3, -1, -3, 5, 3, 6, 7};
        int k = 3;
        int maxSum = maxSubArraySum(nums, k);
        System.out.println("连续 " + k + " 个元素的最大和为：" + maxSum); // 输出：16
    }
}
```

## 可变窗口大小

```java
package com.jasper.slidethewindow;

/**
 * @version 1.0
 * @Author jasper
 * @Date 2025-01-09
 * @Description 给定一个正整数数组 nums 和一个正整数 target，找到 nums 中和为 target 的最短连续子数组，并返回其长度。如果不存在这样的子数组，则返回 0。
 */
public class Demo2 {

    /**
     * 可变窗口大小 从左往右一直加   大于target了  左边一直减 减到小于target了 右边再加   length = right-left+1
     * @param nums
     * @param target
     * @return
     */
    public static int minSubArrayLen(int[] nums,int target){
        int left = 0;
        int right = 0;
        int minLen = Integer.MAX_VALUE;
        int sum = 0;
        while (right < nums.length){
            sum += nums[right];
            while (sum>=target){
                sum -= nums[left];
                minLen = Math.min(minLen,right-left+1);
                left++;
            }
            right++;
        }
        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }
    public static void main(String[] args) {
        int[] nums1 = {2, 3, 1, 2, 4, 3};
        int target1 = 7;
        System.out.println("最短子数组长度：" + minSubArrayLen(nums1, target1)); // 输出：2

        int[] nums2 = {1, 4, 4};
        int target2 = 4;
        System.out.println("最短子数组长度：" + minSubArrayLen(nums2, target2)); // 输出：1

        int[] nums3 = {1,1,1,1,1,1};
        int target3 = 10;
        System.out.println("最短子数组长度：" + minSubArrayLen(nums3, target3)); // 输出：0
    }
}

```
