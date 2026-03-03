# bitmap

位图并非实际的数据类型，而是一组定义在字符串类型上的面向位的操作，字符串类型被视为位向量,
maximum length is 512 MB

- setbit
- getbit
- bitfield(查询 修改 删除)  bitfield key get u3 0  :u3 无符号整数3位 从0开始
- bitcount 获取为1的
- bitpos Finds the first set (1) or clear (0) bit in a string

## bitfield

BITFIELD key [GET type offset] [SET type offset value] [INCRBY type offset increment] [OVERFLOW WRAP|SAT|FAIL]
Type (类型)：这是最酷的地方。
 u5：无符号 5 位整数（取值 0~31)
 i8：有符号 8 位整数（取值 -128~127）。
最大支持 i64 或 u63。
Offset (偏移量)：
绝对位偏移：如 0 表示从第 1 位开始。
类型倍数偏移：如 #1。如果是 u8，#1 自动指向第 8 位（即第二个字节）
