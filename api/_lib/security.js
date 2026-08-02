/**
 * Shared hardening for public APIs (subscribe / redeem).
 * In-memory rate limits apply per serverless instance (not global).
 * Pair with Vercel Attack Challenge / Bot Protection for stronger defense.
 */

const MAX_BODY_BYTES = 12 * 1024; // 12 KB

/** @type {Map<string, number[]>} */
const hits = new Map();

const ALLOWED_ORIGINS = [
  "https://pbcrun.com",
  "https://www.pbcrun.com",
  "https://pbcrun.vercel.app",
];

function clientIp(req) {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.length) return xf.split(",")[0].trim();
  return String(req.headers["x-real-ip"] || req.socket?.remoteAddress || "unknown");
}

/**
 * Sliding window: max `limit` hits per `windowMs` for key.
 * @returns {{ ok: true } | { ok: false, retryAfterSec: number }}
 */
function rateLimit(key, limit, windowMs) {
  const now = Date.now();
  const cutoff = now - windowMs;
  let arr = hits.get(key) || [];
  arr = arr.filter((t) => t > cutoff);
  if (arr.length >= limit) {
    hits.set(key, arr);
    const retryAfterSec = Math.max(1, Math.ceil((arr[0] + windowMs - now) / 1000));
    return { ok: false, retryAfterSec };
  }
  arr.push(now);
  hits.set(key, arr);
  // Prevent unbounded map growth
  if (hits.size > 5000) {
    const keys = [...hits.keys()].slice(0, 1000);
    for (const k of keys) hits.delete(k);
  }
  return { ok: true };
}

function isAllowedOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) {
    // Non-browser clients (curl, scripts). Still rate-limited.
    return true;
  }
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  // Preview deployments: https://pbcrun-*.vercel.app
  if (/^https:\/\/pbcrun[a-z0-9-]*\.vercel\.app$/i.test(origin)) return true;
  return false;
}

/**
 * Read request body with a hard size cap.
 */
function readBodyLimited(req, maxBytes = MAX_BODY_BYTES) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (c) => {
      size += c.length;
      if (size > maxBytes) {
        reject(Object.assign(new Error("Payload too large"), { status: 413 }));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) return resolve({});
      const ct = (req.headers["content-type"] || "").toLowerCase();
      try {
        if (ct.includes("application/x-www-form-urlencoded")) {
          const params = new URLSearchParams(raw);
          const obj = {};
          for (const [k, v] of params.entries()) obj[k] = v;
          return resolve(obj);
        }
        resolve(JSON.parse(raw));
      } catch (e) {
        reject(Object.assign(new Error("Invalid JSON"), { status: 400 }));
      }
    });
    req.on("error", reject);
  });
}

function setCors(res, req) {
  const origin = req.headers.origin;
  if (origin && isAllowedOrigin(req)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  } else if (!origin) {
    // Same-origin browser posts don't send Origin on all navigations; API fetch from our pages does.
    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGINS[0]);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

/**
 * Common pre-checks for public POST handlers.
 * @param {{ route: string, limit?: number, windowMs?: number }} opts
 */
async function guardPublicPost(req, res, opts) {
  const route = opts.route || "api";
  const limit = opts.limit ?? 8;
  const windowMs = opts.windowMs ?? 15 * 60 * 1000;

  setCors(res, req);

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return { ok: false, done: true };
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ ok: false, error: "Method not allowed" }));
    return { ok: false, done: true };
  }

  if (!isAllowedOrigin(req)) {
    res.statusCode = 403;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ ok: false, error: "Forbidden" }));
    return { ok: false, done: true };
  }

  const ip = clientIp(req);
  const rl = rateLimit(`${route}:${ip}`, limit, windowMs);
  if (!rl.ok) {
    res.statusCode = 429;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Retry-After", String(rl.retryAfterSec));
    res.end(
      JSON.stringify({
        ok: false,
        error: "Too many requests. Please try again later.",
      })
    );
    return { ok: false, done: true };
  }

  // Extra brake: same IP across all public forms
  const global = rateLimit(`global:${ip}`, 20, windowMs);
  if (!global.ok) {
    res.statusCode = 429;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Retry-After", String(global.retryAfterSec));
    res.end(
      JSON.stringify({
        ok: false,
        error: "Too many requests. Please try again later.",
      })
    );
    return { ok: false, done: true };
  }

  try {
    const body = await readBodyLimited(req);
    return { ok: true, body, ip };
  } catch (err) {
    const status = err.status || 400;
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(
      JSON.stringify({
        ok: false,
        error: status === 413 ? "Request too large" : "Invalid request body",
      })
    );
    return { ok: false, done: true };
  }
}

module.exports = {
  clientIp,
  rateLimit,
  guardPublicPost,
  setCors,
  ALLOWED_ORIGINS,
  MAX_BODY_BYTES,
};
