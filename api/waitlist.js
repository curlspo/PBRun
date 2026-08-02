/**
 * GET /api/waitlist
 * Admin-only list of waitlist signups.
 * Auth: Authorization: Bearer <ADMIN_SECRET>
 *    or ?key=<ADMIN_SECRET>
 *
 * Query:
 *   format=json|csv   (default json)
 *   status=pending|invited|...
 */

const LABEL = process.env.WAITLIST_LABEL || "waitlist";
const REPO = process.env.GITHUB_REPO || "curlspo/PBRun";

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function unauthorized(res) {
  return json(res, 401, { ok: false, error: "Unauthorized" });
}

function getAdminSecret(req) {
  const auth = req.headers.authorization || "";
  if (auth.toLowerCase().startsWith("bearer ")) {
    return auth.slice(7).trim();
  }
  try {
    const u = new URL(req.url, "http://localhost");
    return u.searchParams.get("key") || "";
  } catch {
    return "";
  }
}

function isAuthorized(req) {
  const expected = process.env.ADMIN_SECRET;
  if (!expected) return false;
  const got = getAdminSecret(req);
  return got && got === expected;
}

async function gh(path) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not configured");
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "pbcrun-waitlist",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.message || `GitHub ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return data;
}

function parseRecord(issue) {
  const body = issue.body || "";
  const match = body.match(/```json\s*([\s\S]*?)```/);
  let record = {};
  if (match) {
    try {
      record = JSON.parse(match[1]);
    } catch {
      record = {};
    }
  }
  return {
    id: String(issue.number),
    issue_url: issue.html_url,
    issue_state: issue.state,
    email: record.email || "",
    name: record.name || "",
    phone: record.phone || "",
    city: record.city || "",
    attending: record.attending || "",
    platform: record.platform || "",
    source: record.source || "",
    language: record.language || "",
    utm_source: record.utm_source || "",
    utm_medium: record.utm_medium || "",
    utm_campaign: record.utm_campaign || "",
    referrer: record.referrer || "",
    page_url: record.page_url || "",
    user_agent: record.user_agent || "",
    ip: record.ip || "",
    status: record.status || "pending",
    created_at: record.created_at || issue.created_at,
    consent: record.consent !== false,
  };
}

function toCsv(rows) {
  const cols = [
    "id",
    "created_at",
    "email",
    "name",
    "phone",
    "city",
    "attending",
    "platform",
    "source",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "status",
    "referrer",
    "page_url",
    "ip",
    "issue_url",
  ];
  const esc = (v) => {
    const s = v == null ? "" : String(v);
    if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const lines = [cols.join(",")];
  for (const r of rows) {
    lines.push(cols.map((c) => esc(r[c])).join(","));
  }
  return lines.join("\n");
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return json(res, 405, { ok: false, error: "Method not allowed" });
  }
  if (!isAuthorized(req)) {
    return unauthorized(res);
  }

  let format = "json";
  let statusFilter = "";
  try {
    const u = new URL(req.url, "http://localhost");
    format = (u.searchParams.get("format") || "json").toLowerCase();
    statusFilter = (u.searchParams.get("status") || "").toLowerCase();
  } catch {
    /* ignore */
  }

  try {
    // List by label (reliable) — Search API is eventually consistent.
    const [owner, repo] = REPO.split("/");
    const issues = await gh(
      `/repos/${owner}/${repo}/issues?labels=${encodeURIComponent(
        LABEL
      )}&state=all&per_page=100&sort=created&direction=desc`
    );
    let rows = (Array.isArray(issues) ? issues : [])
      .filter((i) => !i.pull_request)
      .map(parseRecord);

    if (statusFilter) {
      rows = rows.filter((r) => String(r.status).toLowerCase() === statusFilter);
    }

    if (format === "csv") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="pbcrun-waitlist.csv"'
      );
      res.setHeader("Cache-Control", "no-store");
      res.end(toCsv(rows));
      return;
    }

    return json(res, 200, {
      ok: true,
      count: rows.length,
      total_count: rows.length,
      signups: rows,
    });
  } catch (err) {
    console.error("waitlist list error", err && err.message);
    return json(res, 500, {
      ok: false,
      error: "Could not load waitlist",
    });
  }
};
