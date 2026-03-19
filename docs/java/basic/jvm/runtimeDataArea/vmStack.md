---
sidebar_position: 2
---
# 虚拟机栈

- [jvm specification](https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-2.html#jvms-2.5.2)

虚拟机栈由一个个 栈帧 (Stack Frame) 组成。每当一个方法被调用，JVM 就会同步创建一个栈帧并压入栈中；方法执行完毕后，栈帧弹出

StackOverflowError：如果线程请求的栈深度大于虚拟机所允许的深度（常见于死循环递归），会抛出此错误。

OutOfMemoryError：如果虚拟机栈允许动态扩展，但在尝试扩展时无法申请到足够的内存，则会抛出 OOM。

## frame

局部变量表 (Local Variable Table)：
存放方法参数和方法内部定义的局部变量。包括各种基本数据类型（boolean, byte, char, short, int, float, long, double）和 对象引用 (reference)。在编译期间，局部变量表所需的内存空间就已经完全确定，方法运行期间不会改变局部变量表的大小

    注：long 和 double 会占用 2 个局部变量槽 (Slot)。

操作数栈 (Operand Stack)：
可以理解为“工作区”。所有的计算逻辑（如加减法）都在这里完成。Java 字节码指令通过压栈和出栈来执行运算。

动态连接 (Dynamic Linking)：
每个栈帧都包含一个指向运行时常量池中该栈帧所属方法的引用，为了支持方法调用过程中的动态连接（例如多态中的虚方法调用）。

方法出口 (Return Address)：
存放调用该方法的指令地址。当方法正常或异常退出时，需要返回到调用者那里的位置。
