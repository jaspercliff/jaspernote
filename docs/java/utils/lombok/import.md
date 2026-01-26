# import

## maven

```xml
<project>
<dependencies>
    <!-- Lombok 依赖，作为编译时依赖 -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.30</version>
        <scope>provided</scope> <!-- 只有编译时使用，不需要在运行时包含 -->
    </dependency>
</dependencies>
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.1</version>
            <configuration>
                <annotationProcessorPaths>
                    <path>
                        <groupId>org.projectlombok</groupId>
                        <artifactId>lombok</artifactId>
                        <version>1.18.36</version>
                    </path>
                </annotationProcessorPaths>
            </configuration>
        </plugin>
    </plugins>
</build>
</project>
```

## gradle

```groovy
dependencies {
    // Lombok 编译时依赖
    compileOnly 'org.projectlombok:lombok:1.18.30'  // 只在编译时使用 Lombok，不需要运行时包含
    // 使用注解处理器来处理 Lombok 注解
    annotationProcessor 'org.projectlombok:lombok:1.18.30'  
}
```

io.freefair.lombok 插件。这个插件会自动处理所有 compileOnly, annotationProcessor, testCompileOnly, 和 testAnnotationProcessor 的配置

```kotlin
plugins {
    id("java")
    id("io.freefair.lombok") version "9.1.0"
}
```

