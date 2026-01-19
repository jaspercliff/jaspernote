# proxy

在使用 Git 时，如果需要通过代理服务器访问远程仓库，可以通过以下命令配置 HTTP 或 HTTPS 代理。

### 配置 HTTP/HTTPS 代理
```bash
git config --global http.proxy http://代理地址:端口号
git config --global https.proxy http://代理地址:端口号
```
**示例：**
```bash
git config --global http.proxy http://127.0.0.1:1080
git config --global https.proxy http://127.0.0.1:1080
```

### 取消代理设置
如果需要取消代理设置，可以使用以下命令：
```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### 配置 SOCKS5 代理
如果使用的是 SOCKS5 代理，可以这样配置：
```bash
git config --global http.proxy socks5://代理地址:端口号
git config --global https.proxy socks5://代理地址:端口号
```

**示例：**
```bash
git config --global http.proxy socks5://127.0.0.1:1080
git config --global https.proxy socks5://127.0.0.1:1080
```

### 检查当前代理配置
可以使用以下命令查看当前的代理配置：
```bash
git config --global --get http.proxy
git config --global --get https.proxy
```

### 注意事项
1. 如果代理需要用户名和密码认证，可以在代理地址中加入认证信息：
   ```bash
   git config --global http.proxy http://用户名:密码@代理地址:端口号
   ```
   **示例：**
   ```bash
   git config --global http.proxy http://user:password@127.0.0.1:1080
   ```

2. 确保代理服务器正常运行，并且端口正确。

3. 如果仅针对特定仓库配置代理，可以省略 `--global` 参数，在本地仓库中执行上述命令即可。