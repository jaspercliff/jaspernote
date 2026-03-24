# bytebuddy

CGLIB：在 Java 17+ 环境下，由于它强行访问 ClassLoader 的私有方法，会直接抛出你之前遇到的 InaccessibleObjectException。你必须手动配置复杂的 JVM 参数（--add-opens）才能续命。

ByteBuddy：它针对 Java 9 以后的模块化系统进行了原生适配。它能自动识别当前 JDK 版本并选择最合规的类加载策略
（如 ClassLoadingStrategy.Default.INJECTION），无需任何启动参数。


CGLIB 局限：

    无法代理 final 类。
    无法拦截 final 方法。
    默认会调用父类的无参构造函数: 如果目标对象只有一个带参数的构造函数，CGLIB 在创建代理时会直接报错
    必须通过继承，这意味着它无法修改已经加载到 JVM 里的现有类。

ByteBuddy 优势：
    它可以做子类代理（替代 CGLIB）。
    它可以做类重新定义（Redefine）和类重基（Rebase）。
    它可以作为 Java Agent 运行，直接在类加载时修改字节码。它能增强 final 方法，甚至能增强 java.lang.String 这种系统类。
