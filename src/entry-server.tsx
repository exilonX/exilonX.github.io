// Server-render entry, consumed by scripts/seo-postbuild.mjs after `vite build`.
//
// Built separately (`vite build --ssr`) into dist-ssr/, so nothing here ships to
// the browser. That's what lets the case-study imports below be EAGER: the client
// keeps its React.lazy code-splitting in App.tsx, while the prerenderer gets the
// real component tree. Rendering <App/> for a case-study route would emit only the
// <Suspense> fallback, because renderToString never awaits a lazy import.

import { Suspense } from "react";
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

  // The <Suspense> wrapper and its fallback must match App.tsx exactly. The
  // boundary is part of the tree shape: on the client, App renders the page
  // behind React.lazy, so its first render is this boundary with the chunk still
  // loading. Emitting the page without a boundary made the server HTML and the
  // client's first render structurally different — React error #418, and the
  // prerendered markup got thrown away and re-rendered.
  const tree = Page ? (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <Page />
    </Suspense>
  ) : (
    <App url={pathname} />
  );

  return renderToString(<AppProvider>{tree}</AppProvider>);
}
