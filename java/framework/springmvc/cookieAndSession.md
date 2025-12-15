# cookie and session

> **Cookie 是客户端的状态存储**
> **Session 是服务端的状态存储**

---

## Cookie 是什么

### 1️⃣ 本质

Cookie 是**浏览器保存的一小段键值数据**，每次请求会自动带给服务器。

示例（HTTP 响应）：

```http
Set-Cookie: JSESSIONID=ABC123; Path=/; HttpOnly
```

后续请求浏览器会自动带上：

```http
Cookie: JSESSIONID=ABC123
```

---

### 2️⃣ Cookie 能存什么

* 字符串
* 一般不超过 **4KB**
* 明文（可被查看）

📌 不适合：

* 密码
* 敏感信息
* 大数据

---

### 3️⃣ Cookie 生命周期

| 类型                  | 什么时候消失 |
| ------------------- | ------ |
| 会话 Cookie           | 浏览器关闭  |
| 持久 Cookie（有 maxAge） | 到期时间   |

```java
Cookie c = new Cookie("token", "abc");
c.setMaxAge(7 * 24 * 3600); // 7 天
```

---

### 4️⃣ Cookie 常见属性

| 属性         | 作用             |
| ---------- | -------------- |
| `Path`     | 哪些路径会携带        |
| `Domain`   | 哪些域名共享         |
| `HttpOnly` | JS 不能访问（防 XSS） |
| `Secure`   | 只在 HTTPS 传输    |
| `SameSite` | 防 CSRF         |

---

## Session 是什么

### 1️⃣ 本质

Session 是**服务器内存中的一块数据**，用来保存“某个用户”的状态。

```text
sessionId -> { userId=1, role=admin }
```

📌 Session **不自己识别用户**，它靠 **sessionId**

---

### 2️⃣ Session 如何识别用户（关键）

> **通过 Cookie 中的 sessionId**

流程：

```text
1. 浏览器第一次访问
2. 服务器创建 session
3. 返回 Set-Cookie: JSESSIONID=xxx
4. 浏览器保存 Cookie
5. 之后每次请求带上 JSESSIONID
6. 服务器根据 id 找 session
```

---

### 3️⃣ Session 生命周期

| 情况            | 结果   |
| ------------- | ---- |
| 长时间不访问        | 超时销毁 |
| 调用 invalidate | 立即销毁 |
| 服务器重启         | 默认丢失 |
| sessionId 丢失  | 找不到  |

---

📌 **Session 本质上依赖 Cookie 才能用**

---

## 登录状态是怎么实现的（真实流程）

### 方案一：Session 登录（传统）

```text
1. 用户登录
2. 校验成功
3. session.setAttribute("user", user)
4. 返回 JSESSIONID Cookie
```

后续请求：

```java
User user = (User) session.getAttribute("user");
```

---

### 方案二：Cookie + Token（JWT）

```text
Cookie: token=xxxxx
```

服务器：

* 不存 Session
* 每次校验 token

📌 常用于：

* 前后端分离
* 微服务

---

## 为什么现在很多系统不用 Session 了

| 原因  | 说明           |
| --- | ------------ |
| 分布式 | Session 共享麻烦 |
| 扩展性 | 无状态更容易扩容     |
| 移动端 | 没 Cookie 概念  |
| 跨域  | Cookie 受限制   |

解决方式：

* JWT
* OAuth2
* Redis Session

---

## 八、什么时候该用谁？

### ✔️ 适合 Session

* 传统 Web
* 后台管理系统
* 状态复杂
* 不追求高并发

### ✔️ 适合 Cookie + Token

* 前后端分离
* App / 小程序
* 微服务
* 高并发

---

## 一句话总结

> **Cookie 解决“你是谁”**
> **Session 解决“你现在是什么状态”**

如果你愿意，我可以：

* 画一张 **Cookie + Session 交互流程图**
* 结合 **Spring MVC / Spring Security** 给你讲真实项目结构
* 对比 **Session / JWT / Redis Session** 的取舍
