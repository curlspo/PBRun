/**
 * Edge gate: /guide requires invite cookie from POST /api/redeem.
 * Uses standard Request/Response (not Next.js-only APIs).
 */

export const config = {
  matcher: [
    "/guide",
    "/guide/(.*)",
    "/guide-web",
    "/guide-web/(.*)",
    "/guide.html",
  ],
};

function getCookie(request, name) {
  const raw = request.headers.get("cookie") || "";
  const parts = raw.split(";");
  for (const part of parts) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return decodeURIComponent(rest.join("=") || "");
  }
  return "";
}

export default function middleware(request) {
  try {
    const secret = process.env.ACCESS_COOKIE_SECRET || "";
    const cookie = getCookie(request, "pbcrun_access");
    const ok = Boolean(secret && cookie && cookie === secret);

    if (ok) {
      return; // allow request to continue
    }

    const url = new URL(request.url);
    url.pathname = "/";
    url.search = "?need_code=1";
    return Response.redirect(url.toString(), 302);
  } catch (err) {
    // Fail closed to landing, never 500 the edge
    try {
      const url = new URL(request.url);
      url.pathname = "/";
      url.search = "?need_code=1";
      return Response.redirect(url.toString(), 302);
    } catch {
      return new Response("Redirect", {
        status: 302,
        headers: { Location: "/?need_code=1" },
      });
    }
  }
}
