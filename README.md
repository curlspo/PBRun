# PBCRun

Unofficial Monterey Car Week companion — **invite gate + guide app**.

## What’s live

| Surface | URL / path |
|---------|------------|
| Interest / invite landing | https://pbcrun.vercel.app (→ pbcrun.com when DNS is set) |
| Enter with code | Landing form → `/app` (placeholder) **or** full guide via Expo |
| Waitlist request | Landing secondary form |
| Privacy | `/privacy` |
| Admin waitlist | `/admin` |

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

## DNS

Point **pbcrun.com** at Vercel (see `docs/DNS_AND_WAITLIST.md`).

## Disclaimer

PBCRun is an unofficial guide not affiliated with the Pebble Beach Concours d’Elegance.
