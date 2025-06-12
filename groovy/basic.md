# basic

## def

在 **Groovy** 中，`def` 是一个非常常用的关键字，用于**声明变量**。它的最大特点是：

> ✅ **类型推断（Type Inference）**

也就是说，你不需要显式地指定变量的类型，Groovy 会根据赋值自动推断出变量的类型。

---

### 📌 一、基本用法

```groovy
def name = "Jasper"         // 推断为 String
def age = 25                // 推断为 Integer
def pi = 3.14               // 推断为 BigDecimal 或 Double
def isActive = true         // 推断为 Boolean
def list = [1, 2, 3]        // 推断为 List
def map = [name: "Jasper", age: 25]  // 推断为 Map
```

这些变量都可以正常使用，无需指定 `String name`、`int age` 等类型。

---

### 🧠 二、def 的作用

| 使用场景    | 示例                                            | 说明         |
|---------|-----------------------------------------------|------------|
| 声明局部变量  | `def x = 10`                                  | 可以是任意类型    |
| 方法返回值类型 | `def calculate() { return 42 }`               | 返回值可以是任何类型 |
| 方法参数类型  | `def printValue(def value) { println value }` | 参数也可以不指定类型 |

---

### ⚠️ 三、注意事项

#### 1. **动态类型特性**

Groovy 是一种动态语言，使用 `def` 声明的变量可以在运行时改变类型：

```groovy
def x = 10
x = "Hello"   // 合法！x 现在是字符串类型
```

这跟 Java 不同，Java 中变量一旦声明类型就不能更改。

---

#### 2. **与静态类型对比**

| 方式     | 示例                    | 是否推荐                 |
|--------|-----------------------|----------------------|
| 使用 def | `def name = "Tom"`    | ✅ 灵活方便，适合脚本开发        |
| 显式类型   | `String name = "Tom"` | ✅ 更清晰，适合大型项目或 IDE 提示 |

> 在 JMeter 的 JSR223 脚本中，由于脚本较短且常用于测试和调试，推荐使用 `def`。

---

### 🧪 四、在 JMeter 中使用 def 的常见场景

```groovy
// 定义变量
def now = new Date()
def timeStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(now)

// 存入 JMeter 变量
vars.put("currentTime", timeStr)

// 打印日志
log.info("当前时间：$timeStr")
```

---

### 🔍 五、何时使用 def？何时写具体类型？

| 场景          | 推荐做法                                |
|-------------|-------------------------------------|
| 快速编写脚本、测试逻辑 | ✅ 使用 `def`                          |
| 开发插件、复杂业务逻辑 | ✅ 使用具体类型（如 `String`, `List`, `Map`） |
| 提高代码可读性     | ✅ 显式写出类型更好                          |
| 与 Java 混合编程 | ✅ 有时需要明确类型                          |

---

### ✅ 六、总结

| 特点                            | 描述                            |
|-------------------------------|-------------------------------|
| `def` 是 Groovy 中的“无类型”变量声明关键字 | 类似 JavaScript 的 `var` / `let` |
| 支持动态类型转换                      | 一个变量可以随时变成不同类型的值              |
| 推荐用于脚本开发                      | 尤其适合 JMeter、Gradle 等轻量级脚本场景   |
| 大型项目建议显式类型                    | 提高可维护性和 IDE 支持                |
