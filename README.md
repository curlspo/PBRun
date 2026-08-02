# PBCRun

Unofficial Monterey Car Week companion — **invite-only early access**.

## Live now (tonight)

Static **invitation waitlist** landing page at the site root:

- **Request invitation** + email capture
- Unofficial disclaimer
- Form submissions → FormSubmit → `jhollidayesq@gmail.com` (change in `index.html` if needed)

### Local preview

```bash
cd ~/PBRun
npx --yes serve -l 3000
# open http://localhost:3000
```

### Deploy (Vercel)

```bash
cd ~/PBRun
vercel --prod
```

Point **pbcrun.com** / **www.pbcrun.com** DNS to the Vercel project (Domains in the Vercel dashboard).  
Until apex works, share the `*.vercel.app` URL or `www` once DNS is attached.

### First email test

FormSubmit sends a **one-time confirmation** to the inbox in the form `action` URL. Confirm that email before relying on production submissions.

## Product docs

- `docs/DESIGN.md` — technical design (pre-app)
- `docs/BRIEF_RECONCILIATION.md` — Claude brief vs corrected MVP cut
- `docs/pbcrun-app-plan-mvp.pdf` — Claude product plan PDF

## Stack (app — next)

Expo (iOS + web) after waitlist is live. Android deferred. No photos in MVP.
