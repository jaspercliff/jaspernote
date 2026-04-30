# VarHandle

VarHandle 本质上就是将 Unsafe 的能力进行了“安全化”封装。

MethodHandle（方法句柄）：直接指向某个方法的强类型引用。
VarHandle（变量句柄）：直接指向某个变量（字段）的强类型引用

要获得任何句柄，都必须通过 MethodHandles.Lookup 这个“工厂”
