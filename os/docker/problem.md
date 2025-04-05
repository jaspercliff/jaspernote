# problem 

## ubuntu docker desktop 无法打开


```bash
sysctl -w kernel.apparmor_restrict_unprivileged_userns=0
systemctl --user restart docker-desktop
```
