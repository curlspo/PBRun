# Public form security (waitlist + invite codes)

## What we protect against

| Threat | Mitigation |
|--------|------------|
| Casual bot form spam | Hidden honeypot fields; empty honeypot required |
| Same email flooding | Duplicate detection (recent waitlist issues) |
| Oversized payloads | 12 KB body limit → `413` |
| Cross-site browser posts from random sites | Origin allowlist (pbcrun.com, www, vercel.app previews) |
| Rapid fire from one IP | Rate limit: **5 waitlist** / **10 code tries** per IP per 15 min; **20 global** public POSTs / IP / 15 min |
| XSS via stored fields | Admin UI escapes HTML; GitHub stores as text/markdown |
| “Malicious code” injection into our site | No `eval` of user input; API only stores truncated strings |

## What we are *not* fully protected against

| Threat | Why | Stronger option |
|--------|-----|-----------------|
| Distributed flood (many IPs) | Rate limit is **per serverless instance** (in-memory), not a global Redis | Vercel **Attack Challenge Mode** / Bot Protection; Cloudflare in front; Upstash Redis rate limit |
| Headless scripts with no Origin | Origin check allows missing Origin (CLI/tools) | Require CAPTCHA (Turnstile/hCaptcha) |
| GitHub API exhaustion | Attackers can still burn issue quota until GitHub 429s | Move waitlist to a DB; disable issue logging under load |
| Shared invitation codes | Codes are shared secrets; can be leaked | One-time codes in a database |

## Recommended ops settings (Vercel)

1. Project → **Settings → Security** — enable **Attack Challenge Mode** or bot protection if available on your plan when under attack.  
2. Keep `GITHUB_TOKEN` with **minimal scopes** (repo issues only).  
3. Rotate `INVITE_CODES` if a code leaks.  
4. Watch GitHub issues labeled `waitlist` / `invite-access` for spam; close in bulk.

## Limits (current code)

- Subscribe (`/api/subscribe`): **5 / IP / 15 min**  
- Redeem (`/api/redeem`): **10 / IP / 15 min**  
- Combined public forms: **20 / IP / 15 min**  
- Max body: **12 KB**
