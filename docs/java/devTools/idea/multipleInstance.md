# multiple instance 



### 1. 先允许 IDEA 启动多个实例

打开：

**Run → Edit Configurations...**

**Allow multiple instances**


---

### 2. 配置第一个实例

例如：

```text
Name: producer-8081
Main class: jasper.ProducerApplication
```


Program arguments 可以写：

```text
--server.port=8081
```

或者更推荐在：

**Active profiles**

设置：

```text
dev
```

然后通过环境变量 / 参数覆盖端口。

---

### 3. 复制一个启动配置

右键复制：

```text
producer-8081
```

得到：

```text
producer-8082
```

把参数改成：

```text
--server.port=8082
```

再复制一个：

```text
producer-8083
```

参数：

```text
--server.port=8083
```

最终：

```text
producer-8081 → 127.0.0.1:8081
producer-8082 → 127.0.0.1:8082
producer-8083 → 127.0.0.1:8083
```

然后可以同时点击三个配置的运行按钮。

---

### 4. 如果你使用 `application.yml`

也可以直接：

```yaml
server:
  port: 8080
```

然后 IDEA 的不同启动配置通过：

```text
--server.port=8081
```

覆盖它。

Spring Boot 的命令行参数优先级高于 `application.yml`，所以三个实例可以共用同一个配置文件。

