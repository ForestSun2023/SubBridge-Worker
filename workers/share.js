export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.searchParams.get("key");

    const ip = request.headers.get("cf-connecting-ip") || "unknown";
    const now = new Date().toISOString();

    const log = (msg) => {
      console.log(`[${now}] [IP:${ip}] [KEY:${key}] ${msg}`);
    };

    if (!key) {
      log("❌ Missing key");
      return new Response("Missing key", { status: 400 });
    }

    // ======== 订阅映射 ========
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
