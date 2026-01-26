## CommandLineRunner
在Spring Boot框架中，`CommandLineRunner` 和 `ApplicationRunner` 是两种接口，它们可以用来执行一些启动后的初始化任务。
## CommandLineRunner

`CommandLineRunner` 接口允许你在应用启动后立即执行一些操作。这个接口定义了一个名为 `run` 的方法，
该方法接受一个字符串数组作为参数，这个数组包含的是应用启动时的命令行参数。

#### 使用示例

你可以通过实现 `CommandLineRunner` 接口来创建一个类，并覆盖 `run` 方法来定义启动时要执行的任务：

```java
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ExampleRunner implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        // 在这里执行你需要的任务
        System.out.println("Hello from CommandLineRunner!");
    }
}
```

#### 注入依赖

如果你需要在 `CommandLineRunner` 中注入其他Bean，可以使用构造函数注入的方式：

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ExampleRunner implements CommandLineRunner {

    private final MyService myService;

    @Autowired
    public ExampleRunner(MyService myService) {
        this.myService = myService;
    }

    @Override
    public void run(String... args) throws Exception {
        myService.doSomething();
    }
}
```

### ApplicationRunner

`ApplicationRunner` 是 `CommandLineRunner` 的一个子接口，它没有添加任何新的功能，
只是为 `CommandLineRunner` 提供了一个别名。因此，`ApplicationRunner` 和 `CommandLineRunner` 的使用方式是相同的。

### 注意事项

- 如果有多个 `CommandLineRunner` 或 `ApplicationRunner` Bean，那么它们将会按照定义顺序依次执行。
- 如果需要控制执行顺序，可以实现 `Ordered` 接口或者使用 `@Order` 注解来指定执行的优先级。
- 在生产环境中，通常不会频繁地重启应用，因此 `CommandLineRunner` 主要用在开发阶段或者需要执行一次性的任务时。

以上就是关于 `CommandLineRunner` 的简单介绍及其使用方法。如果你有任何具体的问题或者需要更深入的了解，请随时提问。