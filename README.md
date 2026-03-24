# 🚀 SubBridge Worker

一个基于 Cloudflare Workers 的订阅中转工具。

![Cloudflare](https://img.shields.io/badge/Cloudflare-Worker-orange)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ 特性

- 🔐 IP 白名单（SHA-256）
- 📦 多订阅支持（无限扩展）
- 🛡 防止订阅泄露
- ⚡ 边缘加速

---

## 🚀 使用方法

### 1️⃣ 部署 Worker

将 `worker.js` 部署到 Cloudflare Workers。

---

### 2️⃣ 配置 IP 白名单

生成 hash：

```bash
echo -n "你的公网IP" | sha256sum
```

填入：

ALLOWED_IPS=hash1,hash2
### 3️⃣ 配置订阅

在 Cloudflare Variables 中添加：

SUB1=https://your-subscription-1
SUB2=https://your-subscription-2
### 4️⃣ 使用
https://your-worker.workers.dev/?id=1
## ⚠️ 注意
不要提交真实 token
不要泄露 IP hash
本项目仅供学习与个人使用
## 📄 License

MIT


---
