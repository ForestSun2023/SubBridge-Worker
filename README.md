🚀 SubBridge Worker

一个基于 Cloudflare Workers 的轻量级订阅中转工具，支持 Key 鉴权 + IP 白名单 + 多订阅管理 。

✨ 项目简介

SubBridge Worker 通过 Cloudflare 边缘网络，将真实订阅进行安全中转，实现：

🔐 限制访问来源（IP 白名单）

🔑 Key 鉴权访问（隐藏订阅结构）

📦 多订阅统一管理（JSON 映射）

🛡 防止订阅泄露

⚡ 全球加速访问

适用于：

Sub-Store

Clash / Clash Meta

sing-box

v2rayN / v2rayNG 等客户端

🔥 核心特性

功能

说明

IP 白名单

仅允许指定服务器访问

SHA-256 加密

IP 不明文存储

Key 鉴权

防止订阅被猜测

多订阅支持

使用 key 动态映射

环境变量隔离

不在代码中存储敏感信息

内置日志

可查看访问记录

无状态

无数据库

全球加速

Cloudflare 边缘网络

🧱 项目结构
subbridge-worker/
├── worker.js
├── README.md
├── LICENSE
├── .gitignore
└── example.env

🚀 快速开始

1️⃣ 部署 Worker

登录 Cloudflare：

👉 Workers & Pages → Create Worker

将 worker.js 内容粘贴并部署。

🔧 2️⃣ 获取 IP Hash（跨平台）

为了启用 IP 白名单，需要将公网 IP 转换为 SHA-256。

✅ 推荐方法（浏览器）

打开浏览器控制台（F12）执行：
async function hashIP(ip) {
const data = new TextEncoder().encode(ip);
const hash = await crypto.subtle.digest("SHA-256", data);
return Array.from(new Uint8Array(hash))
.map(b => b.toString(16).padStart(2, "0"))
.join("");
}
hashIP("你的公网IP").then(console.log);

✅ Linux / VPS
echo -n "你的公网IP" | sha256sum

✅ Windows PowerShell
[System.BitConverter]::ToString(
[System.Security.Cryptography.SHA256]::Create().ComputeHash(
[System.Text.Encoding]::UTF8.GetBytes("你的公网IP")
)
).Replace("-", "").ToLower()

✅ 在线工具

搜索： sha256 在线

⚠ 注意不要输入敏感 token

⚙️ 3️⃣ 配置环境变量

在 Cloudflare → Worker → Settings → Variables 中添加：

🔐 IP 白名单
ALLOWED_IPS=hash1,hash2

🔑 订阅映射（核心）
SUB_MAP={"key1":"订阅1","key2":"订阅2"}

👉 示例：
SUB_MAP={"a8f3k2x":"https://example.com/sub1","9dj2kq1":"https://example.com/sub2"}

🔗 4️⃣ 使用方式
https://your-worker.workers.dev/?key=a8f3k2x

📦 Sub-Store 示例
https://your-worker.workers.dev/?key=yourkey

📊 日志系统

内置简易日志（console.log）

示例
[2026-03-24T15:00:00Z] [IP:1.2.3.4] [KEY:a8f3k2x] 🚀 Fetching subscription
[2026-03-24T15:00:00Z] [IP:1.2.3.4] [KEY:a8f3k2x] ✅ Success: 200

查看方式

Cloudflare → Workers → Logs

注意

日志为临时存储

高流量可能被采样

🔐 安全说明

✔ 已实现

IP 白名单限制

Key 鉴权

环境变量隔离

⚠ 建议

不要公开 Worker URL

不要泄露 key

定期更换订阅 token

⚠️ 常见问题

❓ 403 Forbidden

IP 不在白名单

hash 错误

❓ Invalid key

key 不存在

SUB_MAP 未配置

❓ 订阅拉取失败

源站限制访问（如 Cloudflare challenge）

订阅地址失效

🧩 使用场景

多订阅统一管理

Sub-Store 中转

防止订阅泄露

自建轻量订阅系统

📈 架构
客户端（Clash / Sub-Store）
↓
SubBridge Worker
↓
原始订阅服务器

📄 License

MIT License

⭐ 支持项目

如果这个项目对你有帮助，欢迎：

Star ⭐

Fork 🍴

⚠️ 免责声明

本项目仅供学习与技术研究使用，请遵守当地法律法规。
