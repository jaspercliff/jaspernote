# pip

## pipx

用 pipx 安装 Jupyter（官方推荐的做法）

pipx 会自动创建隔离的虚拟环境，全局可用但不会污染系统 Python。

```shell
sudo apt install pipx
pipx ensurepath
pipx install notebook
```
安装完就能全局运行：
```shell
jupyter notebook
```
这是最安全、最干净的方式。