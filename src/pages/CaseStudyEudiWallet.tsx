import { useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

const GITHUB = "https://github.com/exilonX/eudi-test-wallet";
const ACCENT = "#0d9488";

// Abridged from lib/attested_keys_signer.dart — "the ENTIRE integration
// between the two packages" — kept faithful to the three methods that matter.
const adaptor = `// sdjwt_oid4vc never imports a key backend. It asks an
// Es256Signer for three things; we answer all three from
// the hardware key minted by attested_secure_keys.
class AttestedKeysSigner implements Es256Signer {
  AttestedKeysSigner(this._keys, this._key);
  final AttestedSecureKeys _keys;
  final HwKey _key;

  @override
  Future<Map<String, dynamic>> publicJwk() async =>
      _key.publicJwk.toJson().cast<String, dynamic>();

  @override
  Future<String> signEs256(String input) async {
    final sig = await _keys.sign(
      alias: _key.alias, payload: utf8.encode(input));
    return sig.jose; // raw R‖S, base64url — JOSE ES256
  }

  @override
  Future<KeyAttestation?> attest(String nonce) async {
    // Android X.509 chain / iOS App Attest — or null on an
    // emulator, where the PoP still binds the key via cnf.
    final att = await _keys.attest(
      alias: _key.alias, serverNonce: utf8.encode(nonce));
    return _normalize(att);
  }
}`;

// The app's own §1 acceptance checklist, rendered on the Home screen.
const criteria = [
  "Generate hardware key + read its JWK",
  "Wrap the key as an Es256Signer",
  "Issue — redeem offer (OID4VCI + tx_code + proof-of-possession)",
  "Inspect — decode + display the credential's claims",
  "Trust — verify issuer signature + validity window",
  "Status — resolve the Token Status List",
  "Present — OpenID4VP + hardware-signed Key-Binding JWT",
];

export function CaseStudyEudiWallet() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const url = "https://ionelmerca.com/case-study/eudi-wallet";
    const title = "EUDI Wallet — Case Study · Ionel Merca";
    const description =
      "A working EU Digital Identity wallet built from two of my own libraries — hardware-backed keys (attested_secure_keys) and the SD-JWT VC / OpenID4VC holder flow (sdjwt_oid4vc) — joined by a 72-line adaptor. Runs the full issue → hold → present journey against a mock backend and the live EU reference issuer/verifier.";

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
      headline: "EUDI Wallet — a working reference wallet from two composable libraries",
      alternativeHeadline:
        "Hardware-backed keys + the SD-JWT VC / OpenID4VC holder flow, joined by a 72-line adaptor, running against the live EU reference issuer and verifier",
      description,
      author: { "@type": "Person", name: "Ionel Merca", url: "https://ionelmerca.com/" },
      publisher: { "@type": "Person", name: "Ionel Merca", url: "https://ionelmerca.com/" },
      datePublished: "2026-07-06",
      dateModified: "2026-07-06",
      mainEntityOfPage: url,
      inLanguage: "en",
      keywords: [
        "EUDI wallet",
        "EU Digital Identity wallet",
        "SD-JWT VC",
        "OpenID4VCI",
        "OpenID4VP",
        "verifiable credentials",
        "selective disclosure",
        "hardware-backed keys",
        "key attestation",
        "Flutter wallet",
        "eIDAS 2",
        "reference wallet interop",
      ],
      codeRepository: GITHUB,
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
            <WalletDeco />
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="section-label">Case Study &middot; 2026</div>
            <h1 className="text-3xl md:text-5xl font-bold text-text mb-4 leading-tight">
              A working EUDI wallet
            </h1>
            <p className="text-lg text-text-muted leading-relaxed max-w-2xl mb-8">
              The capstone that proves the other two: a real EU Digital Identity
              wallet assembled from{" "}
              <a href="/case-study/attested-secure-keys" className="text-primary hover:underline">
                attested_secure_keys
              </a>{" "}
              (hardware keys) and{" "}
              <a href="/case-study/sdjwt-oid4vc" className="text-primary hover:underline">
                sdjwt_oid4vc
              </a>{" "}
              (the holder protocol), joined by a <strong>72-line adaptor</strong>. It
              runs the whole <em>issue &rarr; hold &rarr; present</em> journey &mdash;
              offline against a mock backend, and live against the{" "}
              <strong>EU reference issuer and verifier</strong>.
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <HeroStat label="Built from" value="2 libraries + glue" />
              <HeroStat label="Journey" value="Issue · Hold · Present" />
              <HeroStat label="Backends" value="Mock + live EUDI" />
              <HeroStat label="Proof" value="On-device E2E test" />
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <Meta
            label="Role"
            value="Solo &mdash; the app, both libraries, and the adaptor between them"
          />
          <Meta
            label="Status"
            value="Reference / demo build &mdash; device-verified, Mode A &amp; live EUDI"
          />
          <Meta
            label="Verification"
            value="On-device integration test through the real hardware-key plugin"
          />
          <Meta
            label="Source"
            value={`<a href="${GITHUB}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">github.com/exilonX/eudi-test-wallet</a>`}
          />
        </div>

        {/* ---- Demo video slot (fill when the recording lands) ---- */}
        <DemoSlot />

        {/* ---- The brief ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-16">Why an app, not just libraries</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            The two library case studies each describe a half of an EUDI wallet: one
            mints and attests the holder&rsquo;s <strong>key</strong> in secure hardware,
            the other speaks the <strong>protocol</strong> to receive, hold and present
            credentials. A reasonable question is whether the two actually meet &mdash;
            or whether they only look composable on paper.
          </p>
          <p className="text-text-muted leading-relaxed">
            This is the proof: a running Flutter wallet that wires both together and
            walks the full holder journey. It&rsquo;s deliberately a{" "}
            <em>reference / demo build</em>, not a shipping product &mdash; its job is to
            show the seams line up, end to end, on a real device and against the real EU
            infrastructure.
          </p>
        </section>

        {/* ---- Composition ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">The two libraries meet in 72 lines</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">sdjwt_oid4vc</code>{" "}
            never imports a key backend &mdash; it asks an{" "}
            <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">Es256Signer</code>{" "}
            for a public JWK, an ES256 signature, and an optional key attestation. A{" "}
            <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">HwKey</code> from{" "}
            <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">attested_secure_keys</code>{" "}
            can answer all three. So the entire integration is one small adaptor that
            implements that interface from secure hardware &mdash; the design bet of both
            libraries (inject the key, inject the network) collected in one file.
          </p>
          <CompositionDiagram />
          <div className="mt-8">
            <CodeBlock code={adaptor} />
          </div>
        </section>

        {/* ---- The app ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">The app itself</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Three screens over a shared controller &mdash; no routing framework, just a
            bottom-nav index. <strong>Home</strong> generates the hardware key and shows a
            live acceptance checklist; <strong>Import</strong> redeems a credential offer
            (paste or scan a QR) then inspects, trusts and status-checks it;{" "}
            <strong>Present</strong> loads a verifier&rsquo;s request, authenticates it,
            and discloses only the requested claims. The checklist below is the app&rsquo;s
            own &mdash; every item flips green as the journey completes:
          </p>
          <CriteriaChecklist />
          <p className="text-text-muted leading-relaxed mt-6">
            The presentation step is where selective disclosure pays off: asked for one
            claim, the wallet reveals exactly that and withholds the rest &mdash; in the
            offline demo it discloses{" "}
            <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">employment_status</code>{" "}
            and keeps <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">given_name</code>{" "}
            and <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">family_name</code>{" "}
            on the device. The mechanics live in the{" "}
            <a href="/case-study/sdjwt-oid4vc" className="text-primary hover:underline">
              sdjwt_oid4vc case study
            </a>
            .
          </p>
        </section>

        {/* ---- Two modes ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">
            One holder core, two backends
          </h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Because the holder clients take an injected HTTP client, the same wallet runs
            against two completely different backends by swapping one object. <strong>Mode
            A</strong> is an in-process mock issuer + verifier &mdash; a fully offline
            self-test. <strong>Mode B</strong> points at the live{" "}
            <strong>EUDI reference wallet</strong> stack: it redeems a real PID offer from{" "}
            <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">issuer.eudiw.dev</code>,
            validates the credential&rsquo;s X.509 chain to the bundled EU PID Issuer CA
            root, and presents back with the verifier&rsquo;s encrypted{" "}
            <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">direct_post.jwt</code>{" "}
            response mode.
          </p>
          <ModesDiagram />
        </section>

        {/* ---- Proven ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">Proven end to end</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            The demo runs, but the real assurance is an <strong>on-device integration
            test</strong> that drives the actual{" "}
            <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">attested_secure_keys</code>{" "}
            plugin &mdash; <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">generateKey</code>,{" "}
            <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">sign</code> and{" "}
            <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">attest</code> over
            the method channel, not a mock &mdash; through the entire flow and asserts every
            checklist item passes, including that the presented token contains only the
            requested claim.
          </p>
          <p className="text-text-muted leading-relaxed">
            And it interoperates with the real thing: the same app, in Mode B, has issued
            and presented a genuine PID credential against the EU reference issuer and
            verifier &mdash; the interop that hardened{" "}
            <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">direct_post.jwt</code>{" "}
            and nested-claim DCQL in the underlying library.
          </p>
        </section>

        {/* ---- Design decisions ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-6 mt-14">
            Design decisions &amp; honest trade-offs
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <DecisionCard title="A reference build, not a product">
              No credential storage, no account system, no production key lifecycle. It
              exists to prove the two libraries compose into a working wallet &mdash; and
              it says so, rather than dressing a demo up as a shipping app.
            </DecisionCard>
            <DecisionCard title="The integration is the point">
              The interesting code isn&rsquo;t the screens &mdash; it&rsquo;s the 72-line
              adaptor and the one-line HTTP swap. Everything else is deliberately plain
              Material so the seams between the libraries are what you notice.
            </DecisionCard>
            <DecisionCard title="Runs on an emulator, honestly">
              Key generation asks for a TEE-backed, biometric-gated key and falls back if
              the hardware can&rsquo;t provide one &mdash; the UI reports the assurance it
              actually got. Attestation is simply omitted where it isn&rsquo;t available;
              the proof-of-possession still binds the key.
            </DecisionCard>
            <DecisionCard title="Trust anchors are bundled, on purpose">
              Mode B validates to the EU reference PID Issuer CA root, checked into the
              repo as dev trust material. Real trust-list management, revocation and RP
              policy stay out &mdash; those are an integrator&rsquo;s job, the same line
              both libraries draw.
            </DecisionCard>
          </div>
        </section>

        {/* ---- Status ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">Status</h2>
          <p className="text-text-muted leading-relaxed">
            Public source, device-verified in both modes. It completes the trilogy: the{" "}
            <a href="/case-study/attested-secure-keys" className="text-primary hover:underline">
              key layer
            </a>
            , the{" "}
            <a href="/case-study/sdjwt-oid4vc" className="text-primary hover:underline">
              protocol layer
            </a>
            , and here the wallet that runs on both. As a demo it&rsquo;s intentionally
            unpolished &mdash; the value is that the whole EUDI holder journey works,
            end to end, on real hardware and against the real EU stack.
          </p>
        </section>

        {/* ---- Stack ---- */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-text mb-4">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Flutter",
              "Dart",
              "attested_secure_keys",
              "sdjwt_oid4vc",
              "SD-JWT VC",
              "OpenID4VCI",
              "OpenID4VP",
              "EC P-256 · ES256",
              "Key-Binding JWT",
              "Token Status List",
              "X.509 chain validation",
              "mobile_scanner (QR)",
              "integration_test",
            ].map((s) => (
              <span key={s} className="skill-badge">
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* ---- Links CTA ---- */}
        <section className="mt-14">
          <div className="grid sm:grid-cols-3 gap-4">
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
                eudi-test-wallet &rarr;
              </div>
            </a>
            <a
              href="/case-study/attested-secure-keys"
              className="glass-card rounded-xl p-5 group transition-colors hover:border-primary/50"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-text-faint mb-1">
                Key layer
              </div>
              <div className="text-text font-semibold group-hover:text-primary transition-colors">
                Attested Secure Keys &rarr;
              </div>
            </a>
            <a
              href="/case-study/sdjwt-oid4vc"
              className="glass-card rounded-xl p-5 group transition-colors hover:border-primary/50"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-text-faint mb-1">
                Protocol layer
              </div>
              <div className="text-text font-semibold group-hover:text-primary transition-colors">
                SD-JWT VC + OpenID4VC &rarr;
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

function CriteriaChecklist() {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
        §1 success criteria &middot; Home screen
      </div>
      <ul className="space-y-2.5">
        {criteria.map((c) => (
          <li key={c} className="flex items-start gap-3 text-sm text-text-muted">
            <span
              className="mt-0.5 flex-none inline-flex items-center justify-center w-4 h-4 rounded-full"
              style={{ background: `${ACCENT}22`, color: ACCENT }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 12 12" width="10" height="10" fill="none">
                <path d="M2.5 6.2 L5 8.6 L9.5 3.6" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Demo video placeholder. When the screen recording exists, drop the file at
 * public/media/eudi-wallet-demo.mp4 (+ a poster) and replace the inner div with:
 *   <video controls poster="/media/eudi-wallet-demo-poster.jpg"
 *          className="w-full rounded-xl" preload="none">
 *     <source src="/media/eudi-wallet-demo.mp4" type="video/mp4" />
 *   </video>
 */
function DemoSlot() {
  return (
    <figure className="glass-card rounded-2xl overflow-hidden">
      <div
        className="relative flex items-center justify-center"
        style={{ aspectRatio: "16 / 9", background: `${ACCENT}10` }}
      >
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative z-10 text-center px-6">
          <div
            className="mx-auto mb-3 flex items-center justify-center w-14 h-14 rounded-full"
            style={{ background: `${ACCENT}22` }}
          >
            <svg viewBox="0 0 24 24" width="26" height="26" fill={ACCENT} aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div className="text-sm font-semibold text-text">Screen recording</div>
          <div className="text-xs text-text-faint mt-1">
            the full issue &rarr; hold &rarr; present journey &mdash; Mode A &amp; live EUDI
          </div>
        </div>
      </div>
    </figure>
  );
}

function WalletDeco() {
  return (
    <svg viewBox="0 0 120 130" width="118" height="128" xmlns="http://www.w3.org/2000/svg">
      {/* phone */}
      <rect x="30" y="10" width="60" height="110" rx="10" fill="none" stroke={ACCENT} strokeWidth="2" opacity="0.7" />
      {/* credential card on screen */}
      <rect x="40" y="30" width="40" height="26" rx="4" fill="none" stroke={ACCENT} strokeWidth="2" opacity="0.7" />
      <circle cx="49" cy="39" r="4" fill="none" stroke={ACCENT} strokeWidth="1.6" opacity="0.7" />
      <line x1="57" y1="37" x2="74" y2="37" stroke={ACCENT} strokeWidth="1.6" opacity="0.5" />
      <line x1="57" y1="43" x2="70" y2="43" stroke={ACCENT} strokeWidth="1.6" opacity="0.4" />
      {/* checklist */}
      <line x1="40" y1="70" x2="80" y2="70" stroke={ACCENT} strokeWidth="1.6" opacity="0.3" strokeDasharray="3 3" />
      <line x1="40" y1="82" x2="80" y2="82" stroke={ACCENT} strokeWidth="1.6" opacity="0.3" strokeDasharray="3 3" />
      {/* verify check */}
      <circle cx="78" cy="100" r="15" fill="#fff" stroke={ACCENT} strokeWidth="2" />
      <path d="M71 100 l5 5 l10 -11" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Diagram 1 — composition: two libraries + adaptor = wallet          */
/* ------------------------------------------------------------------ */

function CompositionDiagram() {
  const caption =
    "The wallet app depends on both libraries. sdjwt_oid4vc drives the holder protocol but needs an Es256Signer; attested_secure_keys mints a non-exportable hardware key. AttestedKeysSigner (72 lines) implements Es256Signer by delegating to the hardware key — the single seam where the two packages meet. Only handles, signatures and attestations cross back up; the private key stays in secure hardware.";

  return (
    <figure className="glass-card rounded-xl overflow-hidden">
      <div className="bg-white p-6 overflow-x-auto">
        <svg
          viewBox="0 0 720 470"
          role="img"
          aria-labelledby="comp-title"
          className="w-full h-auto min-w-[560px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="comp-title">How the two libraries compose into the wallet</title>
          <defs>
            <marker id="co-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>
          </defs>

          {/* app + screens */}
          <rect x="210" y="20" width="300" height="58" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="360" y="44" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e3a8a">EUDI wallet app (Flutter)</text>
          <text x="360" y="64" textAnchor="middle" fontSize="10.5" fill="#1e3a8a">Home · Import · Present — over one WalletController</text>

          <line x1="360" y1="78" x2="360" y2="106" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#co-arrow)" />

          {/* two libraries */}
          <rect x="40" y="108" width="300" height="72" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
          <text x="190" y="133" textAnchor="middle" fontSize="13" fontWeight="700" fill="#4c1d95">sdjwt_oid4vc</text>
          <text x="190" y="151" textAnchor="middle" fontSize="10" fill="#4c1d95">holder protocol — VCI · VP · SD-JWT VC</text>
          <text x="190" y="168" textAnchor="middle" fontSize="10" fontStyle="italic" fill="#7c3aed">needs an Es256Signer ↓</text>

          <rect x="380" y="108" width="300" height="72" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="530" y="133" textAnchor="middle" fontSize="13" fontWeight="700" fill="#78350f">attested_secure_keys</text>
          <text x="530" y="151" textAnchor="middle" fontSize="10" fill="#78350f">hardware EC P-256 key + attestation</text>
          <text x="530" y="168" textAnchor="middle" fontSize="10" fontStyle="italic" fill="#b45309">provides a HwKey ↓</text>

          <line x1="190" y1="180" x2="300" y2="222" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#co-arrow)" />
          <line x1="530" y1="180" x2="420" y2="222" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#co-arrow)" />

          {/* adaptor */}
          <rect x="210" y="224" width="300" height="60" rx="8" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
          <text x="360" y="248" textAnchor="middle" fontSize="13" fontWeight="700" fill="#134e4a">AttestedKeysSigner · 72 lines</text>
          <text x="360" y="267" textAnchor="middle" fontSize="10" fill="#134e4a">implements Es256Signer using the hardware key</text>

          <line x1="360" y1="284" x2="360" y2="312" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#co-arrow)" />

          {/* three calls */}
          <rect x="120" y="314" width="480" height="46" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.2" />
          <text x="360" y="333" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">publicJwk() · signEs256() · attest()</text>
          <text x="360" y="350" textAnchor="middle" fontSize="10" fill="#475569">the three calls sdjwt_oid4vc makes — answered from hardware</text>

          {/* hardware boundary */}
          <text x="360" y="388" textAnchor="middle" fontSize="10" fontWeight="700" fill="#16a34a" letterSpacing="0.03em">
            SECURE HARDWARE — the private key never crosses this line
          </text>
          <line x1="60" y1="394" x2="660" y2="394" stroke="#16a34a" strokeWidth="1.2" strokeDasharray="6 4" />

          <line x1="360" y1="360" x2="360" y2="414" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#co-arrow)" />
          <rect x="250" y="416" width="220" height="40" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="360" y="440" textAnchor="middle" fontSize="12" fontWeight="700" fill="#14532d">StrongBox / TEE · Secure Enclave</text>
        </svg>
      </div>
      <figcaption className="text-xs text-text-faint leading-relaxed p-4 border-t border-border">
        {caption}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Diagram 2 — one holder core, two backends                          */
/* ------------------------------------------------------------------ */

function ModesDiagram() {
  const caption =
    "The holder clients (Oid4vciClient, Oid4vpClient, StatusListResolver) take an injected Oid4vcHttp. Mode A wires them to an in-process mock issuer + verifier for a fully offline self-test. Mode B wires the same clients to the live EUDI reference issuer/verifier over real HTTP, validating the credential's X.509 chain to the bundled EU PID Issuer CA root and using the encrypted direct_post.jwt response mode. Only the injected transport changes.";

  return (
    <figure className="glass-card rounded-xl overflow-hidden">
      <div className="bg-white p-6 overflow-x-auto">
        <svg
          viewBox="0 0 720 420"
          role="img"
          aria-labelledby="modes-title"
          className="w-full h-auto min-w-[560px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="modes-title">One holder core, two swappable backends</title>
          <defs>
            <marker id="mo-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>
          </defs>

          {/* holder core */}
          <rect x="230" y="20" width="260" height="70" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
          <text x="360" y="45" textAnchor="middle" fontSize="13" fontWeight="700" fill="#4c1d95">Holder core (sdjwt_oid4vc)</text>
          <text x="360" y="63" textAnchor="middle" fontSize="10" fill="#4c1d95">Oid4vciClient · Oid4vpClient · StatusListResolver</text>
          <text x="360" y="80" textAnchor="middle" fontSize="10" fontStyle="italic" fill="#7c3aed">takes an injected Oid4vcHttp</text>

          <line x1="290" y1="90" x2="200" y2="150" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mo-arrow)" />
          <line x1="430" y1="90" x2="520" y2="150" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mo-arrow)" />

          {/* mode A */}
          <rect x="40" y="152" width="300" height="112" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
          <text x="190" y="176" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Mode A · mock</text>
          <text x="190" y="196" textAnchor="middle" fontSize="10" fill="#475569">in-process MockIssuerVerifier</text>
          <text x="190" y="213" textAnchor="middle" fontSize="10" fill="#475569">offline — no network</text>
          <text x="190" y="236" textAnchor="middle" fontSize="9.5" fontStyle="italic" fill="#64748b">issues a demo credential;</text>
          <text x="190" y="250" textAnchor="middle" fontSize="9.5" fontStyle="italic" fill="#64748b">discloses employment_status only</text>

          {/* mode B */}
          <rect x="380" y="152" width="300" height="112" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
          <text x="530" y="176" textAnchor="middle" fontSize="12" fontWeight="700" fill="#831843">Mode B · live EUDI</text>
          <text x="530" y="196" textAnchor="middle" fontSize="10" fill="#9d174d">issuer.eudiw.dev over real HTTP</text>
          <text x="530" y="213" textAnchor="middle" fontSize="10" fill="#9d174d">real PID · x5c → EU PID Issuer CA</text>
          <text x="530" y="236" textAnchor="middle" fontSize="9.5" fontStyle="italic" fill="#be185d">encrypted direct_post.jwt</text>
          <text x="530" y="250" textAnchor="middle" fontSize="9.5" fontStyle="italic" fill="#be185d">response to the reference verifier</text>

          {/* footer */}
          <text x="360" y="300" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0d9488">
            swap one injected object — the wallet code is identical
          </text>
          <rect x="150" y="320" width="420" height="64" rx="8" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
          <text x="360" y="346" textAnchor="middle" fontSize="11" fontWeight="700" fill="#134e4a">Same hardware key · same holder flow · same UI</text>
          <text x="360" y="366" textAnchor="middle" fontSize="10" fill="#134e4a">Mode A proves the logic offline; Mode B proves interop with the real EU stack</text>
        </svg>
      </div>
      <figcaption className="text-xs text-text-faint leading-relaxed p-4 border-t border-border">
        {caption}
      </figcaption>
    </figure>
  );
}
