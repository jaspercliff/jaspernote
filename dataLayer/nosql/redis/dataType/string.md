# string

Values can be strings (including binary data) of every kind, for instance you can
store a jpeg image inside a value. A value can't be bigger than 512 MB.

- set
- get
- mset
- mget
- incr: Increments the integer value of a key by one. Uses 0 as initial value
if the key doesn't exist.
- incrby: Increments the integer value of a key by a number. Uses 0 as initial
value if the key doesn't exist.
- incrbyfloat: Increment the floating point value of a key by a number. Uses 0
as initial value if the key doesn't exist.
- setex: Sets the string value and expiration time of a key. Creates the key if
it doesn't exist.
- setnx : Set the string value of a key only when the key doesn't exist.

setnx name jasper = set name jasper nx(设置name值，如果存在则不更新)
setex name jasper = set name jasper ex 20

incr是原子性的，不会出现多线程同时 操作一个值导致最终的值是错误的 x=10 a：x = x+1  b:x=x+1 x=12(java通过加锁或者aotmicInteger)
因为redis执行命令都是单线程串行执行的
