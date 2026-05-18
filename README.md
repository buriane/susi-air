# Susi Air Pilot Companion App

A mobile-first companion app for Susi Air pilots. Built as a technical assessment, three screens (Sign In, Home Dashboard, Schedule Calendar) that give pilots quick access to their flight hours, upcoming flights, document statuses, and monthly duty schedule.

No backend. Everything runs off local JSON mock data.

---

## Quick Start

```bash
# clone and install
git clone <repo-url>
cd susi-air-app
npm install

# run dev server
npm run dev
```

Open `http://localhost:3000` in your browser. The sign-in page doesn't do real auth, just hit submit and you'll land on the dashboard.

## Build for Production

```bash
npm run build
```

Output goes to `.output/`. You can preview it locally with:

```bash
npm run preview
```

## Run Tests

```bash
npx vitest run
```

---

## Tech Stack & Why

### Nuxt 3 + Vue 3

The brief called for a Vue-based SPA with file-based routing, so Nuxt was the natural choice. It handles routing, auto-imports, and SSR config out of the box. I used the Composition API (`<script setup>`) everywhere, it's just cleaner for this kind of component-heavy UI work.

### Pinia

State management. Required by the brief, and honestly it's the right call over Vuex for any new Vue 3 project. The Composition API-style stores are straightforward and type-safe without much boilerplate.

### SCSS

  Again per the brief, no Tailwind, no CSS-in-JS. I set up a design token system (`_variables.scss`) so colors, typography, spacing, and radii are centralized. Every component references these tokens instead of hardcoding values. BEM naming keeps the class hierarchy readable.

### Chart.js + vue-chartjs

For the flight hours trend chart. It's lightweight enough for a single line chart with a limit line overlay. D3 would have been overkill.

### date-fns

Date math (rolling sums, calendar grid generation, expiry calculations). Tree-shakeable, immutable, and doesn't pollute prototypes like Moment used to. I import only what I need, `differenceInDays`, `addMonths`, `format`, etc.

### Lucide Vue Next

Icon set. Line-style icons that match the clean UI aesthetic. Each icon is a standalone component, so the bundle only includes what's actually used.

### Vitest

Unit testing for the rolling-sum composable. Fast, native ESM support, and works with the same Vite pipeline Nuxt uses.

---

## Project Structure

```
app/
├── assets/scss/          # Design tokens, reset, typography, utilities
├── components/
│   ├── base/             # Atomic UI components (Card, Badge, Button, etc.)
│   ├── home/             # Home dashboard components
│   ├── layout/           # AppHeader, BottomNav, SplashScreen
│   └── schedule/         # Calendar grid, day cells, legend
├── composables/          # Pure functions: rolling sum, expiry logic, chart config
├── layouts/              # Default layout (header + content + bottom nav)
├── pages/                # Route pages: index (sign-in), home, schedule, logbook, more
├── stores/               # Pinia stores: pilot, flightHours, documents, schedule
└── types/                # TypeScript interfaces
data/                     # Mock JSON files (flight hours, documents, schedules)
```

---

## What I'd Do Differently With More Time

**Real loading states with Suspense.** Right now I'm faking load delays with `setTimeout` to show the skeleton screens. In a real app I'd use Vue's `<Suspense>` with async setup or actual API calls so the loading states are tied to real data fetching, not arbitrary timers.

**Accessibility audit.** The calendar grid needs proper ARIA roles (`role="grid"`, `role="gridcell"`), keyboard navigation, and focus management. The bottom nav works but could use `aria-current="page"` on the active tab. Screen reader testing was skipped entirely.

**Component decomposition on the sign-in page.** The sign-in page is one big file with inline SVG icons. I'd extract the form fields into a reusable `FormInput` component and use Lucide icons consistently instead of hand-rolling SVGs.

**Dark mode.** The color token system is already centralized in `_variables.scss`, so swapping to CSS custom properties and adding a dark palette would be a manageable refactor.

---

## Notes

- "Today" is hardcoded to `2026-05-31` via `composables/useToday.ts`. This is intentional, the mock data is built around that date.
- The Logbook and More pages are placeholders. The brief only required Sign In, Home, and Schedule.
- The chart Y-axis intentionally allows values above the limit line. Clamping would hide important safety data.
