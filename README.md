# Portfolio — Ionel Merca

Personal engineering portfolio. A single-page React app deployed to
[exilonx.github.io](https://exilonx.github.io/) via GitHub Pages.

Inspired by [santifer.io](https://santifer.io/en)
([source](https://github.com/santifer/cv-santiago)).

---

## Quick start

Requires **Node 20.18.x** and npm (see [Prerequisites](#prerequisites)).

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:5173
```

Open http://localhost:5173 — Vite serves the app with hot-module reload, so
edits appear without a manual refresh.

To exercise a case-study deep link locally (e.g. `/case-study/attested-secure-keys`),
navigate there from the site rather than hard-refreshing the URL — client-side
routing is described under [Routing](#routing).

---

## Prerequisites

- **Node 20.18.x** — pinned. Do **not** upgrade Vite to 8.x; it requires Node
  20.19+, which this project deliberately stays below. The CI workflow also
  builds on `20.18`.
- **npm** — the repo ships a `package-lock.json`; CI uses `npm ci`.

There's no `.nvmrc`, so if you use `nvm` set the version manually:
`nvm use 20.18`.

---

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with HMR at http://localhost:5173 |
| `npm run build` | Type-check (`tsc -b`) then produce a production build in `dist/` |
| `npm run preview` | Serve the built `dist/` locally to sanity-check the production output |
| `npm run lint` | Run ESLint over the project |

The typical local loop: `npm run dev` while working, then
`npm run build && npm run preview` before pushing to confirm the production
bundle behaves the same as dev (the SPA redirect and canonical/JSON-LD SEO tags
only matter in the built output).

---

## How it's built

- **React 19** + **TypeScript** + **Vite 6** — SPA, bundled by Vite.
- **Tailwind CSS v3** via the PostCSS plugin (not the v4 Vite plugin). Theme is
  driven by CSS custom properties (HSL) in `src/index.css`; Tailwind maps them
  with `hsl(var(--...))`.
- **No router** — a ~30-line hand-rolled path matcher in `src/App.tsx` handles
  the only two routes (home + case study). See [Routing](#routing).
- **No state library** — `useState` + a small React Context (`src/context.tsx`)
  for language (en/ro) and dark theme, both persisted to `localStorage`.
- **No animation library** — plain CSS transitions plus an `IntersectionObserver`
  hook (`src/hooks/useFadeIn.ts`) for fade-ins.
- **Fonts** — Inter, self-hosted via `@fontsource-variable/inter` (imported in
  `src/main.tsx`), so there's no runtime font request.

The build is `tsc -b && vite build`: TypeScript project references are compiled
first (this will fail the build on type errors), then Vite bundles to `dist/`.

---

## Project structure

```
src/
  main.tsx                # entry; applies the theme class before first paint (no FOUC)
  App.tsx                 # route matcher + click interceptor for client-side nav
  context.tsx             # AppProvider: lang (en/ro) + dark theme, persisted to localStorage
  i18n.ts                 # all UI strings, EN + RO (typed)
  index.css               # theme vars (HSL), dot-grid, glow-orbs, glass-card, fade-in animations
  data/portfolio.ts       # experiences, projects, skillGroups, socialLinks
  hooks/useFadeIn.ts      # IntersectionObserver → adds .visible class
  components/             # Nav, Hero, Experience, Clients, Projects, CaseStudies, Skills, Contact, Footer
  pages/                  # one file per long-form case study (CaseStudy*.tsx)
public/
  404.html                # GitHub Pages SPA redirect (see Routing)
  logos/                  # client / payment-provider logos
  case-studies/           # optional static prerenders for select case studies
  sitemap.xml, robots.txt, og-image.png, favicon.svg
index.html                # <head>: SEO meta, JSON-LD, and the companion SPA-redirect decoder
.github/workflows/deploy.yml   # CI: build + deploy to GitHub Pages
```

Home-page section order lives in `src/App.tsx`:
Nav → Hero → Experience → Projects → Case Studies → Skills → Clients → Contact → Footer.

---

## Routing

There's no router dependency. The app has two route shapes:

- `/` — the single-page portfolio.
- `/case-study/<slug>` — a full-page case study (`src/pages/CaseStudy*.tsx`).

`App.tsx` matches `window.location.pathname` against
`^/case-study/([^/]+)/?$`, maps the slug to a component, and intercepts internal
`<a>` clicks so navigation stays client-side (`history.pushState` + `popstate`).
Same-page `#anchor` links scroll smoothly; cross-page links reset scroll to top.

**GitHub Pages has no server-side rewrites**, so a direct hit or refresh on
`/case-study/foo` would 404. Two companion scripts solve this:

1. `public/404.html` — GitHub serves this on any unknown path. It encodes the
   requested path into a query string and redirects to `/`.
2. The inline script in `index.html` — decodes that query string back into the
   real path via `history.replaceState` before React mounts, so the SPA renders
   the right case study.

This is the standard [spa-github-pages](https://github.com/rafgraph/spa-github-pages)
technique. Because of it, deep links only resolve correctly in the **built /
deployed** app — in `npm run dev`, reach case studies by clicking through from
the home page.

### Adding a case study

A case study is wired in at several points — mirror an existing one
(`src/pages/CaseStudyAgentCommerce.tsx` is a good template):

1. `src/pages/CaseStudy<Name>.tsx` — the page component, including its per-page
   `document.title` / meta description / canonical link / JSON-LD `TechArticle`
   schema set in a `useEffect`.
2. `src/App.tsx` — import it and add `if (route.slug === "<slug>") return <...>`.
3. `src/components/CaseStudies.tsx` — add a teaser card entry (slug, domain,
   title, color, EN + RO teasers, keyStat).
4. `public/sitemap.xml` — add the `/case-study/<slug>` URL.

---

## Deployment & CI

Deployment is automated by **GitHub Actions** —
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

- **Triggers**: push to `portfolio`, `master`, or `main`, plus manual
  `workflow_dispatch`.
- **Build job**: checkout → `actions/setup-node@v4` (Node `20.18`, npm cache) →
  `npm ci` → `npm run build` → upload `dist/` as a Pages artifact.
- **Deploy job**: `actions/deploy-pages@v4` publishes the artifact to the
  `github-pages` environment.
- Concurrency is grouped on `pages` (in-progress deploys are not cancelled).

The workflow uses the modern Pages deployment (artifact + `deploy-pages`), so no
`gh-pages` branch is involved. Merging/pushing to `master` is enough to ship.

> **Note on the deploy target.** The site is served at the root domain
> `exilonx.github.io`, so `vite.config.ts` uses `base: '/'`. There is no
> `public/CNAME` (no custom domain).

---

## Design system

See `src/index.css` for the source of truth.

- **Theme**: CSS custom properties (HSL) under `:root` (light) and `.dark`.
  The toggle swaps the `class` on `<html>`; `main.tsx` applies it before first
  paint to avoid a flash.
- **Colors**: primary (blue 217°), accent (purple 263°), emerald (160°), each as
  an HSL triple so alpha math works.
- **Key classes**: `.dot-grid`, `.glow-orb`, `.glass-card`, `.text-gradient`,
  `.fade-in`, `.skill-badge`, `.section-label`, `.stagger-children`.

---

## Notes for contributors / agents

Project conventions, content voice, and hard constraints (e.g. the Node/Vite
pin and naming rules for past employers) are documented in
[`CLAUDE.md`](CLAUDE.md). Read it before making content or copy changes.
