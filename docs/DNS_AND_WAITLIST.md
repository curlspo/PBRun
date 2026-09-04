# DNS + Waitlist backend

## What actually serves pbcrun.com today

| URL | What it is (2026-09-04) |
|-----|-------------------------|
| https://pbcrun.com | **Not this repo.** Next.js waitlist titled `PBC Run — PBCRun / Concours companion (existing work)`, CTA **Get updates**. Same HTML as `pbcrun.vercel.app`. |
| https://pbcrun.vercel.app | Same Next waitlist. Vercel project name **`pbcrun`** (owns the `*.vercel.app` subdomain). |
| https://github.com/curlspo/PBRun `main` | This static HTML + `/api` + Expo `/guide` app. Title / `og:title`: **PBC Run — Concours companion** (PR #16, `a028eac`). |

DNS is already on Vercel (`pbcrun.com` → `216.198.79.1`). **No GoDaddy change is required.** The mismatch is a Vercel **project / Git / domain alias** remap.

This repo last received a GitHub `Production` deployment on **2026-08-02** (`806aa2c`). Merging PR #16 did **not** create a new GitHub deployment — the Git integration that used to publish `curlspo/PBRun` is disconnected or pointed elsewhere.

Historical deployment host pattern: `pbcrun-*-curlspo-5104s-projects.vercel.app` (team **curlspo-5104's projects**, project name **pbcrun**).

## How this repo deploys

| Item | Value |
|------|--------|
| Repo | `curlspo/PBRun` |
| Production branch | `main` |
| Site | Static HTML at repo root (`index.html`, `css/`, `js/`) |
| Functions | `api/*.js` (Vercel Serverless) |
| Edge / routing | `middleware.js` (invite cookie gate for `/guide`) |
| Config | `vercel.json` (`cleanUrls`, security headers, `/guide` rewrites) |
| Framework preset | **Other** (no root `package.json`; do not set Root Directory to `guide/`) |
| Intended title / OG | `PBC Run — Concours companion` |

A second Vercel project **`pbrun`** (`prj_AZoCnlkW9jxQOJlf2WpRZWNxmpAO`) was created on team `curlspo-5104s-projects` for this repo. Git link could not be verified from CI (project read 404). Jennifer must connect Git in the dashboard (steps below).

## Jennifer: remap pbcrun.com to this repo

Do this in the Vercel dashboard. Agents cannot move `pbcrun.com` off the Next waitlist project.

### Preferred — reconnect project `pbcrun` (keeps pbcrun.vercel.app + pbcrun.com)

1. Open [Vercel](https://vercel.com) → team that owns **pbcrun.com** (likely **curlspo-5104's projects**).
2. Open project **`pbcrun`** (Production domains include `pbcrun.com` and `pbcrun.vercel.app`).
3. **Settings → Git**
   - Disconnect the current source if it is not `curlspo/PBRun`.
   - **Connect Git Repository** → GitHub → **`curlspo/PBRun`**.
4. **Settings → General**
   - **Root Directory**: empty (repository root). Not `guide/`.
   - **Framework Preset**: **Other**.
   - **Build Command** / **Output Directory**: empty.
   - **Production Branch**: `main`.
5. **Settings → Environment Variables** — keep or re-add: `GITHUB_TOKEN`, `GITHUB_REPO=curlspo/PBRun`, `ADMIN_SECRET`, `WAITLIST_LABEL`, `INVITE_CODES`, `ACCESS_COOKIE_SECRET`.
6. **Deployments → Create Deployment** (or push any commit to `main`) so latest `main` goes to **Production**.
7. Confirm https://pbcrun.com `<title>` is **PBC Run — Concours companion** (not “PBCRun / Concours companion (existing work)”).

### Alternate — keep the Next waitlist as project `pbcrun`, point the apex at `pbrun`

1. Open project **`pbrun`** (`prj_AZoCnlkW9jxQOJlf2WpRZWNxmpAO`).
2. **Settings → Git → Connect** `curlspo/PBRun` (same General settings as above).
3. Deploy latest `main` to Production on **`pbrun`**.
4. Project **`pbcrun`** → **Settings → Domains** → remove **`pbcrun.com`** and **`www.pbcrun.com`**.
5. Project **`pbrun`** → **Settings → Domains** → Add **`pbcrun.com`** and **`www.pbcrun.com`**.
6. `pbcrun.vercel.app` will still be the Next waitlist until that project is renamed or deleted. Apex **pbcrun.com** will serve this repo.

DNS records (already in place; only change if someone moved the domain off Vercel):

| Type | Name | Value | TTL |
|------|------|--------|-----|
| **A** | `@` | `216.198.79.1` | 600 |
| **A** | `@` | `64.29.17.1` | 600 |
| **CNAME** | `www` | Vercel-assigned `*.vercel-dns-*.com` | 600 |

Verify after remap: `vercel domains inspect pbcrun.com`

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
| `INVITE_CODES` | Comma-separated invite codes |
| `ACCESS_COOKIE_SECRET` | Cookie value that unlocks `/guide` |
