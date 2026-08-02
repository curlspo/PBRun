/**
 * POST /api/subscribe
 * Public waitlist signup. Stores a structured record (GitHub Issues labeled "waitlist").
 *
 * Body (JSON or form-urlencoded):
 *   email*          string
 *   name            string
 *   phone           string
 *   city            string
 *   attending       "yes" | "no" | "maybe" | ""
 *   platform        "ios" | "web" | "both" | ""
 *   source          string  (e.g. landing, instagram)
 *   utm_source      string
 *   utm_medium      string
 *   utm_campaign    string
 *   consent*        boolean / "true"  — must be true
 *   website         honeypot (must be empty)
 */

const LABEL = process.env.WAITLIST_LABEL || "waitlist";
const REPO = process.env.GITHUB_REPO || "curlspo/PBRun";

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) return resolve({});
      const ct = (req.headers["content-type"] || "").toLowerCase();
      try {
        if (ct.includes("application/json")) {
          resolve(JSON.parse(raw));
          return;
        }
        if (ct.includes("application/x-www-form-urlencoded")) {
          const params = new URLSearchParams(raw);
          const obj = {};
          for (const [k, v] of params.entries()) obj[k] = v;
          resolve(obj);
          return;
        }
        // try JSON anyway
        resolve(JSON.parse(raw));
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function truthy(v) {
  if (v === true || v === 1) return true;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    return s === "true" || s === "1" || s === "on" || s === "yes";
  }
  return false;
}

function clientIp(req) {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.length) return xf.split(",")[0].trim();
  return req.headers["x-real-ip"] || "";
}

function buildRecord(input, req) {
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
    utm_source: String(input.utm_source || "").trim().slice(0, 64),
    utm_medium: String(input.utm_medium || "").trim().slice(0, 64),
    utm_campaign: String(input.utm_campaign || "").trim().slice(0, 64),
    referrer: String(input.referrer || req.headers["referer"] || "").slice(0, 500),
    page_url: String(url).slice(0, 500),
    user_agent: String(req.headers["user-agent"] || "").slice(0, 400),
    ip: String(clientIp(req)).slice(0, 64),
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
  // Prefer listing by label (immediate) over Search API (eventual consistency).
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
    `| Phone | ${record.phone || "—"} |`,
    `| City | ${record.city || "—"} |`,
    `| Attending | ${record.attending || "—"} |`,
    `| Platform | ${record.platform || "—"} |`,
    `| Source | ${record.source || "—"} |`,
    `| UTM | ${[record.utm_source, record.utm_medium, record.utm_campaign].filter(Boolean).join(" / ") || "—"} |`,
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
  if (req.method === "OPTIONS") {
    return json(res, 204, {});
  }
  if (req.method !== "POST") {
    return json(res, 405, { ok: false, error: "Method not allowed" });
  }

  let input;
  try {
    input = await readBody(req);
  } catch {
    return json(res, 400, { ok: false, error: "Invalid request body" });
  }

  // Honeypot
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

  const record = buildRecord({ ...input, email }, req);

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
      message: "You’re on the list",
    });
  } catch (err) {
    console.error("subscribe error", err && err.message, err && err.data);
    return json(res, err.status && err.status < 500 ? err.status : 500, {
      ok: false,
      error: "Could not save signup. Please try again shortly.",
    });
  }
};
