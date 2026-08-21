// Post-build SEO prerender for the GitHub Pages SPA.
//
// Bakes a correct <head> into a static HTML file per route so non-JS crawlers
// and social scrapers get per-page metadata (title, description, canonical,
// Open Graph, Twitter, BreadcrumbList) — and the /case-study/<slug> URLs serve
// real files instead of relying on the 404 -> index redirect. Also injects a
// preload for the Latin Inter subset (LCP) and regenerates sitemap.xml with
// <lastmod>.
//
// Runs after `vite build`. Pure Node, no browser, no extra deps.
//
// The per-route strings below must stay in sync with each page's runtime <head>
// effect (src/pages/CaseStudy*.tsx). Google renders JS and sees the runtime
// values; this file is what everything that DOESN'T run JS sees first.

import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ORIGIN = "https://ionelmerca.com";
const HOME_LASTMOD = "2026-08-19";

const caseStudies = [
  {
    slug: "eudi-wallet",
    name: "EUDI Wallet",
    title: "EUDI Wallet — Case Study · Ionel Merca",
    description:
      "A working EU Digital Identity wallet built from two of my own libraries — hardware-backed keys (attested_secure_keys) and the SD-JWT VC / OpenID4VC holder flow (sdjwt_oid4vc) — joined by a 72-line adaptor. Runs the full issue → hold → present journey against a mock backend and the live EU reference issuer/verifier.",
    lastmod: "2026-07-06",
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    slug: "sdjwt-oid4vc",
    name: "SD-JWT VC + OpenID4VC",
    title: "SD-JWT VC + OpenID4VC — Case Study · Ionel Merca",
    description:
      "A pure-Dart holder library for SD-JWT Verifiable Credentials + OpenID4VCI/OpenID4VP — receive, hold, and selectively present EUDI-wallet credentials. Key- and HTTP-agnostic, 100% covered, verified against the EU reference wallet.",
    lastmod: "2026-07-03",
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    slug: "attested-secure-keys",
    name: "Attested Secure Keys",
    title: "Attested Secure Keys — Case Study · Ionel Merca",
    description:
      "A Flutter plugin for hardware-backed, non-exportable EC P-256 keys (Android StrongBox/TEE, iOS Secure Enclave) with a server-verifiable manufacturer attestation — built for EUDI-wallet-grade apps.",
    lastmod: "2026-06-26",
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    slug: "agent-commerce",
    name: "Agent Commerce on AP2",
    title: "Agent Commerce on AP2 — Case Study · Ionel Merca",
    description:
      "Production-grade AP2 implementation for agent-mediated payments — cryptographically signed mandates (Ed25519 / JCS / did:web), three-party trust chain, RAG-powered shopping assistant. Showcased on VTEX; backend-agnostic by design.",
    lastmod: "2026-05-15",
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    slug: "cryptobot",
    name: "cryptobot",
    title: "cryptobot — Case Study · Ionel Merca",
    description:
      "Personal exploration of systematic crypto trading on Binance — orchestrated execution framework with 16 strategies, Redis-backed backtesting, and an honest read on the results.",
    lastmod: "2022-02-01",
    priority: "0.7",
    changefreq: "yearly",
  },
  {
    slug: "diploma-project",
    name: "The Graph of Romanian Businessmen",
    title: "The Graph of Romanian Businessmen — Case Study · Ionel Merca",
    description:
      "Bachelor's diploma project: extraction, analysis, and visualisation of Romania's business-ownership network. From 6.8 GB of Official Gazette PDFs to a searchable graph of ~370,000 people.",
    lastmod: "2014-06-01",
    priority: "0.7",
    changefreq: "yearly",
  },
];

const escAttr = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Replace a tag's content="..." (or href="...") value; function replacer avoids
// `$` being treated as a special pattern in the replacement.
const setAttr = (html, re, value) => html.replace(re, (_, a, b) => a + escAttr(value) + b);

async function findLatinFont() {
  try {
    const files = await readdir(path.join(dist, "assets"));
    return files.find((f) => /^inter-latin-wght-normal-.*\.woff2$/.test(f)) || null;
  } catch {
    return null;
  }
}

const preloadTag = (font) =>
  font
    ? `    <link rel="preload" as="font" type="font/woff2" href="/assets/${font}" crossorigin />\n`
    : "";

