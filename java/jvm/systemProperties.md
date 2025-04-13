# system properties

以下是 JVM 常用内置系统属性的 Markdown 表格，你可以复制到 .md 文件中直接使用：

# JVM 内置系统属性一览表

| 属性名               | 含义             | 示例值                            |
|-------------------|----------------|--------------------------------|
| `user.name`       | 当前系统用户名        | `root`、`alice`                 |
| `user.home`       | 当前用户的主目录       | `/home/alice`、`C:\Users\Alice` |
| `user.dir`        | 程序运行时的当前工作目录   | `/home/alice/app`              |
| `os.name`         | 操作系统名称         | `Linux`、`Windows 10`           |
| `os.version`      | 操作系统版本         | `5.15.0-91-generic`            |
| `os.arch`         | 操作系统架构（CPU 架构） | `amd64`、`x86`                  |
| `java.version`    | Java 运行时版本     | `21`、`17`、`1.8.0_361`          |
| `java.vendor`     | Java 提供商       | `Oracle Corporation`           |
| `java.home`       | Java 安装目录      | `/usr/lib/jvm/java-21-openjdk` |
| `java.class.path` | 当前 classpath   | `/app/classes:/app/lib/*`      |
| `java.io.tmpdir`  | 默认临时文件路径       | `/tmp`                         |
| `file.separator`  | 文件路径分隔符        | `/`（Linux） `\`（Windows）        |
| `path.separator`  | 路径变量分隔符        | `:`（Linux） `;`（Windows）        |
| `line.separator`  | 换行符            | `\n`（Linux） `\r\n`（Windows）    |

> 你可以使用 `System.getProperty("属性名")` 来访问这些值，或者在启动 JVM 时使用 `-D属性名=值` 来设置。

---

## 🧪 如何查看系统属性

你可以通过命令查看当前 JVM 的系统属性：

```bash
java -XshowSettings:properties -version
```
``` java
System.getProperties().forEach((k, v) -> System.out.println(k + " = " + v));
```
