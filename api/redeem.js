/**
 * POST /api/redeem — email + invitation code → access
 */

const { guardPublicPost } = require("./_lib/security");

const LABEL = process.env.INVITE_LABEL || "invite-access";
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
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
  if (email.length > 254) return false;
  return true;
}

function normalizeCode(code) {
  return String(code || "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "")
    .slice(0, 64);
}

function getValidCodes() {
  const raw = process.env.INVITE_CODES || "";
  return raw
    .split(/[,\n]/)
    .map((c) => normalizeCode(c))
    .filter(Boolean);
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
    `| IP | ${record.ip || "—"} |`,
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
  const gate = await guardPublicPost(req, res, {
    route: "redeem",
    limit: 10, // code guesses per IP per window
    windowMs: 15 * 60 * 1000,
  });
  if (!gate.ok) return;

  const input = gate.body || {};

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

  // Constant-ish path: always check membership the same way
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
    ip: String(gate.ip || "").slice(0, 64),
    created_at: new Date().toISOString(),
  };

  try {
    await logAccess(record);
  } catch (err) {
    console.error("redeem log error", err && err.message);
  }

  const token = Buffer.from(
    JSON.stringify({ e: email, c: code, t: Date.now() })
  ).toString("base64url");

  return json(res, 200, {
    ok: true,
    message: "Welcome",
    token,
    redirect: "/guide",
  });
};
