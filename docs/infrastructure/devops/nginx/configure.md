# configure

- [nginx](https://nginx.org/en/docs/http/ngx_http_core_module.html#client_max_body_size)

Syntax: client_max_body_size size;  
Default: client_max_body_size 1m;  
户端请求体的最大允许大小(上传图片大小、默认为1m),超出大小后会返回413

- [spring也需要配置](https://docs.spring.io/spring-boot/appendix/application-properties/index.html#application-properties.web.spring.servlet.multipart.max-file-size)

```yml
  servlet:
    multipart:
      # 单个文件的最大限制
      max-file-size: 10MB
      # 单个请求的总大小限制（如果你一次传多张图，这个要更大）
      max-request-size: 10MB
```
