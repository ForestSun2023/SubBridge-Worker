# 🚀 SubBridge Worker

![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-orange?logo=cloudflare)
![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-active-success)

一个基于 Cloudflare Workers 的订阅中转工具，支持 **安全模式（IP + Key）** 与 **分享模式（仅 Key）**。

---

## ✨ 项目简介

SubBridge Worker 通过 Cloudflare 边缘网络，将真实订阅进行安全中转，实现：

* 🔐 限制访问来源（IP 白名单）
* 🔑 Key 鉴权访问（隐藏订阅结构）
* 📦 多订阅统一管理（JSON 映射）
* 🛡 防止订阅泄露
* ⚡ 全球加速访问

适用于：

* Sub-Store
* Clash / Clash Meta
* sing-box
* v2rayN / v2rayNG 等客户端

---

## 🧩 两种运行模式

本项目提供两种 Worker 版本：

---

### 🔐 安全版（secure.js）【推荐】

* ✔ IP 白名单 + Key 鉴权
* ✔ 安全性最高
* ✔ 推荐自用

---

### 🔗 分享版（share.js）

* ✔ 仅 Key 鉴权
* ❌ 无 IP 限制
* ⚠ 适合临时分享，不建议长期公开

---

## 🧱 项目结构

```text id="9zx6we"
subbridge-worker/
├── workers/
│   ├── secure.js
│   └── share.js
├── README.md
├── example.env
├── .gitignore
└── LICENSE
```

---

## 🚀 快速开始

### 1️⃣ 部署 Worker

登录 Cloudflare：

👉 Workers & Pages → Create Worker

---

### 2️⃣ 选择版本

#### 🔐 安全版（推荐）

上传：

```text id="mrk2fq"
workers/secure.js
```

---

#### 🔗 分享版

上传：

```text id="z2gqfa"
workers/share.js
```

---

## 🔧 3️⃣ 获取 IP Hash（仅安全版需要）

---

### ✅ 推荐（浏览器）

打开控制台执行：

```javascript id="tqafrc"
async function hashIP(ip) {
  const data = new TextEncoder().encode(ip);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}
hashIP("你的公网IP").then(console.log);
```

---

### 其他方式

#### Linux / VPS

```bash id="k2px9n"
echo -n "你的公网IP" | sha256sum
```

#### Windows PowerShell

```powershell id="5pz9gx"
[System.BitConverter]::ToString(
  [System.Security.Cryptography.SHA256]::Create().ComputeHash(
    [System.Text.Encoding]::UTF8.GetBytes("你的公网IP")
  )
).Replace("-", "").ToLower()
```

---

## ⚙️ 4️⃣ 配置环境变量

在 Cloudflare → Worker → Settings → Variables 添加：

---

### 🔐 IP 白名单（仅 secure.js 使用）

```text id="r6q4j7"
ALLOWED_IPS=hash1,hash2
```

---

### 🔑 订阅映射（两个版本通用）

```text id="n3v9jq"
SUB_MAP={"key1":"订阅1","key2":"订阅2"}
```

---

### 示例

```text id="3s3d91"
SUB_MAP={"a8f3k2x":"https://example.com/sub1","9dj2kq1":"https://example.com/sub2"}
```

---

## 🔗 5️⃣ 使用方式

```text id="r9z8d2"
https://your-worker.workers.dev/?key=a8f3k2x
```

---

## 📊 日志系统

内置简易日志（console.log）

---

### 示例

```text id="9dfk3a"
[2026-03-24T15:00:00Z] [IP:1.2.3.4] [KEY:a8f3k2x] 🚀 Fetching subscription
[2026-03-24T15:00:00Z] [IP:1.2.3.4] [KEY:a8f3k2x] ✅ Success: 200
```

---

### 查看日志

Cloudflare → Workers → Logs

---

## 🔐 安全说明

### ✔ 已实现

* IP 白名单（secure.js）
* Key 鉴权
* 环境变量隔离

---

### ⚠ 建议

* 不要公开 Worker URL
* 不要泄露 key
* 分享版请定期更换 key

---

## ⚠️ 常见问题

### ❓ 403 Forbidden

* IP 不在白名单（安全版）
* key 错误

---

### ❓ Invalid key

* SUB_MAP 未配置
* key 不存在

---

### ❓ 订阅拉取失败

* 源站限制访问
* 订阅地址失效

---

## 🧩 使用场景

* 多订阅统一管理
* Sub-Store 中转
* 防止订阅泄露
* 临时分享订阅

---

## 📈 架构

```text id="r8n5m3"
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
