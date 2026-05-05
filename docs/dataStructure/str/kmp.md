# kmp

KMP（Knuth–Morris–Pratt）是经典的字符串匹配算法，核心作用：

- 在一个长字符串（文本）中，快速查找某个子串（模式串）
- 时间复杂度：O(n + m)（不会回退主串指针）

在暴力匹配中，如果模式串在第 j 位失配，主串指针 i 会回退到起始位置的下一位。
而 KMP 发现：失配位之前的字符我们已经知道了。
通过预处理模式串，我们可以得到一个 Next 数组（也叫 LPS：Longest Proper Prefix which is also Suffix）。
它记录了：当第 j 位失配时，模式串应该跳到哪个位置继续匹配。

next数组，最长相等前后缀


![kmp](./assets/kmp.png)