function breadcrumbLd(cs, url) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: ORIGIN + "/" },
      { "@type": "ListItem", position: 2, name: cs.name, item: url },
    ],
  };
  return `    <script type="application/ld+json">${JSON.stringify(ld)}</script>\n`;
}

function bakeCaseStudy(base, cs, preload) {
  const url = `${ORIGIN}/case-study/${cs.slug}`;
  let html = base.replace(/<title>[^<]*<\/title>/, () => `<title>${escAttr(cs.title)}</title>`);
  html = setAttr(html, /(<meta\s+name="description"\s+content=")[^"]*(")/, cs.description);
  html = setAttr(html, /(<link\s+rel="canonical"\s+href=")[^"]*(")/, url);
  html = setAttr(html, /(<meta\s+property="og:type"\s+content=")[^"]*(")/, "article");
  html = setAttr(html, /(<meta\s+property="og:title"\s+content=")[^"]*(")/, cs.title);
  html = setAttr(html, /(<meta\s+property="og:description"\s+content=")[^"]*(")/, cs.description);
  html = setAttr(html, /(<meta\s+property="og:url"\s+content=")[^"]*(")/, url);
  html = setAttr(html, /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, cs.title);
  html = setAttr(html, /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, cs.description);
  return html.replace("</head>", () => breadcrumbLd(cs, url) + preload + "  </head>");
}

// Load the SSR bundle produced by `vite build --ssr src/entry-server.tsx`.
async function loadRenderer() {
  const entry = path.join(root, "dist-ssr", "entry-server.js");
  const mod = await import(pathToFileURL(entry).href);
  return mod.render;
}

// Vite emits an empty <div id="root"></div>; swap in the prerendered markup.
// Function replacer so `$` sequences in the HTML aren't treated as patterns.
function injectBody(html, markup) {
  const re = /<div id="root">\s*<\/div>/;
  if (!re.test(html)) throw new Error('could not find <div id="root"></div> to inject into');
  return html.replace(re, () => `<div id="root">${markup}</div>`);
}

function buildSitemap() {
  const row = (loc, lastmod, changefreq, priority) =>
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  const rows = [row(ORIGIN + "/", HOME_LASTMOD, "monthly", "1.0")].concat(
    caseStudies.map((cs) =>
      row(`${ORIGIN}/case-study/${cs.slug}`, cs.lastmod, cs.changefreq, cs.priority)
    )
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join("\n")}\n</urlset>\n`;
}

async function main() {
  const indexPath = path.join(dist, "index.html");
  const base = await readFile(indexPath, "utf8");
  const font = await findLatinFont();
  const preload = preloadTag(font);
  const render = await loadRenderer();

  // Home: font preload + prerendered body (keeps its own title/description/OG).
  await writeFile(
    indexPath,
    injectBody(base.replace("</head>", () => preload + "  </head>"), render("/")),
    "utf8"
  );

  // One static file per case-study route. Emit <slug>.html (not <slug>/index.html)
  // so GitHub Pages serves /case-study/<slug> with a 200 — no trailing-slash 301 —
  // and the served URL matches the no-slash canonical / sitemap / internal links.
  await mkdir(path.join(dist, "case-study"), { recursive: true });
  for (const cs of caseStudies) {
    const route = `/case-study/${cs.slug}`;
    await writeFile(
      path.join(dist, "case-study", `${cs.slug}.html`),
      injectBody(bakeCaseStudy(base, cs, preload), render(route)),
      "utf8"
    );
  }

  // Written to two paths with identical content. Search Console keeps one record
  // per submitted sitemap URL, and /sitemap.xml's record is wedged in a failed
  // state: it was first submitted 2026-04-28, when the file genuinely 404'd (the
  // generator below didn't exist until 2026-07-07). Resubmitting the same path
  // reuses the poisoned record, so /sitemap-pages.xml exists purely to give GSC a
  // clean one. robots.txt advertises both; Google de-duplicates by <loc>.
  const sitemap = buildSitemap();
  await writeFile(path.join(dist, "sitemap.xml"), sitemap, "utf8");
  await writeFile(path.join(dist, "sitemap-pages.xml"), sitemap, "utf8");

  console.log(
    `[seo-postbuild] ${caseStudies.length} case-study pages prerendered · sitemap.xml + sitemap-pages.xml + font preload written (font: ${font || "NOT FOUND"})`
  );
}

main().catch((e) => {
  console.error("[seo-postbuild] failed:", e);
  process.exit(1);
});
