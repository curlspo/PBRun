# PBCRun content guide

Source of truth for the in-app schedule and directory:

```
guide/content/content.json
```

## After you edit content

```bash
cd guide
# optional: sanity check JSON
python3 -m json.tool content/content.json > /dev/null

# rebuild web export for production
npx expo export --platform web
rm -rf ../guide-web ../guide.html
mkdir -p ../guide-web
cp -R dist/* ../guide-web/
cp dist/index.html ../guide.html

# deploy from repo root
cd ..
vercel --prod
```

## Field notes

### Events
| Field | Notes |
|--------|--------|
| `date` | `YYYY-MM-DD` (PT calendar day) |
| `startTime` / `endTime` | 24h `HH:MM` PT |
| `access` | `free` \| `ticketed` \| `mixed` |
| `tier` | `A` = must-have accuracy · `B`/`C` = planning anchors |
| `infoUrl` | Always prefer official organizer page |
| `lastVerifiedAt` | Update when you re-check times |

### Cars
Rows marked **illustrative seed** in `className` are UX placeholders until real 2026 field lists are curated. Prefer official entrant PDFs when available.

### Versioning
Bump `contentVersion` using `YYYY.MM.DD.N` (e.g. `2026.08.02.3`).

## A-tier checklist (peak weekend)

- [ ] Tour d’Elegance date/time (official)
- [ ] Concours Sunday dawn / public hours
- [ ] Concours Village multi-day hours
- [ ] Auction house venues for midweek
- [ ] Quail / Concorso / Lemons exact 2026 venues
- [ ] Laguna Seca Reunion day tickets

## Sources
- https://www.pebblebeachconcours.net/event-calendar/
- https://www.pebblebeachconcours.net/event/pebble-beach-concours-delegance/
- https://www.seemonterey.com/monterey-car-week-events-by-day/
