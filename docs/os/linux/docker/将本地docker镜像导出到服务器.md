docker save -o novanc.tar theasp/novnc:latest

`docker save` 命令用于将 Docker 镜像导出为 tar 文件，这样你可以将镜像文件转移到其他系统或存储介质上。命令的基本语法如下：

```bash
docker save -o [输出文件路径] [镜像名称]
```

### 参数说明

- `-o [输出文件路径]`：指定导出镜像的文件路径和名称。例如，`archivebox.tar`。
- `[镜像名称]`：要导出的 Docker 镜像的名称，可以包括标签。例如，`archivebox:latest`。

### 示例

假设你有一个 Docker 镜像名为 `archivebox`，并希望将其导出为 `archivebox.tar` 文件，你可以使用以下命令：

```bash
docker save -o archivebox.tar archivebox
```

如果你希望导出带有标签的镜像，可以这样做：

```bash
docker save -o archivebox.tar archivebox:latest
```

这个命令会将 `archivebox` 镜像及其所有层保存到 `archivebox.tar` 文件中。

### 导出的 tar 文件传输到服务器

导出后，你可以使用 `scp`、`rsync` 或其他文件传输工具将 tar 文件传输到远程服务器。使用 `scp` 命令的示例：

```bash
scp archivebox.tar username@server_ip:/path/to/destination
```

### 在服务器上导入镜像

一旦 tar 文件传输到服务器，你可以使用 `docker load` 命令将其导入到服务器的 Docker 环境中：

```bash
docker load -i /path/to/destination/archivebox.tar
```

这样，你就完成了从本地导出 Docker 镜像、传输到服务器并在服务器上导入的过程。
