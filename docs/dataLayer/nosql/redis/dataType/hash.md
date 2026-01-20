# hash

hash类型，散列，alue是一个无序字典,类似java中的hashmap  map`<`String,map`>`

- hset: Creates or modifies the value of a field in a hash. 替代hmset
- hget: Returns the value of a field in a hash
- hmset: deprecated hset
- hmget: Returns the values of list fields in a hash.
- hgetall: Returns all fields and values in a hash   --- java enteryset
- hkeys: Returns all fields in a hash                 --- java keys
- hvals: Returns all values in a hash                 --- java values.
- hincrby: Increments the integer value of a field in a hash by a number.
Uses 0 as initial value if the field doesn't exist.
- hsetnx: Sets the value of a field in a hash only when the field doesn't exist.
