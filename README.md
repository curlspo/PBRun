# PBCRun

Unofficial Monterey Car Week companion — **invite gate + guide app**.

## What’s live

| Surface | URL / path |
|---------|------------|
| Production domain | https://pbcrun.com (must be this repo — see remap in `docs/DNS_AND_WAITLIST.md`) |
| Enter with code | Landing form → `/app` (placeholder) **or** full guide via Expo |
| Waitlist request | Landing secondary form |
| Privacy | `/privacy` |
| Admin waitlist | `/admin` |

`<title>` / `og:title`: **PBC Run — Concours companion**.

## Guide app (MVP)

Expo + TypeScript app in **`guide/`**:

- **Home** — up next, featured car, today’s events  
- **Calendar** — Aug 7–16 day chips, free/ticketed filter  
- **Cars** — directory seed (programmed shows)  
- **Profile** — local check-ins + saved events  
- **Event detail** — save, check-in + private note, directions, official links  

Content: `guide/content/content.json` (curate and expand).

### Run locally

```bash
cd guide
npm install
npm run ios    # simulator
npm run web    # browser
```

### iOS TestFlight (next)

```bash
cd guide
npx eas-cli login
npx eas build --platform ios --profile preview
```

Bundle ID: `com.pbcrun.app`

## Invitation codes

Vercel env `INVITE_CODES` (comma-separated). Redeploy after changes.

## Deploy / DNS

Static HTML + `api/` + `middleware.js` via Vercel (`vercel.json`). Production branch is `main`.  
**pbcrun.com** DNS is already on Vercel; if the live title is not **PBC Run — Concours companion**, the domain is still attached to the Next waitlist project — remap in `docs/DNS_AND_WAITLIST.md`.

## Disclaimer

PBCRun is an unofficial guide not affiliated with the Pebble Beach Concours d’Elegance.
