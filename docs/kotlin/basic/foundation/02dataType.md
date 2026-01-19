# data type

## 一、 数值类型 (Numeric Types)

### 1. 有符号整数 & 浮点数

| 数据类型 | 描述 (位宽) | 示例代码 |
| :--- | :--- | :--- |
| **`Byte`** | 8位有符号整数 (-128 ~ 127) | `val b: Byte = 1` |
| **`Short`** | 16位有符号整数 | `val s: Short = 100` |
| **`Int`** | 32位有符号整数 (默认) | `val i: Int = 10` |
| **`Long`** | 64位有符号整数 (后缀 `L`) | `val l: Long = 1L` |
| **`Float`** | 32位浮点数 (后缀 `F`) | `val f: Float = 1.0F` |
| **`Double`** | 64位浮点数 (默认) | `val d: Double = 3.14` |

### 2. 无符号整数 (Unsigned)
>
> [!NOTE]
> 无符号类型需要后缀 `u` 或 `uL`。

| 数据类型 | 描述 (范围) | 示例代码 |
| :--- | :--- | :--- |
| **`UByte`** | 8位 (0 ~ 255) | `val ub: UByte = 255u` |
| **`UShort`** | 16位 (0 ~ 65535) | `val us: UShort = 1000u` |
| **`UInt`** | 32位 (0 ~ 2^32 - 1) | `val ui: UInt = 10u` |
| **`ULong`** | 64位 (0 ~ 2^64 - 1) | `val ul: ULong = 100uL` |

---

## 二、 基础类型 (Basic Types)

| 类型类别 | 数据类型 | 描述 | 示例 |
| :--- | :--- | :--- | :--- |
| **字符** | `Char` | 单个字符，使用单引号 | `val c: Char = 'A'` |
| **布尔** | `Boolean` | 逻辑值 `true` 或 `false` | `val isReady: Boolean = true` |
| **字符串** | `String` | 不可变字符序列 | `val s: String = "Hello"` |
| **数组** | `Array<T>` | 泛型数组 | `val a = arrayOf(1, 2, 3)` |

---

## 三、 特殊类型 (Special Types)

| 数据类型 | 说明 | 典型用法 |
| :--- | :--- | :--- |
| **`Unit`** | 类似 Java 的 `void`，表示无返回值 | `fun printLog(): Unit { ... }` |
| **`Nothing`** | 表示程序永远不会到达的终点 | `fun fail(): Nothing { throw Exception() }` |
| **`Any`** | 所有非空类型的根（基类） | `val x: Any = "can be anything"` |

---

## 四、 重要特性：空安全性 (Null Safety)

Kotlin 通过类型系统强制区分**可空**与**非空**。

* **非空类型**：`var a: Int = 10`（不能赋值为 `null`）
* **可空类型**：`var b: Int? = null`（在类型后加 `?`）

> [!IMPORTANT]
> 虽然 Kotlin 在 JVM 上会将基本类型编译为原始类型（如 `int`），但当使用可空类型（如 `Int?`）或泛型时，它会自动进行**装箱**（Boxed）处理。
