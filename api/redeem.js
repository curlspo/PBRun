/**
 * POST /api/redeem
 * Exchange email + invitation code for site access.
 *
 * Body JSON:
 *   email*   string
 *   code*    string
 *   language string
 *   website  honeypot
 */

const LABEL = process.env.INVITE_LABEL || "invite-access";
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
      try {
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

function normalizeCode(code) {
  return String(code || "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "");
}

function getValidCodes() {
  const raw = process.env.INVITE_CODES || "";
  return raw
    .split(/[,\n]/)
    .map((c) => normalizeCode(c))
    .filter(Boolean);
}

function clientIp(req) {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.length) return xf.split(",")[0].trim();
  return req.headers["x-real-ip"] || "";
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
      "User-Agent": "pbcrun-invite",
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

async function logAccess(record) {
  const body = [
    "<!-- pbcrun-invite-access -->",
    "```json",
    JSON.stringify(record, null, 2),
    "```",
    "",
    `| Email | ${record.email} |`,
    `| Code | ${record.code} |`,
    `| Language | ${record.language || "—"} |`,
    `| Created | ${record.created_at} |`,
  ].join("\n");

  try {
    await gh(`/repos/${REPO}/issues`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: `Access: ${record.email}`,
        body,
        labels: [LABEL],
      }),
    });
  } catch (err) {
    // Label may not exist yet — retry without labels
    if (err.status === 422) {
      await gh(`/repos/${REPO}/issues`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `Access: ${record.email}`,
          body,
        }),
      });
      return;
    }
    throw err;
  }
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

  if (input.website || input._honey || input.company) {
    return json(res, 200, { ok: true });
  }

  const email = normalizeEmail(input.email);
  const code = normalizeCode(input.code);

  if (!isValidEmail(email)) {
    return json(res, 400, { ok: false, error: "A valid email is required" });
  }
  if (!code) {
    return json(res, 400, { ok: false, error: "Invitation code is required" });
  }

  const valid = getValidCodes();
  if (!valid.length) {
    console.error("INVITE_CODES is empty");
    return json(res, 500, {
      ok: false,
      error: "Invitation codes are not configured yet.",
    });
  }

  if (!valid.includes(code)) {
    return json(res, 401, {
      ok: false,
      error: "That invitation code is not valid.",
    });
  }

  const record = {
    email,
    code,
    language: String(input.language || "").trim().slice(0, 16),
    user_agent: String(req.headers["user-agent"] || "").slice(0, 400),
    ip: String(clientIp(req)).slice(0, 64),
    created_at: new Date().toISOString(),
  };

  try {
    await logAccess(record);
  } catch (err) {
    console.error("redeem log error", err && err.message);
    // Still grant access if code is valid even if logging fails
  }

  // Opaque client token (not a secret; gate is the code). Helps client remember access.
  const token = Buffer.from(
    JSON.stringify({ e: email, c: code, t: Date.now() })
  ).toString("base64url");

  return json(res, 200, {
    ok: true,
    message: "Welcome",
    token,
    redirect: "/app",
  });
};
