import { useApp } from "../context";
import { t } from "../i18n";
import { useFadeIn } from "../hooks/useFadeIn";

interface CaseStudyItem {
  slug: string;
  domain: string;
  title: string;
  color: string;
  teaserEn: string;
  teaserRo: string;
  keyStatEn: string;
  keyStatRo: string;
}

const caseStudies: CaseStudyItem[] = [
  {
    slug: "agent-commerce",
    domain: "Agent Commerce · AP2 · Cryptography",
    title: "Agent Commerce on AP2",
    color: "#10b981",
    teaserEn:
      "Production AP2 v0.2 implementation — verifiable signed mandates for AI-mediated payments. Three-party trust chain (Merchant · Credentials Provider · Payment Network), Ed25519 / JCS / did:web, RAG-powered shopping assistant. Showcased on VTEX; backend-agnostic by design.",
    teaserRo:
      "Implementare AP2 v0.2 de productie — mandate semnate criptografic pentru plati mediate de agenti AI. Lant de incredere cu trei parti, Ed25519 / JCS / did:web, asistent de shopping cu RAG. Showcase pe VTEX; arhitectura agnostica de backend.",
    keyStatEn: "3 mandate types · 3 DIDs · AP2 v0.2 · 2026",
    keyStatRo: "3 tipuri mandate · 3 DIDs · AP2 v0.2 · 2026",
  },
  {
    slug: "diploma-project",
    domain: "Digital Identity & Cryptography",
    title: "The Graph of Romanian Businessmen",
    color: "#a78bfa",
    teaserEn:
      "From 6.8 GB of Romanian Official Gazette PDFs to a searchable graph of ~370,000 people. End-to-end pipeline: extraction, classification, graph construction, Neo4j, SigmaJS visualisation.",
    teaserRo:
      "De la 6,8 GB de PDF-uri din Monitorul Oficial la un graf cautabil de ~370.000 de persoane. Pipeline end-to-end: extractie, clasificare, constructie graf, Neo4j, vizualizare SigmaJS.",
    keyStatEn: "372K+ nodes · 120K components · 2014",
    keyStatRo: "372K+ noduri · 120K componente · 2014",
  },
  {
    slug: "cryptobot",
    domain: "Algorithmic Trading · Research",
    title: "cryptobot",
    color: "#22d3ee",
    teaserEn:
      "An orchestrated crypto-trading framework on Binance — a sandbox for strategy architecture with real backtest numbers and an honest read on what they mean.",
    teaserRo:
      "Framework orchestrat de tranzactionare crypto pe Binance — un sandbox pentru arhitectura de strategii cu cifre reale de backtest si o citire onesta a ce inseamna.",
    keyStatEn: "16 strategies · ~78 commits · 2021–2022",
    keyStatRo: "16 strategii · ~78 commit-uri · 2021–2022",
  },
];

export function CaseStudies() {
  const { lang } = useApp();
  const tr = t(lang);
  const ref = useFadeIn<HTMLElement>();

  return (
    <section id="case-studies" className="py-24 px-6 fade-in" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="section-label">{tr.caseStudies.label}</div>
        <h2 className="text-3xl md:text-5xl font-bold text-text mb-2">
          {tr.caseStudies.title}
        </h2>
        <p className="text-text-muted mb-12">{tr.caseStudies.subtitle}</p>

        <div className="grid gap-6 md:grid-cols-2">
          {caseStudies.map((cs) => (
            <a
              key={cs.slug}
              href={`/case-study/${cs.slug}`}
              className="glass-card rounded-xl p-6 relative overflow-hidden flex flex-col group transition-colors hover:border-primary/50"
            >
              <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ background: cs.color }}
              />
              <div className="relative z-10 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: cs.color }}
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-faint">
                    {cs.domain}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-text mb-2">{cs.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed mb-4 flex-1">
                  {lang === "en" ? cs.teaserEn : cs.teaserRo}
                </p>

                <div className="text-xs text-text-faint pt-4 border-t border-border flex items-center justify-between">
                  <span>{lang === "en" ? cs.keyStatEn : cs.keyStatRo}</span>
                  <span className="text-primary font-medium group-hover:underline">
                    {tr.caseStudies.readMore} &rarr;
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
