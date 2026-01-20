# other


## 查找ip wifi

```bash
ifconfig en0 | grep "inet " | awk '{print $2}'
```

## 杀掉占有端口的进程

```bash
lsof -i:8080   
kill -9 pid
```