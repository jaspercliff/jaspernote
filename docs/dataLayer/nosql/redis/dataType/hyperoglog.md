# hyperloglog

uv: unique visitor 访问该网页的用户，一天内用户多次访问只记录一次
pv: page view      打开一次页面记录一次 一般用来衡量网站的流量

HyperLogLog 是一种概率数据结构，用于估计集合的基数。作为一种概率数据结构，
HyperLogLog 牺牲了绝对的精确度，换取了高效的空间利用率。
HyperLogLog 实现最多使用 12 KB，标准误差为 0.81%。

用极小的空间，统计海量数据的“去重计数”（UV - Unique Visitors

- pfadd
- pfcount
