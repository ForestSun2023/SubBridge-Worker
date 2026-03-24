export default {
  async fetch(request) {
    // ========= 配置区 =========

    // IP Hash（用 SHA-256 生成）
    const ALLOWED_IP_HASHES = [
      "your_ip_hash_here"
    ];

    // 多订阅（无限扩展）
    const subscriptions = {
      "1": "https://example.com/sub1",
      "2": "https://example.com/sub2"
    };

    // ========= IP 校验 =========
    const ip = request.headers.get("cf-connecting-ip");
    if (!ip) {
      return new Response("Forbidden", { status: 403 });
    }

    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      encoder.encode(ip)
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const ipHash = hashArray.map(b =>
      b.toString(16).padStart(2, "0")
    ).join("");

    if (!ALLOWED_IP_HASHES.includes(ipHash)) {
      return new Response("Forbidden", { status: 403 });
    }

    // ========= 订阅选择 =========
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id || !subscriptions[id]) {
      return new Response("Subscription not found", { status: 404 });
    }

    const target = subscriptions[id];

    // ========= 转发 =========
    const resp = await fetch(target, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      },
    });

    return new Response(resp.body, {
      status: resp.status,
      headers: resp.headers,
    });
  },
};
