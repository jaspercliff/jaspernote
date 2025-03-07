# other


## 查找ip wifi

```bash
ifconfig en0 | grep "inet " | awk '{print $2}'
```