# 读取配置文件

在 Spring Boot 中，读取配置是开发中非常常见的需求。Spring Boot 提供了多种方式来读取 `application.properties` 或
`application.yml` 等配置文件中的值。以下是几种主要方式及其适用场景：

---

## 使用 `@Value` 注解（适用于简单配置项）**

```java

@Value("${my.config.enable:true}")
private String configName;
```

- **优点**：适合读取简单的配置，如字符串、数字等。
- **缺点**：不适合复杂结构、不能自动绑定集合对象。
  "${my.config.enable:true}"表示从配置文件中读取my.config.enable属性的值，如果没有找到则默认为 true。

---

## 2. 使用 `@ConfigurationProperties`（推荐用于绑定整个配置前缀）**

```java

@Component
@ConfigurationProperties(prefix = "my.config")
@Validated
public class MyConfigProperties {
    private String name;
    @min(1)
    @max(60)
    private int timeout;
    private List<String> servers;

    // getter 和 setter 必须有
}
```

配置文件中：

```yaml
my:
  config:
    name: example
    timeout: 30
    servers:
      - server1
      - server2
```

- **优点**：结构清晰、可绑定复杂结构（如 List、Map 等），更适合配置类。
- **建议**：使用 `@Validated` + 注解进行校验（如 `@NotNull`）。

`@EnableConfigurationProperties`（通常用于不加 @Component 的情况）

---

### 3. 通过 `Environment` 接口编程方式获取**

```java

@Autowired
private Environment environment;

public void printConfig() {
    String name = environment.getProperty("my.config.name");
}
```

- **优点**：动态读取配置，适合需要运行时读取的场景。
- **缺点**：相比注解方式可读性较差，不利于维护。

---

### 4. 使用 `@PropertySource` 读取自定义配置文件**

```java

@Configuration
@PropertySource("classpath:custom-config.properties")
public class CustomConfig {
    @Value("${custom.property}")
    private String value;
}
```

- **适用场景**：读取非默认路径的 `.properties` 文件。
- **注意**：不支持 `.yml` 文件；如需支持 yml，推荐使用 Spring Boot 的配置方式（`@ConfigurationProperties`）。

```java

@PropertySources({
        @PropertySource("classpath:db.properties"),
        @PropertySource("classpath:redis.properties")
})
public class CustomConfig {
    @Value("${custom.property}")
    private String value;
}
```

加载多个 .properties 文件

### @PropertySource 注解中的 factory 属性，

它允许你指定一个自定义的 PropertySourceFactory 实现类，来扩展或改变 @PropertySource 的解析方式。
这在默认只支持 .properties 文件的情况下，加载 YAML 文件（.yml / .yaml） 特别有用。
### 用 @PropertySource 加载 YAML 配置

#### 1️⃣ 创建 YAML 配置文件（resources/app.yml）
```yaml
app:
  name: Spring Master
  port: 8081
```

⸻

#### 2️⃣ 自定义 PropertySourceFactory 实现

```java
import org.springframework.boot.env.YamlPropertySourceLoader;
import org.springframework.core.env.PropertySource;
import org.springframework.core.io.support.EncodedResource;
import org.springframework.core.io.support.PropertySourceFactory;
import java.io.IOException;
import java.util.List;

public class YamlPropertySourceFactory implements PropertySourceFactory {
  @Override
  public PropertySource<?> createPropertySource(String name, EncodedResource resource) throws IOException {
//      将 .yml 或 .yaml 文件解析为 PropertySource 对象
    YamlPropertySourceLoader loader = new YamlPropertySourceLoader();
    List<PropertySource<?>> sources = loader.load(resource.getResource().getFilename(), resource.getResource());
    return sources.getFirst();
  }
}

```
#### 3️⃣ 使用 @PropertySource 指定 YAML 文件及自定义工厂
```java
@Configuration
@PropertySource(value = "classpath:app.yml", factory = YamlPropertySourceFactory.class)
public class AppConfig {

  @Value("${app.name}")
  private String name;

  @Value("${app.port}")
  private int port;

  @PostConstruct
  public void print() {
    System.out.println("App Name: " + name);
    System.out.println("App Port: " + port);
  }

}
```
📌 总结

- @PropertySource 默认只支持 .properties 无法直接读取 .yml 文件
- factory 属性 指定自定义的 PropertySourceFactory 来支持更多格式
