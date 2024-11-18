接口的幂等性（Idempotence）是指一个HTTP请求（或任何其他类型的请求）可以多次执行相同的效果而不改变结果。
换句话说，如果一个操作是幂等的， 那么无论该操作被执行多少次，从第一次成功执行后的结果都将是相同的。

幂等操作是指可以在任意次数上重复执行的操作，并且每次执行都会产生相同的效果，不会改变系统的最终状态




URI（Uniform Resource Identifier，统一资源标识符）是一种用于标识一个资源的字符串。URI 在互联网上广泛使用，用于唯一标识网络上的资源，如网页、文件、服务等。URI 是一种通用的概念，涵盖了 URL（Uniform Resource Locator，统一资源定位符）和 URN（Uniform Resource Name，统一资源名称）。

### URI 的组成部分

一个典型的 URI 由以下几个部分组成：

1. **方案（Scheme）**：表示资源的访问协议，如 `http`、`https`、`ftp`、`file` 等。
2. **授权信息（Authority）**：包括用户名、密码、主机名和端口号。
3. **路径（Path）**：表示资源在服务器上的路径。
4. **查询参数（Query）**：用于传递额外的参数，通常用于动态页面。
5. **片段标识符（Fragment）**：用于标识资源内部的某个部分，通常用于 HTML 页面中的锚点。

### URI 的格式

一个完整的 URI 格式如下：

```
scheme:[//authority]path[?query][#fragment]
```

### 示例

1. **HTTP URL**：
   ```
   http://www.example.com/path/to/resource?name=value&another=param#section1
   ```
    - **scheme**: `http`
    - **authority**: `www.example.com`
    - **path**: `/path/to/resource`
    - **query**: `name=value&another=param`
    - **fragment**: `section1`

2. **FTP URL**：
   ```
   ftp://user:password@ftp.example.com/path/to/file.txt
   ```
    - **scheme**: `ftp`
    - **authority**: `user:password@ftp.example.com`
    - **path**: `/path/to/file.txt`

3. **File URI**：
   ```
   file:///C:/Users/Example/Documents/example.txt
   ```
    - **scheme**: `file`
    - **path**: `/C:/Users/Example/Documents/example.txt`

4. **URN**：
   ```
   urn:isbn:0451450523
   ```
    - **scheme**: `urn`
    - **path**: `isbn:0451450523`

### URI 与 URL 的区别

- **URI**：是一个更广泛的术语，用于唯一标识资源。它可以是一个 URL 或一个 URN。
- **URL**：是 URI 的一个子集，用于指示如何定位和获取资源。URL 包含访问资源的具体方法（如协议、主机名、路径等）。
- **URN**：也是 URI 的一个子集，用于唯一命名资源，但不包含如何访问资源的信息。URN 通常用于持久标识符，如 ISBN 号码。

### Java 中的 URI 类

在 Java 中，`java.net.URI` 类提供了创建、解析和操作 URI 的功能。以下是一些常见的用法：

#### 创建 URI
```java
import java.net.URI;

public class URIExample {
    public static void main(String[] args) {
        try {
            // 创建一个 URI
            URI uri = new URI("http://www.example.com/path/to/resource?name=value&another=param#section1");
            
            // 获取 URI 的各个部分
            String scheme = uri.getScheme();          // "http"
            String authority = uri.getAuthority();    // "www.example.com"
            String path = uri.getPath();              // "/path/to/resource"
            String query = uri.getQuery();            // "name=value&another=param"
            String fragment = uri.getFragment();      // "section1"
            
            System.out.println("Scheme: " + scheme);
            System.out.println("Authority: " + authority);
            System.out.println("Path: " + path);
            System.out.println("Query: " + query);
            System.out.println("Fragment: " + fragment);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

#### 解析和操作 URI
```java
import java.net.URI;

public class URIManipulationExample {
    public static void main(String[] args) {
        try {
            // 创建一个 URI
            URI originalUri = new URI("http://www.example.com/path/to/resource?name=value&another=param#section1");
            
            // 修改路径
            URI newUri = new URI(originalUri.getScheme(), originalUri.getAuthority(), "/new/path", originalUri.getQuery(), originalUri.getFragment());
            
            System.out.println("Original URI: " + originalUri);
            System.out.println("Modified URI: " + newUri);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

通过这些示例，你可以看到如何在 Java 中创建和操作 URI。希望这些信息对你有所帮助！