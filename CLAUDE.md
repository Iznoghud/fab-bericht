# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A single-page browser app (no build step, no framework, no server) for analyzing a Flesh & Blood card collection. The user loads two CSV files — a full card list from Cardmarket and their inventory — and the app calculates which cards are missing and by how much.

## Running the app

Open `index.html` directly in a browser. No server needed. The only external dependency is PapaParse (loaded from CDN in `index.html`).

For quick local testing in WSL: `explorer.exe index.html` or serve with `python3 -m http.server 8080`.

## File structure

Three files only:
- `index.html` — static shell, sidebar layout, drop zones, settings inputs. All logic is in `app.js`.
- `style.css` — CSS custom properties for theming, layout, responsive breakpoints.
- `app.js` — everything: config constants, state, data processing, rendering, event handlers.

## Architecture of app.js

The file is divided into clearly marked sections (`// ═══…`):

**Config (top of file)** — All user-facing tunable constants live here:
- `AUSSCHLUSS_MUSTER` — regex patterns for sets to exclude (Blitz Decks, Promos, etc.)
- `FIRST_ED` — set names that are First Edition
- `SET_GRUPPE` — maps First/Unlimited editions to one group name
- `SET_SHORT_OVERRIDE`, `SET_TABNAME_OVERRIDE` — display name overrides

**State (`S`)** — Single global object. Key sub-objects:
- `S.kartenCSV` / `S.invCSV` — raw parsed CSV data (after filtering non-singles)
- `S.result` — computed analysis result `{ haupt, andere }` (two sections: main sets and "andere Produkte")
- `S.tab[sektion]` — active tab per section: `'ranking'|'diff'|'scan'|'wants'`
- `S.f` — global rarity+foil filter (used in ranking and filter bar)
- `S.erf` — Kartenerfassung (card capture) sub-state
- `S.wants` — Wantsliste sub-state

**Data pipeline** (`runAnalyse` → `analysiereGruppe`):
1. `loadFile()` parses CSV with PapaParse, filters to `SINGLE_RARITAETEN` (cards with a valid rarity), caches raw CSV in localStorage.
2. `runAnalyse()` reads Ziel-Menge (target quantities) from sidebar inputs, splits sets into `haupt` (>120 cards, not excluded) and `andere`, then calls `analysiereGruppe()` for each.
3. `analysiereGruppe()` joins card list against inventory by `cardmarketId`, computes per-card shortfalls (`fehlend`), groups by expansion into `setsData`, and builds the `ranking` array sorted by missing card count.
4. Result is stored in `S.result` and optionally cached in localStorage.

**Render loop** — `render()` is the single re-render function; it rebuilds the entire `#main` innerHTML on every state change. No virtual DOM, no diffing. Each tab has its own `render*Panel()` function.

**Tabs** (rendered by `render()`):
- `ranking` → `renderRankingPanel()` — sortable set table; row click calls `goToKartenerfassung(expansion)`
- `diff` → `renderDiffPanel()` — inventory diff between two snapshots
- `scan` → `renderScanPanel()` — card capture / Kartenerfassung (search, pick expansion, log found cards, export CSV)
- `wants` → `renderWantsPanel()` — Wantsliste

**Persistence** — localStorage keys:
- `fab_karten_meta` / `fab_karten_csv` — card list cache
- `fab_inv_meta` / `fab_inv_csv` — inventory cache
- `fab_result` / `fab_result_ts` — analysis result cache

## Key conventions

- `cardmarketId` is the primary join key between card list and inventory.
- Foil type is derived from the card *name* string via `getFoilType()` — not a separate field. Names containing "Cold Foil", "Rainbow Foil", "Reverse Foil" map to `'cold'` or `'rainbow'`; everything else is `'none'`.
- Sets are split into `haupt` (main sets, >120 cards) and `andere` (everything else) in `runAnalyse()`. The two sections get separate navigation tabs and independent `S.tab`/`S.activeSet`/`S.search` state.
- Non-single items (Boosters, Sleeves, Playmats, etc.) are filtered out at load time by checking that `rarity` is in `SINGLE_RARITAETEN`.
- Version number in the header (`index.html`) is bumped automatically by a pre-commit hook.

## Adding a new set or expansion

1. If it needs to be excluded: add a regex to `AUSSCHLUSS_MUSTER`.
2. If First Edition: add to `FIRST_ED`.
3. If it groups with another edition: add both names to `SET_GRUPPE`.
4. Optionally add display overrides to `SET_SHORT_OVERRIDE` / `SET_TABNAME_OVERRIDE`.
