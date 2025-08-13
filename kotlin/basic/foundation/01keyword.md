# kotlin keyword

| 分类          | 关键字                                                                                                                                                                      |
|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **访问控制**    | `private`, `protected`, `public`, `internal`                                                                                                                             |
| **类、对象、接口** | `class`, `interface`, `object`, `enum`, `annotation`, `companion`, `data`, `sealed`, `typealias`                                                                         |
| **函数**      | `fun`, `operator`, `infix`, `inline`, `noinline`, `crossinline`, `tailrec`, `external`, `suspend`, `expect`, `actual`                                                    |
| **变量与属性**   | `var`, `val`, `lateinit`, `const`, `by` (用于委托), `field` (在访问器中)                                                                                                          |
| **流程控制**    | `if`, `else`, `when`, `for`, `while`, `do`, `break`, `continue`, `return`, `throw`, `try`, `catch`, `finally`                                                            |
| **类型相关**    | `is`, `!is`, `as`, `as?`, `typeof` (在特定平台如 JS 中使用，非常见), `dynamic` (仅 Kotlin/JS)                                                                                          |
| **修饰符**     | `abstract`, `final`, `open`, `override`, `external`, `expect`, `actual`, `reified` (用于 `inline` 函数), `const`, `lateinit`, `vararg`, `noinline`, `crossinline`, `suspend` |
| **包相关**     | `package`, `import`                                                                                                                                                      |
| **特殊标识符**   | `this`, `super`                                                                                                                                                          |
| **字面值**     | `true`, `false`, `null`                                                                                                                                                  |
| **未使用/保留**  | `by` (作为独立关键字保留，但主要用在 `object` 和 `delegate` 语境), `where` (作为保留字，但语法中不单独使用), `file` (保留)                                                                                  |

## 可见性修饰符

| 可见性修饰符        | 说明                                                 | 适用范围                                |
|---------------|----------------------------------------------------|-------------------------------------|
| **private**   | 仅在声明它的文件或类内部可见。                                    | 类、接口、对象、接口成员、构造器以及顶层声明（如文件中的函数和属性）。 |
| **protected** | 类似于`private`，但对子类也可见。注意，`protected`不能用于顶层声明。       | 类和接口的成员（属性和方法），但不包括顶层声明。            |
| **internal**  | 在同一模块内的任何地方都可见。模块是指一起编译的一组Kotlin文件集合。              | 适用于所有声明类型，包括类、接口、对象、接口成员以及顶层声明。     |
| **public**    | 默认修饰符，从任何地方都可以访问。如果没有指定其他可见性修饰符，默认情况下声明是`public`的。 | 适用于所有声明类型，包括类、接口、对象、接口成员以及顶层声明。     |
