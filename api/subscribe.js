/**
 * POST /api/subscribe — waitlist / invitation request
 */

const { guardPublicPost, clientIp } = require("./_lib/security");

const LABEL = process.env.WAITLIST_LABEL || "waitlist";
const REPO = process.env.GITHUB_REPO || "curlspo/PBRun";

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

function isValidEmail(email) {
  // Basic shape only — not full RFC; rejects obvious junk
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
  if (email.length > 254) return false;
  if (email.includes("..")) return false;
  return true;
}

function truthy(v) {
  if (v === true || v === 1) return true;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    return s === "true" || s === "1" || s === "on" || s === "yes";
  }
  return false;
}

function buildRecord(input, req, ip) {
  const email = normalizeEmail(input.email);
  const url =
    typeof input.page_url === "string"
      ? input.page_url
      : req.headers["referer"] || "";

  return {
    email,
    name: String(input.name || "").trim().slice(0, 120),
    phone: String(input.phone || "").trim().slice(0, 40),
    city: String(input.city || "").trim().slice(0, 80),
    attending: String(input.attending || "").trim().toLowerCase().slice(0, 16),
    platform: String(input.platform || "").trim().toLowerCase().slice(0, 16),
    source: String(input.source || "landing").trim().slice(0, 64),
    language: String(input.language || "").trim().slice(0, 16),
    utm_source: String(input.utm_source || "").trim().slice(0, 64),
    utm_medium: String(input.utm_medium || "").trim().slice(0, 64),
    utm_campaign: String(input.utm_campaign || "").trim().slice(0, 64),
    referrer: String(input.referrer || req.headers["referer"] || "").slice(0, 500),
    page_url: String(url).slice(0, 500),
    user_agent: String(req.headers["user-agent"] || "").slice(0, 400),
    ip: String(ip || clientIp(req)).slice(0, 64),
    consent: true,
    status: "pending",
    created_at: new Date().toISOString(),
  };
}

async function gh(path, options = {}) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    const err = new Error("GITHUB_TOKEN is not configured");
    err.status = 500;
    throw err;
  }
  const res = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "pbcrun-waitlist",
      ...(options.headers || {}),
    },
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    const err = new Error(
      (data && (data.message || data.error)) || `GitHub API ${res.status}`
    );
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

async function findExisting(email) {
  const [owner, repo] = REPO.split("/");
  const data = await gh(
    `/repos/${owner}/${repo}/issues?labels=${encodeURIComponent(
      LABEL
    )}&state=all&per_page=100&sort=created&direction=desc`
  );
  const items = Array.isArray(data) ? data : [];
  const needle = email.toLowerCase();
  return items.find((i) =>
    String(i.title || "")
      .toLowerCase()
      .includes(needle)
  );
}

async function createSignup(record) {
  const body = [
    "<!-- pbcrun-waitlist-entry -->",
    "```json",
    JSON.stringify(record, null, 2),
    "```",
    "",
    "| Field | Value |",
    "|-------|-------|",
    `| Email | ${record.email} |`,
    `| Name | ${record.name || "—"} |`,
    `| Source | ${record.source || "—"} |`,
    `| Language | ${record.language || "—"} |`,
    `| IP | ${record.ip || "—"} |`,
    `| Status | ${record.status} |`,
    `| Created | ${record.created_at} |`,
  ].join("\n");

  return gh(`/repos/${REPO}/issues`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: `Waitlist: ${record.email}`,
      body,
      labels: [LABEL],
    }),
  });
}

module.exports = async function handler(req, res) {
  const gate = await guardPublicPost(req, res, {
    route: "subscribe",
    limit: 5, // 5 invitation requests per IP per window
    windowMs: 15 * 60 * 1000,
  });
  if (!gate.ok) return;

  const input = gate.body || {};

  // Honeypot — bots that fill hidden fields
  if (input.website || input._honey || input.company) {
    return json(res, 200, { ok: true, duplicate: false });
  }

  const email = normalizeEmail(input.email);
  if (!isValidEmail(email)) {
    return json(res, 400, { ok: false, error: "A valid email is required" });
  }
  if (!truthy(input.consent)) {
    return json(res, 400, {
      ok: false,
      error: "Consent is required to join the list",
    });
  }

  const record = buildRecord({ ...input, email }, req, gate.ip);

  try {
    const existing = await findExisting(email);
    if (existing) {
      return json(res, 200, {
        ok: true,
        duplicate: true,
        id: String(existing.number),
        message: "You’re already on the list",
      });
    }

    const issue = await createSignup(record);
    return json(res, 201, {
      ok: true,
      duplicate: false,
      id: String(issue.number),
      message: "Thanks — we will respond shortly.",
    });
  } catch (err) {
    console.error("subscribe error", err && err.message, err && err.data);
    // GitHub abuse / rate limit surfaces as 403/429
    if (err.status === 403 || err.status === 429) {
      return json(res, 503, {
        ok: false,
        error: "Service is busy. Please try again later.",
      });
    }
    return json(res, 500, {
      ok: false,
      error: "Could not save signup. Please try again shortly.",
    });
  }
};
