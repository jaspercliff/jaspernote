# other

## 目录结构

- `usr` 系统级软件包管理器
- `usr/local` 本地手动安装的软件，不会覆盖影响系统工具（源码安装推荐）
- `opt` 第三方软件包和可选应用程序（二进制安装推荐）

---

## mkdir

```bash
mkdir -p /home/user/{images,videos}
```

说明：

- 不加 `-p`：不会自动创建父目录  
- `-p`：递归创建目录，如果已存在不会报错

---

## 重定向符号

```bash
> filename
```

👉 清空文件内容（将空内容重定向到文件）

---

```bash
echo "hello" > file.txt
echo "world" >> file.txt
```

说明：

- `>`：覆盖写入（文件存在会被清空）
- `>>`：追加写入（写到文件末尾）

---

## 查看目录大小

```bash
du -sl /path/to/directory
```

---

## 软链接

```bash
sudo ln -s /opt/gradle/gradle-9.1.0 /opt/gradle
```

配置环境变量

```bash
export PATH=$PATH:/opt/gradle/bin
```

升级 Gradle：

```bash
sudo rm /opt/gradle
sudo ln -s /opt/gradle/gradle-9.2 /opt/gradle
```
