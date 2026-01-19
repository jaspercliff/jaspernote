# function

使用fun 定义函数  ：定义参数类型及返回类型

```kotlin
fun sum(x:Int,y: Int):Int {
    return x+y
}
```

默认参数

```kotlin
//默认参数  Unit 代表函数没有返回值 类似java中的void 没有必要写
fun printHello(first: String,last:String = "world"): Unit {
    println("$first,$last")
}

```

传入参数的名字，参数顺序任意定义

```kotlin
//    命名参数 包含参数名称 可以任意定义参数顺序
println(" 命名参数 = ${sum(y=10,x=5)}")
```

## lambda

lambda 是一种匿名函数 可以作为表达式传递
可以有一个或者多个参数 如果只有一个参数 可以使用it引用该参数 或者直接省略

```kotlin
    // normal stream
fun upperCaseString(str: String): String = str.uppercase()
println(upperCaseString("test"))
val upperCaseString1= { text: String -> text.uppercase() }
println(upperCaseString1("test122"))
val numbers = listOf<Int>(1, 2, 3, 4)
numbers.map { it*2 }.forEach { println(it) }
```

传递给另外一个函数

```kotlin
//pass to another function
val positive = { x: Int -> x < 0 }
// 传入一个int 类型的参数 返回为boolean
val negative: (Int) -> Boolean = { x: Int -> x > 0 }
val list = listOf(1, 2, 3,-1,-2,-3)
val positiveNumbers = list.filter(positive)
val negateNumbers = list.filter(negative)

println(positiveNumbers)
println(negateNumbers)
```

### 尾随lambda

```kotlin
    // 传统语法
    listOf(1, 2, 3).forEach(  {x->println(x)})

    // 尾随 Lambda 语法（更常见） 当lambda是函数的最后一个参数时，可以将lambda放到（）外面
    listOf(1, 2, 3).forEach { println(it) }

//    尾随lambda
    println(listOf(1, 2, 3).fold(0, { x, item -> x + item })) // 6
    println(listOf(1, 2, 3).fold(0) { x, item -> x + item })  // 6
```

### 高阶函数和lambda

- lambda 可以从函数返回

```kotlin
//    lambda可以从函数返回  (Int) -> Int 返回一个lambda表达式
    fun test(x: Int):(Int) -> Int{
        if (x >0){
            return { x-> x*2}
        }else{
            return {x -> x-2}
        }
    }

    val test = test(6)

    val list1 = listOf<Int>(1, 2, 3, 4)
    val list2 = list1.map(test)
    println(list2)
```

- 作为函数参数

```kotlin
    fun operator(x:Int,y:Int,operation:(Int,Int)-> Int):Int{
        return operation(x,y)
    }
    println(operator(5,6) { x,y -> x+y })
    println(operator(5,6) { x,y -> x*y})
```
