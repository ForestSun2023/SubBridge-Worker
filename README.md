# 🚀 SubBridge Worker

一个基于 Cloudflare Workers 的轻量级订阅中转工具，用于安全管理和分发代理订阅。

---

## ✨ 项目简介

SubBridge Worker 通过 Cloudflare 边缘网络实现：

* 🔐 IP 白名单访问控制（基于 SHA-256）
* 📦 多订阅统一管理（支持无限扩展）
* 🛡 防止订阅链接泄露
* ⚡ 全球 CDN 加速访问

适用于：

* Sub-Store
* Clash / Clash Meta
* sing-box
* v2rayN 等客户端

---

## 🔥 核心特性

| 功能      | 说明                 |
| ------- | ------------------ |
| IP 限制   | 仅允许指定服务器访问         |
| Hash 加密 | 不暴露真实 IP           |
| 多订阅支持   | 使用 `?id=` 动态切换     |
| 环境变量隔离  | 不在代码中存储敏感信息        |
| 无状态     | 无数据库，纯边缘运行         |
| 高可用     | 依托 Cloudflare 全球网络 |

---

## 🧱 项目结构

```
subbridge-worker/
├── worker.js
├── README.md
├── LICENSE
└── .gitignore
```

---

## 🚀 快速开始（一步步照做）

### 1️⃣ 部署 Worker

登录 Cloudflare：

👉 Workers & Pages → Create Worker

将 `worker.js` 内容粘贴进去并部署。

---

### 2️⃣ 配置 IP 白名单（重要）

在你的服务器执行：

```bash
echo -n "你的公网IP" | sha256sum
```

得到：

```
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

在 Cloudflare 中添加变量：

```
ALLOWED_IPS=hash1,hash2
```

⚠ 注意：

* 使用英文逗号分隔
* 不要有空格

---

### 3️⃣ 配置订阅

在 Cloudflare → Worker → Settings → Variables 中添加：

```
SUB1=https://your-subscription-1
SUB2=https://your-subscription-2
SUB3=https://your-subscription-3
```

支持无限扩展：

```
SUB100=https://xxx
```

---

### 4️⃣ 使用方式

```bash
https://your-worker.workers.dev/?id=1
https://your-worker.workers.dev/?id=2
```

---

## 📦 示例（Sub-Store）

在 Sub-Store 中添加订阅：

```
https://your-worker.workers.dev/?id=1
```

即可正常拉取。

---

## 🔐 安全机制说明

### ✔ IP 白名单

* 使用 SHA-256 存储 IP
* Worker 运行时计算并比对

---

### ✔ 环境变量隔离

敏感信息（订阅链接）：

* 不写入代码
* 不上传 GitHub

---

### ❗ 安全建议

* 不要分享 Worker 链接
* 不要提交 token 到仓库
* 定期更换订阅 token

---

## ⚠️ 常见问题

### ❓ 403 Forbidden

原因：

* IP 不在白名单
* hash 填写错误

---

### ❓ 订阅无法更新

可能原因：

* 源站（机场）限制访问
* 被 Cloudflare challenge 拦截

建议：

👉 使用原始订阅（避免中转接口）

---

### ❓ 多 IP 如何配置？

```
ALLOWED_IPS=hash1,hash2
```

---

## 🧩 使用场景

* 多机场统一管理
* 防止订阅被盗用
* 绕过部分反爬限制
* 自建订阅分发系统

---

## 📈 架构示意

```
Sub-Store
    ↓
Worker（本项目）
    ↓
真实订阅源
```

---

## 📄 License

MIT License

---

## ⭐ 支持

如果这个项目对你有帮助，欢迎：

* Star ⭐
* Fork 🍴

---

## ⚠️ 免责声明

本项目仅供学习与技术研究使用，请勿用于任何非法用途。
