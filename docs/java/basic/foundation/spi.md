# SPI 

Java SPI (Service Provider Interface) 是 Java 提供的一种服务发现机制。
简单来说，它能让你的程序在运行时动态地寻找并
加载某个接口的实现类，而不需要在代码里硬编码（Hardcode）具体的实现。

这正是 “面向接口编程” 的一种极致体现：解耦。

1. SPI 的核心原理

SPI 的运作遵循一套约定的规则：

    定义接口：调用方（Service Consumer）定义一个标准接口。

    编写实现：第三方插件或模块实现这个接口。

    配置文件：在实现类的 Jar 包里的 META-INF/services/ 目录下创建一个文件，文件名是**接口的全类名**，内容是实现类的全类名。

    加载服务：调用方使用 java.util.ServiceLoader 来扫描并实例化这些实现

## demo 

- [github](https://github.com/jaspercliff/learnJava/tree/main/spiDemo)


```java
// api module
public interface StorageService {
     String getName();
     void upload(String path, byte[] bytes);
}
//minio module
@Slf4j
public class MinioStorage implements StorageService {
    @Override
    public String getName() {
        return "minio";
    }

    @Override
    public void upload(String path, byte[] bytes) {
        log.info("minio upload");
    }
}

// resources/META-INF/services/com.jasper.StorageService  com.jasper.MinioStorage

// business module
public class StorageManager {
    private static final Map<String, StorageService> SERVICES = new HashMap<>();

    static {
        // 静态代码块只执行一次，扫描 classpath 下所有的存储实现
        ServiceLoader<StorageService> loader = ServiceLoader.load(StorageService.class);
        for (StorageService service : loader) {
            SERVICES.put(service.getName(), service);
        }
    }

    public static void doUpload(String type, byte[] data, String path) {
        StorageService service = SERVICES.get(type);
        if (service != null) {
            service.upload(path,data);
        } else {
            throw new RuntimeException("未找到类型为 " + type + " 的存储驱动");
        }
    }
}
public class App {
    public static void main(String[] args) {
        StorageManager.doUpload("minio", new byte[0], "");
        StorageManager.doUpload("rustfs", new byte[0], "");
    }
}

```


## slf4j 

```java

// org.slf4j.spi.SLF4JServiceProvider

//public class LogbackServiceProvider implements SLF4JServiceProvider {
// META-INF/services/org.slf4j.spi.SLF4JServiceProvider : ch.qos.logback.classic.spi.LogbackServiceProvider

```


## serviceLoader.load 

- [打破双亲委派机制](/docs/java/basic/jvm/classload/classLoader.md##破坏双亲委派模型)

```java
    @CallerSensitive
    public static <S> ServiceLoader<S> load(Class<S> service) {
        ClassLoader cl = Thread.currentThread().getContextClassLoader();
        return new ServiceLoader<S>(Reflection.getCallerClass(), service, cl);
    }
```
