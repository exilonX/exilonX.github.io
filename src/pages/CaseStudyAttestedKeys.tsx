import { useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

const PUB_DEV = "https://pub.dev/packages/attested_secure_keys";
const GITHUB = "https://github.com/exilonX/attested_secure_keys";

const quickStart = `final keys = AttestedSecureKeys();

// 1 · Mint a non-exportable P-256 key in the strongest hardware
//     available, binding the server's nonce into the attestation.
final key = await keys.generateKey(
  alias: 'wallet.holderKey',
  minSecurityLevel: KeySecurityLevel.trustedEnvironment,
  userAuth: const UserAuthPolicy.perUseBiometric(),
  attestationChallenge: nonceFromServer,
);

// 2 · Hand the public key + manufacturer-signed proof to your backend.
final attestation =
    await keys.attest(alias: key.alias, serverNonce: nonceFromServer);
await api.registerWalletKey(jwk: key.publicJwk, attestation: attestation);

// 3 · Later: sign a proof-of-possession. The biometric prompt fires
//     automatically for an auth-gated key.
final sig = await keys.sign(alias: key.alias, payload: utf8.encode(jwt));
final jws = '$jwt.\${sig.jose}';`;

const api: [string, string][] = [
  ["capabilities()", "Probe what the device can actually do — StrongBox / TEE / Secure Enclave, attestation and biometric support, best achievable security level."],
  ["generateKey()", "Mint a non-exportable EC P-256 key in the strongest available hardware. Fails closed if the requested security floor can't be met."],
  ["sign()", "ES256-sign inside the chip; returns the signature as raw 64-byte R‖S bytes plus a base64url .jose form (JOSE / COSE ready). Fires the biometric prompt for auth-gated keys."],
  ["attest()", "Return the key's manufacturer-signed proof bound to a server nonce — an Android Keystore X.509 chain or an iOS App Attest object."],
  ["getKeyInfo · containsKey", "Inspect live key metadata, or check whether an alias exists."],
  ["deleteKey · listAliases", "Permanently delete a key, or enumerate the aliases this library manages."],
];

const androidRows: [string, string][] = [
  ["Hardware", "StrongBox (API 28+) → TEE"],
  ["Attestation", "Keystore X.509 chain (API 24+)"],
  ["Signature", "DER → raw R‖S (JDK BigInteger)"],
  ["Min OS", "API 24"],
];

const iosRows: [string, string][] = [
  ["Hardware", "Secure Enclave (iOS 13+)"],
  ["Attestation", "App Attest (iOS 14+)"],
  ["Signature", "native raw R‖S (no DER)"],
  ["Min OS", "iOS 13 / 14"],
];

export function CaseStudyAttestedKeys() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const url = "https://ionelmerca.com/case-study/attested-secure-keys";
    const title = "Attested Secure Keys — Case Study · Ionel Merca";
    const description =
      "A Flutter plugin for hardware-backed, non-exportable EC P-256 keys (Android StrongBox/TEE, iOS Secure Enclave) with a server-verifiable manufacturer attestation — built for EUDI-wallet-grade apps.";

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
      headline: "Attested Secure Keys — hardware-backed keys with verifiable proof of origin",
      alternativeHeadline:
        "Non-exportable EC P-256 keys minted inside the device's secure hardware, with a manufacturer-signed attestation your server can verify",
      description,
      author: { "@type": "Person", name: "Ionel Merca", url: "https://ionelmerca.com/" },
      publisher: { "@type": "Person", name: "Ionel Merca", url: "https://ionelmerca.com/" },
      datePublished: "2026-06-26",
      dateModified: "2026-06-26",
      mainEntityOfPage: url,
      inLanguage: "en",
      keywords: [
        "hardware-backed keys",
        "key attestation",
        "Android Keystore",
        "StrongBox",
        "iOS Secure Enclave",
        "Apple App Attest",
        "EUDI wallet",
        "Flutter plugin",
        "EC P-256",
        "ES256",
        "non-exportable keys",
        "Pigeon",
        "proof of possession",
        "secure enclave",
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
            style={{ background: "#f59e0b" }}
          />
          <div className="absolute inset-0 dot-grid opacity-40" />
          <div className="absolute top-8 right-8 hidden md:block opacity-60 pointer-events-none">
            <KeyShieldDeco />
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="section-label">Case Study &middot; 2026</div>
            <h1 className="text-3xl md:text-5xl font-bold text-text mb-4 leading-tight">
              Attested Secure Keys
            </h1>
            <p className="text-lg text-text-muted leading-relaxed max-w-2xl mb-8">
              A Flutter plugin that mints non-exportable signing keys inside the
              phone&rsquo;s secure hardware &mdash; Android StrongBox/TEE or the iOS
              Secure Enclave &mdash; and produces a manufacturer-signed proof that the
              key was really born there, which your server can verify. Like{" "}
              <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">flutter_secure_storage</code>,
              but for <em>keys</em>, not data.
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <HeroStat label="Platforms" value="Android · iOS" />
              <HeroStat label="Keys" value="EC P-256 · ES256" />
              <HeroStat label="Hardware" value="StrongBox · Secure Enclave" />
              <HeroStat label="Proof" value="Server-verifiable" />
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-4 mb-16">
          <Meta
            label="Role"
            value="Solo &mdash; API design, Android (Kotlin) &amp; iOS (Swift) native, Dart facade"
          />
          <Meta
            label="Status"
            value="v0.1.0-dev.1 &mdash; device-verified on Android &amp; iOS"
          />
          <Meta label="License" value="Apache-2.0 &middot; open source" />
          <Meta
            label="Package"
            value={`<a href="${PUB_DEV}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">pub.dev/packages/attested_secure_keys</a>`}
          />
        </div>

        {/* ---- The brief ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4">The brief</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            EU Digital Identity (EUDI) wallets &mdash; and most serious fintech and
            identity apps &mdash; have a hard requirement: the private key that binds a
            credential to its holder must live <em>inside</em> the device&rsquo;s secure
            hardware, must be <strong>non-exportable</strong>, and the backend must be
            able to <strong>prove the key was actually born in hardware</strong> before
            it trusts anything signed with it.
          </p>
          <p className="text-text-muted leading-relaxed">
            This library began as the key layer for an EUDI-wallet proof-of-concept,
            then generalised so any app needing hardware-backed keys can reuse it. Its
            protocol companion &mdash; issuance, holding and selective presentation of
            credentials &mdash; lives in{" "}
            <a href="/case-study/sdjwt-oid4vc" className="text-primary hover:underline">
              SD-JWT VC + OpenID4VC
            </a>
            .
          </p>
        </section>

        {/* ---- The gap ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">The gap it fills</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            As of mid-2026 no package on pub.dev exposed{" "}
            <strong>key attestation</strong>. The obvious candidate,{" "}
            <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">flutter_secure_storage</code>,
            solves a different problem: it encrypts <em>data</em>. A private key parked
            there is still a software key &mdash; it round-trips through your app&rsquo;s
            memory every time you use it, so it can be lifted from a compromised process,
            and there is no way to prove to a server where it came from.
          </p>
          <p className="text-text-muted leading-relaxed">
            The fix is to never let the key exist in app memory at all. The OS-certified
            secure element generates it, holds it, and uses it &mdash; and the device
            manufacturer signs a certificate vouching that it did. This plugin wraps both
            platforms&rsquo; native APIs behind one small, honest Dart surface.
          </p>
        </section>

        {/* ---- Diagram 1: HSM call flow ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">
            How it talks to the secure hardware
          </h2>
          <p className="text-text-muted leading-relaxed mb-6">
            It&rsquo;s a federated Flutter plugin. Your app depends only on the Dart
            facade; calls travel through a typed{" "}
            <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">Pigeon</code>{" "}
            channel (no stringly-typed maps) into first-party native code, which speaks
            directly to the hardware-backed keystore. Crucially, the boundary is
            one-way: the private key is created below the line and never crosses back up.
          </p>
          <HsmCallFlowDiagram />
        </section>

        {/* ---- Diagram 2: attestation trust chain ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">
            Proving the key was born in hardware
          </h2>
          <p className="text-text-muted leading-relaxed mb-6">
            This is the whole point of the library. A key&rsquo;s hardware origin is
            vouched for by the <strong>device manufacturer</strong> &mdash; Google&rsquo;s
            Hardware Attestation Root on Android, Apple&rsquo;s App Attest Root on iOS
            &mdash; not by the app and not by the library. The plugin generates the key in
            certified hardware and surfaces the manufacturer&rsquo;s signed proof; your
            backend makes the trust decision.
          </p>
          <AttestationTrustDiagram />
        </section>

        {/* ---- Diagram 3: end-to-end lifecycle ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">End to end</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Put together, a single server nonce ties the whole flow together: it&rsquo;s
            bound into the key at generation, echoed back in the attestation (so a replay
            can&rsquo;t be reused), and the same key later signs proofs-of-possession the
            server validates against the public key it bound at enrolment.
          </p>
          <LifecycleSequenceDiagram />
        </section>

        {/* ---- What it does (product) ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">What it does</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            A facade modeled on the ergonomics of{" "}
            <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">flutter_secure_storage</code>
            , with eight methods:
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
            <PlatformCard os="Android" rows={androidRows} />
            <PlatformCard os="iOS" rows={iosRows} />
          </div>
        </section>

        {/* ---- Design decisions ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-6 mt-14">
            Design decisions &amp; honest trade-offs
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <DecisionCard title="First-party crypto only">
              Keys, signatures and attestation come solely from the platform&rsquo;s own
              security frameworks (Android Keystore, Apple CryptoKit / Security /
              DeviceCheck) plus official libraries (Pigeon). No hand-rolled crypto, no
              heavyweight third-party dependency &mdash; the smallest, all-official
              surface, because this is the most security-sensitive part of the stack.
            </DecisionCard>
            <DecisionCard title="EC P-256 / ES256 only">
              P-256 is the cross-platform floor (the iOS Secure Enclave is P-256-only)
              and the EUDI mdoc / SD-JWT VC baseline. No RSA, P-384 or EdDSA &mdash; one
              curve, both platforms, zero ambiguity.
            </DecisionCard>
            <DecisionCard title="Trust is server-side">
              The client-reported security level is a UX hint, never a trust decision. A
              key only counts once your backend verifies its attestation against the
              genuine Google / Apple roots &mdash; chain, security level, freshness, and
              the echoed nonce.
            </DecisionCard>
            <DecisionCard title="Fails closed, reports honestly">
              Every result states the assurance it actually achieved; the library never
              silently downgrades. If biometric gating is requested but the OS doesn&rsquo;t
              enforce it, generation fails rather than handing back an ungated key.
            </DecisionCard>
            <DecisionCard title="The iOS asymmetry">
              iOS has no per-key X.509 attestation. App Attest attests the <em>app
              instance</em>, so the library binds the Secure Enclave key by hashing its
              JWK thumbprint + the server nonce into the App Attest challenge &mdash; one
              normalized model papering over a real platform difference.
            </DecisionCard>
            <DecisionCard title="Not a certified WSCD">
              It provides hardware-backed keys and the manufacturer&rsquo;s attestation
              artifacts; it is <em>not</em> a certified eIDAS Wallet Secure Cryptographic
              Device and makes no Level-of-Assurance claim. Certification (CC / EUCC) is
              the integrator&rsquo;s responsibility &mdash; stated plainly, on purpose.
            </DecisionCard>
          </div>
        </section>

        {/* ---- Status ---- */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">Status</h2>
          <p className="text-text-muted leading-relaxed">
            Published to pub.dev as <code className="text-sm bg-bg-muted px-1.5 py-0.5 rounded">0.1.0-dev.1</code>{" "}
            while the API soaks toward a stable 0.1.0. Both platforms are
            device-verified &mdash; Android (StrongBox / TEE attestation) on real
            hardware via Firebase Test Lab, and iOS (Secure Enclave + App Attest) on a
            physical iPhone, with the exported Android attestation decoded end-to-end to
            a genuine Google root. It&rsquo;s the key layer of a{" "}
            <a href="/case-study/eudi-wallet" className="text-primary hover:underline">
              working EUDI wallet
            </a>
            . Open source under Apache-2.0.
          </p>
        </section>

        {/* ---- Stack ---- */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-text mb-4">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Flutter",
              "Dart",
              "Pigeon",
              "Kotlin",
              "Android Keystore",
              "StrongBox / TEE",
              "androidx.biometric",
              "Swift",
              "CryptoKit",
              "Secure Enclave",
              "App Attest",
              "EC P-256 · ES256",
              "JOSE / COSE",
              "X.509 attestation",
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
              href="/case-study/eudi-wallet"
              className="glass-card rounded-xl p-5 group transition-colors hover:border-primary/50"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-text-faint mb-1">
                Working wallet
              </div>
              <div className="text-text font-semibold group-hover:text-primary transition-colors">
                See it running &rarr;
              </div>
            </a>
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
                pub.dev/packages/attested_secure_keys &rarr;
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
                github.com/exilonX/attested_secure_keys &rarr;
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

function PlatformCard({ os, rows }: { os: string; rows: [string, string][] }) {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
        {os}
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

function KeyShieldDeco() {
  return (
    <svg viewBox="0 0 120 140" width="120" height="140" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M60 8 L106 26 V70 C106 104 86 124 60 132 C34 124 14 104 14 70 V26 Z"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="2"
        opacity="0.7"
      />
      <circle cx="60" cy="58" r="13" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.85" />
      <rect x="56" y="68" width="8" height="26" rx="2" fill="#f59e0b" opacity="0.85" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Diagram 1 — call flow into the secure hardware                     */
/* ------------------------------------------------------------------ */

function HsmCallFlowDiagram() {
  const caption =
    "Federated plugin layout. Your app depends only on the Dart facade, which routes through a typed Pigeon channel into first-party native code. Key generation, signing and attestation all happen inside the device's secure hardware — only handles, signatures (raw R‖S) and the manufacturer's attestation travel back up. The private key is non-exportable and never crosses the platform channel.";

  return (
    <figure className="glass-card rounded-xl overflow-hidden">
      <div className="bg-white p-6 overflow-x-auto">
        <svg
          viewBox="0 0 720 520"
          role="img"
          aria-labelledby="hsm-flow-title"
          className="w-full h-auto min-w-[560px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="hsm-flow-title">
            Call flow from the Flutter app down to the secure hardware
          </title>

          <defs>
            <marker id="hf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>
          </defs>

          <text x="20" y="48" fontSize="10" fontWeight="700" fill="#94a3b8" letterSpacing="0.08em">DART</text>

          {/* app */}
          <rect x="210" y="22" width="300" height="46" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="360" y="50" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e3a8a">Your Flutter app</text>

          <line x1="360" y1="68" x2="360" y2="100" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#hf-arrow)" />

          {/* facade */}
          <rect x="210" y="102" width="300" height="46" rx="6" fill="#cffafe" stroke="#06b6d4" strokeWidth="1.5" />
          <text x="360" y="124" textAnchor="middle" fontSize="13" fontWeight="700" fill="#164e63">AttestedSecureKeys · facade</text>
          <text x="360" y="140" textAnchor="middle" fontSize="10" fill="#164e63">generateKey · sign · attest · capabilities</text>

          <line x1="360" y1="148" x2="360" y2="180" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#hf-arrow)" />

          {/* platform interface */}
          <rect x="210" y="182" width="300" height="46" rx="6" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
          <text x="360" y="204" textAnchor="middle" fontSize="13" fontWeight="600" fill="#4c1d95">Platform interface</text>
          <text x="360" y="220" textAnchor="middle" fontSize="10" fill="#4c1d95">contract + normalized model</text>

          <line x1="360" y1="228" x2="360" y2="260" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#hf-arrow)" />

          {/* pigeon */}
          <rect x="210" y="262" width="300" height="46" rx="6" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
          <text x="360" y="284" textAnchor="middle" fontSize="13" fontWeight="600" fill="#4c1d95">Pigeon typed channel</text>
          <text x="360" y="300" textAnchor="middle" fontSize="10" fill="#4c1d95">Dart ⇄ Kotlin ⇄ Swift</text>

          {/* split into native */}
          <text x="20" y="386" fontSize="10" fontWeight="700" fill="#94a3b8" letterSpacing="0.08em">NATIVE</text>
          <line x1="360" y1="308" x2="190" y2="360" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#hf-arrow)" />
          <line x1="360" y1="308" x2="530" y2="360" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#hf-arrow)" />

          <rect x="60" y="362" width="260" height="46" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="190" y="384" textAnchor="middle" fontSize="13" fontWeight="600" fill="#78350f">Android · Kotlin plugin</text>
          <text x="190" y="400" textAnchor="middle" fontSize="10" fill="#78350f">first-party Keystore APIs</text>

          <rect x="400" y="362" width="260" height="46" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="530" y="384" textAnchor="middle" fontSize="13" fontWeight="600" fill="#78350f">iOS · Swift plugin</text>
          <text x="530" y="400" textAnchor="middle" fontSize="10" fill="#78350f">first-party CryptoKit / Security</text>

          {/* hardware boundary */}
          <text x="360" y="424" textAnchor="middle" fontSize="10" fontWeight="700" fill="#16a34a" letterSpacing="0.03em">
            SECURE HARDWARE — the private key never crosses this line
          </text>
          <line x1="40" y1="430" x2="680" y2="430" stroke="#16a34a" strokeWidth="1.2" strokeDasharray="6 4" />

          <line x1="190" y1="408" x2="190" y2="448" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#hf-arrow)" />
          <line x1="530" y1="408" x2="530" y2="448" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#hf-arrow)" />

          <text x="20" y="478" fontSize="10" fontWeight="700" fill="#94a3b8" letterSpacing="0.08em">HSM</text>

          <rect x="60" y="450" width="260" height="54" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="190" y="473" textAnchor="middle" fontSize="13" fontWeight="700" fill="#14532d">Android Keystore</text>
          <text x="190" y="491" textAnchor="middle" fontSize="10" fill="#14532d">StrongBox / TEE</text>

          <rect x="400" y="450" width="260" height="54" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="530" y="473" textAnchor="middle" fontSize="13" fontWeight="700" fill="#14532d">iOS Secure Enclave</text>
          <text x="530" y="491" textAnchor="middle" fontSize="10" fill="#14532d">hardware key store</text>
        </svg>
      </div>
      <figcaption className="text-xs text-text-faint leading-relaxed p-4 border-t border-border">
        {caption}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Diagram 2 — attestation trust chain                                */
/* ------------------------------------------------------------------ */

function AttestationTrustDiagram() {
  const caption =
    "A key's hardware origin is vouched for by the device manufacturer, not by the library. The attestation — an Android Keystore X.509 chain or an Apple App Attest object — is verified on your backend against the genuine Google / Apple roots. The client-reported security level is only a hint; the trust verdict is always made server-side.";

  return (
    <figure className="glass-card rounded-xl overflow-hidden">
      <div className="bg-white p-6 overflow-x-auto">
        <svg
          viewBox="0 0 720 530"
          role="img"
          aria-labelledby="trust-title"
          className="w-full h-auto min-w-[520px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="trust-title">How a hardware key becomes server-trusted</title>

          <defs>
            <marker id="at-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>
          </defs>

          {/* step 1 */}
          <rect x="170" y="20" width="380" height="60" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="360" y="46" textAnchor="middle" fontSize="13" fontWeight="700" fill="#14532d">1 · Key born in secure hardware</text>
          <text x="360" y="66" textAnchor="middle" fontSize="11" fill="#14532d">non-exportable · bound to the server nonce</text>

          <line x1="360" y1="80" x2="360" y2="114" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#at-arrow)" />

          {/* step 2 */}
          <rect x="150" y="116" width="420" height="72" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
          <text x="360" y="142" textAnchor="middle" fontSize="13" fontWeight="700" fill="#312e81">2 · Manufacturer signs the proof</text>
          <text x="360" y="161" textAnchor="middle" fontSize="11" fill="#312e81">Android: Google Hardware Attestation Root (X.509 chain)</text>
          <text x="360" y="177" textAnchor="middle" fontSize="11" fill="#312e81">iOS: Apple App Attest Root</text>

          <line x1="360" y1="188" x2="360" y2="222" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#at-arrow)" />

          {/* step 3 */}
          <rect x="90" y="224" width="540" height="148" rx="6" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
          <text x="360" y="250" textAnchor="middle" fontSize="13" fontWeight="700" fill="#831843">3 · Your backend verifies the attestation</text>
          <text x="130" y="280" fontSize="11.5" fill="#831843">✓  chain terminates at the genuine manufacturer root</text>
          <text x="130" y="304" fontSize="11.5" fill="#831843">✓  nonce matches the challenge (anti-replay)</text>
          <text x="130" y="328" fontSize="11.5" fill="#831843">✓  security level is StrongBox, TEE or Secure Enclave</text>
          <text x="130" y="352" fontSize="11.5" fill="#831843">✓  attested public key equals the JWK you were sent</text>

          <line x1="360" y1="372" x2="360" y2="406" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#at-arrow)" />

          {/* step 4 */}
          <rect x="170" y="408" width="380" height="60" rx="6" fill="#cffafe" stroke="#06b6d4" strokeWidth="2" />
          <text x="360" y="434" textAnchor="middle" fontSize="13" fontWeight="700" fill="#164e63">4 · Trust decision</text>
          <text x="360" y="454" textAnchor="middle" fontSize="11" fill="#164e63">hardware-born key — bind it to the account</text>

          <text x="360" y="500" textAnchor="middle" fontSize="11" fontStyle="italic" fill="#475569">
            Trust anchor = the device manufacturer (Google / Apple), not the app or the OS.
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
/* Diagram 3 — end-to-end lifecycle (sequence)                        */
/* ------------------------------------------------------------------ */

function LifecycleSequenceDiagram() {
  const caption =
    "The full lifecycle. A server nonce is bound into the key at generation and echoed in the attestation, so the backend can prove freshness and tie the proof to one request. Once the public key is bound to the account, the same hardware key signs proofs-of-possession the server verifies against it.";

  return (
    <figure className="glass-card rounded-xl overflow-hidden">
      <div className="bg-white p-6 overflow-x-auto">
        <svg
          viewBox="0 0 760 520"
          role="img"
          aria-labelledby="seq-title"
          className="w-full h-auto min-w-[640px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="seq-title">End-to-end sequence: app, plugin/HSM and server</title>

          <defs>
            <marker id="sq-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>
          </defs>

          {/* lifeline headers */}
          <rect x="40" y="20" width="160" height="44" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="120" y="47" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e3a8a">Your app</text>

          <rect x="300" y="20" width="160" height="44" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <text x="380" y="40" textAnchor="middle" fontSize="12" fontWeight="700" fill="#14532d">Plugin + HSM</text>
          <text x="380" y="55" textAnchor="middle" fontSize="9" fill="#14532d">secure hardware</text>

          <rect x="560" y="20" width="160" height="44" rx="6" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
          <text x="640" y="47" textAnchor="middle" fontSize="13" fontWeight="700" fill="#831843">Your server</text>

          {/* lifelines */}
          <line x1="120" y1="64" x2="120" y2="502" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="380" y1="64" x2="380" y2="502" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="640" y1="64" x2="640" y2="502" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />

          {/* 1: server -> app nonce */}
          <text x="380" y="92" textAnchor="middle" fontSize="11" fill="#334155">① challenge (server nonce)</text>
          <line x1="640" y1="100" x2="126" y2="100" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#sq-arrow)" />

          {/* 2: app -> plugin generateKey */}
          <text x="250" y="132" textAnchor="middle" fontSize="11" fill="#334155">② generateKey(alias, nonce)</text>
          <line x1="120" y1="140" x2="374" y2="140" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#sq-arrow)" />
          <rect x="318" y="150" width="124" height="28" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
          <text x="380" y="168" textAnchor="middle" fontSize="9.5" fill="#14532d">mints non-exportable key</text>

          {/* 3: app -> plugin attest */}
          <text x="250" y="206" textAnchor="middle" fontSize="11" fill="#334155">③ attest(nonce)</text>
          <line x1="120" y1="214" x2="374" y2="214" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#sq-arrow)" />
          <rect x="318" y="224" width="124" height="28" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
          <text x="380" y="242" textAnchor="middle" fontSize="9.5" fill="#14532d">manufacturer-signed proof</text>

          {/* 4: app -> server jwk + attestation */}
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="#334155">④ public JWK + attestation</text>
          <line x1="120" y1="288" x2="634" y2="288" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#sq-arrow)" />
          <rect x="556" y="298" width="168" height="28" rx="4" fill="#fce7f3" stroke="#ec4899" strokeWidth="1" />
          <text x="640" y="316" textAnchor="middle" fontSize="9.5" fill="#831843">verify vs root → bind key</text>

          {/* later divider */}
          <line x1="40" y1="352" x2="720" y2="352" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 5" />
          <text x="40" y="347" fontSize="10" fontWeight="700" fill="#94a3b8" letterSpacing="0.08em">LATER — proof of possession</text>

          {/* 5: app -> plugin sign */}
          <text x="250" y="382" textAnchor="middle" fontSize="11" fill="#334155">⑤ sign(payload) · biometric</text>
          <line x1="120" y1="390" x2="374" y2="390" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#sq-arrow)" />
          <rect x="318" y="400" width="124" height="28" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
          <text x="380" y="418" textAnchor="middle" fontSize="9.5" fill="#14532d">HSM signs → raw R‖S</text>

          {/* 6: app -> server jws */}
          <text x="380" y="456" textAnchor="middle" fontSize="11" fill="#334155">⑥ signed proof-of-possession (JWS)</text>
          <line x1="120" y1="464" x2="634" y2="464" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#sq-arrow)" />
          <rect x="556" y="474" width="168" height="28" rx="4" fill="#fce7f3" stroke="#ec4899" strokeWidth="1" />
          <text x="640" y="492" textAnchor="middle" fontSize="9.5" fill="#831843">verify signature with bound key</text>
        </svg>
      </div>
      <figcaption className="text-xs text-text-faint leading-relaxed p-4 border-t border-border">
        {caption}
      </figcaption>
    </figure>
  );
}
