# Claude MVP Plan vs Design Doc — Reconciliation

| Field | Value |
|-------|--------|
| **Claude source** | `docs/pbcrun-app-plan-mvp.pdf` (extract: `docs/claude-mvp-brief.txt`) |
| **Prior design** | `docs/DESIGN.md` |
| **Date** | 2026-08-01 |
| **Status** | **Product cut corrected** after founder input (Claude brief is input, not law) |

---

## Founder decisions (binding)

| Decision | Choice |
|----------|--------|
| **Platforms this sprint** | **iPhone + web only.** No Android store app. |
| **Photos** | **No photos in final MVP** (no camera, no image uploads, no photo feed). |
| **Claude Spotted (photo UGC)** | **Rejected as written.** Presumptive and wrong for this deadline/legal surface. Replaced below. |
| **Domain** | pbcrun.com (www / pages.dev first; apex when DNS ready) |
| **Apple** | Developer membership ready (TestFlight path open) |
| **Team** | 1 eng + 1 content |
| **Brand tagline** | Unofficial Monterey Car Week companion |

---

## What we keep from Claude (good)

Claude correctly framed the product as a **guide**, not a platform:

1. **Calendar** — every event Aug 7–16, official + satellite, full descriptions  
2. **Free / Ticketed tags** — first-class on every event  
3. **Save + device calendar** — bookmark and export  
4. **Car Directory** — programmed shows only (Concours, Quail, Concorso, etc.), class-filterable  
5. **Check-in + personal log** — private attendance record  
6. **Four-tab IA** — Home · Calendar · Cars · Profile  
7. **Non-affiliation** everywhere  
8. **Hard cuts** — no messaging, no public social network, no RSVP/ticketing platform, no “official” voting  

**Positioning line (Claude):**  
*A visitor’s guide to every event of Car Week — official and satellite, free and ticketed — with the competing cars laid out by show, and a simple personal log of what you’ve been to.*

---

## What we reject or rewrite from Claude

| Claude said | Problem | Corrected direction |
|-------------|---------|---------------------|
| **Spotted feed** = live photo + caption posts | Photos banned; multi-user UGC needs backend, moderation, abuse surface; not “nothing extra” | **No Spotted feed in MVP** |
| Offline = Phase 2 only | Peninsula signal is real | **Cache calendar + directory after first load** (read-only offline). No photo cache issue if no photos. |
| Day 11 iOS **+ Android** store submit | Founder: no Android this sprint | **iOS + web only** |
| Day 14 public store live ahead of Aug 7 | Today is Aug 1; App Review is not guaranteed in 3–4 days | **Launch bar = live web + TestFlight**; public App Store is best-effort |
| Full entrant directories Day 2 | Rights + volume; hundreds of cars | **Seed Directory** (featured / A-tier classes first); expand continuously |

---

## Corrected MVP product (authoritative)

### One-liner

**PBCRun** — unofficial Car Week guide: **what’s on**, **what’s free vs ticketed**, **who’s on the field at programmed shows**, and **your private log** of where you checked in. **No photos. No social feed. No Android this sprint.**

### Tabs

| Tab | MVP behavior |
|-----|----------------|
| **Home** | Today at a glance · next event · featured car of the day (from Directory seed) · disclaimer strip |
| **Calendar** | Day tabs Aug 7–16 · free/ticketed filter · event detail · save · add to device calendar · check-in |
| **Cars** | **Directory only** — programmed shows, class/show filters, car detail (basics + description when known). **No Spotted mode.** |
| **Profile** | Private check-in log · saved upcoming · settings · about/disclaimer |

### For wildcard / satellite shows (Lemons, street shows)

Claude used Spotted to fill “no roster.” Without photos/UGC:

- Event still appears on **Calendar** with strong description (“what it is,” “where to watch,” free/ticketed).  
- Optional editorial **“What to look for”** bullets on event detail (curated text, not user posts).  
- User still **checks in** and can add a **private text note** on that check-in (“red Yugo near the food trucks”) — **device-local only**, not a public feed.

That preserves the “personal record of the week” job without turning PBCRun into Instagram.

### Explicitly out of MVP

- Photo capture / upload / galleries  
- Live multi-user Spotted feed  
- Messaging, public social, push campaigns  
- Android store listing  
- Accounts (unless a later Spotted phase forces them)  
- Backend required for core loops (calendar, directory, check-in, save = local + static content)  
- Auxiliary event organizing / RSVP / ticketing / official voting  

### Phase 2 candidates (later)

- Spotted (text-first or photo, with backend + moderation)  
- Push “starting soon”  
- Multi-year archive  
- Android store  
- Richer offline packaging  

---

## Platform & delivery (from DESIGN.md, still binding)

| Layer | Choice |
|-------|--------|
| Stack | Expo + TypeScript → native **iOS** + **static web** |
| Host | Cloudflare Pages → pbcrun.com (www / pages.dev first) |
| Content | Curated `content.json` (events + cars + venues as needed) |
| Personal data | Local only (saves, check-ins, private notes) |
| Soft-launch bar | Live web + TestFlight + A-tier calendar/directory accuracy + disclaimer |

---

## Corrected 14-day emphasis (not Claude’s Day 11 dual-store fantasy)

| Days | Focus |
|------|--------|
| 1–2 | **Content:** full calendar seed + free/ticketed; Directory seed (Concours/Quail/Concorso A-tier, not every car) |
| 3–4 | Expo shell: Home + Calendar + event detail + save + device calendar |
| 5–6 | Cars Directory + filters + car detail; web deploy pipeline |
| 7 | Review / cut |
| 8 | Check-in + personal log + private notes |
| 9 | Disclaimer / onboarding / store copy |
| 10 | Polish + offline offline for calendar/directory |
| 11–12 | QA, content freeze, TestFlight |
| 13–14 | Field test + public web push; App Store submit if review window allows |

---

## Alignment table (post-correction)

| Area | Final |
|------|--------|
| Calendar + free/ticketed | **Claude** |
| Save + device calendar | **Claude** |
| Check-in + private log | **Claude** |
| Car Directory | **Claude** (seeded, not complete day 1) |
| Spotted photo feed | **Dropped** |
| Private text notes on check-in | **Our replacement** for “I saw something” |
| Platforms | **iPhone + web** |
| Offline | **Light cache** calendar/directory |
| Unofficial legal posture | **Both** |

---

## Next engineering step

1. Rewrite `DESIGN.md` feature/IA/data model/PR plan to this corrected cut (or treat this file as product brief and DESIGN as engineering — then sync).  
2. Day 1 content spreadsheet: events Aug 7–16.  
3. Scaffold Expo app with 4 tabs.

---

## References

- Claude PDF: `docs/pbcrun-app-plan-mvp.pdf`  
- Extract: `docs/claude-mvp-brief.txt`  
- Technical design (needs sync): `docs/DESIGN.md`  
