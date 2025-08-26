# Collections

## emptyList 
返回一个空的，不可变的List

- 避免空指针异常
- 语义清晰


## singletonList

返回一个单个元素、不可变的list

- 只传递包含一个元素的list，且不希望接收方修改它
- 需要高性能的不可变的单个元素的list

``` java
Collections.SingletonList("hello")
```