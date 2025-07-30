# error prone 

“Error Prone” 是 Google 提供的一个 Java 编译器插件，主要用于在 Java 编译期间发现潜在的 bug 和代码问题。
它集成在构建工具中（如 Maven、Gradle、Bazel）并作为 javac 的扩展运行。比起传统的编译器告警，它能检测更深入、更具体的问题。

🌟 为什么使用 Error Prone？
Java 编译器本身的警告机制有限，而 Error Prone 主要补充了以下几类问题：
- == 比较字符串
- 忘记在 equals 或 hashCode 中使用对象字段
- 忽略返回值（如 Future.get()）
- NullPointerException 来源
- 自动修复建议（配合 IDE 或脚本）
- 自定义规则的扩展能力

```java
public class MyClass {
public boolean compare(String a, String b) {
return a == b; // Error Prone 会报错：使用 == 比较字符串
}
}
```

Error Prone 报告：
[EqualityOperatorComparesObjects] Comparing references using '==' instead of 'equals'

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.8.1</version>
    <configuration>
        <compilerId>javac-with-errorprone</compilerId>
        <forceJavacCompilerUse>true</forceJavacCompilerUse>
    </configuration>
    <dependencies>
        <dependency>
            <groupId>com.google.errorprone</groupId>
            <artifactId>error_prone_core</artifactId>
            <version>2.24.0</version> <!-- 具体版本可根据需要调整 -->
        </dependency>
    </dependencies>
</plugin>
```

