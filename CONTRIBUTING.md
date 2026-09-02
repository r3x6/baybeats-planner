# Contributing

## Setup

1. Fork/clone the repo.
2. Open `index.html` directly in a browser, or serve it locally
   (`python3 -m http.server` / `npx serve .`). No build step, no dependencies to install.

## Making changes

- Keep it a single self-contained HTML file — no build step, no bundler, no framework. That's a
  deliberate choice so it stays trivially deployable (Netlify Drop, GitHub Pages, or literally
  double-clicking the file).
- Match the existing CSS custom-property theme (see the `:root`/`--livewire`/`--arena`/
  `--chillout`/`--annexe`/`--powerhouse` variables near the top) rather than hardcoding new colors.
- If you touch act data (country/genre/type/times), note your source in the PR — this data was
  hand-verified against Esplanade + label/press pages act by act, and it's easy to silently
  reintroduce a guess.
- If you swap `window.storage` for `localStorage` (see README), test that skip/restore still
  round-trips correctly on reload — that's the one piece of state this app keeps.

## Submitting

1. Open a PR against `main` with a clear description of what changed and why.
2. For visual changes, a before/after screenshot helps a lot — this app leans heavily on a
   specific "electronic whimsy" aesthetic (neon palette, glitch title, bouncy hovers), so it's
   easy for a change to be functionally correct but visually off-brand.
3. If you update act data for a future year's festival, flag that clearly — this repo is
   currently scoped to the 2026 edition (dates, registration windows, and the acts themselves are
   all specific to 3–6 Sep 2026).

## Reporting issues

Open a GitHub issue. For anything about the map tab, a screenshot of the layout issue is more
useful than a text description.
