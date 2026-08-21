# Portfolio — Ionel Merca

Personal engineering portfolio. A prerendered React app deployed to
[ionelmerca.com](https://ionelmerca.com/) via GitHub Pages with a custom domain.

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
| `npm run dev` | Dev server with HMR at http://localhost:5173 (no prerender — `#root` is empty) |
| `npm run build` | Type-check, client bundle, SSR bundle, then prerender — see below |
| `npm run preview` | Serve the built `dist/` locally to sanity-check the production output |
| `npm run lint` | Run ESLint over the project |

The typical local loop: `npm run dev` while working, then
`npm run build && npm run preview` before pushing. The production output differs
from dev in ways that matter — prerendered page content, per-route `<head>` tags,
the generated sitemaps, and the SPA redirect all exist only in the built output.

---

## How it's built

- **React 19** + **TypeScript** + **Vite 6** — prerendered at build time, hydrated
  in the browser. See [Prerendering](#prerendering).
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

### The build

`npm run build` is three phases, all required:

```bash
tsc -b && vite build                                      # 1. type-check + client bundle → dist/
vite build --ssr src/entry-server.tsx --outDir dist-ssr    # 2. server bundle  → dist-ssr/
node scripts/seo-postbuild.mjs                             # 3. prerender + <head> + sitemaps
```

Phase 3 imports `dist-ssr/entry-server.js`, renders every route to HTML, and
injects it into `<div id="root">`. It throws if that div isn't found, so a future
Vite change fails the build rather than silently shipping empty pages.

Phase 2 prints `"dynamically imported … but also statically imported"` warnings
for each case-study page. Expected: `dist-ssr/` never reaches a browser, and the
client bundle keeps all six lazy chunks.

### Prerendering

The site used to ship an empty `<div id="root">` — 55 words of HTML and two
links. Google indexed 1 of 7 pages. The build now server-renders every route, so
`dist/index.html` carries ~2,800 words and 22 links, and each case study
1,200–4,900 words of its own.

Three pieces make it work:

- **`src/entry-server.tsx`** — the SSR entry, with an **eager** import map of the
  case-study pages. `App.tsx` loads them via `React.lazy`, and `renderToString`
  never awaits a lazy import, so rendering `<App/>` for a case-study route would
  emit only the empty `<Suspense>` fallback.
- **`src/main.tsx`** — `hydrateRoot` when `#root` already has content,
  `createRoot` when it doesn't. The branch keeps `npm run dev` working, since the
  dev server has no prerender step.
- **`src/context.tsx`** — a two-pass render. `localStorage`, `navigator` and
  `matchMedia` are read in a post-mount effect rather than a `useState`
  initializer, so the browser's first render matches the server's. The server
  defaults (`SSR_LANG = "en"`, `SSR_DARK = true`) must stay in sync with what the
  prerenderer emits or hydration breaks.

---

## Project structure

```
src/
  main.tsx                # client entry; theme class before first paint (no FOUC); hydrate vs create
  entry-server.tsx        # SSR entry; eager page imports + render(pathname). Never shipped to the browser.
  App.tsx                 # route matcher + click interceptor; optional `url` prop for the prerenderer
  context.tsx             # AppProvider: lang (en/ro) + dark theme, two-pass for hydration safety
  i18n.ts                 # all UI strings, EN + RO (typed)
  index.css               # theme vars (HSL), dot-grid, glow-orbs, glass-card, fade-in animations
  data/portfolio.ts       # experiences, projects, skillGroups, socialLinks
  hooks/useFadeIn.ts      # IntersectionObserver → adds .visible class
  components/             # Nav, Hero, Experience, Clients, Projects, CaseStudies, Skills, Contact, Footer
  pages/                  # one file per long-form case study (CaseStudy*.tsx)
scripts/
  seo-postbuild.mjs       # prerender, per-route <head>, sitemap generation. Owns the `caseStudies` array.
public/
  404.html                # GitHub Pages SPA fallback (see Routing)
  logos/                  # client / payment-provider logos
  case-studies/           # static image assets for select case studies
  robots.txt, og-image.png, favicon.svg
index.html                # <head>: SEO meta, JSON-LD, SPA-redirect decoder; <body>: the empty #root
.github/workflows/deploy.yml   # CI: build + deploy to GitHub Pages

dist/                     # build output (git-ignored)
  index.html              #   prerendered
  case-study/<slug>.html  #   one prerendered file per case study
  sitemap.xml             #   GENERATED by seo-postbuild.mjs — not a source file
  sitemap-pages.xml       #   GENERATED — identical content at a second path (see SEO notes)
dist-ssr/                 # SSR bundle (git-ignored), consumed by seo-postbuild.mjs
```

> **The sitemaps are generated, not authored.** There is no `public/sitemap.xml`.
> To change what's in them, edit the `caseStudies` array in
> `scripts/seo-postbuild.mjs`.

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

**GitHub Pages has no server-side rewrites.** The build emits a real
`dist/case-study/<slug>.html` for every case study, so Pages serves each one with
a **200** and no trailing-slash redirect — the served URL matches the canonical,
the sitemap, and the internal links.

`public/404.html` remains as a fallback for any path without a prerendered file.
It encodes the requested path into a query string and redirects to `/`; the
inline script in `index.html` decodes it back via `history.replaceState` before
React mounts. This is the standard
[spa-github-pages](https://github.com/rafgraph/spa-github-pages) technique.

In `npm run dev` there is no prerender step, so reach case studies by clicking
through from the home page rather than hard-refreshing a deep link.

### Adding a case study

**Five** edits — mirror an existing one (`src/pages/CaseStudyAttestedKeys.tsx` or
`CaseStudySdjwtOid4vc.tsx` are the best templates):

1. `src/pages/CaseStudy<Name>.tsx` — the page component, including its per-page
   `document.title` / meta description / canonical link / JSON-LD `TechArticle`
   schema set in a `useEffect`.
2. `src/App.tsx` — add a `lazy()` entry to the `caseStudyPages` map.
3. `src/components/CaseStudies.tsx` — add a teaser card entry (slug, domain,
   title, color, EN + RO teasers, keyStat).
4. `scripts/seo-postbuild.mjs` — add an entry to the `caseStudies` array (slug,
   name, title, description, lastmod, priority, changefreq). This drives both the
   prerendered `<head>` **and** the sitemap rows.
5. `src/entry-server.tsx` — add an eager `import` and a `pages` map entry.

> **Step 5 is the one that gets missed.** Without it the page still builds, still
> routes, and looks correct in the browser — but its static HTML prerenders
> **empty**, so crawlers see nothing. Nothing fails loudly. After adding a case
> study, check:
>
> ```bash
> grep -c '<h1' dist/case-study/<slug>.html     # → 1
> ls -l dist/case-study/<slug>.html             # → tens of KB, not ~11 KB
> ```

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

> **Note on the deploy target.** The site is served at the apex of a custom
> domain, `ionelmerca.com`, so `vite.config.ts` uses `base: '/'`.
> `public/CNAME` carries the domain into `dist/` on every build — **don't delete
> it**, or the site falls back to `exilonx.github.io`. The old host issues a
> path-preserving 301 to the custom domain.

---

## SEO notes

Reworked 2026-08 after Search Console reported 1 of 7 pages indexed, 2 clicks and
50 impressions over 90 days. Diagnosis: the served HTML had 55 words and two
links, so crawlers had neither content nor a path to the case studies.
[Prerendering](#prerendering) fixed both at once — internal links only exist in
static HTML once the body is rendered.

Decisions here are deliberate; please don't undo them casually.

- **No `<meta name="keywords">`.** Google has ignored it since 2009 and a stuffed
  list is a weak spam signal elsewhere. The same terms live in the Person JSON-LD
  `knowsAbout` array in `index.html`, which is actually machine-read.
- **No `hreflang` between `?lang=en` and `?lang=ro`.** Both serve byte-identical
  HTML — the language swap is client-side — so annotating them as translations
  would be a false signal Google would distrust. The self-referential canonical
  already handles the duplication. Revisit only if a genuinely prerendered `/ro/`
  route ships.
- **`?lang=` is written to the URL only on an explicit toggle**, never on load.
  Writing it on load minted `/?lang=en` and `/?lang=ro` as separate crawlable
  URLs; both sit in Search Console today as duplicates of `/`.
- **Two sitemaps with identical content** — `sitemap.xml` and
  `sitemap-pages.xml`, both generated, both advertised in `robots.txt`. Search
  Console keeps one record per submitted URL, and `/sitemap.xml`'s record has
  been stuck on "couldn't fetch" since it was first submitted (2026-04-28) while
  the file genuinely 404'd. The second path gives it a clean record. The file
  itself is valid — verified for XML well-formedness, no BOM, `application/xml`,
  200 to a Googlebot user-agent.
- **Structured data already exists** — Person, WebSite and a per-case-study
  `TechArticle`. Any audit tool claiming these are missing failed to parse the
  head; check `dist/index.html` before acting on it.

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
