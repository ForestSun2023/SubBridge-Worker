# 🚀 SubBridge Worker

![Cloudflare](https://img.shields.io/badge/Cloudflare-Worker-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-active-success)
![Version](https://img.shields.io/badge/version-1.0-informational)

一个基于 Cloudflare Workers 的轻量级订阅中转工具，提供安全、可控的代理订阅分发能力。

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

| 功能         | 说明              |
| ---------- | --------------- |
| IP 白名单     | 仅允许指定服务器访问      |
| SHA-256 加密 | IP 不明文存储        |
| 多订阅支持      | 使用 `?id=` 切换    |
| 环境变量隔离     | 不在代码中存储敏感信息     |
| 内置日志       | 可查看访问记录         |
| 无状态        | 无需数据库           |
| 全球加速       | Cloudflare 边缘网络 |

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

## 🚀 快速开始

### 1️⃣ 部署 Worker

登录 Cloudflare：

👉 Workers & Pages → Create Worker

将 `worker.js` 内容粘贴并部署。

---

## 🔧 2️⃣ 获取 IP Hash（跨平台方法）

为了实现 IP 白名单，需要将你的公网 IP 转换为 SHA-256 hash。

---

### ✅ 方法一：浏览器（推荐 👍）

打开浏览器控制台（F12），执行：

```javascript
async function hashIP(ip) {
  const data = new TextEncoder().encode(ip);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

hashIP("你的公网IP").then(console.log);
```

👉 适用于：

* Windows
* macOS
* Linux
* 手机浏览器（支持 DevTools）

---

### ✅ 方法二：Linux / VPS

```bash
echo -n "你的公网IP" | sha256sum
```

---

### ✅ 方法三：Windows PowerShell

```powershell
[System.BitConverter]::ToString(
  [System.Security.Cryptography.SHA256]::Create().ComputeHash(
    [System.Text.Encoding]::UTF8.GetBytes("你的公网IP")
  )
).Replace("-", "").ToLower()
```

---

### ✅ 方法四：在线工具（最简单）

搜索：`sha256 在线`

⚠ 注意：

* 不要输入订阅 token
* IP 输入是安全的

---

## ⚙️ 3️⃣ 配置环境变量

在 Cloudflare → Worker → Settings → Variables 添加：

---

### 🔐 IP 白名单

```text
ALLOWED_IPS=hash1,hash2
```

⚠ 注意：

* 使用英文逗号分隔
* 不要有空格
* 支持多个 IP

---

### 📦 订阅配置

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

## 🔗 4️⃣ 使用方式

```text
https://your-worker.workers.dev/?id=1
https://your-worker.workers.dev/?id=2
```

---

## 📦 Sub-Store 使用示例

```text
https://your-worker.workers.dev/?id=1
```

---

## 📊 日志系统

本项目内置简易日志系统，基于 Cloudflare Workers 控制台输出。

---

### 日志示例

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

* 日志为临时存储
* 高流量可能被采样

---

## 🔐 安全机制

### ✔ IP 白名单

限制访问来源，防止订阅被他人使用

---

### ✔ 环境变量隔离

订阅 token 不出现在代码中

---

### ⚠ 安全建议

* 不要公开 Worker 链接
* 定期更换订阅 token
* 不要将 `.env` 提交到 GitHub

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

* 源站限制访问（如 Cloudflare challenge）
* 中转接口不可用

建议：

👉 使用原始订阅地址

---

## 🧩 使用场景

* 多机场统一管理
* 防止订阅泄露
* Sub-Store 中转
* 自建订阅网关

---

## 📈 架构示意

```text
客户端（Clash / Sub-Store）
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
