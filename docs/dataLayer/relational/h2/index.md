# h2

H2 最强大的地方在于它既可以跑在内存里（重启即消失），也可以跑在磁盘文件里

```yaml
spring:
  datasource:
#     url: jdbc:h2:mem:learn  # 内存模式
    url: jdbc:h2:file:./learn;AUTO_SERVER=TRUE;DATABASE_TO_UPPER=FALSE # 文件模式 默认只允许一个进程访问
#    auto它允许第一个连接以“嵌入式”启动，并自动开启一个 TCP 服务器，让后续的其他连接（如 IDE 控制台）通过该服务器共享访问
    driver-class-name: org.h2.Driver
    username: sa
    password:

  # H2 控制台配置（浏览器访问管理界面）
  h2:
    console:
      enabled: true
      path: /h2-console
      settings:
        # 允许在控制台框架内显示（防止浏览器拦截）
        trace: false
        web-allow-others: false
```
