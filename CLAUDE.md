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

## Deployment (pending)

Target: `exilonX.github.io` (blank since 2014, default branch `master`). Two options when ready:
- Push `dist/` contents directly to that repo
- Set up GitHub Actions in this repo to auto-deploy to `exilonX.github.io`

## Structure

```
src/
  App.tsx                 # section order: Nav → Hero → Experience → Clients → Projects → Skills → Contact → Footer
  main.tsx                # entry; applies theme class before first paint (no FOUC)
  context.tsx             # AppProvider: lang (en/ro) + dark theme, both persisted to localStorage
  i18n.ts                 # all UI strings in EN + RO (typed)
  index.css               # theme vars (HSL), dot-grid, glow-orbs, glass-card, fade-in animations
  data/portfolio.ts       # experiences, projects, skillGroups, socialLinks
  hooks/useFadeIn.ts      # IntersectionObserver → adds .visible class
  components/
    Nav.tsx               # sticky nav, blur on scroll, lang + theme toggles
    Hero.tsx              # name + subtitle + tagline (with inline keyword highlights) + stats
    Experience.tsx        # competency grid (7 cards) + timeline
    Clients.tsx           # 5 corporate/gov clients + 10 payment providers (logos in /public/logos/)
    Projects.tsx          # ROeID featured large, rest in 2-col grid
    Skills.tsx            # 8 categories in 4-col grid of pill badges
    Contact.tsx
    Footer.tsx
public/logos/             # real client/provider logos (SVG + one PNG for VTEX)
```

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
