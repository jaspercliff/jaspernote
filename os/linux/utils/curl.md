# curl

curl 是一个非常常用的命令行工具，用来 发送 HTTP 请求、下载文件、测试接口 等。

-O  下载文件  保存的文件名与URL相同
-o  下载文件  保存的文件名为指定的文件名

```bash
curl -o filename http://example.com/file.txt
```

## get  

```bash
curl "http://localhost:8080/api/user?id=1"
```

## post

发送 POST 请求（带数据）
```bash
curl -X POST http://localhost:8080/login -d "username=admin&password=123456"
```

或者 JSON 格式：
```bash
curl -X POST http://localhost:8080/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"123456"}'
```

-H --header 添加http请求头  服务器发送的数据类型（Content-Type）


## -f

在服务器返回 4xx 或 5xx 错误状态码时，让 curl 直接失败并返回非 0 状态码，而不是打印错误页面内容

```bash
curl -f https://zed.dev/install.sh | sh
```

管道符号 | 把上一步下载的脚本内容传递给 shell 执行