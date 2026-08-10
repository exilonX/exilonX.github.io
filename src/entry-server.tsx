// Server-render entry, consumed by scripts/seo-postbuild.mjs after `vite build`.
//
// Built separately (`vite build --ssr`) into dist-ssr/, so nothing here ships to
// the browser. That's what lets the case-study imports below be EAGER: the client
// keeps its React.lazy code-splitting in App.tsx, while the prerenderer gets the
// real component tree. Rendering <App/> for a case-study route would emit only the
// <Suspense> fallback, because renderToString never awaits a lazy import.

import { renderToString } from "react-dom/server";
import { AppProvider } from "./context";
import App from "./App";
import { CaseStudyDiploma } from "./pages/CaseStudyDiploma";
import { CaseStudyCryptobot } from "./pages/CaseStudyCryptobot";
import { CaseStudyAgentCommerce } from "./pages/CaseStudyAgentCommerce";
import { CaseStudyAttestedKeys } from "./pages/CaseStudyAttestedKeys";
import { CaseStudySdjwtOid4vc } from "./pages/CaseStudySdjwtOid4vc";
import { CaseStudyEudiWallet } from "./pages/CaseStudyEudiWallet";

// Keys must match the slugs in App.tsx's caseStudyPages and the sitemap.
const pages: Record<string, React.ComponentType> = {
  "diploma-project": CaseStudyDiploma,
  "cryptobot": CaseStudyCryptobot,
  "agent-commerce": CaseStudyAgentCommerce,
  "attested-secure-keys": CaseStudyAttestedKeys,
  "sdjwt-oid4vc": CaseStudySdjwtOid4vc,
  "eudi-wallet": CaseStudyEudiWallet,
};

/** Render one route to HTML for injection into <div id="root">. */
export function render(pathname: string): string {
  const match = pathname.match(/^\/case-study\/([^/]+)\/?$/);
  const Page = match ? pages[match[1]] : undefined;

  // App returns the bare page for a case-study route (no Nav/Footer), so
  // rendering Page directly produces the same tree without the lazy boundary.
  const tree = Page ? <Page /> : <App url={pathname} />;

  return renderToString(<AppProvider>{tree}</AppProvider>);
}
