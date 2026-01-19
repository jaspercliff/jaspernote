# gpg

GPG是GNU Privacy Guard的缩写，是一个用于加密和签名的工具。它可以用来保护你的文件和通信，确保只有你和你信任的人可以访问它们。
GPG使用公钥和私钥来加密和解密数据。公钥可以公开给任何人，而私钥必须保密。当你要发送加密的消息时，你可以使用接收者的公钥来加密消息，
这样只有他们可以用他们的私钥来解密消息。同样，你也可以使用你的私钥来签名消息，这样接收者可以验证消息确实来自你，并且没有被篡改。

要生成 GPG 签名，通常分为以下几个步骤：

---

## ✅ 一、准备工作：生成密钥对（仅第一次使用时执行）

```bash
gpg --full-generate-key
```

过程说明：

1. 选择密钥类型（推荐默认的 RSA and RSA）
2. 设置密钥长度（2048 或 4096，4096 更安全）
3. 设置有效期限（建议使用 1 年）
4. 输入姓名、邮箱（这是签名者的身份标识）
5. 设置一个密码（保护私钥）

生成后可以用以下命令查看已有的 GPG 密钥：

```bash
gpg --list-keys
```

---

## ✅ 二、为文件生成 GPG 签名

你可以选择以下三种方式之一：

### 1. 生成分离签名（最常见）

```bash
gpg --output file.sig --detach-sign file
```

- `file` 是你要签名的文件
- `file.sig` 是生成的签名文件（可与原文件一起分发）

### 2. 生成 ASCII 格式的签名（可读文本，通常以 `.asc` 结尾）

```bash
gpg --armor --output file.asc --detach-sign file
```

### 3. 生成清晰签名（签名嵌入文本文件内部，适合纯文本）

```bash
gpg --clearsign file
```

执行后会生成 `file.asc`，包含原文与签名。

---

## ✅ 三、验证签名（他人使用你的公钥验证）

```bash
gpg --verify file.sig file
# 或 ASCII 签名
gpg --verify file.asc file
```

---

## ✅ 四、导出公钥供他人验证

```bash
gpg --armor --export your_email@example.com > publickey.asc
```

把 `publickey.asc` 提供给他人，他们可以用来验证你签的文件。

---

gpg --verify mytool.tar.gz.sha256.asc mytool.tar.gz.sha256
这样能同时验证完整性和身份可信度

## ✅ 场景设定

你将如下三个文件发送给对方：

- 你的签名文件（例如 `file.sig` 或 `file.asc`）
- 原始文件（例如 `file`）
- 你的公钥文件（`publickey.asc`）

---

## ✅ 验证 GPG 签名的完整流程（他人操作）

### 第一步：导入你的公钥

```bash
gpg --import publickey.asc
```

执行后会看到类似输出：

```text
gpg: key ABCD1234: public key "Your Name <your@email.com>" imported
gpg: Total number processed: 1
gpg:               imported: 1
```

这样你的公钥就被加入到了对方本地的 keyring 中。

---

### 第二步：验证签名是否有效

假设你发送的是：

- `file`：原始文件
- `file.sig`：你的签名（或 `file.asc`）

#### 👉 验证分离签名

```bash
gpg --verify file.sig file
```

#### 👉 验证 ASCII 签名

```bash
gpg --verify file.asc file
```

#### 👉 如果是嵌入签名（clear-sign 的结果）

```bash
gpg --verify file.asc
```

---

## ✅ 成功时输出示例

```bash
gpg: Signature made 日期 using RSA key ID ABCD1234
gpg: Good signature from "Your Name <your@email.com>"
```

表示签名验证通过，文件未被篡改，并且确实由你签名。

---

## ✅ 总结流程图（验证者角度）

1. `gpg --import publickey.asc` ← 导入你的公钥
2. `gpg --verify file.sig file` ← 验证签名是否由你发出且未篡改

```bash
gpg --keyserver keys.openpgp.org --recv 7C9E68152594688862D62AF62D9AE806EC1592E2
```

这个命令的作用是：

## ✅ 从公钥服务器获取某个用户的 GPG 公钥

---

### 🔍 命令详解

| 参数 | 作用 |
| ---------------------- | ---------------------------- |
| `gpg` | 调用 GnuPG 工具 |
| `--keyserver keys.openpgp.org` | 指定要从哪个公钥服务器获取密钥（这里是 openpgp.org) |
| `--recv` | 表示“接收/导入”密钥 |
| `7C9E68152594688862D62AF62D9AE806EC1592E2` | 是你要获取的 GPG 公钥的 **Key ID（完整 fingerprint）** |

---

### 🧠 为什么要这么做？

在验证一个 `.asc` 签名文件（比如 `gitea-1.21.1-linux-amd64.asc`）之前，你的系统必须**先导入签名者的公钥**，否则你无法确认这个签名是否可信。

所以：

- **第一步**：导入签名者的公钥（通过 `--recv`）
- **第二步**：验证 `.asc` 文件的签名是否合法

例如，你从 Gitea 项目页面下载了 `gitea-1.21.1-linux-amd64` 和对应的签名文件 `gitea-1.21.1-linux-amd64.asc`，他们的签名是由
Gitea 的发布者用私钥签的。

你只有导入他们的公钥，才能验证签名是否可信。

---

### ✅ 示例完整流程

```bash
# 第一步：导入 Gitea 发布者的公钥
gpg --keyserver keys.openpgp.org --recv 7C9E68152594688862D62AF62D9AE806EC1592E2

# 第二步：验证签名是否来自 Gitea 发布者、文件是否被篡改
gpg --verify gitea-1.21.1-linux-amd64.asc gitea-1.21.1-linux-amd64
```

---

### 🔐 补充建议：查看导入的公钥指纹

你可以查看公钥指纹，以确认导入的是正确的人：

```bash
gpg --fingerprint 7C9E68152594688862D62AF62D9AE806EC1592E2
```

发布者（如 Gitea）通常会在官网列出他们的公钥指纹供比对，确保你没有被中间人攻击。

---

如果你还需要离线导入公钥（比如从网站下载 `.asc` 文件），也可以用：

```bash
gpg --import gitea_publickey.asc
```
