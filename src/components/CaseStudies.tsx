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
    slug: "eudi-wallet",
    domain: "EUDI Wallet · Verifiable Credentials · Flutter",
    title: "A working EUDI wallet",
    color: "#0d9488",
    teaserEn:
      "A real EU Digital Identity wallet built from my two libraries — hardware-backed keys and the SD-JWT VC / OpenID4VC holder flow — joined by a 72-line adaptor. It runs the full issue → hold → present journey both offline and against the live EU reference issuer/verifier. The capstone that proves the other two compose.",
    teaserRo:
      "Un portofel EU Digital Identity real, construit din cele două librării ale mele — chei hardware și fluxul de holder SD-JWT VC / OpenID4VC — unite printr-un adaptor de 72 de linii. Rulează întregul parcurs primește → deține → prezintă atât offline, cât și cu issuer-ul/verifier-ul de referință EU. Piesa care demonstrează că celelalte două se compun.",
    keyStatEn: "2 libraries + 72-line glue · live EUDI interop · 2026",
    keyStatRo: "2 librării + 72 de linii glue · interop EUDI live · 2026",
  },
  {
    slug: "sdjwt-oid4vc",
    domain: "EUDI Wallet · Verifiable Credentials · Dart",
    title: "SD-JWT VC + OpenID4VC",
    color: "#6366f1",
    teaserEn:
      "A pure-Dart holder library for SD-JWT Verifiable Credentials over OpenID4VCI/VP — receive, hold, and selectively present EUDI-wallet credentials. Key- and HTTP-agnostic, 100% covered, and verified end-to-end against the EU reference wallet. The protocol companion to Attested Secure Keys.",
    teaserRo:
      "O librărie Dart pură pentru rolul de holder — SD-JWT Verifiable Credentials peste OpenID4VCI/VP: primești, deții și prezinți selectiv credențiale de portofel EUDI. Agnostică față de chei și rețea, 100% acoperită de teste și verificată end-to-end cu portofelul de referință EU. Companionul de protocol pentru Attested Secure Keys.",
    keyStatEn: "SD-JWT VC · OID4VCI/VP · 100% covered · 2026",
    keyStatRo: "SD-JWT VC · OID4VCI/VP · 100% acoperit · 2026",
  },
  {
    slug: "attested-secure-keys",
    domain: "Mobile Security · Cryptography · Flutter",
    title: "Attested Secure Keys",
    color: "#f59e0b",
    teaserEn:
      "A Flutter plugin for hardware-backed, non-exportable EC P-256 keys — minted inside Android StrongBox/TEE or the iOS Secure Enclave, with a manufacturer-signed attestation your server can verify. Fills a real gap: no pub.dev package exposed key attestation, and flutter_secure_storage protects data, not keys.",
    teaserRo:
      "Un plugin Flutter pentru chei EC P-256 hardware, non-exportabile — generate în Android StrongBox/TEE sau în Secure Enclave-ul iOS, cu o atestare semnată de producător pe care serverul tău o poate verifica. Acoperă un gol real: niciun pachet pub.dev nu expunea atestarea cheilor, iar flutter_secure_storage protejează date, nu chei.",
    keyStatEn: "EC P-256 · StrongBox / Secure Enclave · 2026",
    keyStatRo: "EC P-256 · StrongBox / Secure Enclave · 2026",
  },
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
