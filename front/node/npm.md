# npm

- 设置代理

```shell
npm config set proxy http://127.0.0.1:1080
npm config set https-proxy http://127.0.0.1:1080
```

- 查看代理

```shell
npm config get proxy
npm config get https-proxy
```

- 取消代理

```shell
npm config delete proxy
npm config delete https-proxy
```

```shell
npm config set registry https://registry.npmmirror.com
```
