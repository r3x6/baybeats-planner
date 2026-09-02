# Baybeats 2026 Planner

A fan-made day-by-day interactive schedule for [Baybeats 2026](https://www.esplanade.com/whats-on/festivals-and-series/baybeats/2026)
(3–6 Sep, Esplanade – Theatres on the Bay — 5 stages, 48 acts). Not affiliated with or endorsed
by Esplanade.

**Live:** https://babyeater2026.netlify.app

## What it does

- Day-by-day grid calendar with 30-minute gridlines, one column per stage, color-coded by venue.
- Diagonal hatch marks the two registration-required venues (Powerhouse² & Annexe) vs. the three
  free walk-in stages (LiveWire, Arena, Chillout).
- Click a set to "skip" it (crosses it out and moves it to a Skipped list) — click again to
  restore. Persisted via `window.storage` where available (see note below).
- A GET button on registration-required acts links straight to that act's own Esplanade
  registration page.
- Second tab renders a schematic (not-to-scale) map of the Esplanade grounds, colour-matched to
  the calendar legend, for rough wayfinding.
- All 48 acts' country/genre/type were hand-verified against Esplanade blurbs, label pages, and
  press — a couple of acts remain undocumented anywhere findable and are flagged in-widget rather
  than guessed.
- "Electronic whimsy" visual style — neon palette, glitch title animation, bouncy hover states.

## About the file itself

This is a **single HTML file with no `<!DOCTYPE>`/`<html>`/`<head>` wrapper** — just `<style>`,
markup, and a `<script>` block. That's not an accident or a bug: it's exactly how it was built
(via a coding/file tool rather than a bundler) and exactly what's live today. Browsers parse it
fine as-is. It's kept byte-for-byte matching the live deploy in this repo rather than "cleaned
up" into a full document, so you can diff future changes against a known-working baseline.

No React, no build step, no external JS libraries — just vanilla HTML/CSS/JS.

## ⚠️ `window.storage` note

The skip/restore list persistence uses `window.storage`, which is a storage API specific to
Claude Artifacts — **it does not exist on Netlify or any other static host.** The calls are
wrapped in `try/catch` so they fail silently rather than throwing, which means:

- On the live Netlify site: skip/restore works, but **only for the current session** — refreshing
  the page clears it.
- If you ever rebuild this as a published Claude Artifact instead, `window.storage` would work
  natively and skips would actually persist.

If real cross-session persistence on the static site matters, swap `window.storage` for
`localStorage` (trivial, same-origin, works everywhere) — see Contributing below.

## Data notes

- Set durations (~45 min per act, 30 min for Budding Programme acts) are **estimates** —
  Esplanade doesn't publish exact durations, so block widths are a guide, not a guarantee.
- Registration windows: priority (Esplanade&Me members) and public windows are hardcoded from
  the 2026 festival's actual dates — these will need updating for any future year's edition.

## Local dev

No build step — just open `index.html` in a browser, or serve it statically:

```bash
python3 -m http.server 8000
# or
npx serve .
```

## Deploying

Currently deployed via manual **Netlify Drop**. To switch to auto-deploy: connect this repo in
Netlify via **"Deploy from Git"** instead — same site, but every push to `main` redeploys
automatically.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT — see [LICENSE](./LICENSE).
