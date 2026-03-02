# collection

## list

### fold

```kotlin
val list3 = listOf<Int>(1, 2, 3)
//    从一个初始值出发 依次处理集合中的每个元素
val fold = list3.fold(1, { acc, i -> acc + i })
val fold1 = list3.fold(0){i,item->i+item}
println("fold of list is $fold")
println("fold1 of list is $fold1")
```
