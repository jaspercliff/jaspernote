# problem 

## ubuntu docker desktop 无法打开


```bash
sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=0
systemctl --user restart docker-desktop

echo $http_proxy
echo $https_proxy
```

https://github.com/docker/for-mac/issues/7160#issuecomment-2061040813