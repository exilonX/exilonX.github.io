import { useEffect, useState } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Experience } from "./components/Experience";
import { Clients } from "./components/Clients";
import { Projects } from "./components/Projects";
import { CaseStudies } from "./components/CaseStudies";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CaseStudyDiploma } from "./pages/CaseStudyDiploma";
import { CaseStudyCryptobot } from "./pages/CaseStudyCryptobot";

type Route =
  | { type: "home" }
  | { type: "case-study"; slug: string };

function getRoute(): Route {
  const match = window.location.pathname.match(/^\/case-study\/([^/]+)\/?$/);
  if (match) return { type: "case-study", slug: match[1] };
  return { type: "home" };
}

function App() {
  const [route, setRoute] = useState<Route>(getRoute);

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
      } else if (!samePath) {
        window.scrollTo(0, 0);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (route.type === "case-study") {
    if (route.slug === "diploma-project") return <CaseStudyDiploma />;
    if (route.slug === "cryptobot") return <CaseStudyCryptobot />;
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
