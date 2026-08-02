# DNS + Waitlist backend

## Live URLs

| URL | Purpose |
|-----|---------|
| https://pbcrun.vercel.app | Production landing (works now) |
| https://pbcrun.com | **Needs GoDaddy DNS** (still parking page) |
| https://pbcrun.vercel.app/admin.html | Waitlist admin list |
| POST `/api/subscribe` | Public signup |
| GET `/api/waitlist?key=ADMIN_SECRET` | Admin JSON list |
| GET `/api/waitlist?format=csv&key=…` | CSV export |

## GoDaddy DNS (required for pbcrun.com)

In GoDaddy → Domains → **pbcrun.com** → DNS → manage records:

| Type | Name | Value | TTL |
|------|------|--------|-----|
| **A** | `@` | `216.198.79.1` | 600 |
| **A** | `@` | `64.29.17.1` | 600 |
| **CNAME** | `www` | `1841e4af15d2cdf6.vercel-dns-017.com` | 600 |

Delete any existing A/CNAME/forwarding that points to GoDaddy parking (`76.223.*`, `13.248.*`, or “domain forwarding”).

Then wait 5–30 minutes and open https://pbcrun.com

Verify: `vercel domains verify pbcrun.com`

## Waitlist data fields

Each signup stores:

| Field | Notes |
|-------|--------|
| email | required, unique |
| name | optional |
| phone | optional (API supports; form can add later) |
| city | optional |
| attending | yes / no / maybe |
| platform | ios / web / both |
| source | landing, utm, etc. |
| utm_source / medium / campaign | from URL |
| referrer, page_url | browser |
| user_agent, ip | server |
| consent | must be true |
| status | pending (default) |
| created_at | ISO timestamp |

Storage: GitHub Issues on `curlspo/PBRun` with label **`waitlist`** (structured JSON in the body).  
Admin UI and CSV export read that list. Migrate to Postgres/Supabase later if volume grows.

## Env vars (Vercel)

| Name | Purpose |
|------|---------|
| `GITHUB_TOKEN` | PAT with `repo` scope (create issues) |
| `GITHUB_REPO` | `curlspo/PBRun` |
| `ADMIN_SECRET` | Protects `/api/waitlist` and admin login |
| `WAITLIST_LABEL` | default `waitlist` |

## Instagram tonight

Until DNS propagates, bio link: **https://pbcrun.vercel.app**
