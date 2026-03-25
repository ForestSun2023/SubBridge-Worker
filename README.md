# 🚀 SubBridge Worker

一个基于 Cloudflare Workers 的轻量级订阅中转工具，提供安全、可控的代理订阅分发能力。

![Cloudflare](https://img.shields.io/badge/Cloudflare-Worker-orange)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## ✨ 项目简介

SubBridge Worker 通过 Cloudflare 边缘网络，将真实订阅进行安全中转，实现：

* 🔐 限制访问来源（IP 白名单）
* 📦 多订阅统一管理
* 🛡 防止订阅泄露
* ⚡ 全球加速访问

适用于：

* Sub-Store
* Clash / Clash Meta
* sing-box
* v2rayN / v2rayNG 等客户端

---

## 🔥 核心特性

| 功能      | 说明              |
| ------- | --------------- |
| IP 白名单  | 仅允许指定服务器访问      |
| SHA-256 | IP 不明文存储        |
| 多订阅支持   | 使用 `?id=` 切换    |
| 环境变量隔离  | 不在代码中存储敏感信息     |
| 内置日志    | 可查看访问记录         |
| 无状态     | 无需数据库           |
| 全球加速    | Cloudflare 边缘网络 |

---

## 🧱 项目结构

```text
subbridge-worker/
├── worker.js
├── README.md
├── LICENSE
├── .gitignore
└── example.env
```

---

## 🚀 快速开始（推荐）

### 1️⃣ 部署 Worker

登录 Cloudflare：

👉 Workers & Pages → Create Worker

将 `worker.js` 内容粘贴并部署。

---

### 2️⃣ 配置 IP 白名单（关键步骤）

在你的服务器执行：

```bash
echo -n "你的公网IP" | sha256sum
```

得到：

```text
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

在 Cloudflare → Worker → Settings → Variables 添加：

```text
ALLOWED_IPS=hash1,hash2
```

⚠ 注意：

* 使用英文逗号分隔
* 不要有空格
* 支持多个 IP

---

### 3️⃣ 配置订阅

在 Variables 中添加：

```text
SUB1=https://your-subscription-1
SUB2=https://your-subscription-2
SUB3=https://your-subscription-3
```

👉 支持无限扩展：

```text
SUB100=https://example.com
```

---

### 4️⃣ 使用方式

```text
https://your-worker.workers.dev/?id=1
https://your-worker.workers.dev/?id=2
```

---

## 📦 Sub-Store 使用示例

在 Sub-Store 中添加：

```text
https://your-worker.workers.dev/?id=1
```

即可正常拉取订阅。

---

## 🔐 安全机制

### ✔ IP 白名单

* 使用 SHA-256 存储 IP
* Worker 运行时进行校验
* 防止他人访问

---

### ✔ 环境变量隔离

* 订阅链接（token）不写入代码
* 不上传 GitHub
* 避免泄露

---

### ⚠ 安全建议

* 不要分享 Worker URL
* 定期更换订阅 token
* 避免在公共环境测试

---

## 📊 日志系统

本项目内置简易日志系统，基于 Cloudflare Workers 控制台输出。

---

### 日志内容

* 请求时间
* 客户端 IP
* 订阅 ID
* 请求状态

---

### 示例

```text
[2026-03-24T15:00:00Z] [IP:1.2.3.4] [ID:1] 🚀 Fetching subscription
[2026-03-24T15:00:00Z] [IP:1.2.3.4] [ID:1] ✅ Success: 200
```

---

### 查看日志

在 Cloudflare：

👉 Workers → Logs

---

### 注意

* 日志为临时存储（非持久）
* 高流量可能被采样

---

## ⚠️ 常见问题

### ❓ 403 Forbidden

原因：

* IP 不在白名单
* hash 错误

---

### ❓ 404 Subscription not found

原因：

* 未配置 SUBx
* id 不存在

---

### ❓ 订阅无法更新

原因：

* 源站限制访问（如 Cloudflare Challenge）
* 中转接口不可用

建议：

👉 使用原始订阅地址

---

### ❓ 多 IP 配置

```text
ALLOWED_IPS=hash1,hash2
```

---

## 🧩 使用场景

* 多机场订阅统一管理
* 防止订阅泄露
* Sub-Store 中转
* 自建订阅分发系统

---

## 📈 架构示意

```text
客户端（Sub-Store / Clash）
        ↓
   SubBridge Worker
        ↓
   原始订阅服务器
```

---

## 📄 License

MIT License

---

## ⭐ 支持项目

如果这个项目对你有帮助，欢迎：

* Star ⭐
* Fork 🍴

---

## ⚠️ 免责声明

本项目仅供学习与技术研究使用，请遵守当地法律法规。
