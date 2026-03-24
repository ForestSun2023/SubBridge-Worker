# SubBridge-Worker
A lightweight Cloudflare Worker for secure subscription relay with IP restriction and multi-source support.

![License](https://img.shields.io/badge/license-MIT-blue)
![Worker](https://img.shields.io/badge/Cloudflare-Worker-orange)

# 🚀 SubBridge Worker

一个基于 Cloudflare Workers 的订阅中转工具，支持：

- 🔐 IP 限制访问（Hash 加密）
- 📦 多订阅管理（无限扩展）
- 🛡 防止订阅泄露
- ⚡ 全球边缘加速

---

## ✨ 特性

- IP 不明文存储（SHA-256）
- 单 Worker 支持多订阅
- 兼容 Sub-Store / Clash / sing-box
- 无需数据库，纯边缘运行

---

## 🚀 快速开始

### 1️⃣ 部署 Worker

将 `worker.js` 上传到 Cloudflare Workers。

---

### 2️⃣ 生成 IP Hash

在你的服务器执行：

```bash
echo -n "你的公网IP" | sha256sum
```

### 填入：

const ALLOWED_IP_HASHES = ["生成的hash"]

### 3️⃣ 添加订阅
const subscriptions = {
  "1": "你的订阅1",
  "2": "你的订阅2"
};

### 4️⃣ 使用方式
https://your-worker.workers.dev/?id=1
https://your-worker.workers.dev/?id=2

⚠️ 注意
请勿提交真实订阅 token
请勿泄露 IP Hash
本项目仅用于学习与个人用途
🧩 适用场景
Sub-Store 订阅中转
绕过 Cloudflare JS Challenge
多机场统一管理
