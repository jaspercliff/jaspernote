# venv

虚拟环境（virtual environment）是 Python 中用于**隔离项目依赖**的机制。每个项目可以有自己独立的包和 Python
版本，不会与其他项目互相影响。这种隔离对保持环境干净、避免依赖冲突、部署上线非常重要。

---

## 🧠 一句话解释

> **虚拟环境**就是为你的项目创建一个“独立的小世界”，安装的库只在这个项目中生效。

---

## 🧰 `venv` 是什么？

`venv` 是 Python 3 自带的标准库工具，用来创建和管理虚拟环境。

- 不需要额外安装（Python 3.3+ 自带）
- 创建简单，使用方便
- 通常搭配 `pip` 一起使用

---

## 🛠️ 如何使用 `venv`

### 1️⃣ 创建虚拟环境

```bash
python -m venv venv
```

- `venv` 是你创建的目录名，也可以改成 `.venv`、`env` 等。

这条命令会创建一个目录结构，里面有独立的 Python 解释器和 pip。

---

### 2️⃣ 启动虚拟环境

- **Windows：**
  ```bash
  .\venv\Scripts\activate
  ```

- **macOS / Linux：**
  ```bash
  source venv/bin/activate
  ```

💡 成功激活后，命令行前面会多一个 `(venv)` 的提示，表示你在虚拟环境中。

---

### 3️⃣ 安装项目依赖

```bash
pip install requests 
```

这些库将只安装在当前虚拟环境中，不影响系统全局 Python。

---

### 4️⃣ 保存依赖

```bash
pip freeze > requirements.txt
```

这样可以保存当前环境安装的所有包，方便他人或部署时使用。

---

### 5️⃣ 退出虚拟环境

```bash
deactivate
```

---

## 📦 项目开发流程推荐

```bash
# 创建项目目录
mkdir myproject && cd myproject

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
source venv/bin/activate  # Linux/macOS
# 或
.\venv\Scripts\activate   # Windows
which python3 可以查看是否激活虚拟环境
# 安装依赖
pip install flask

# 保存依赖
pip freeze > requirements.txt

# 开发你的代码...
```

---

## ✅ 使用 venv 的好处

| 优点     | 说明                             |
|--------|--------------------------------|
| 隔离依赖   | 不同项目使用不同库版本互不干扰                |
| 保持系统干净 | 不污染全局 Python 环境                |
| 更方便部署  | 可以通过 `requirements.txt` 快速复制环境 |
| 支持版本切换 | 配合 `pyenv` 可切换不同 Python 版本     |

---

如果你希望我提供一个完整的带 `venv` 和 `requirements.txt` 的项目模板，也可以告诉我，我可以生成一个给你。
