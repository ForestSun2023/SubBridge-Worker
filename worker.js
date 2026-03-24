export default {
  async fetch(request, env) {
    // ======== IP 白名单 ========
    const allowedHashes = env.ALLOWED_IPS
      ? env.ALLOWED_IPS.split(",")
      : [];

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

    if (!allowedHashes.includes(ipHash)) {
      return new Response("Forbidden", { status: 403 });
    }

    // ======== 订阅选择 ========
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response("Missing id", { status: 400 });
    }

    const target = env["SUB" + id];

    if (!target) {
      return new Response("Subscription not found", { status: 404 });
    }

    // ======== 转发 ========
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
