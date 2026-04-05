export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.searchParams.get("key");

    const ip = request.headers.get("cf-connecting-ip") || "unknown";
    const now = new Date().toISOString();

    const log = (msg) => {
      console.log(`[${now}] [IP:${ip}] [KEY:${key}] ${msg}`);
    };

    // ======== IP 白名单 ========
    const allowedHashes = env.ALLOWED_IPS
      ? env.ALLOWED_IPS.split(",")
      : [];

    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      encoder.encode(ip)
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const ipHash = hashArray.map(b =>
      b.toString(16).padStart(2, "0")
    ).join("");

    if (!allowedHashes.includes(ipHash)) {
      log("❌ IP not allowed");
      return new Response("Forbidden", { status: 403 });
    }

    if (!key) {
      log("❌ Missing key");
      return new Response("Missing key", { status: 400 });
    }

    // ======== 订阅映射（JSON）========
    let map = {};
    try {
      map = JSON.parse(env.SUB_MAP || "{}");
    } catch {
      return new Response("Config error", { status: 500 });
    }

    const target = map[key];

    if (!target) {
      log("❌ Invalid key");
      return new Response("Invalid key", { status: 403 });
    }

    log("🚀 Fetching subscription");

    try {
      const resp = await fetch(target, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        },
      });

      log(`✅ Success: ${resp.status}`);

      return new Response(resp.body, {
        status: resp.status,
        headers: resp.headers,
      });

    } catch (err) {
      log("❌ Fetch error");
      return new Response("Fetch failed", { status: 500 });
    }
  },
};
