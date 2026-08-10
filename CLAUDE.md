# Portfolio — Ionel Merca

Personal engineering portfolio. Deployed target: `exilonX.github.io` (GitHub Pages).

Inspired by [santifer.io](https://santifer.io/en) ([source](https://github.com/santifer/cv-santiago)).

## Stack

- **React 19** + **TypeScript** + **Vite 6** (Node 20.18 — can't go higher without Vite 8 needing Node 20.19+)
- **Tailwind CSS v3** (PostCSS plugin, not the v4 Vite plugin)
- **No router** — single page, anchor-based navigation
- **No state lib** — `useState` + React Context for theme/lang
- **No animation lib** — plain CSS transitions + IntersectionObserver for fade-ins

## Commands

```bash
npm run dev     # dev server at http://localhost:5173
npm run build   # production build to dist/
npm run preview # preview the production build
```

## Deployment

Live on `exilonX.github.io` (GitHub Pages) via **`.github/workflows/deploy.yml`** —
push to the default branch builds and publishes `dist/`. Deep links work through
the `public/404.html` → `index.html` SPA-redirect pair (needed because Pages has
no server-side routing).

## Structure

```
src/
  App.tsx                 # hand-rolled routing (no router): home vs /case-study/<slug>.
                          #   home order: Nav → Hero → Experience → Projects → CaseStudies → Skills → Clients → Contact → Footer
  main.tsx                # entry; applies theme class before first paint (no FOUC)
  context.tsx             # AppProvider: lang (en/ro) + dark theme, both persisted to localStorage
  i18n.ts                 # all UI strings in EN + RO (typed)
  index.css               # theme vars (HSL), dot-grid, glow-orbs, glass-card, fade-in animations
  data/portfolio.ts       # experiences, projects (7), skillGroups, socialLinks
  hooks/useFadeIn.ts      # IntersectionObserver → adds .visible class
  components/
    Nav.tsx               # sticky nav, blur on scroll, lang + theme toggles
    Hero.tsx              # name + subtitle + tagline (with inline keyword highlights) + stats
    Experience.tsx        # competency grid (7 cards) + timeline
    Projects.tsx          # ROeID featured large, rest in a grid; some link to a case study
    CaseStudies.tsx       # grid of teaser cards → /case-study/<slug> (bilingual)
    Skills.tsx            # 8 categories in a grid of pill badges
    Clients.tsx           # corporate/gov clients + payment providers (logos in /public/logos/)
    Contact.tsx
    Footer.tsx
  pages/                  # full case-study pages (English-only, self-contained, own SEO + inline SVG diagrams)
    CaseStudySdjwtOid4vc.tsx · CaseStudyAttestedKeys.tsx · CaseStudyAgentCommerce.tsx
    CaseStudyCryptobot.tsx · CaseStudyDiploma.tsx
public/logos/             # real client/provider logos (SVG + one PNG for VTEX)
public/404.html           # gh-pages SPA deep-link redirect (paired with a restore script in index.html)
public/sitemap.xml        # home + one entry per /case-study/<slug>
```

**Adding a case study** is a 4-edit recipe (page in `pages/` + route in `App.tsx` + card in `CaseStudies.tsx` + `sitemap.xml`) — see [CONTEXT.md § Case Studies System](./CONTEXT.md#case-studies-system). `CaseStudyAttestedKeys.tsx` / `CaseStudySdjwtOid4vc.tsx` are the reference templates.

## Design System

- **Theme**: CSS custom properties (HSL) in `:root` (light) and `.dark`. Tailwind maps them via `hsl(var(--...))`. Toggle swaps the class on `<html>`.
- **Colors**: primary (blue 217°), accent (purple 263°), emerald (160°). Each has an HSL triple so alpha math works.
- **Key classes** (in `index.css`): `.dot-grid`, `.glow-orb`, `.glass-card`, `.text-gradient`, `.fade-in`, `.skill-badge`, `.section-label`, `.stagger-children`.
- **Glow orbs**: 120px blur, 7-10% opacity, 12s gentle drift animation. Do NOT make them brighter — user specifically rejected the original brighter version for obscuring text.

## Content & Voice

Voice preference is saved to auto-memory (`feedback_voice.md`): **understated, direct, dry humor**. Avoid corporate/sales pitch language. Reject "I've built it all", "trusted partner", LinkedIn-headline phrasing. Let the work do the boasting.

Current hero copy (approved by user):
> Software engineer. 10 years building backends, microservices, and the occasional cryptographic protocol.
> Give me a problem and a deadline. I've shipped everything from NFC smartcard authentication to marketplace payment splits across 6 countries — usually as the one person who owns it end-to-end.
> Based in Bucharest, working across Europe.

## Hard Constraints

- **Teamnet** may be named for the **2014–2017 employment period only**. The **2019–2020** period must stay framed as **Independent** (Flow + Alini). (Supersedes the earlier blanket ban; see auto-memory `feedback_teamnet.md`.)
- **Node 20.18.x** locked. Don't upgrade Vite to 8.x — it requires Node 20.19+.

## Client/Project Data Sources

All auto-memory files cover the substance:
- `vtex_assessment.md` — 11+ payment connectors
- `roeid_assessment.md` — Romanian eID, PACE crypto, dmrtd fork
- `reges_assessment.md` — 7-microservice government platform
- `danube_assessment.md` — EU 6-country journey planner
- `flow_assessment.md` — electric scooter IoT platform
- `ai_skills_assessment.md` — MCP protocol, Claude/Gemini work

## Open Items

- Deployment to GitHub Pages
- Replace SVG wordmarks for ING, P24, Netopia, Mokka, TBI, Checkout.com with official logos if they become available
- Polish pass on spacing/typography
- Possible add-ons discussed: AI chatbot ("ask me anything"), architecture diagrams, blog, analytics dashboard
