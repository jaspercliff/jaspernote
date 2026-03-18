---
sidebar_position: 1
title: 关键字

---

| 分类 | 关键字 | 说明 |
| :--- | :--- | :--- |
| **访问控制** | `private`, `protected`, `public` | 权限修饰符，定义可见性 |
| **类、方法和变量** | `class`, `interface`, `enum`, `extends`, `implements`, `new`, `this`, `super`, `instanceof` | 定义结构、继承关系与实例操作 |
| **数据类型** | `byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`, `void` | 8种基本数据类型及无返回值标识 |
| **流程控制** | `if`, `else`, `switch`, `case`, `default`, `while`, `do`, `for`, `break`, `continue`, `return` | 条件判断、循环及跳转控制 |
| **异常处理** | `try`, `catch`, `finally`, `throw`, `throws` | 捕获异常与抛出逻辑 |
| **修饰符** | `abstract`, `final`, `static`, `synchronized`, `transient`, `volatile`, `native`, `strictfp` | 静态、常量、并发及底层修饰 |
| **包相关** | `package`, `import` | 定义包路径与导入外部类 |
| **其他/保留字** | `assert`, `const` (未使用), `goto` (未使用) | 调试断言与系统保留字 |

## 说明

1. **`const` 和 `goto`** 是Java保留的关键字，但目前并未使用。
2. **`strictfp`** 用于确保浮点运算的跨平台一致性。
3. **`transient`** 用于标记不需要序列化的字段。
4. **`volatile`** 用于标记可能被多个线程同时访问的变量。

这些关键字在Java中具有特殊含义，不能用作标识符（如变量名、类名等）。
