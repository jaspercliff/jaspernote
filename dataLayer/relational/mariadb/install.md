# install

由于 Arch 的设计哲学，你需要手动完成初始化和启动。

---

## 1. 安装软件包


```bash
sudo pacman -S mariadb
```

---

## 2. 初始化数据库目录

在启动服务之前，**必须**先安装 MariaDB 的基础数据目录。如果不执行这一步，服务将无法启动。

```bash
sudo mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
```
---

## 3. 启动并启用服务

安装完成后，启动 MariaDB 守护进程，并将其设置为开机自启。

* **启动服务：**
```bash
sudo systemctl start mariadb
```

* **设置开机自启：**
```bash
sudo systemctl enable mariadb
```
---

## 4. 安全配置（强烈建议）

新安装的 MariaDB 默认没有 root 密码。运行内置的安全脚本来设置密码、禁用远程 root 登录并删除测试数据库。

```bash
sudo mariadb-secure-installation

```

在此过程中，系统会询问你一系列问题：

1. **Enter current password for root**: 初始直接按 **Enter**。
2. **Switch to unix_socket authentication**: 一般选 **n**（除非你有特殊需求）。
3. **Change the root password?**: 选 **Y** 并设置你的强密码。
4. 其他问题（移除匿名用户、禁用远程登录等）建议全部选 **Y**。

## 5. 测试连接

使用你刚刚设置的密码登录：

```bash
mariadb -u root -p

```

---

### 💡 小贴士

* **配置文件：** 默认路径在 `/etc/my.cnf` 或 `/etc/my.cnf.d/` 目录下。
* **日志检查：** 如果服务启动失败，可以使用 `journalctl -u mariadb` 查看错误原因。
