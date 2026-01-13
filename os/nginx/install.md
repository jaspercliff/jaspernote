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

## arch

```bash
sudo pacman -Syu
sudo pacman -S nginx-mainline
```

arch 安装默认打开首页是404，当 root 设置为 html 时，Nginx 会相对于它的安装前缀目录（Prefix）来寻找。
在 Arch 上，这个前缀通常是 /etc/nginx/。 所以 Nginx 实际上在尝试访问
：/etc/nginx/html/index.html。 而 Arch 的默认网页文件其实存放在：/usr/share/nginx/html/

一般推荐放到/var/www/ 下

## 推荐流程

```zsh
# 创建站点存放目录
sudo mkdir -p /var/www/hmdp/public

sudo chown -R ${USER}:http /var/www/hmdp
# 设置目录权限为 755，文件权限为 644
find /var/www/hmdp -type d -exec chmod 755 {} +
find /var/www/hmdp -type f -exec chmod 644 {} +

fd -t d . /var/www/hmdp -x chmod 755
fd -t f . /var/www/hmdp -x chmod 644

sudo mkdir -p /etc/nginx/sites-available
sudo mkdir -p /etc/nginx/sites-enabled
```

```zsh
vim /etc/nginx/nginx.conf

http {
    include       mime.types;
    default_type  application/octet-stream;

    # 优化项
    server_tokens off; # 隐藏版本号更安全
    types_hash_max_size 4096; 

    # 包含自定义站点配置
    include sites-enabled/*; 
}
```

```zsh
vim /etc/nginx/sites-available/hmdp.conf
server {
    listen 90;
    listen [::]:90;
    server_name localhost; # 生产环境换成域名

    root /var/www/hmdp/public/hmdp;
    index index.html;

    # 日志配置 (放在 /var/log/nginx/)
    access_log /var/log/nginx/hmdp.access.log;
    error_log /var/log/nginx/hmdp.error.log;

    # 静态资源缓存策略
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # 禁止访问敏感隐藏文件 (如 .git)
    location ~ /\. {
        deny all;
    }

    location / {
        try_files $uri $uri/ =404;
    }

    location /api {  
            default_type  application/json;
            #internal;  
            keepalive_timeout   30s;  
            keepalive_requests  1000;  
            #支持keep-alive  
            proxy_http_version 1.1;  
            rewrite /api(/.*) $1 break;  
            proxy_pass_request_headers on;
            #more_clear_input_headers Accept-Encoding;  
            proxy_next_upstream error timeout;  
            proxy_pass http://127.0.0.1:8081;
            #proxy_pass http://backend;
        }

}
    upstream backend {
        server 127.0.0.1:8081 max_fails=5 fail_timeout=10s weight=1;
        #server 127.0.0.1:8082 max_fails=5 fail_timeout=10s weight=1;
    }  

```

```zsh
sudo ln -s /etc/nginx/sites-available/my_site.conf /etc/nginx/sites-enabled/
sudo nginx -t                # 看到 syntax is ok 即成功
sudo systemctl reload nginx   # 平滑重载
```

nignx -t 检查nginx配置文件有没有错误，检查完在启动，如果有错误直接启动会导致旧的nginx直接挂掉
reload Nginx 的 Master 进程会先加载新配置，确认无误后，会开启新的 Worker 进程，并通知旧的 Worker 进程在处理完手头当前的请求后自动退出
