import { useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

const PUB_DEV = "https://pub.dev/packages/sdjwt_oid4vc";
const GITHUB = "https://github.com/exilonX/sdjwt_oid4vc";
const ACCENT = "#6366f1";

const quickStart = `// The two seams you inject: the holder key (hardware-backed,
// e.g. via attested_secure_keys) and an HTTP client. Everything
// else is pure, deterministic logic.
final vci = Oid4vciClient(DefaultOid4vcHttp());
final vp  = Oid4vpClient(DefaultOid4vcHttp());

// 1 · Receive a credential (OpenID4VCI, pre-authorized flow).
//     The proof-of-possession is signed inside the secure hardware.
final compact = await vci.redeemOffer(
  offerUriOrJson: offerLink,   // openid-credential-offer://…
  txCode: pin,
  signer: holderKey,
);

// 2 · Hold it, and trust the issuer (SD-JWT VC + X.509 chain).
final vc = SdJwt.parse(compact);
await vc.verifyIssuer(
  IssuerTrust.x5cChain(trustAnchors: lotlAnchors),
  enforceValidity: true,
);

// 3 · Present ONLY what a verifier asks for (OpenID4VP + DCQL).
final req   = await vp.fetchRequest(requestUri);
final match = vp.match(req, [vc])!;              // has the requested claims?
await vp.present(req: req, match: match, signer: holderKey);`;

const api: [string, string][] = [
  ["Oid4vciClient", "The issuance dance (OpenID4VCI, pre-authorized_code + tx_code): parse the offer, fetch issuer metadata, request the token, build the holder proof-of-possession, and pull back the SD-JWT VC."],
  ["SdJwt · SdJwtVc", "The SD-JWT VC codec: parse the compact form, resolveClaims (nested objects + arrays), verifyIssuer, and present — selective disclosure plus a Key-Binding JWT."],
  ["IssuerTrust", "How the issuer key is resolved and trusted: signature-only, full x5cChain validation to a caller-supplied anchor (the EU Trusted List), or jwt-vc-issuer metadata."],
  ["Oid4vpClient", "The presentation flow (OpenID4VP + DCQL, the Digital Credentials Query Language): fetch and authenticate the request, match a held credential, and submit — including the encrypted direct_post.jwt response mode."],
  ["StatusListResolver", "Resolve a credential's revocation status from its IETF Token Status List — fetch, optional issuer-signature verify, zlib-inflate, read the status bit."],
  ["Es256Signer · Oid4vcHttp", "The two injected seams. Nothing else in the library touches a private key or the network, so it stays testable without hardware and without a server."],
];

const hardeningRows: [string, string][] = [
  ["Transport", "https-or-loopback only"],
  ["JOSE", "alg / typ asserted before key work"],
  ["Parsing", "depth + duplicate-digest guards"],
  ["Issuer", "X.509 chain → trust anchor"],
];

const conformanceRows: [string, string][] = [
  ["SD-JWT", "RFC 9901 disclosure vectors"],
  ["Status List", "IETF draft bitstring vectors"],
  ["JWE / KDF", "RFC 7518 App. C vector"],
  ["Parsers", "fuzz-tested, never crash"],
];

export function CaseStudySdjwtOid4vc() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const url = "https://exilonx.github.io/case-study/sdjwt-oid4vc";
    const title = "SD-JWT VC + OpenID4VC — Case Study · Ionel Merca";
    const description =
      "A pure-Dart holder library for SD-JWT Verifiable Credentials + OpenID4VCI/OpenID4VP — receive, hold, and selectively present EUDI-wallet credentials. Key- and HTTP-agnostic, 100% covered, verified against the EU reference wallet.";

    const previousTitle = document.title;
    const descMeta = document.querySelector('meta[name="description"]');
    const previousDesc = descMeta?.getAttribute("content") ?? "";

    document.title = title;
    descMeta?.setAttribute("content", description);

    const canonical = document.createElement("link");
    canonical.id = "case-study-canonical";
    canonical.setAttribute("rel", "canonical");
    canonical.setAttribute("href", url);
    document.head.appendChild(canonical);

    const schema = document.createElement("script");
    schema.id = "case-study-schema";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: "SD-JWT VC + OpenID4VC — the holder half of an EUDI wallet, in pure Dart",
      alternativeHeadline:
        "Receive, hold, and selectively present SD-JWT Verifiable Credentials over OpenID4VCI / OpenID4VP — key- and HTTP-agnostic",
      description,
      author: { "@type": "Person", name: "Ionel Merca", url: "https://exilonx.github.io/" },
      publisher: { "@type": "Person", name: "Ionel Merca", url: "https://exilonx.github.io/" },
      datePublished: "2026-07-03",
      dateModified: "2026-07-03",
      mainEntityOfPage: url,
      inLanguage: "en",
      keywords: [
        "SD-JWT VC",
        "OpenID4VCI",
        "OpenID4VP",
        "EUDI wallet",
        "verifiable credentials",
        "selective disclosure",
        "DCQL",
        "Key-Binding JWT",
        "Token Status List",
        "direct_post.jwt",
        "ES256",
        "Dart package",
        "holder",
        "eIDAS 2",
      ],
      codeRepository: GITHUB,
      license: "https://www.apache.org/licenses/LICENSE-2.0",
    });
    document.head.appendChild(schema);

    return () => {
      document.title = previousTitle;
      if (descMeta) descMeta.setAttribute("content", previousDesc);
      document.getElementById("case-study-canonical")?.remove();
      document.getElementById("case-study-schema")?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text">
      <Nav />

      <article className="max-w-4xl mx-auto px-6 pt-28 pb-16">
        <a href="/" className="text-sm text-primary hover:underline">
          &larr; Back to portfolio
        </a>

        <header className="relative overflow-hidden rounded-2xl glass-card mt-8 mb-12">
          <div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[100px] opacity-30"
            style={{ background: ACCENT }}
          />
          <div className="absolute inset-0 dot-grid opacity-40" />
          <div className="absolute top-8 right-8 hidden md:block opacity-60 pointer-events-none">
            <CredentialDeco />
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="section-label">Case Study &middot; 2026</div>
            <h1 className="text-3xl md:text-5xl font-bold text-text mb-4 leading-tight">
              SD-JWT VC + OpenID4VC
            </h1>
            <p className="text-lg text-text-muted leading-relaxed max-w-2xl mb-8">
              A pure-Dart library for the <strong>holder half</strong> of an EU
              Digital Identity wallet &mdash; receive a credential, hold and trust
              it, and present <em>only</em> the claims a verifier asks for. It
              implements <strong>SD-JWT VC</strong>, <strong>OpenID4VCI</strong>{" "}
              (issuance) and <strong>OpenID4VP</strong> (presentation), and stays
              agnostic about keys and the network so a hardware key drops straight
              in. The protocol companion to{" "}
              <a href="/case-study/attested-secure-keys" className="text-primary hover:underline">
                Attested Secure Keys
              </a>
              .
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <HeroStat label="Standards" value="SD-JWT VC · OID4VCI/VP" />
              <HeroStat label="Role" value="Holder / wallet" />
              <HeroStat label="Language" value="Pure Dart" />
              <HeroStat label="Coverage" value="100% lines" />
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-4 mb-16">
          <Meta
            label="Role"
            value="Solo &mdash; protocol design, JOSE/crypto, and the full test suite"
          />
          <Meta
            label="Status"
            value="v0.1.2 &mdash; live-verified against the EU reference wallet"
          />
          <Meta label="License" value="Apache-2.0 &middot; open source" />
          <Meta
            label="Package"
            value={`<a href="${PUB_DEV}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">pub.dev/packages/sdjwt_oid4vc</a>`}
          />
        </div>

        {/* ---- The brief ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4">The brief</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            An EUDI wallet has to do three things with a credential: <strong>receive</strong>{" "}
            it from an issuer, <strong>hold</strong> it and prove it&rsquo;s genuine,
            and <strong>present</strong> a minimal slice of it to a verifier &mdash; all
            over the EU&rsquo;s chosen standards (SD-JWT VC, OpenID4VCI, OpenID4VP,
            eIDAS&nbsp;2). That&rsquo;s the <em>holder</em> role: the wallet&rsquo;s half of
            the protocol.
          </p>
          <p className="text-text-muted leading-relaxed">
            This library is exactly that half, in pure Dart &mdash; no Flutter
            dependency, no key backend, no HTTP client baked in. It began as the
            protocol layer for an EUDI-wallet proof-of-concept, alongside{" "}
            <a href="/case-study/attested-secure-keys" className="text-primary hover:underline">
              attested_secure_keys
            </a>{" "}
            (the hardware-key layer), then generalised so any Dart wallet can reuse it.
          </p>
        </section>

        {/* ---- The gap ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">The gap it fills</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            The mature OpenID4VC SDKs live in Kotlin, Swift and Rust. On pub.dev
            there was no comprehensive holder library:{" "}
            <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">openid_client</code>{" "}
            does classic OIDC login, not verifiable credentials; the JOSE pieces are
            partial and stop well short of SD-JWT VC + OID4VCI + OID4VP.
          </p>
          <p className="text-text-muted leading-relaxed">
            So this is a <strong>thin, reusable</strong> package that speaks the whole
            holder flow &mdash; and it&rsquo;s deliberately unopinionated about the two
            things every wallet does differently: the <strong>key</strong> (you inject an{" "}
            <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">Es256Signer</code>)
            and the <strong>network</strong> (you inject an{" "}
            <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">Oid4vcHttp</code>).
            Everything in between is pure logic you can test without hardware and
            without a server.
          </p>
        </section>

        {/* ---- Diagram 1: architecture ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">How it&rsquo;s built</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Two strata: <strong>transport</strong> (the OID4VCI / OID4VP clients) over{" "}
            <strong>format</strong> (the SD-JWT VC codec). The split is on purpose &mdash;
            the codec knows nothing about HTTP, and the transport knows nothing about
            SD-JWT, so a future <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">mdoc</code>{" "}
            codec reuses the same issuance/presentation plumbing. The one crypto file
            (pointycastle) is never exported.
          </p>
          <ArchitectureDiagram />
        </section>

        {/* ---- Diagram 2: the two flows ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">
            The two flows: issuance and presentation
          </h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Issuance pulls a credential from an issuer and binds it to the holder&rsquo;s
            key. Presentation answers a verifier&rsquo;s query with a minimal,
            freshly-signed proof. The wallet sits in the middle; the same hardware key
            signs the proof-of-possession at issuance and the Key-Binding JWT at
            presentation.
          </p>
          <FlowSequenceDiagram />
        </section>

        {/* ---- Diagram 3: selective disclosure ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">
            Selective disclosure &mdash; reveal only what&rsquo;s asked
          </h2>
          <p className="text-text-muted leading-relaxed mb-6">
            This is the point of SD-JWT. The wallet doesn&rsquo;t hand over plaintext; it
            includes the <em>disclosures</em> for the requested claims (nested paths
            included) next to the issuer-signed JWT, omits everything else, and binds
            it all to the verifier with a Key-Binding JWT. The verifier recomputes the
            digests, checks the issuer&rsquo;s seal, and learns nothing it didn&rsquo;t ask
            for.
          </p>
          <SelectiveDisclosureDiagram />
        </section>

        {/* ---- What it does ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">What it does</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            A small public surface, one client per protocol leg plus the codec:
          </p>

          <div className="glass-card rounded-xl p-5 mb-8">
            <dl className="space-y-3">
              {api.map(([m, d]) => (
                <div key={m} className="grid md:grid-cols-[210px_1fr] gap-1 md:gap-4">
                  <dt className="font-mono text-sm text-text font-medium">{m}</dt>
                  <dd className="text-sm text-text-muted leading-relaxed">{d}</dd>
                </div>
              ))}
            </dl>
          </div>

          <CodeBlock code={quickStart} />

          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <PillCard title="Security hardening" rows={hardeningRows} />
            <PillCard title="Spec conformance" rows={conformanceRows} />
          </div>
        </section>

        {/* ---- Design decisions ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-6 mt-14">
            Design decisions &amp; honest trade-offs
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <DecisionCard title="Holder role only">
              No issuer or verifier server logic, no credential storage, no
              Relying-Party trust policy &mdash; those belong to the app and the
              backend. The library does the wallet&rsquo;s half and returns/accepts
              plain strings.
            </DecisionCard>
            <DecisionCard title="Key- and HTTP-agnostic">
              It takes an <code className="text-xs bg-bg-muted px-1 py-0.5 rounded">Es256Signer</code>{" "}
              and an <code className="text-xs bg-bg-muted px-1 py-0.5 rounded">Oid4vcHttp</code> and
              never imports a key backend or a specific HTTP client. A hardware key
              plugs in as one small adaptor; tests use a software signer.
            </DecisionCard>
            <DecisionCard title="Format over transport">
              The SD-JWT codec is independent of the OID4VCI/VP transport, so a future
              ISO&nbsp;18013 <em>mdoc</em> codec reuses the same issuance and
              presentation plumbing rather than forking it.
            </DecisionCard>
            <DecisionCard title="Deterministic by construction">
              Time comes from an injected <code className="text-xs bg-bg-muted px-1 py-0.5 rounded">Clock</code>,
              salts from an injected generator &mdash; no ambient{" "}
              <code className="text-xs bg-bg-muted px-1 py-0.5 rounded">DateTime.now()</code> in a
              signing path. Every token is byte-reproducible, which is how the suite
              holds <strong>100% line coverage</strong>.
            </DecisionCard>
            <DecisionCard title="Only the requested claims">
              Reveal exactly the requested claims &mdash; including nested paths like{" "}
              <code className="text-xs bg-bg-muted px-1 py-0.5 rounded">place_of_birth.locality</code>{" "}
              &mdash; omit the rest, and bind the presentation to the verifier&rsquo;s nonce
              and audience with a Key-Binding JWT. Matching refuses a credential that
              lacks a requested claim instead of over-promising.
            </DecisionCard>
            <DecisionCard title="Trust data is the app&rsquo;s job">
              The library ships the chain-validation <em>mechanism</em>{" "}
              (<code className="text-xs bg-bg-muted px-1 py-0.5 rounded">IssuerTrust.x5cChain</code>),
              but the anchors &mdash; the EU List of Trusted Lists &mdash; are supplied by
              the integrator. Certificate revocation (CRL/OCSP) and RP trust policy
              stay out, on purpose.
            </DecisionCard>
          </div>
        </section>

        {/* ---- Proven against the real thing ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">
            Proven against the real thing
          </h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Unit tests prove the format; the real test is interop. The full loop was
            run on a device against the <strong>EU reference wallet stack</strong> &mdash; a
            genuine PID (Person Identification Data) credential issued, issuer-trusted
            via its X.509 chain, and
            presented back to the reference verifier. That live run surfaced two things
            the drafts leave open: the verifier&rsquo;s <strong>encrypted{" "}
            <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">direct_post.jwt</code></strong>{" "}
            response mode (an ECDH-ES + AES-GCM JWE) and <strong>nested-claim DCQL</strong>{" "}
            requests &mdash; both now implemented and shipped.
          </p>
          <p className="text-text-muted leading-relaxed">
            On top of interop, the wire format is pinned to published spec vectors: the
            IETF SD-JWT disclosure-digest examples, the Token Status List bitstrings,
            and the RFC&nbsp;7518 Appendix&nbsp;C key-derivation vector. The parsers are
            fuzz-tested so hostile input is always rejected, never a crash.
          </p>
        </section>

        {/* ---- Status ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">Status</h2>
          <p className="text-text-muted leading-relaxed">
            Published to pub.dev as{" "}
            <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">0.1.2</code> &mdash; the
            protocol companion to{" "}
            <a href="/case-study/attested-secure-keys" className="text-primary hover:underline">
              attested_secure_keys
            </a>
            ; together they form the holder half of an EUDI wallet. Full line coverage,
            clean under a strict lint set, spec-vector conformance, fuzz-tested parsers,
            and CI that pins the minimum SDK so downstream wallets resolve it with no
            overrides. Open source under Apache-2.0.
          </p>
        </section>

        {/* ---- Stack ---- */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-text mb-4">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Dart",
              "SD-JWT VC",
              "OpenID4VCI",
              "OpenID4VP",
              "DCQL",
              "JOSE / JWS",
              "ES256 · P-256",
              "Key-Binding JWT",
              "JWE · ECDH-ES · AES-GCM",
              "Token Status List",
              "X.509 chain validation",
              "pointycastle · asn1lib",
            ].map((s) => (
              <span key={s} className="skill-badge">
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* ---- Links CTA ---- */}
        <section className="mt-14">
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href={PUB_DEV}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-xl p-5 group transition-colors hover:border-primary/50"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-text-faint mb-1">
                Package
              </div>
              <div className="text-text font-semibold group-hover:text-primary transition-colors">
                pub.dev/packages/sdjwt_oid4vc &rarr;
              </div>
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-xl p-5 group transition-colors hover:border-primary/50"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-text-faint mb-1">
                Source
              </div>
              <div className="text-text font-semibold group-hover:text-primary transition-colors">
                github.com/exilonX/sdjwt_oid4vc &rarr;
              </div>
            </a>
          </div>
        </section>

        <div className="mt-16 pt-8 border-t border-border">
          <a href="/" className="text-sm text-primary hover:underline">
            &larr; Back to portfolio
          </a>
        </div>
      </article>

      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Small utility components                                            */
/* ------------------------------------------------------------------ */

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-text-faint mb-1">
        {label}
      </div>
      <div className="text-sm text-text" dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-text-faint mb-0.5">
        {label}
      </div>
      <div className="text-lg font-semibold text-text">{value}</div>
    </div>
  );
}

