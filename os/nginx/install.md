# install

- [apt install](https://nginx.org/en/linux_packages.html#Ubuntu)
- [building-from-source](https://github.com/nginx/nginx?tab=readme-ov-file#building-from-source)
- [configure](https://nginx.org/en/docs/configure.html)

## building-from-source

```bash
# ./configure --prefix=/usr/local/bin/nginx-1.28.0  安装位置不能和源码一个位置
sudo ./configure --prefix=/usr/local/nginx 
make
sudo make install
```

sudo /usr/local/nginx/sbin/nginx
访问127.0.0.1:80

### 1. libpcre3-dev

作用：提供正则表达式支持
pcre 代表 Perl Compatible Regular Expressions（Perl 兼容的正则表达式）。

Nginx 中的应用： Nginx 核心功能需要使用正则表达式来匹配和处理 URL、URI、域名、Location 路径等。
例如，在 Nginx 配置中使用 location ~ \.(png|jpg|gif)$ 这样的语句时，就需要 PCRE 库来解析和执行这个正则表达式。

-dev 后缀： 带有 -dev 后缀的包是开发库（Development Libraries），它包含了头文件（.h 文件）和静态库/链接信息。
这些是编译 Nginx 源码时，编译器用来查找和链接 PCRE 功能所必需的文件。

总结： 提供了 Nginx 灵活的 URL 路由和配置匹配能力。

### 2. zlib1g-dev

作用：提供数据压缩支持
zlib 是一个广泛用于数据压缩的库，它实现了著名的 DEFLATE 压缩算法。

Nginx 中的应用： Nginx 使用 zlib 来实现 Gzip 压缩功能。

当 Nginx 开启 Gzip 压缩后，它会压缩返回给客户端的文本内容（HTML、CSS、JavaScript）。

这可以显著减少网络传输的数据量，从而加快网页加载速度，节省带宽。

-dev 后缀： 同样，这个开发库提供了 zlib 的头文件和链接库，供 Nginx 在编译时集成压缩功能。

总结： 提供了 Nginx 优化网络性能和节省带宽的能力。

### libssl-dev

libssl-dev 是一个提供 加密、安全通信和证书管理 功能的开发工具包，是构建安全网络服务的基石
