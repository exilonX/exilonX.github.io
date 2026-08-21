import { useEffect, useState, lazy, Suspense, type ComponentType, type LazyExoticComponent } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Experience } from "./components/Experience";
import { Clients } from "./components/Clients";
import { Projects } from "./components/Projects";
import { CaseStudies } from "./components/CaseStudies";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
// Case-study pages are code-split — the home bundle no longer ships them.
const caseStudyPages: Record<string, LazyExoticComponent<ComponentType>> = {
  "diploma-project": lazy(() => import("./pages/CaseStudyDiploma").then((m) => ({ default: m.CaseStudyDiploma }))),
  "cryptobot": lazy(() => import("./pages/CaseStudyCryptobot").then((m) => ({ default: m.CaseStudyCryptobot }))),
  "agent-commerce": lazy(() => import("./pages/CaseStudyAgentCommerce").then((m) => ({ default: m.CaseStudyAgentCommerce }))),
  "attested-secure-keys": lazy(() => import("./pages/CaseStudyAttestedKeys").then((m) => ({ default: m.CaseStudyAttestedKeys }))),
  "sdjwt-oid4vc": lazy(() => import("./pages/CaseStudySdjwtOid4vc").then((m) => ({ default: m.CaseStudySdjwtOid4vc }))),
  "eudi-wallet": lazy(() => import("./pages/CaseStudyEudiWallet").then((m) => ({ default: m.CaseStudyEudiWallet }))),
};

type Route =
  | { type: "home" }
  | { type: "case-study"; slug: string };

// `pathname` is supplied by the prerenderer (src/entry-server.tsx), which has no
// `window`. In the browser it's omitted and we read the live location.
function getRoute(pathname?: string): Route {
  const path = pathname ?? (typeof window === "undefined" ? "/" : window.location.pathname);
  const match = path.match(/^\/case-study\/([^/]+)\/?$/);
  if (match) return { type: "case-study", slug: match[1] };
  return { type: "home" };
}

function App({ url }: { url?: string }) {
  const [route, setRoute] = useState<Route>(() => getRoute(url));

  // Listen for back/forward navigation
  useEffect(() => {
    const onPop = () => setRoute(getRoute());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Click interceptor: keep internal navigation client-side
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Only intercept plain left-clicks without modifier keys
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;

      // Skip explicit external/new-tab/download links
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Skip protocol-bound links (mailto:, tel:, http(s)://)
      if (/^(mailto:|tel:|https?:|\/\/)/i.test(href)) return;

      // In-page anchor only (no path change)
      if (href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }

      // External origin — let the browser handle
      if (url.origin !== window.location.origin) return;

      e.preventDefault();

      const samePath = url.pathname === window.location.pathname;
      window.history.pushState({}, "", url.toString());

      if (!samePath) {
        setRoute(getRoute());
      }

      // Handle scroll: hash → scroll to id (after render); no hash → top
      if (url.hash) {
        const id = url.hash.slice(1);
        // requestAnimationFrame ensures the new route is mounted before we look for the element
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
          });
        });
      } else {
        // No hash: always return to the top. Covers both a real route change
        // and the same-path case (clicking the logo while already on home).
        window.scrollTo(0, 0);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (route.type === "case-study") {
    const Page = caseStudyPages[route.slug];
    if (Page) {
      return (
        <Suspense fallback={<div className="min-h-screen bg-bg" />}>
          <Page />
        </Suspense>
      );
    }
  }

  return (
    <div className="min-h-screen bg-bg text-text transition-colors">
      <Nav />
      <Hero />
      <Experience />
      <Projects />
      <CaseStudies />
      <Skills />
      <Clients />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