function PillCard({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
        {title}
      </div>
      <dl className="space-y-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 text-sm">
            <dt className="text-text-faint">{k}</dt>
            <dd className="text-text font-medium text-right">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function DecisionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="text-sm font-bold text-text mb-2">{title}</div>
      <p className="text-sm text-text-muted leading-relaxed">{children}</p>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="glass-card rounded-xl p-5 overflow-x-auto text-sm leading-relaxed">
      <code className="font-mono text-text-muted whitespace-pre">{code}</code>
    </pre>
  );
}

function CredentialDeco() {
  return (
    <svg viewBox="0 0 130 130" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="26" width="98" height="66" rx="8" fill="none" stroke={ACCENT} strokeWidth="2" opacity="0.7" />
      <circle cx="40" cy="49" r="9" fill="none" stroke={ACCENT} strokeWidth="2" opacity="0.85" />
      <line x1="58" y1="45" x2="98" y2="45" stroke={ACCENT} strokeWidth="2" opacity="0.55" />
      <line x1="58" y1="53" x2="88" y2="53" stroke={ACCENT} strokeWidth="2" opacity="0.4" />
      <line x1="28" y1="74" x2="102" y2="74" stroke={ACCENT} strokeWidth="2" opacity="0.35" strokeDasharray="4 4" />
      {/* selective-disclosure check badge */}
      <circle cx="100" cy="92" r="16" fill="#fff" stroke={ACCENT} strokeWidth="2" />
      <path d="M92 92 l6 6 l12 -13" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Diagram 1 — layered architecture                                   */
/* ------------------------------------------------------------------ */

function ArchitectureDiagram() {
  const caption =
    "Two strata: transport (the OID4VCI / OID4VP clients) over format (the SD-JWT VC codec). Your app injects the only two things a wallet does differently — the holder key (Es256Signer) and the HTTP client (Oid4vcHttp). The codec is independent of the transport, so a future mdoc codec reuses the same issuance/presentation clients. The pointycastle crypto lives in one file and is never exported.";

  return (
    <figure className="glass-card rounded-xl overflow-hidden">
      <div className="bg-white p-6 overflow-x-auto">
        <svg
          viewBox="0 0 720 470"
          role="img"
          aria-labelledby="arch-title"
          className="w-full h-auto min-w-[560px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="arch-title">Layered architecture of the sdjwt_oid4vc library</title>

          <defs>
            <marker id="ar-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>
          </defs>

          {/* app */}
          <rect x="230" y="20" width="260" height="44" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="360" y="47" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e3a8a">Your Flutter wallet app</text>

          {/* injected seams */}
          <rect x="20" y="16" width="170" height="52" rx="6" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.5" />
          <text x="105" y="38" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3730a3">Es256Signer</text>
          <text x="105" y="55" textAnchor="middle" fontSize="9.5" fill="#3730a3">hardware holder key ⟶ inject</text>
          <line x1="190" y1="42" x2="228" y2="42" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#ar-arrow)" />

          <rect x="530" y="16" width="170" height="52" rx="6" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.5" />
          <text x="615" y="38" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3730a3">Oid4vcHttp</text>
          <text x="615" y="55" textAnchor="middle" fontSize="9.5" fill="#3730a3">transport ⟶ inject</text>
          <line x1="530" y1="42" x2="492" y2="42" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#ar-arrow)" />

          <line x1="360" y1="64" x2="360" y2="92" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ar-arrow)" />

          {/* library container */}
          <rect x="40" y="94" width="640" height="256" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <text x="60" y="116" fontSize="11" fontWeight="700" fill="#94a3b8" letterSpacing="0.06em">sdjwt_oid4vc</text>

          {/* transport layer */}
          <text x="60" y="150" fontSize="10" fontWeight="700" fill="#0369a1" letterSpacing="0.08em">TRANSPORT</text>
          <rect x="60" y="158" width="290" height="52" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
          <text x="205" y="180" textAnchor="middle" fontSize="13" fontWeight="700" fill="#075985">Oid4vciClient</text>
          <text x="205" y="197" textAnchor="middle" fontSize="10" fill="#075985">issuance — OpenID4VCI</text>

          <rect x="370" y="158" width="290" height="52" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
          <text x="515" y="180" textAnchor="middle" fontSize="13" fontWeight="700" fill="#075985">Oid4vpClient</text>
          <text x="515" y="197" textAnchor="middle" fontSize="10" fill="#075985">presentation — OpenID4VP + DCQL</text>

          {/* format layer */}
          <text x="60" y="244" fontSize="10" fontWeight="700" fill="#7c3aed" letterSpacing="0.08em">FORMAT</text>
          <rect x="60" y="252" width="600" height="52" rx="6" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
          <text x="360" y="274" textAnchor="middle" fontSize="13" fontWeight="700" fill="#4c1d95">SD-JWT VC codec</text>
          <text x="360" y="291" textAnchor="middle" fontSize="10" fill="#4c1d95">parse · resolveClaims · present (KB-JWT) · IssuerTrust · StatusListResolver</text>

          {/* core */}
          <rect x="60" y="312" width="600" height="30" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="5 3" />
          <text x="360" y="331" textAnchor="middle" fontSize="10.5" fill="#475569">core (not exported): ES256 verify · JWE (ECDH-ES) · X.509 chain — pointycastle</text>

          {/* footnote */}
          <text x="360" y="372" textAnchor="middle" fontSize="10.5" fontStyle="italic" fill="#475569">
            format is independent of transport → a future mdoc codec reuses the same clients
          </text>
        </svg>
      </div>
      <figcaption className="text-xs text-text-faint leading-relaxed p-4 border-t border-border">
        {caption}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Diagram 2 — issuance + presentation sequence                       */
/* ------------------------------------------------------------------ */

function FlowSequenceDiagram() {
  const caption =
    "The wallet is the holder in the middle. Issuance (OpenID4VCI, pre-authorized flow): redeem an offer with a tx_code, sign a proof-of-possession with the holder key, receive the SD-JWT VC. Presentation (OpenID4VP): match the verifier's DCQL query, select only the requested disclosures, sign a Key-Binding JWT, and submit the vp_token. The same hardware key signs both the proof and the KB-JWT.";

  return (
    <figure className="glass-card rounded-xl overflow-hidden">
      <div className="bg-white p-6 overflow-x-auto">
        <svg
          viewBox="0 0 760 540"
          role="img"
          aria-labelledby="flow-title"
          className="w-full h-auto min-w-[640px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="flow-title">Issuance and presentation sequence across issuer, wallet and verifier</title>

          <defs>
            <marker id="fl-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>
          </defs>

          {/* lifelines */}
          <rect x="40" y="20" width="160" height="44" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
          <text x="120" y="47" textAnchor="middle" fontSize="13" fontWeight="700" fill="#075985">Issuer</text>

          <rect x="300" y="20" width="160" height="44" rx="6" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.5" />
          <text x="380" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill="#3730a3">Wallet</text>
          <text x="380" y="55" textAnchor="middle" fontSize="9" fill="#3730a3">holder (this library)</text>

          <rect x="560" y="20" width="160" height="44" rx="6" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
          <text x="640" y="47" textAnchor="middle" fontSize="13" fontWeight="700" fill="#831843">Verifier</text>

          <line x1="120" y1="64" x2="120" y2="522" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="380" y1="64" x2="380" y2="522" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="640" y1="64" x2="640" y2="522" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />

          {/* issuance band */}
          <text x="40" y="90" fontSize="10" fontWeight="700" fill="#0369a1" letterSpacing="0.08em">ISSUANCE — OpenID4VCI</text>

          <text x="250" y="112" textAnchor="middle" fontSize="11" fill="#334155">① credential offer (+ tx_code out-of-band)</text>
          <line x1="126" y1="120" x2="374" y2="120" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#fl-arrow)" />

          <text x="250" y="146" textAnchor="middle" fontSize="11" fill="#334155">② token request (pre-auth code + tx_code)</text>
          <line x1="380" y1="154" x2="126" y2="154" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#fl-arrow)" />

          <text x="250" y="180" textAnchor="middle" fontSize="11" fill="#334155">③ proof-of-possession (holder key)</text>
          <line x1="380" y1="188" x2="126" y2="188" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#fl-arrow)" />

          <text x="250" y="214" textAnchor="middle" fontSize="11" fill="#334155">④ SD-JWT VC</text>
          <line x1="120" y1="222" x2="374" y2="222" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#fl-arrow)" />
          <rect x="316" y="232" width="128" height="28" rx="4" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1" />
          <text x="380" y="250" textAnchor="middle" fontSize="9.5" fill="#4c1d95">held + issuer-trusted</text>

          {/* divider */}
          <line x1="40" y1="288" x2="720" y2="288" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 5" />
          <text x="40" y="312" fontSize="10" fontWeight="700" fill="#be185d" letterSpacing="0.08em">PRESENTATION — OpenID4VP</text>

          <text x="510" y="336" textAnchor="middle" fontSize="11" fill="#334155">⑤ request (DCQL query)</text>
          <line x1="640" y1="344" x2="386" y2="344" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#fl-arrow)" />

          <rect x="300" y="356" width="160" height="46" rx="4" fill="#eef2ff" stroke="#6366f1" strokeWidth="1" />
          <text x="380" y="374" textAnchor="middle" fontSize="9.5" fill="#3730a3">match · select disclosures</text>
          <text x="380" y="390" textAnchor="middle" fontSize="9.5" fill="#3730a3">sign Key-Binding JWT</text>

          <text x="510" y="428" textAnchor="middle" fontSize="11" fill="#334155">⑥ vp_token (direct_post · direct_post.jwt)</text>
          <line x1="380" y1="436" x2="634" y2="436" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#fl-arrow)" />
          <rect x="556" y="446" width="168" height="28" rx="4" fill="#fce7f3" stroke="#ec4899" strokeWidth="1" />
          <text x="640" y="464" textAnchor="middle" fontSize="9.5" fill="#831843">verify issuer seal + KB-JWT</text>

          <text x="380" y="506" textAnchor="middle" fontSize="10.5" fontStyle="italic" fill="#475569">
            one hardware key signs both the proof-of-possession and the Key-Binding JWT
          </text>
        </svg>
      </div>
      <figcaption className="text-xs text-text-faint leading-relaxed p-4 border-t border-border">
        {caption}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Diagram 3 — selective disclosure                                   */
/* ------------------------------------------------------------------ */

function SelectiveDisclosureDiagram() {
  const caption =
    "The held credential carries every claim, but each is blinded — only a digest is in the issuer-signed JWT; the holder keeps the disclosures. The verifier asks for two (one nested). The wallet sends the issuer JWT plus only those two disclosures and a Key-Binding JWT; family_name, country and nationalities never leave the device. The verifier recomputes the digests, checks the issuer signature and the KB-JWT, and reconstructs exactly the two claims it asked for.";

  return (
    <figure className="glass-card rounded-xl overflow-hidden">
      <div className="bg-white p-6 overflow-x-auto">
        <svg
          viewBox="0 0 740 470"
          role="img"
          aria-labelledby="sd-title"
          className="w-full h-auto min-w-[600px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="sd-title">Selective disclosure: reveal only the requested claims</title>

          <defs>
            <marker id="sd-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>
          </defs>

          {/* held credential */}
          <rect x="20" y="30" width="230" height="270" rx="8" fill="#f8fafc" stroke="#8b5cf6" strokeWidth="1.5" />
          <text x="135" y="54" textAnchor="middle" fontSize="12" fontWeight="700" fill="#4c1d95">Held credential (SD-JWT VC)</text>
          <text x="135" y="71" textAnchor="middle" fontSize="9" fill="#7c3aed">issuer-signed · claims blinded</text>

          {claimRow(40, 86, "given_name", false)}
          {claimRow(40, 116, "family_name", false)}
          {claimRow(40, 146, "place_of_birth.locality", true)}
          {claimRow(40, 176, "place_of_birth.country", false)}
          {claimRow(40, 206, "age_equal_or_over.18", true)}
          {claimRow(40, 236, "nationalities[]", false)}
          <text x="135" y="284" textAnchor="middle" fontSize="9" fontStyle="italic" fill="#64748b">6 disclosures held on device</text>

          {/* verifier ask */}
          <rect x="290" y="110" width="150" height="110" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
          <text x="365" y="134" textAnchor="middle" fontSize="12" fontWeight="700" fill="#831843">Verifier asks</text>
          <text x="365" y="150" textAnchor="middle" fontSize="8.5" fill="#9d174d">DCQL claim paths</text>
          <text x="300" y="176" fontSize="10" fill="#831843">• place_of_birth</text>
          <text x="312" y="190" fontSize="10" fill="#831843">.locality</text>
          <text x="300" y="208" fontSize="10" fill="#831843">• age_equal_or_over.18</text>

          <line x1="250" y1="165" x2="288" y2="165" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#sd-arrow)" />
          <line x1="440" y1="165" x2="478" y2="165" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#sd-arrow)" />

          {/* vp_token sent */}
          <rect x="480" y="30" width="240" height="270" rx="8" fill="#ecfdf5" stroke="#16a34a" strokeWidth="1.5" />
          <text x="600" y="54" textAnchor="middle" fontSize="12" fontWeight="700" fill="#14532d">vp_token sent</text>
          <text x="600" y="71" textAnchor="middle" fontSize="9" fill="#15803d">only what was asked</text>

          <rect x="496" y="84" width="208" height="24" rx="4" fill="#fff" stroke="#16a34a" strokeWidth="1" />
          <text x="600" y="100" textAnchor="middle" fontSize="9.5" fill="#14532d">issuer-signed JWT</text>

          {sentRow(496, 116, "✓ place_of_birth.locality")}
          {sentRow(496, 146, "✓ age_equal_or_over.18")}

          <rect x="496" y="178" width="208" height="24" rx="4" fill="#fff" stroke="#16a34a" strokeWidth="1" />
          <text x="600" y="194" textAnchor="middle" fontSize="9.5" fill="#14532d">Key-Binding JWT (holder key)</text>

          <text x="600" y="228" textAnchor="middle" fontSize="9" fill="#166534">hidden: family_name ·</text>
          <text x="600" y="242" textAnchor="middle" fontSize="9" fill="#166534">country · nationalities · given_name</text>
          <text x="600" y="270" textAnchor="middle" fontSize="8.5" fontStyle="italic" fill="#166534">bound to nonce + audience</text>

          {/* verdict */}
          <rect x="150" y="340" width="440" height="70" rx="8" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.5" />
          <text x="370" y="366" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3730a3">Verifier reconstructs 2 claims — verifies issuer seal + KB-JWT</text>
          <text x="370" y="388" textAnchor="middle" fontSize="10.5" fill="#4338ca">learns nothing it didn&rsquo;t ask for; the rest never left the device</text>
        </svg>
      </div>
      <figcaption className="text-xs text-text-faint leading-relaxed p-4 border-t border-border">
        {caption}
      </figcaption>
    </figure>
  );
}

function claimRow(x: number, y: number, label: string, revealed: boolean) {
  return (
    <g key={label}>
      <rect x={x} y={y} width="190" height="24" rx="4" fill={revealed ? "#dcfce7" : "#f1f5f9"} stroke={revealed ? "#16a34a" : "#cbd5e1"} strokeWidth="1" />
      <text x={x + 10} y={y + 16} fontSize="9.5" fill={revealed ? "#14532d" : "#64748b"} fontWeight={revealed ? 700 : 400}>
        {label}
      </text>
      <text x={x + 178} y={y + 16} textAnchor="end" fontSize="10" fill={revealed ? "#16a34a" : "#94a3b8"}>
        {revealed ? "→" : "•"}
      </text>
    </g>
  );
}

function sentRow(x: number, y: number, label: string) {
  return (
    <g key={label}>
      <rect x={x} y={y} width="208" height="24" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x={x + 104} y={y + 16} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#14532d">
        {label}
      </text>
    </g>
  );
}
