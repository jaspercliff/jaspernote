# springboot读取resource下文件

在 Spring Boot 中读取 `resources` 下的文件

---

## 1. 使用 `ClassPathResource`

Spring 提供的 `ClassPathResource` 可以直接读取类路径下的资源文件。

```java
@Slf4j
@Component
public class ClassPathResourceDemo {
        @PostConstruct
        public void init(){
            // 可以直接读取类路径下的文件
            final ClassPathResource classPathResource = new ClassPathResource("data/config.json");
            try(InputStream in = classPathResource.getInputStream()) {
                final byte[] bytes = in.readAllBytes();
                final String s = new String(bytes);
                log.info("ClassPathResource demo  s is {}",s);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
}
```

* 优点：不依赖文件系统，直接从 classpath 读取。
* 适用：读取文本、JSON、XML 等文件。

---

## 2. 使用 `ResourceLoader`

`ResourceLoader` 是 Spring 提供的统一资源加载接口，可以通过注入使用。

```java
@Component
@RequiredArgsConstructor
@Slf4j
public class ResourceLoaderDemo {
    // 可以读取类路径资源 文件路径资源 网络资源
    private final ResourceLoader resourceLoader;

    @PostConstruct
    public void init() throws IOException {
        final Resource resource = resourceLoader.getResource("classpath:data/config.json");
        try(InputStream inputStream = resource.getInputStream()){
            final byte[] bytes = inputStream.readAllBytes();
            final String s = new String(bytes);
            log.info("ResourceLoader demo s is {}",s);
        }
    }
}
```

* 优点：统一接口，可以加载 classpath、文件系统、URL 等多种资源。

---

## 3. 使用 `ResourceUtils`

`ResourceUtils` 可以获取文件对象。

```java
@Component
@RequiredArgsConstructor
@Slf4j
public class ResourceUtilDemo {

    @PostConstruct
    public void init() throws IOException {
        final File file = ResourceUtils.getFile("classpath:data/config.json");
        final byte[] bytes = Files.readAllBytes(file.toPath());
        final String s = new String(bytes);
        log.info("ResourceUtil demo s is {}",s);
    }
}
```

* 注意：打包成 jar 时可能会报 `FileNotFoundException`，建议用 `ClassPathResource`。

---

* **推荐**：`ClassPathResource` 或 `ResourceLoader`，兼容性好，jar 包运行无问题。
