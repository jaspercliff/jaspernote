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

