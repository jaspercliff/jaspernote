# kotlin keyword

## 一、 关键字分类 (Key Concepts)

| 分类 | 关键字清单 |
| :--- | :--- |
| **🛡️ 访问控制** | `private` · `protected` · `public` · `internal` |
| **🏗️ 类/对象/接口** | `class` · `interface` · `object` · `enum` · `annotation` · `companion` · `data` · `sealed` · `typealias` |
| **⚙️ 函数相关** | `fun` · `operator` · `infix` · `inline` · `noinline` · `crossinline` · `tailrec` · `external` · `suspend` · `expect` · `actual` |
| **📦 变量与属性** | `var` · `val` · `lateinit` · `const` · `by` · `field` |
| **🚦 流程控制** | `if` · `else` · `when` · `for` · `while` · `do` · `break` · `continue` · `return` · `throw` · `try` · `catch` · `finally` |
| **🧬 类型系统** | `is` · `!is` · `as` · `as?` · `typeof` · `dynamic` |
| **🎨 核心修饰符** | `abstract` · `final` · `open` · `override` · `reified` · `vararg` |

---

## 二、 可见性修饰符 (Visibility Modifiers)

> Kotlin 的默认可见性是 **`public`**。

| 修饰符 | 可见性说明 | 适用范围 |
| :--- | :--- | :--- |
| **`private`** | **仅声明处可见**：文件内或类内部。 | 类、接口、对象、顶层声明 |
| **`protected`** | **子类可见**：类成员及其子类可见。 | 类与接口的成员（不可用于顶层） |
| **`internal`** | **模块可见**：同一 `Module` 内均可访问。 | 所有声明 |
| **`public`** | **全公开**：任何地方均可访问。 | 所有声明 |

## 三、 核心辨析：`const val` vs `val`

### 1. `val` (Runtime Constant)

* **性质**：只读变量，运行时确定值。
* **特点**：可以分配给函数返回值或表达式。
* **场景**：`val currentTime = System.currentTimeMillis()`

### 2. `const val` (Compile-time Constant)

* **性质**：编译时常量。
* **特点**：
  * 只能用于基本类型（Primitive）和 String。
  * 必须在顶层（Top-level）或 `object` 中声明。
  * 编译器会进行“常量折叠”，将引用处直接替换为字面量，效率更高。
* **场景**：`const val BASE_URL = "https://api.example.com"`
