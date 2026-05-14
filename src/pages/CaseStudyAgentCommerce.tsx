import { useEffect, useState } from 'react'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'

export function CaseStudyAgentCommerce() {
  useEffect(() => {
    window.scrollTo(0, 0)

    const url = 'https://exilonx.github.io/case-study/agent-commerce'
    const title = 'Agent Commerce on AP2 — Case Study · Ionel Merca'
    const description =
      'Production-grade AP2 implementation for agent-mediated payments — cryptographically signed mandates (Ed25519 / JCS / did:web), three-party trust chain, RAG-powered shopping assistant. Showcased on VTEX; backend-agnostic by design.'

    const previousTitle = document.title
    const descMeta = document.querySelector('meta[name="description"]')
    const previousDesc = descMeta?.getAttribute('content') ?? ''

    document.title = title
    descMeta?.setAttribute('content', description)

    const canonical = document.createElement('link')
    canonical.id = 'case-study-canonical'
    canonical.setAttribute('rel', 'canonical')
    canonical.setAttribute('href', url)
    document.head.appendChild(canonical)

    const schema = document.createElement('script')
    schema.id = 'case-study-schema'
    schema.type = 'application/ld+json'
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline:
        'Agent Commerce on AP2 — verifiable signed mandates for AI shopping',
      alternativeHeadline:
        'Production AP2 v0.2 implementation with three-party trust chain, RAG-backed shopping assistant, and live demo on VTEX',
      description,
      author: {
        '@type': 'Person',
        name: 'Ionel Merca',
        url: 'https://exilonx.github.io/',
      },
      publisher: {
        '@type': 'Person',
        name: 'Ionel Merca',
        url: 'https://exilonx.github.io/',
      },
      datePublished: '2026-05-14',
      dateModified: '2026-05-15',
      mainEntityOfPage: url,
      inLanguage: 'en',
      keywords: [
        'AP2',
        'Agent Payments Protocol',
        'agent commerce',
        'verifiable credentials',
        'Ed25519',
        'did:web',
        'JCS canonicalization',
        'VTEX',
        'Pinecone RAG',
        'Claude Desktop MCP',
        'Stripe payment mandate',
        'headless commerce',
      ],
      codeRepository: 'https://github.com/exilonX/ap2',
      license: 'https://www.apache.org/licenses/LICENSE-2.0',
    })
    document.head.appendChild(schema)

    return () => {
      document.title = previousTitle
      if (descMeta) descMeta.setAttribute('content', previousDesc)
      document.getElementById('case-study-canonical')?.remove()
      document.getElementById('case-study-schema')?.remove()
    }
  }, [])

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
            style={{ background: '#10b981' }}
          />
          <div className="absolute inset-0 dot-grid opacity-40" />

          <div className="relative z-10 p-8 md:p-12">
            <div className="section-label">Case Study &middot; 2026</div>
            <h1 className="text-3xl md:text-5xl font-bold text-text mb-4 leading-tight">
              Agent Commerce on AP2
            </h1>
            <p className="text-lg text-text-muted leading-relaxed max-w-2xl mb-8">
              Production-grade implementation of Google&rsquo;s Agent Payments
              Protocol &mdash; cryptographically signed mandates for AI-mediated
              shopping, with a three-party trust chain anyone can verify.
              Showcased on VTEX. Backend-agnostic by design.
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <HeroStat label="Mandates" value="3 types" />
              <HeroStat label="Signing parties" value="3 DIDs" />
              <HeroStat label="Spec compliance" value="AP2 v0.2" />
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <Meta
            label="Project"
            value="Cryptographically signed payments for AI-agent checkouts. AP2 v0.2, end-to-end on a live store."
          />
          <Meta
            label="Problem"
            value="When an agent buys, nothing today proves the human consented."
          />
          <Meta
            label="Code"
            value='Apache 2.0 at <a href="https://github.com/exilonX/ap2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">github.com/exilonX/ap2</a> &middot; <a href="#contact-cta" class="text-primary hover:underline">book a call</a> to deploy on your store.'
          />
        </div>

        <VideoPlaceholder />

        {/* ── The brief ─────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">The brief</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            AI agents are increasingly shopping on behalf of users &mdash;
            picking items, filling carts, completing checkouts. Sometimes a
            human is in the loop (chatting in real time) or other times the
            agent acts autonomously on pre-delegated authority (&ldquo;buy these
            shoes when they drop below 80 RON&rdquo;). Either way, the existing
            payment rails have a hole the size of the agent: no party can prove
            who actually authorized the transaction.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            The merchant doesn&rsquo;t see the user &mdash; only the agent that
            pretended to be the user. The bank doesn&rsquo;t see the agent
            &mdash; only the merchant&rsquo;s checkout request. The user gets a
            charge on their statement with no cryptographic proof they (or their
            authorized agent) actually consented to it. Disputes today reduce to
            &ldquo;merchant logs say yes, user says no.&rdquo; That&rsquo;s the
            trust gap.
          </p>
          <p className="text-text-muted leading-relaxed">
            Google&rsquo;s <strong>Agent Payments Protocol (AP2)</strong>,
            released in 2025, addresses this with verifiable digital credentials
            called <em>mandates</em>. Each party in the payment ceremony signs
            what&rsquo;s in their jurisdiction; anyone can later verify the
            chain against the signing parties&rsquo; published public keys. This
            project is a production-grade AP2 v0.2 implementation: real Ed25519
            signatures, real <code className="code-inline">did:web</code>{' '}
            identities, real JSON canonicalization (RFC 8785), three-party trust
            chain. Showcased on a live VTEX storefront in Romanian, with the
            cryptographic engine generic enough to plug into any commerce
            backend.
          </p>
        </section>

        {/* ── The two modes ─────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">
            Two modes, same trust shape
          </h2>
          <p className="text-text-muted leading-relaxed mb-4">
            AP2 distinguishes two scenarios by where the human sits relative to
            the transaction:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="glass-card rounded-xl p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                Human present
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                The user is actively chatting with the agent in real time,
                reviewing each step, clicking Pay Now. The user&rsquo;s consent
                is captured at transaction time via the{' '}
                <strong>CartMandate</strong>.{' '}
                <strong>This is what the live demo shows.</strong>
              </p>
            </div>
            <div className="glass-card rounded-xl p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                Human not present
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                The user pre-delegates authority to the agent &mdash;{' '}
                <em>
                  &ldquo;buy these sneakers if they drop below 80 RON in the
                  next 30 days.&rdquo;
                </em>{' '}
                The agent acts later, possibly weeks after. Captured via an{' '}
                <strong>IntentMandate</strong>. Spec-supported; tracked as
                next-phase work in this implementation.
              </p>
            </div>
          </div>
          <p className="text-text-muted leading-relaxed">
            Same cryptographic shape: signed mandate, published DID, third-party
            verifiable. Different lifecycle on the consent capture. The
            architecture below covers both modes; the live demo exercises the
            human-present path end-to-end.
          </p>
        </section>

        {/* ── AP2 in the wild ─────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">
            AP2 in the wild
          </h2>
          <p className="text-text-muted leading-relaxed mb-4">
            AP2 launched in September 2025 with 60+ founding partner
            organizations and was donated to the FIDO Alliance shortly after
            &mdash; the roster grew past 100 organizations by late October 2025.
            The protocol is no longer a Google-only effort; it&rsquo;s a
            multi-vendor standard with active production pilots and an explicit
            push to interoperate with parallel agentic-payment schemes.
          </p>

          <h3 className="text-lg font-semibold text-text mb-3 mt-6">
            Founding partner ecosystem
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              'PayPal',
              'Mastercard',
              'American Express',
              'Adyen',
              'Coinbase',
              'Worldpay',
              'Salesforce',
              'ServiceNow',
              'JCB',
              'UnionPay International',
              'Etsy',
              'Revolut',
              'Forter',
              'Intuit',
              'Ant International',
              'Mysten Labs',
              'MetaMask',
              'Cloudflare',
            ].map((name) => (
              <span key={name} className="skill-badge">
                {name}
              </span>
            ))}
          </div>
          <p className="text-text-muted leading-relaxed">
            Selected from the public AP2 partner list. The mix matters: card
            networks (Mastercard, AmEx, JCB, UnionPay), PSPs (Adyen, Worldpay),
            wallets and credentials providers (PayPal, Coinbase, Revolut,
            MetaMask), platforms (Salesforce, ServiceNow, Etsy), and
            infrastructure (Cloudflare for Web Bot Auth, Forter for risk).
          </p>

          <h3 className="text-lg font-semibold text-text mb-3 mt-8">
            Notable production rollouts
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-2">
            <div className="glass-card rounded-xl p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                PayPal &times; Google Cloud &middot; Oct 2025
              </div>
              <p className="text-sm text-text-muted leading-relaxed mb-3">
                <strong>Conversational Commerce Agent</strong> for merchants
                &mdash; out-of-box agentic shopping wired through AP2 + A2A.
                PayPal acts as the Credentials Provider; Google Cloud hosts the
                merchant-side agent surface. Currently the most production-wired
                AP2 deployment publicly visible.
              </p>
              <a
                href="https://cloud.google.com/blog/topics/financial-services/introducing-an-agentic-commerce-solution-for-merchants-from-paypal-and-google-cloud"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline"
              >
                Read the announcement &rarr;
              </a>
            </div>
            <div className="glass-card rounded-xl p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                Mastercard Agent Pay &middot; Oct 2025
              </div>
              <p className="text-sm text-text-muted leading-relaxed mb-3">
                <strong>Agent Pay Merchant Acceptance Framework</strong> +{' '}
                <strong>Verifiable Intent</strong>. Trusted agent recognition,
                agentic tokens, purchase-intent payloads. Mastercard explicitly
                markets it as &ldquo;protocol-agnostic&rdquo; and aligned with
                both AP2 and Google&rsquo;s UCP. Underpinned by Cloudflare Web
                Bot Auth for agent identity at scale.
              </p>
              <a
                href="https://www.mastercard.com/us/en/business/artificial-intelligence/mastercard-agent-pay.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline"
              >
                Mastercard Agent Pay &rarr;
              </a>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-text mb-3 mt-8">
            Where AP2 sits in the protocol stack
          </h3>
          <p className="text-text-muted leading-relaxed mb-4">
            AP2 is the <em>trust layer</em>. Several parallel protocols compose
            with it or sit adjacent to it. The 2026 picture is closer to a stack
            than a winner-take-all war:
          </p>
          <div className="space-y-3">
            <div className="glass-card rounded-xl p-4">
              <div className="text-sm font-semibold text-text mb-1">
                UCP &mdash; Universal Commerce Protocol &middot; Google &times;
                Shopify &middot; Jan 2026
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                Defines the request/response shape of the agentic checkout
                session. <strong>UCP composes with AP2</strong> &mdash; UCP
                carries the session, AP2 supplies the cryptographic mandate.
                Co-developed with Shopify, Etsy, Wayfair, Target, Walmart;
                endorsed by Adyen, AmEx, Stripe, Visa, Mastercard, Home Depot,
                Best Buy, Zalando, Flipkart.
              </p>
            </div>
            <div className="glass-card rounded-xl p-4">
              <div className="text-sm font-semibold text-text mb-1">
                A2A &mdash; Agent2Agent Protocol
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                Transport layer for agent-to-agent communication. AP2 is layered
                above A2A: A2A moves the messages, AP2 signs the consent inside
                them.
              </p>
            </div>
            <div className="glass-card rounded-xl p-4">
              <div className="text-sm font-semibold text-text mb-1">
                MCP &mdash; Model Context Protocol &middot; Anthropic
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                Local tool-call protocol for LLM clients like Claude Desktop.
                This implementation uses MCP for the developer-facing Claude
                Desktop surface; the AP2 ceremony runs server-side identically
                across surfaces.
              </p>
            </div>
            <div className="glass-card rounded-xl p-4">
              <div className="text-sm font-semibold text-text mb-1">
                ACP &mdash; Agentic Commerce Protocol &middot; Stripe &times;
                OpenAI
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                Competing checkout standard from the Stripe + OpenAI camp.
                Different shape than UCP; not directly interoperable with AP2
                yet, though Mastercard and other actors are explicitly pushing
                protocol-agnostic frameworks to bridge them.
              </p>
            </div>
            <div className="glass-card rounded-xl p-4">
              <div className="text-sm font-semibold text-text mb-1">
                x402 &mdash; HTTP 402 Payment Required &middot; Coinbase
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                Crypto-rail-first agent payments using the long-dormant HTTP 402
                status code. Integrated into AWS Bedrock AgentCore Payments
                alongside Stripe (May 2026). Different rails (on-chain) but
                conceptually adjacent.
              </p>
            </div>
          </div>

          <p className="text-text-muted leading-relaxed mt-6">
            This implementation targets <strong>AP2 v0.2 directly</strong>. The
            architectural seam (separate{' '}
            <code className="code-inline">@acg/core</code> engine + backend
            adapters + mock CP/Network classes) is designed to slot under
            UCP&rsquo;s checkout-session shape when UCP stabilises in
            production, and to swap in real PayPal / Stripe / Adyen / Visa /
            Mastercard endpoints as their AP2 surfaces reach general
            availability.
          </p>
        </section>

        {/* ── How signatures work ──────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">
            How the signatures work
          </h2>
          <p className="text-text-muted leading-relaxed mb-4">
            The cryptographic primitive throughout is <strong>Ed25519</strong>{' '}
            &mdash; an EdDSA elliptic-curve signature scheme. Keypairs are
            generated per party (merchant, Credentials Provider, Payment
            Network), with the public key published as a{' '}
            <code className="code-inline">did:web</code> document at a
            well-known URL. The DID document is the trust anchor: anyone with
            the URL can fetch the public key and verify any signature attributed
            to that party.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            Mandate contents are canonicalized via{' '}
            <strong>RFC 8785 (JSON Canonicalization Scheme)</strong> before
            signing. JCS produces a byte-exact deterministic JSON representation
            regardless of field order or whitespace, so the same mandate object
            hashes identically across implementations &mdash; including ones
            written in different languages. The SHA-256 of the canonical bytes
            is included in the signature payload; tampering with any field
            invalidates the hash.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            Each artifact is then issued as a JWT signed with the issuing
            party&rsquo;s Ed25519 key (algorithm{' '}
            <code className="code-inline">EdDSA</code>), with the canonicalized
            hash in the payload as the binding claim. Verification reads the{' '}
            <code className="code-inline">iss</code> field, resolves the DID
            document, fetches the public key, and verifies the JWT signature
            plus the hash match.
          </p>

          <CryptoFlowDiagram />
        </section>

        {/* ── Three-actor model + architecture ─────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">
            The three-actor model
          </h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Three parties sign three different artifacts. Each only signs
            what&rsquo;s in its own jurisdiction; none can lie without the
            others noticing.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <ActorCard
              role="Merchant"
              did="did:web:&lt;store-host&gt;"
              prod="The store itself (e.g. VTEX, Shopify, BigCommerce)"
              signs="CartMandate"
              attests="&ldquo;I commit to selling exactly these items at this price for the next 5 minutes.&rdquo;"
              color="#10b981"
            />
            <ActorCard
              role="Credentials Provider"
              did="did:web:&lt;cp-host&gt;"
              prod="Stripe · Adyen · PayPal · Google Pay"
              signs="PaymentMandate"
              attests="&ldquo;The user authorized this payment from this funding source. Cart hash and payment hash are bound together.&rdquo;"
              color="#3b82f6"
            />
            <ActorCard
              role="Payment Network"
              did="did:web:&lt;network-host&gt;"
              prod="Visa · Mastercard"
              signs="PaymentReceipt"
              attests="&ldquo;I independently verified seven properties and approved (or rejected) this chain.&rdquo;"
              color="#8b5cf6"
            />
          </div>
          <p className="text-text-muted leading-relaxed">
            In this implementation, the Credentials Provider and Payment Network
            are mock classes designed for one-class swap-in to real providers.
            Each mock has its own keypair, its own{' '}
            <code className="code-inline">did:web</code> URL, its own
            VBase-backed persistence. Cryptographic separation is real even
            though both currently live in the same VTEX IO process. Production
            swap-in: replace{' '}
            <code className="code-inline">MockCredentialsProvider</code> with a
            Stripe / Adyen / PayPal adapter, replace{' '}
            <code className="code-inline">MockPaymentNetwork</code> with a Visa
            adapter &mdash; the orchestration code doesn&rsquo;t change.
          </p>

          <div className="mt-8">
            <ThreePartyDiagram />
          </div>
        </section>

        {/* ── End-to-end sequence flow ─────────────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">
            End-to-end flow
          </h2>
          <p className="text-text-muted leading-relaxed mb-4">
            From user intent to signed receipt, the full ceremony traverses each
            party in order. Drift detection re-checks cart consistency between
            sign-time and pay-time so a user who tampers with the cart after
            signing gets a 200-with-rejection rather than a silent overcharge.
          </p>
          <SequenceDiagram />
        </section>

        {/* ── Shopping assistant ───────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">
            The shopping assistant
          </h2>
          <p className="text-text-muted leading-relaxed mb-4">
            AP2 specifies the trust layer, but it says nothing about how the
            agent actually picks products or navigates the catalog. That part is
            the &ldquo;Shopping Agent&rdquo; role &mdash; a layer above the
            protocol. This implementation ships two interchangeable surfaces:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="glass-card rounded-xl p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                Claude Desktop (MCP)
              </div>
              <p className="text-sm text-text-muted leading-relaxed mb-2">
                A Model Context Protocol server runs locally, proxying tool
                calls (<code className="code-inline">browseProducts</code>,{' '}
                <code className="code-inline">addToCart</code>,{' '}
                <code className="code-inline">checkout</code>,{' '}
                <code className="code-inline">executePayment</code>) to the
                backend. The chat happens in Anthropic&rsquo;s desktop app; tool
                results render as interactive iframes inside the conversation.
              </p>
              <p className="text-sm text-text-muted leading-relaxed">
                Authentication is server-to-server via a shared secret (
                <code className="code-inline">X-ACG-Auth-Token</code> header)
                since stdio MCP transport has no Origin header.
              </p>
            </div>
            <div className="glass-card rounded-xl p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                Storefront widget
              </div>
              <p className="text-sm text-text-muted leading-relaxed mb-2">
                A React pixel app embedded directly on the store. The chat
                handler runs server-side with a configurable LLM (Claude,
                OpenAI, Gemini) and an explicit tool catalogue. Same underlying
                backend &mdash; the widget shares the orderForm cookie so cart
                state is identical to native checkout.
              </p>
              <p className="text-sm text-text-muted leading-relaxed">
                Same cart, same mandate machinery, same artifact links.
                Different UI; identical trust chain.
              </p>
            </div>
          </div>
          <p className="text-text-muted leading-relaxed">
            Both surfaces speak to the same set of HTTP routes. Tomorrow&rsquo;s
            ChatGPT / UCP / autonomous-agent integrations slot in the same way
            &mdash; the backend doesn&rsquo;t care what&rsquo;s upstream as long
            as the agent identifies itself.
          </p>
        </section>

        {/* ── RAG ──────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">
            RAG &mdash; product discovery
          </h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Keyword search on a fashion catalogue does not survive contact with
            a real shopper. A query like{' '}
            <em>&ldquo;pantaloni lungi inchisi la culoare&rdquo;</em> (Romanian:
            &ldquo;long pants in dark colors&rdquo;) returns nothing useful when
            the catalog tags are <em>&ldquo;Slim Fit Chinos&rdquo;</em> and{' '}
            <em>&ldquo;Cargo Pants Dark Wash.&rdquo;</em> Semantic search is
            non-negotiable for this category.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            The implementation uses a two-stage RAG pipeline. The bulk-sync
            stage runs as a standalone script (not inside the VTEX IO
            request-response cycle &mdash; the 30-second platform timeout makes
            bulk indexing impossible inside the adapter): pulls products from
            the VTEX catalog API, embeds the title + description + category
            breadcrumb with OpenAI{' '}
            <code className="code-inline">text-embedding-3-small</code>, upserts
            to Pinecone with per-product metadata. Resume-safe via on-disk
            state, error-queue for retries.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            At query time, the chat handler embeds the user&rsquo;s query,
            queries Pinecone for top-K matches, hydrates the matched product IDs
            against the live VTEX catalog (so prices and availability are
            current, not from the indexing time), and returns the result set to
            the LLM&rsquo;s tool call. Total latency: ~200ms end-to-end.
          </p>

          <RagDiagram />

          <p className="text-text-muted leading-relaxed mt-6">
            Without this, every other beat in the demo breaks. The agent
            literally cannot show the user what they asked for. The
            signed-mandate ceremony has nothing to commit to. The case
            study&rsquo;s core narrative &mdash;{' '}
            <em>the agent went and got what you wanted</em> &mdash; depends
            entirely on the retrieval being good enough that the cards on screen
            match the intent.
          </p>
        </section>

        {/* ── Mandate artifacts (collapsible JSON) ─────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">
            Mandate artifacts
          </h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Three artifacts are signed and persisted, each independently
            retrievable by id. Click to expand each example.
          </p>

          <div className="space-y-3">
            <Collapsible
              title="CartMandate"
              subtitle="Signed by Merchant · commits the cart contents + price + expiry"
            >
              <JsonBlock
                json={`{
  "contents": {
    "id": "mandate-f6a18604a5ee0a45",
    "merchant_name": "did:web:acg--miniprix.myvtex.com",
    "user_cart_confirmation_required": false,
    "cart_expiry": "2026-05-08T15:35:18Z",
    "payment_items": [
      { "sku": "589335", "name": "Cămașă Bărbați 25SMA03006 — Negru, M",
        "quantity": 1, "unit_price": 58.09, "total_price": 58.09 },
      { "sku": "591668", "name": "Șosete bărbați model simplu — Univ",
        "quantity": 1, "unit_price": 12.00, "total_price": 12.00 }
    ],
    "total": { "currency": "RON", "value": "70.09" }
  },
  "merchant_authorization": "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJk..."
}`}
              />
            </Collapsible>

            <Collapsible
              title="PaymentMandate"
              subtitle="Signed by Credentials Provider · binds cart hash + payment hash · carries human-presence flag"
            >
              <JsonBlock
                json={`{
  "payment_mandate_contents": {
    "payment_mandate_id": "pm-e5f2b1dc4de6beb3",
    "payment_details_id": "mandate-f6a18604a5ee0a45",
    "payment_details_total": {
      "label": "Total",
      "amount": { "currency": "RON", "value": 70.09 },
      "refund_period": 30
    },
    "payment_response": {
      "request_id": "mandate-f6a18604a5ee0a45",
      "method_name": "MOCK_CARD",
      "details": { "token": "tok-mock-1778179000" }
    },
    "merchant_agent": "did:web:acg--miniprix.myvtex.com",
    "timestamp": "2026-05-08T15:36:49Z",
    "x_agent_presence": {
      "agent_involved": true,
      "human_present": true
    }
  },
  "user_authorization": "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpc3M..."
}`}
              />
            </Collapsible>

            <Collapsible
              title="PaymentReceipt (approved)"
              subtitle="Signed by Payment Network · 7 verification checks · independently verifiable"
            >
              <JsonBlock
                json={`{
  "contents": {
    "receipt_id": "rcpt-8ed2733e7f32e380",
    "payment_mandate_id": "pm-e5f2b1dc4de6beb3",
    "cart_mandate_id": "mandate-f6a18604a5ee0a45",
    "network_did": "did:web:acg--miniprix.myvtex.com:mock-network",
    "merchant_did": "did:web:acg--miniprix.myvtex.com",
    "cp_did": "did:web:acg--miniprix.myvtex.com:mock-cp",
    "amount": { "currency": "RON", "value": 70.09 },
    "agent_presence": { "agent_involved": true, "human_present": true },
    "verification_checks": {
      "merchant_signature": true,
      "cp_signature": true,
      "hash_binding": true,
      "amount_consistency": true,
      "mandate_id_linking": true,
      "payment_mandate_not_expired": true,
      "cart_mandate_not_expired": true
    },
    "approval_status": "approved",
    "approved_at": "2026-05-08T15:36:49Z"
  },
  "network_authorization": "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9..."
}`}
              />
            </Collapsible>

            <Collapsible
              title="PaymentReceipt (rejected) — the always-emit invariant"
              subtitle="Cryptographically valid receipt that records a rejection. This is the AP2 punchline."
            >
              <JsonBlock
                json={`{
  "contents": {
    "receipt_id": "rcpt-deadbeef00000001",
    "verification_checks": {
      "merchant_signature": true,
      "cp_signature": true,
      "hash_binding": true,
      "amount_consistency": true,
      "mandate_id_linking": true,
      "payment_mandate_not_expired": false,    // ← failing check
      "cart_mandate_not_expired": true
    },
    "approval_status": "rejected",
    "rejection_reason": "payment mandate has expired"
  },
  "network_authorization": "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9..."
}`}
              />
            </Collapsible>

            <Collapsible
              title="DID document (one of three)"
              subtitle="did:web — published at /.well-known/did.json — the public trust anchor"
            >
              <JsonBlock
                json={`{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/ed25519-2020/v1"
  ],
  "id": "did:web:acg--miniprix.myvtex.com",
  "verificationMethod": [{
    "id": "did:web:acg--miniprix.myvtex.com#key-1",
    "type": "Ed25519VerificationKey2020",
    "controller": "did:web:acg--miniprix.myvtex.com",
    "publicKeyHex": "302a300506032b657003210041849a215c1de669..."
  }],
  "authentication":   ["did:web:acg--miniprix.myvtex.com#key-1"],
  "assertionMethod":  ["did:web:acg--miniprix.myvtex.com#key-1"]
}`}
              />
            </Collapsible>
          </div>
        </section>

        {/* ── Always-emit invariant ────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">
            The always-emit invariant
          </h2>
          <p className="text-text-muted leading-relaxed mb-4">
            A property of AP2 in production you don&rsquo;t see discussed
            enough:{' '}
            <strong>
              the Network signs every decision, including rejections.
            </strong>{' '}
            Today, when a payment fails &mdash; insufficient funds, 3DS step-up
            failure, fraud flag &mdash; the merchant gets back a string in the
            ISO 8583 response (or a JSON field from the acquirer): &ldquo;51 -
            INSUFFICIENT FUNDS&rdquo;. The merchant has no cryptographic proof
            the issuer actually said that.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            With AP2, a rejection is itself a signed artifact: a PaymentReceipt
            where{' '}
            <code className="code-inline">
              approval_status: &quot;rejected&quot;
            </code>
            , one or more{' '}
            <code className="code-inline">verification_checks</code> is{' '}
            <code className="code-inline">false</code>, and the entire receipt
            is signed by the Network&rsquo;s key. The receipt is{' '}
            <em>cryptographically valid</em> (verifies against the
            network&rsquo;s published DID) even though it records a failed
            payment. Anyone &mdash; merchant, cardholder, auditor, regulator
            &mdash; can independently verify the issuer reached this conclusion.
          </p>
          <p className="text-text-muted leading-relaxed">
            That&rsquo;s the gap AP2 closes that today&rsquo;s rails leave open.{' '}
            <em>&ldquo;Merchant says the bank declined&rdquo;</em> becomes{' '}
            <em>
              &ldquo;here is the bank&rsquo;s signed evidence that they
              declined, with their key, available at their published URL.&rdquo;
            </em>{' '}
            The case study&rsquo;s strongest payoff is showing this: a JSON view
            where <code className="code-inline">approval_status: rejected</code>{' '}
            sits next to{' '}
            <code className="code-inline">verification.valid: true</code> at the
            top level, both true at once.
          </p>
        </section>

        {/* ── Adaptability ─────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">
            Backend-agnostic by design
          </h2>
          <p className="text-text-muted leading-relaxed mb-4">
            VTEX is the showcase, but the architecture deliberately separates
            the AP2 protocol engine from the commerce backend. The cryptographic
            primitives, mandate types, signing flows, and verification checks
            live in a platform-neutral package (
            <code className="code-inline">@acg/core</code>) with no VTEX
            dependencies. Adapter packages bridge the engine to a specific
            backend.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            To support a different store backend &mdash; Shopify, BigCommerce,
            Magento, or a custom headless setup &mdash; you implement three
            small interfaces:
          </p>
          <ul className="text-text-muted leading-relaxed mb-4 list-disc list-inside space-y-2 ml-2">
            <li>
              <strong>
                <code className="code-inline">CartProvider</code>
              </strong>{' '}
              &mdash; <em>get_cart</em>, <em>add_item</em>, <em>remove_item</em>
              , <em>update_quantity</em>. Returns a normalized cart shape; the
              engine never sees the backend&rsquo;s native order representation.
            </li>
            <li>
              <strong>
                <code className="code-inline">CatalogProvider</code>
              </strong>{' '}
              &mdash; <em>search</em>, <em>get_by_sku</em>. Backend-specific;
              the engine sees only the normalized product shape.
            </li>
            <li>
              <strong>
                <code className="code-inline">KeyStore</code>
              </strong>{' '}
              &mdash; <em>get</em>, <em>set</em>. Where the merchant&rsquo;s
              Ed25519 keypair lives. VBase for VTEX, AWS KMS / Vault / Postgres
              for other backends. The engine never sees raw key bytes.
            </li>
          </ul>
          <p className="text-text-muted leading-relaxed">
            The frontend is similarly pluggable. A React pixel app for VTEX, a
            Liquid theme component for Shopify, a Hydrogen / Next.js component
            for headless &mdash; all hit the same backend HTTP routes. The
            mandate badge, the checkout iframe, the artifact viewer are React
            components with a flat prop interface; embedding them in a different
            frontend stack is mechanical.
          </p>
          <BackendAdapterDiagram />
        </section>

        {/* ── VTEX PPP integration ────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">
            Production path: VTEX Payment Provider Protocol
          </h2>
          <p className="text-text-muted leading-relaxed mb-4">
            The live demo runs the AP2 ceremony in parallel to VTEX&rsquo;s
            native checkout &mdash; a deliberate scoping choice that keeps the
            demo demonstrable without modifying the merchant&rsquo;s payment
            configuration. For real merchant deployment, the AP2 chain belongs{' '}
            <em>inside</em> VTEX&rsquo;s{' '}
            <strong>Payment Provider Protocol (PPP)</strong> as a custom payment
            provider. This section sketches that integration.
          </p>

          <h3 className="text-lg font-semibold text-text mb-3 mt-6">
            Why a Payment Provider plugin, not a side-channel
          </h3>
          <p className="text-text-muted leading-relaxed mb-4">
            VTEX&rsquo;s checkout already orchestrates payment authorization,
            capture, refund, and cancellation through a documented protocol.
            Building a custom Payment Provider whose{' '}
            <code className="code-inline">authorize</code> path runs the AP2
            ceremony means the merchant&rsquo;s downstream systems treat the
            mandate chain as a normal payment record, not a parallel artifact:
          </p>
          <ul className="text-text-muted leading-relaxed mb-4 list-disc list-inside space-y-2 ml-2">
            <li>
              OMS, dispute tooling, and analytics see one payment record per
              order &mdash; the AP2 chain becomes evidence attached to that
              record, not a separate audit trail.
            </li>
            <li>
              Refunds, cancellations, and 3DS step-up come for free from the
              underlying PSP (Stripe, Adyen, PayPal) &mdash; the AP2 layer wraps
              trust around them, doesn&rsquo;t reinvent them.
            </li>
            <li>
              The merchant can toggle AP2-vs-classic per condition (high-value,
              agent-detected origin, B2B vs B2C) by simply enabling the payment
              method per condition in the VTEX admin.
            </li>
            <li>
              The customer experience stays canonical &mdash; same Pay Now
              button, same confirmation screen, same email receipts. Just with a
              cryptographic trail behind the scenes.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-text mb-3 mt-6">
            Endpoint split
          </h3>
          <p className="text-text-muted leading-relaxed mb-4">
            PPP requires nine endpoints from the payment provider. Only three of
            them need AP2 awareness; the rest pass through to the configured PSP
            as today:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-2">
            <div className="glass-card rounded-xl p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald mb-2">
                AP2-aware endpoints
              </div>
              <ul className="text-sm text-text-muted leading-relaxed space-y-2 list-disc list-inside">
                <li>
                  <strong>Create Payment</strong> &mdash; receives the
                  orderForm; reads{' '}
                  <code className="code-inline">
                    customData.ap2.cartMandateId
                  </code>
                  ; resolves the merchant&rsquo;s CartMandate from VBase; calls
                  the configured CP for the PaymentMandate and the Network for
                  the PaymentReceipt; returns the signed chain as the
                  authorization payload.
                </li>
                <li>
                  <strong>Cancel</strong> &mdash; on cancellation, the merchant
                  signs a counter-mandate and persists it next to the original
                  chain. Audit-ready, signed, reversible.
                </li>
                <li>
                  <strong>Refund</strong> &mdash; same pattern: a signed refund
                  mandate carries the proof that the merchant authorized the
                  refund.
                </li>
              </ul>
            </div>
            <div className="glass-card rounded-xl p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                Pass-through endpoints
              </div>
              <ul className="text-sm text-text-muted leading-relaxed space-y-2 list-disc list-inside">
                <li>
                  <strong>
                    Manifest, Capture, Inbound Request, Create Auth Token,
                    Provider Auth Redirect, Get Credentials
                  </strong>
                </li>
                <li className="list-none ml-0 mt-2 text-text-faint">
                  Standard PPP-shaped responses, no AP2 awareness needed. These
                  delegate to whichever PSP actually moves the money.
                  Implementation cost: standard VTEX payment-provider
                  scaffolding.
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-text mb-3 mt-8">
            Flow walkthrough
          </h3>
          <p className="text-text-muted leading-relaxed mb-4">
            From the customer&rsquo;s perspective, nothing changes. They click
            Pay Now in the VTEX checkout, see the standard confirmation screen,
            receive the standard email. Behind the scenes:
          </p>
          <ol className="text-text-muted leading-relaxed mb-4 list-decimal list-inside space-y-2 ml-2">
            <li>
              The agent surface (storefront widget / Claude Desktop / ChatGPT
              via UCP) signs the CartMandate server-side and writes the mandate
              id into{' '}
              <code className="code-inline">
                orderForm.customData.ap2.cartMandateId
              </code>{' '}
              via the VTEX Checkout API.
            </li>
            <li>
              Customer clicks Pay Now in VTEX checkout. VTEX&rsquo;s payment
              orchestrator calls the merchant&rsquo;s registered Payment
              Provider with the orderForm payload, exactly as it would call any
              other payment method.
            </li>
            <li>
              The custom PPP implementation reads the cart mandate id, fetches
              the chain, runs the seven verification checks, then forwards to
              the underlying PSP for actual settlement.
            </li>
            <li>
              PSP returns authorization. The PPP signs the PaymentReceipt with
              the configured Network DID, persists the full three-artifact chain
              to VBase, and returns success to VTEX.
            </li>
            <li>
              VTEX shows the standard order confirmation. The customer sees a
              normal receipt; the merchant&rsquo;s admin shows a normal payment
              record; the cryptographic trail is signed and retrievable via the
              AP2 verification endpoints.
            </li>
          </ol>

          <VtexPaymentProviderDiagram />

          <p className="text-text-muted leading-relaxed mt-6">
            <strong>Headless storefronts work identically.</strong> FastStore,
            Hydrogen, Next.js, custom React &mdash; PPP is decoupled from the
            storefront framework. The agent surface signs the mandate, writes it
            into orderForm metadata via the Checkout API, and lets VTEX&rsquo;s
            payment orchestrator drive the rest. The same approach extends to
            Shopify (via the Shop Pay payment provider abstraction) and
            BigCommerce (via their Payments API plugin model) &mdash; the
            &ldquo;sign before checkout, verify during authorize&rdquo; pattern
            is platform-shaped, not platform-specific.
          </p>
        </section>

        {/* ── Security ─────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">
            Security model
          </h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Public &ldquo;agent-callable&rdquo; routes are an obvious abuse
            vector &mdash; LLM-backed endpoints especially, since each call
            costs real money. The platform ships with four layers of hardening,
            fail-closed by default:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <SecurityCard
              name="Origin allowlist + shared secret"
              description="Per-merchant configurable allowlist of browser origins (storefront URLs) for widget traffic. Server-to-server callers (MCP) carry a configured X-ACG-Auth-Token. Fail-closed: misconfigured deploys return 403 on every call."
            />
            <SecurityCard
              name="Per-IP rate limiting"
              description="Two windows enforced together: 60-second burst and 24-hour sustained. Per-class quotas: chat 20/min, mutating 30/min, read 60/min. X-Forwarded-For keyed so each real shopper has their own bucket."
            />
            <SecurityCard
              name="Per-session cost cap"
              description="Catches the failure mode IP rate-limiting misses: a legitimate allowlisted caller whose chat session loops accidentally. Tracked per orderFormId, 24h ceiling configurable per merchant."
            />
            <SecurityCard
              name="Auth-gated artifact retrieval"
              description="The verification surface (DID documents, mandate/receipt JSON) stays anonymously fetchable per the AP2 trust model. Order-detail endpoints require an active session so attackers can't enumerate."
            />
          </div>
        </section>

        {/* ── What's mocked, what's real ────────────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">
            What&rsquo;s real, what&rsquo;s mocked
          </h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Transparency about the production gap matters &mdash; the
            demo&rsquo;s value comes from being able to point at each artifact
            and say &ldquo;this signature is real, this hash is real, this DID
            is real&rdquo; while being honest about what hasn&rsquo;t shipped
            yet.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card rounded-xl p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald mb-2">
                REAL
              </div>
              <ul className="text-sm text-text-muted leading-relaxed space-y-1 list-disc list-inside">
                <li>Ed25519 keypairs, signatures, verifications</li>
                <li>JCS (RFC 8785) canonical hashing</li>
                <li>did:web identities, three published documents</li>
                <li>JWT artifacts (EdDSA), independently verifiable</li>
                <li>Drift detection: cart re-hashed at pay time</li>
                <li>Always-emit invariant: rejection receipts signed</li>
                <li>RAG: live Pinecone, live OpenAI embeddings</li>
                <li>VTEX integration: real catalog, real orderForm</li>
              </ul>
            </div>
            <div className="glass-card rounded-xl p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                MOCKED (POST-DEMO)
              </div>
              <ul className="text-sm text-text-muted leading-relaxed space-y-1 list-disc list-inside">
                <li>
                  CP class: signs without a real wallet sheet / device-tap
                </li>
                <li>
                  Network class: verifies but doesn&rsquo;t hit Visa rails
                </li>
                <li>CartMandate uses pre-W3C shape (v0.2 W3C wrap deferred)</li>
                <li>user_authorization is Ed25519 JWS, not sd-jwt-vc</li>
                <li>IntentMandate (human-not-present) not yet implemented</li>
                <li>3DS2 step-up simulation deferred</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Stack ─────────────────────────────────────────────── */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-text mb-4">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'TypeScript 5.5',
              'Node 18+',
              'VTEX IO (Node builder)',
              'React 16 (pixel app)',
              'Anthropic Claude (Haiku)',
              'OpenAI text-embedding-3-small',
              'Pinecone',
              'Model Context Protocol',
              'Ed25519 / jose',
              'JCS (RFC 8785)',
              'did:web',
              'VBase',
              'Koa middleware',
            ].map((t) => (
              <span key={t} className="skill-badge">
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* ── References ──────────────────────────────────────── */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-text mb-4">
            References &amp; further reading
          </h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Primary specifications, production rollouts, companion protocols,
            and the underlying standards this implementation relies on. All
            links open in a new tab.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            <ReferenceLink
              label="Specification"
              title="AP2 v0.2 specification (Google / FIDO)"
              url="https://github.com/google-agentic-commerce/AP2/blob/main/docs/ap2/specification.md"
            />
            <ReferenceLink
              label="Protocol home"
              title="AP2 protocol official site"
              url="https://ap2-protocol.org/"
            />
            <ReferenceLink
              label="Announcement"
              title="Announcing the Agent Payments Protocol (Google Cloud · Sep 2025)"
              url="https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol"
            />
            <ReferenceLink
              label="Production rollout"
              title="PayPal × Google Cloud — Conversational Commerce Agent (Oct 2025)"
              url="https://cloud.google.com/blog/topics/financial-services/introducing-an-agentic-commerce-solution-for-merchants-from-paypal-and-google-cloud"
            />
            <ReferenceLink
              label="Production rollout"
              title="PayPal & Mastercard — agentic commerce partnership (Oct 27, 2025)"
              url="https://newsroom.paypal-corp.com/2025-10-27-Mastercard-and-PayPal-Join-Forces-To-Accelerate-Secure-Global-Agentic-Commerce"
            />
            <ReferenceLink
              label="Production rollout"
              title="Mastercard Agent Pay — Acceptance Framework & Verifiable Intent"
              url="https://www.mastercard.com/us/en/business/artificial-intelligence/mastercard-agent-pay.html"
            />
            <ReferenceLink
              label="Companion protocol"
              title="UCP — Universal Commerce Protocol (Google × Shopify · Jan 2026)"
              url="https://developers.google.com/merchant/ucp"
            />
            <ReferenceLink
              label="Companion protocol"
              title="UCP under the hood (Google Developers Blog)"
              url="https://developers.googleblog.com/under-the-hood-universal-commerce-protocol-ucp/"
            />
            <ReferenceLink
              label="Companion protocol"
              title="MCP — Model Context Protocol (Anthropic)"
              url="https://modelcontextprotocol.io/"
            />
            <ReferenceLink
              label="Comparative analysis"
              title="Agentic payments protocols compared: MPP, ACP, AP2, x402 (Crossmint)"
              url="https://www.crossmint.com/learn/agentic-payments-protocols-compared"
            />
            <ReferenceLink
              label="Comparative analysis"
              title="The Agentic Commerce Protocol Stack: UCP, ACP, AP2, MCP, A2A (Hexagon)"
              url="https://joinhexagon.com/blogs/the-agentic-commerce-protocol-stack-ucp-acp-ap2-mcp-a2a-expl-mmi9c03u-hb1k"
            />
            <ReferenceLink
              label="Comparative analysis"
              title="An Illustrated Guide to AP2 (Arthur Chiao)"
              url="https://arthurchiao.art/blog/ap2-illustrated-guide/"
            />
            <ReferenceLink
              label="VTEX docs"
              title="Payment Provider Protocol (VTEX Developer Portal)"
              url="https://developers.vtex.com/docs/guides/payments-integration-payment-provider-protocol"
            />
            <ReferenceLink
              label="VTEX docs"
              title="Payment Provider Framework on VTEX IO"
              url="https://developers.vtex.com/docs/guides/payments-integration-payment-provider-framework"
            />
            <ReferenceLink
              label="VTEX docs"
              title="Reference payment-provider-example app (vtex-apps/payment-provider-example)"
              url="https://github.com/vtex-apps/payment-provider-example"
            />
            <ReferenceLink
              label="Standards"
              title="JCS — JSON Canonicalization Scheme (RFC 8785)"
              url="https://datatracker.ietf.org/doc/html/rfc8785"
            />
            <ReferenceLink
              label="Standards"
              title="Decentralized Identifiers v1.0 (W3C DID Core)"
              url="https://www.w3.org/TR/did-core/"
            />
            <ReferenceLink
              label="Standards"
              title="did:web Method Specification"
              url="https://w3c-ccg.github.io/did-method-web/"
            />
            <ReferenceLink
              label="Implementation"
              title="ACG — Agent Commerce Gateway · source on GitHub (Apache 2.0)"
              url="https://github.com/exilonX/ap2"
            />
            <ReferenceLink
              label="Demo"
              title="Live walkthrough on YouTube"
              url="https://youtu.be/gnOdHADvGyQ"
            />
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section id="contact-cta" className="mt-16">
          <div className="glass-card rounded-2xl p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text mb-3">
              Deploy AP2 agent commerce on your store
            </h2>
            <p className="text-text-muted leading-relaxed mb-6 max-w-2xl mx-auto">
              The code is open-source under Apache 2.0 &mdash; read it, fork it,
              run it. For production deployment on a real store (VTEX, Shopify,
              BigCommerce, custom headless), integration work, and ongoing
              support as the AP2 spec evolves, get in touch.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="/#contact"
                className="inline-block px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Book a call &rarr;
              </a>
              <a
                href="https://github.com/exilonX/ap2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-lg border border-border text-text font-semibold hover:bg-bg-muted/30 transition-colors"
              >
                View source &rarr;
              </a>
            </div>
            <p className="text-xs text-text-faint mt-5">
              Licensed under{' '}
              <a
                href="https://www.apache.org/licenses/LICENSE-2.0"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-text-muted"
              >
                Apache License 2.0
              </a>
            </p>
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
  )
}

/* ─── Helper components ─────────────────────────────────────────── */

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-text-faint mb-1">
        {label}
      </div>
      <div
        className="text-sm text-text"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  )
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-text-faint mb-0.5">
        {label}
      </div>
      <div className="text-lg font-semibold text-text">{value}</div>
    </div>
  )
}

function VideoPlaceholder() {
  return (
    <div className="glass-card rounded-xl overflow-hidden mb-12">
      <div className="aspect-video bg-black">
        <iframe
          src="https://www.youtube.com/embed/gnOdHADvGyQ"
          title="Agent Commerce on AP2 — Live Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
      <div className="text-xs text-text-faint p-3 border-t border-border text-center">
        ~4-min walkthrough &mdash; search &middot; sign &middot; pay &middot;
        verify &middot; signed receipt. Live on a VTEX RON storefront; CP and
        Network are mock classes designed for one-class swap-in to real
        providers.
      </div>
    </div>
  )
}

function ActorCard({
  role,
  did,
  prod,
  signs,
  attests,
  color,
}: {
  role: string
  did: string
  prod: string
  signs: string
  attests: string
  color: string
}) {
  return (
    <div className="glass-card rounded-xl p-5 relative overflow-hidden">
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[60px] opacity-25"
        style={{ background: color }}
      />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: color }}
          />
          <div className="text-xs font-semibold uppercase tracking-wider text-text-faint">
            {role}
          </div>
        </div>
        <div
          className="text-[11px] font-mono text-text-muted mb-3 break-all"
          dangerouslySetInnerHTML={{ __html: did }}
        />
        <div className="text-xs text-text-faint mb-1">Production swap-in</div>
        <div className="text-sm text-text mb-3">{prod}</div>
        <div className="text-xs text-text-faint mb-1">Signs</div>
        <div className="text-sm text-text font-semibold mb-3">{signs}</div>
        <div className="text-xs text-text-faint mb-1">Attests</div>
        <div
          className="text-sm text-text-muted italic leading-relaxed"
          dangerouslySetInnerHTML={{ __html: attests }}
        />
      </div>
    </div>
  )
}

function SecurityCard({
  name,
  description,
}: {
  name: string
  description: string
}) {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="text-sm font-semibold text-text mb-2">{name}</div>
      <p className="text-sm text-text-muted leading-relaxed">{description}</p>
    </div>
  )
}

function Collapsible({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-bg-muted/30 transition-colors"
      >
        <div>
          <div className="text-sm font-semibold text-text">{title}</div>
          <div className="text-xs text-text-faint mt-0.5">{subtitle}</div>
        </div>
        <div className="text-text-muted text-lg pl-4">{open ? '−' : '+'}</div>
      </button>
      {open && <div className="border-t border-border">{children}</div>}
    </div>
  )
}

function JsonBlock({ json }: { json: string }) {
  return (
    <pre className="text-[11px] font-mono text-text-muted leading-relaxed p-4 overflow-x-auto bg-bg-muted/30">
      {json}
    </pre>
  )
}

/* ─── Diagrams (inline SVG) ──────────────────────────────────────── */

function CryptoFlowDiagram() {
  const arrow = '#64748b'
  const step = 'fill-[#f0fdf4] stroke-[#10b981]'
  const stepText = 'fill-[#064e3b]'
  const data = 'fill-[#eff6ff] stroke-[#3b82f6]'
  const dataText = 'fill-[#1e3a8a]'

  return (
    <figure className="glass-card rounded-xl overflow-hidden mt-6">
      <div className="bg-white p-6 overflow-x-auto">
        <svg
          viewBox="0 0 760 260"
          role="img"
          aria-labelledby="crypto-flow-title"
          className="w-full h-auto min-w-[640px]"
        >
          <title id="crypto-flow-title">
            Mandate signing flow: contents → JCS canonicalization → SHA-256 →
            Ed25519 JWT
          </title>
          <defs>
            <marker
              id="cf-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={arrow} />
            </marker>
          </defs>

          <rect
            x="20"
            y="100"
            width="120"
            height="60"
            rx="4"
            className={data}
            strokeWidth="1.5"
          />
          <text
            x="80"
            y="125"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className={dataText}
          >
            Mandate
          </text>
          <text
            x="80"
            y="142"
            textAnchor="middle"
            fontSize="11"
            className={dataText}
          >
            contents (JSON)
          </text>

          <line
            x1="142"
            y1="130"
            x2="178"
            y2="130"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#cf-arrow)"
          />

          <rect
            x="180"
            y="100"
            width="130"
            height="60"
            rx="4"
            className={step}
            strokeWidth="1.5"
          />
          <text
            x="245"
            y="125"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className={stepText}
          >
            JCS canonicalize
          </text>
          <text
            x="245"
            y="142"
            textAnchor="middle"
            fontSize="11"
            className={stepText}
          >
            RFC 8785
          </text>

          <line
            x1="312"
            y1="130"
            x2="348"
            y2="130"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#cf-arrow)"
          />

          <rect
            x="350"
            y="100"
            width="100"
            height="60"
            rx="4"
            className={step}
            strokeWidth="1.5"
          />
          <text
            x="400"
            y="125"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className={stepText}
          >
            SHA-256
          </text>
          <text
            x="400"
            y="142"
            textAnchor="middle"
            fontSize="11"
            className={stepText}
          >
            32-byte digest
          </text>

          <line
            x1="452"
            y1="130"
            x2="488"
            y2="130"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#cf-arrow)"
          />

          <rect
            x="490"
            y="100"
            width="140"
            height="60"
            rx="4"
            className={step}
            strokeWidth="1.5"
          />
          <text
            x="560"
            y="120"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className={stepText}
          >
            Ed25519 sign
          </text>
          <text
            x="560"
            y="136"
            textAnchor="middle"
            fontSize="11"
            className={stepText}
          >
            EdDSA · JWT
          </text>
          <text
            x="560"
            y="150"
            textAnchor="middle"
            fontSize="11"
            className={stepText}
          >
            (via jose)
          </text>

          <line
            x1="632"
            y1="130"
            x2="668"
            y2="130"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#cf-arrow)"
          />

          <rect
            x="670"
            y="100"
            width="80"
            height="60"
            rx="4"
            className={data}
            strokeWidth="1.5"
          />
          <text
            x="710"
            y="125"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className={dataText}
          >
            Artifact
          </text>
          <text
            x="710"
            y="142"
            textAnchor="middle"
            fontSize="11"
            className={dataText}
          >
            (signed)
          </text>

          <text
            x="80"
            y="200"
            textAnchor="middle"
            fontSize="10"
            className={dataText}
          >
            input
          </text>
          <text
            x="245"
            y="200"
            textAnchor="middle"
            fontSize="10"
            className={stepText}
          >
            deterministic bytes
          </text>
          <text
            x="400"
            y="200"
            textAnchor="middle"
            fontSize="10"
            className={stepText}
          >
            cryptographic digest
          </text>
          <text
            x="560"
            y="200"
            textAnchor="middle"
            fontSize="10"
            className={stepText}
          >
            private key
          </text>
          <text
            x="710"
            y="200"
            textAnchor="middle"
            fontSize="10"
            className={dataText}
          >
            verifiable
          </text>

          <text x="20" y="35" fontSize="14" fontWeight="700" fill="#475569">
            Sign side (issuing party)
          </text>

          <text x="20" y="240" fontSize="11" fill="#94a3b8">
            Verification reverses: fetch DID document → extract public key →
            verify JWT signature → recompute hash → compare.
          </text>
        </svg>
      </div>
      <figcaption className="text-xs text-text-faint leading-relaxed p-4 border-t border-border">
        Mandate signing pipeline. Canonicalization (JCS) makes the byte
        representation deterministic across languages and implementations, so
        the SHA-256 digest is identical wherever a verifier recomputes it. The
        Ed25519 signature wraps the digest in a JWT signed with the
        party&rsquo;s private key. Verification reverses the chain, anchoring
        trust in the publicly-fetchable DID document.
      </figcaption>
    </figure>
  )
}

function ThreePartyDiagram() {
  const arrow = '#64748b'
  const merchant = 'fill-[#dcfce7] stroke-[#10b981]'
  const merchantText = 'fill-[#064e3b]'
  const cp = 'fill-[#dbeafe] stroke-[#3b82f6]'
  const cpText = 'fill-[#1e3a8a]'
  const network = 'fill-[#ede9fe] stroke-[#8b5cf6]'
  const networkText = 'fill-[#4c1d95]'
  const user = 'fill-[#fef3c7] stroke-[#f59e0b]'
  const userText = 'fill-[#78350f]'

  return (
    <figure className="glass-card rounded-xl overflow-hidden">
      <div className="bg-white p-6 overflow-x-auto">
        <svg
          viewBox="0 0 760 420"
          role="img"
          aria-labelledby="three-party-title"
          className="w-full h-auto min-w-[640px]"
        >
          <title id="three-party-title">
            Three-party trust chain: Merchant → CartMandate, CP →
            PaymentMandate, Network → PaymentReceipt
          </title>
          <defs>
            <marker
              id="tp-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={arrow} />
            </marker>
          </defs>

          {/* User */}
          <rect
            x="320"
            y="20"
            width="120"
            height="50"
            rx="4"
            className={user}
            strokeWidth="1.5"
          />
          <text
            x="380"
            y="42"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            className={userText}
          >
            User
          </text>
          <text
            x="380"
            y="58"
            textAnchor="middle"
            fontSize="11"
            className={userText}
          >
            (human present)
          </text>

          <line
            x1="380"
            y1="72"
            x2="380"
            y2="98"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#tp-arrow)"
          />

          {/* Shopping Agent */}
          <rect
            x="280"
            y="100"
            width="200"
            height="50"
            rx="4"
            stroke="#94a3b8"
            strokeWidth="1.5"
            fill="white"
          />
          <text
            x="380"
            y="122"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="#475569"
          >
            Shopping Agent
          </text>
          <text
            x="380"
            y="138"
            textAnchor="middle"
            fontSize="10"
            fill="#475569"
          >
            Claude Desktop / Widget · MCP
          </text>

          <line
            x1="380"
            y1="152"
            x2="380"
            y2="180"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#tp-arrow)"
          />

          {/* Merchant */}
          <rect
            x="40"
            y="180"
            width="200"
            height="70"
            rx="4"
            className={merchant}
            strokeWidth="2"
          />
          <text
            x="140"
            y="206"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            className={merchantText}
          >
            Merchant
          </text>
          <text
            x="140"
            y="222"
            textAnchor="middle"
            fontSize="10"
            className={merchantText}
          >
            did:web:&lt;store-host&gt;
          </text>
          <text
            x="140"
            y="238"
            textAnchor="middle"
            fontSize="10"
            className={merchantText}
          >
            signs CartMandate
          </text>

          <rect
            x="280"
            y="180"
            width="200"
            height="70"
            rx="4"
            className={cp}
            strokeWidth="2"
          />
          <text
            x="380"
            y="206"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            className={cpText}
          >
            Credentials Provider
          </text>
          <text
            x="380"
            y="222"
            textAnchor="middle"
            fontSize="10"
            className={cpText}
          >
            did:web:&lt;cp-host&gt;
          </text>
          <text
            x="380"
            y="238"
            textAnchor="middle"
            fontSize="10"
            className={cpText}
          >
            signs PaymentMandate
          </text>

          <rect
            x="520"
            y="180"
            width="200"
            height="70"
            rx="4"
            className={network}
            strokeWidth="2"
          />
          <text
            x="620"
            y="206"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            className={networkText}
          >
            Payment Network
          </text>
          <text
            x="620"
            y="222"
            textAnchor="middle"
            fontSize="10"
            className={networkText}
          >
            did:web:&lt;network-host&gt;
          </text>
          <text
            x="620"
            y="238"
            textAnchor="middle"
            fontSize="10"
            className={networkText}
          >
            signs PaymentReceipt
          </text>

          {/* Lateral arrows agent → 3 */}
          <line
            x1="320"
            y1="170"
            x2="180"
            y2="180"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#tp-arrow)"
            strokeDasharray="3 3"
          />
          <line
            x1="440"
            y1="170"
            x2="580"
            y2="180"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#tp-arrow)"
            strokeDasharray="3 3"
          />

          {/* DID documents (well-known) */}
          <rect
            x="40"
            y="290"
            width="200"
            height="50"
            rx="4"
            fill="white"
            stroke="#10b981"
            strokeDasharray="4 3"
            strokeWidth="1"
          />
          <text
            x="140"
            y="310"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            className={merchantText}
          >
            /.well-known/did.json
          </text>
          <text
            x="140"
            y="324"
            textAnchor="middle"
            fontSize="9"
            className={merchantText}
          >
            publicKeyHex (Ed25519)
          </text>

          <rect
            x="280"
            y="290"
            width="200"
            height="50"
            rx="4"
            fill="white"
            stroke="#3b82f6"
            strokeDasharray="4 3"
            strokeWidth="1"
          />
          <text
            x="380"
            y="310"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            className={cpText}
          >
            /mock-cp/.well-known/did.json
          </text>
          <text
            x="380"
            y="324"
            textAnchor="middle"
            fontSize="9"
            className={cpText}
          >
            publicKeyHex (Ed25519)
          </text>

          <rect
            x="520"
            y="290"
            width="200"
            height="50"
            rx="4"
            fill="white"
            stroke="#8b5cf6"
            strokeDasharray="4 3"
            strokeWidth="1"
          />
          <text
            x="620"
            y="310"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            className={networkText}
          >
            /mock-network/.well-known/did.json
          </text>
          <text
            x="620"
            y="324"
            textAnchor="middle"
            fontSize="9"
            className={networkText}
          >
            publicKeyHex (Ed25519)
          </text>

          <line
            x1="140"
            y1="252"
            x2="140"
            y2="288"
            stroke={arrow}
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <line
            x1="380"
            y1="252"
            x2="380"
            y2="288"
            stroke={arrow}
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <line
            x1="620"
            y1="252"
            x2="620"
            y2="288"
            stroke={arrow}
            strokeWidth="1"
            strokeDasharray="2 2"
          />

          <text
            x="380"
            y="380"
            textAnchor="middle"
            fontSize="11"
            fill="#475569"
            fontStyle="italic"
          >
            Anyone with these URLs can verify any signed artifact, independently
            of the demo
          </text>
        </svg>
      </div>
      <figcaption className="text-xs text-text-faint leading-relaxed p-4 border-t border-border">
        Three cryptographic identities, three published DID documents, three
        signed artifacts. Each party signs only what falls inside its own
        jurisdiction — the merchant cannot sign a payment authorization, the CP
        cannot commit to a cart price, the network cannot lie about either
        without invalidating its own signature.
      </figcaption>
    </figure>
  )
}

function SequenceDiagram() {
  const lane = '#cbd5e1'
  const arrow = '#475569'
  const sign = '#10b981'
  const verify = '#8b5cf6'

  return (
    <figure className="glass-card rounded-xl overflow-hidden">
      <div className="bg-white p-6 overflow-x-auto">
        <svg
          viewBox="0 0 760 520"
          role="img"
          aria-labelledby="sequence-title"
          className="w-full h-auto min-w-[640px]"
        >
          <title id="sequence-title">
            End-to-end signing ceremony sequence
          </title>
          <defs>
            <marker
              id="sq-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={arrow} />
            </marker>
            <marker
              id="sq-sign"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={sign} />
            </marker>
          </defs>

          {/* Lane headers */}
          <text
            x="80"
            y="25"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#475569"
          >
            User
          </text>
          <text
            x="220"
            y="25"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#475569"
          >
            Agent
          </text>
          <text
            x="380"
            y="25"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#475569"
          >
            Merchant
          </text>
          <text
            x="540"
            y="25"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#475569"
          >
            CP
          </text>
          <text
            x="680"
            y="25"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#475569"
          >
            Network
          </text>

          {/* Lanes */}
          {[80, 220, 380, 540, 680].map((x) => (
            <line
              key={x}
              x1={x}
              y1={35}
              x2={x}
              y2={500}
              stroke={lane}
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          ))}

          {/* 1. user → agent: intent */}
          <line
            x1="80"
            y1="60"
            x2="216"
            y2="60"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#sq-arrow)"
          />
          <text x="148" y="55" textAnchor="middle" fontSize="10" fill={arrow}>
            1. intent (&quot;find me a shirt&quot;)
          </text>

          {/* 2. agent → merchant: search + add to cart */}
          <line
            x1="220"
            y1="95"
            x2="376"
            y2="95"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#sq-arrow)"
          />
          <text x="298" y="90" textAnchor="middle" fontSize="10" fill={arrow}>
            2. search · add to cart
          </text>

          {/* 3. user → agent: checkout */}
          <line
            x1="80"
            y1="135"
            x2="216"
            y2="135"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#sq-arrow)"
          />
          <text x="148" y="130" textAnchor="middle" fontSize="10" fill={arrow}>
            3. &quot;checkout&quot;
          </text>

          {/* 4. agent → merchant: sign cart */}
          <line
            x1="220"
            y1="170"
            x2="376"
            y2="170"
            stroke={sign}
            strokeWidth="1.5"
            markerEnd="url(#sq-sign)"
          />
          <text
            x="298"
            y="165"
            textAnchor="middle"
            fontSize="10"
            fill={sign}
            fontWeight="600"
          >
            4. sign CartMandate
          </text>

          {/* 5. merchant → agent: signed cart */}
          <line
            x1="376"
            y1="200"
            x2="224"
            y2="200"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#sq-arrow)"
          />
          <text x="298" y="195" textAnchor="middle" fontSize="10" fill={arrow}>
            5. signed CartMandate
          </text>

          {/* 6. user clicks pay now */}
          <line
            x1="80"
            y1="235"
            x2="216"
            y2="235"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#sq-arrow)"
          />
          <text x="148" y="230" textAnchor="middle" fontSize="10" fill={arrow}>
            6. Pay Now
          </text>

          {/* 7. agent → merchant: verify against current cart (drift) */}
          <line
            x1="220"
            y1="270"
            x2="376"
            y2="270"
            stroke={verify}
            strokeWidth="1.5"
            markerEnd="url(#sq-arrow)"
          />
          <text
            x="298"
            y="265"
            textAnchor="middle"
            fontSize="10"
            fill={verify}
            fontWeight="600"
          >
            7. verify cart (drift check)
          </text>

          {/* 8. agent → CP: sign payment */}
          <line
            x1="220"
            y1="305"
            x2="536"
            y2="305"
            stroke={sign}
            strokeWidth="1.5"
            markerEnd="url(#sq-sign)"
          />
          <text
            x="378"
            y="300"
            textAnchor="middle"
            fontSize="10"
            fill={sign}
            fontWeight="600"
          >
            8. sign PaymentMandate (CP)
          </text>

          {/* 9. CP → agent: signed payment */}
          <line
            x1="536"
            y1="335"
            x2="224"
            y2="335"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#sq-arrow)"
          />
          <text x="378" y="330" textAnchor="middle" fontSize="10" fill={arrow}>
            9. signed PaymentMandate
          </text>

          {/* 10. agent → network: submit chain */}
          <line
            x1="220"
            y1="370"
            x2="676"
            y2="370"
            stroke={sign}
            strokeWidth="1.5"
            markerEnd="url(#sq-sign)"
          />
          <text
            x="448"
            y="365"
            textAnchor="middle"
            fontSize="10"
            fill={sign}
            fontWeight="600"
          >
            10. verify chain · sign Receipt (Network)
          </text>

          {/* 11. network → agent: signed receipt */}
          <line
            x1="676"
            y1="400"
            x2="224"
            y2="400"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#sq-arrow)"
          />
          <text x="448" y="395" textAnchor="middle" fontSize="10" fill={arrow}>
            11. signed PaymentReceipt (always emitted)
          </text>

          {/* 12. agent → user: success / rejection */}
          <line
            x1="220"
            y1="435"
            x2="84"
            y2="435"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#sq-arrow)"
          />
          <text x="148" y="430" textAnchor="middle" fontSize="10" fill={arrow}>
            12. result + 3 artifact links
          </text>

          <text
            x="380"
            y="480"
            textAnchor="middle"
            fontSize="11"
            fill="#475569"
            fontStyle="italic"
          >
            Sign operations in green · verify operations in purple · always-emit
            on step 11 regardless of outcome
          </text>
        </svg>
      </div>
      <figcaption className="text-xs text-text-faint leading-relaxed p-4 border-t border-border">
        Twelve-step ceremony. The Network signs the PaymentReceipt on step 11
        whether the chain approves or rejects — that&rsquo;s the always-emit
        invariant. The receipt is independently fetchable by id afterwards and
        verifies against the Network&rsquo;s published DID document.
      </figcaption>
    </figure>
  )
}

function RagDiagram() {
  const arrow = '#64748b'
  const offline = 'fill-[#fef3c7] stroke-[#f59e0b]'
  const offlineText = 'fill-[#78350f]'
  const online = 'fill-[#dbeafe] stroke-[#3b82f6]'
  const onlineText = 'fill-[#1e3a8a]'
  const store = 'fill-[#fce7f3] stroke-[#ec4899]'
  const storeText = 'fill-[#831843]'

  return (
    <figure className="glass-card rounded-xl overflow-hidden">
      <div className="bg-white p-6 overflow-x-auto">
        <svg
          viewBox="0 0 760 340"
          role="img"
          aria-labelledby="rag-title"
          className="w-full h-auto min-w-[640px]"
        >
          <title id="rag-title">
            RAG pipeline: bulk sync offline + query-time online
          </title>
          <defs>
            <marker
              id="rag-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={arrow} />
            </marker>
          </defs>

          {/* OFFLINE row */}
          <text x="20" y="25" fontSize="11" fontWeight="700" fill="#94a3b8">
            OFFLINE (bulk sync, runs out-of-band)
          </text>

          <rect
            x="20"
            y="45"
            width="140"
            height="55"
            rx="4"
            className={offline}
            strokeWidth="1.5"
          />
          <text
            x="90"
            y="68"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className={offlineText}
          >
            VTEX Catalog
          </text>
          <text
            x="90"
            y="84"
            textAnchor="middle"
            fontSize="10"
            className={offlineText}
          >
            ~10K products
          </text>

          <line
            x1="162"
            y1="72"
            x2="198"
            y2="72"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#rag-arrow)"
          />

          <rect
            x="200"
            y="45"
            width="170"
            height="55"
            rx="4"
            className={offline}
            strokeWidth="1.5"
          />
          <text
            x="285"
            y="68"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className={offlineText}
          >
            OpenAI embeddings
          </text>
          <text
            x="285"
            y="84"
            textAnchor="middle"
            fontSize="10"
            className={offlineText}
          >
            text-embedding-3-small
          </text>

          <line
            x1="372"
            y1="72"
            x2="408"
            y2="72"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#rag-arrow)"
          />

          <rect
            x="410"
            y="45"
            width="140"
            height="55"
            rx="4"
            className={store}
            strokeWidth="1.5"
          />
          <text
            x="480"
            y="68"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className={storeText}
          >
            Pinecone
          </text>
          <text
            x="480"
            y="84"
            textAnchor="middle"
            fontSize="10"
            className={storeText}
          >
            vector index
          </text>

          <text x="555" y="78" fontSize="11" fill="#94a3b8">
            + metadata
          </text>

          {/* ONLINE row */}
          <text x="20" y="155" fontSize="11" fontWeight="700" fill="#94a3b8">
            ONLINE (query, in request-response path)
          </text>

          <rect
            x="20"
            y="180"
            width="140"
            height="55"
            rx="4"
            className={online}
            strokeWidth="1.5"
          />
          <text
            x="90"
            y="203"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className={onlineText}
          >
            User query
          </text>
          <text
            x="90"
            y="219"
            textAnchor="middle"
            fontSize="10"
            className={onlineText}
          >
            via agent tool
          </text>

          <line
            x1="162"
            y1="207"
            x2="198"
            y2="207"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#rag-arrow)"
          />

          <rect
            x="200"
            y="180"
            width="170"
            height="55"
            rx="4"
            className={online}
            strokeWidth="1.5"
          />
          <text
            x="285"
            y="203"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className={onlineText}
          >
            Embed query
          </text>
          <text
            x="285"
            y="219"
            textAnchor="middle"
            fontSize="10"
            className={onlineText}
          >
            same model
          </text>

          <line
            x1="372"
            y1="207"
            x2="408"
            y2="207"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#rag-arrow)"
          />

          <rect
            x="410"
            y="180"
            width="140"
            height="55"
            rx="4"
            className={online}
            strokeWidth="1.5"
          />
          <text
            x="480"
            y="203"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className={onlineText}
          >
            Top-K match
          </text>
          <text
            x="480"
            y="219"
            textAnchor="middle"
            fontSize="10"
            className={onlineText}
          >
            k=5, score &gt; .7
          </text>

          <line
            x1="552"
            y1="207"
            x2="588"
            y2="207"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#rag-arrow)"
          />

          <rect
            x="590"
            y="180"
            width="160"
            height="55"
            rx="4"
            className={online}
            strokeWidth="1.5"
          />
          <text
            x="670"
            y="203"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className={onlineText}
          >
            Hydrate from VTEX
          </text>
          <text
            x="670"
            y="219"
            textAnchor="middle"
            fontSize="10"
            className={onlineText}
          >
            live prices, stock
          </text>

          {/* Pinecone arrow up from online to store */}
          <line
            x1="480"
            y1="180"
            x2="480"
            y2="103"
            stroke={arrow}
            strokeWidth="1"
            strokeDasharray="2 2"
          />

          <text
            x="380"
            y="290"
            textAnchor="middle"
            fontSize="11"
            fill="#475569"
            fontStyle="italic"
          >
            Pinecone holds embeddings (stale-tolerant); live VTEX call
            re-hydrates prices / stock at query time
          </text>
          <text
            x="380"
            y="310"
            textAnchor="middle"
            fontSize="11"
            fill="#475569"
            fontStyle="italic"
          >
            Total online latency: ~200 ms · indexed once, queried many
          </text>
        </svg>
      </div>
      <figcaption className="text-xs text-text-faint leading-relaxed p-4 border-t border-border">
        Two-stage RAG. Bulk sync runs as a standalone script (outside the VTEX
        IO 30-second request timeout), populates Pinecone with stable
        embeddings. Query-time uses Pinecone for retrieval, re-hydrates from the
        live VTEX catalog so prices and stock are current rather than stale at
        indexing time.
      </figcaption>
    </figure>
  )
}

function BackendAdapterDiagram() {
  const arrow = '#64748b'
  const core = 'fill-[#cffafe] stroke-[#06b6d4]'
  const coreText = 'fill-[#164e63]'
  const adapter = 'fill-[#fef9c3] stroke-[#eab308]'
  const adapterText = 'fill-[#713f12]'
  const backend = 'fill-[#f1f5f9] stroke-[#64748b]'
  const backendText = 'fill-[#1e293b]'

  return (
    <figure className="glass-card rounded-xl overflow-hidden mt-6">
      <div className="bg-white p-6 overflow-x-auto">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-labelledby="adapter-title"
          className="w-full h-auto min-w-[640px]"
        >
          <title id="adapter-title">
            Backend-agnostic architecture: AP2 engine + backend adapter + store
          </title>
          <defs>
            <marker
              id="ad-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={arrow} />
            </marker>
          </defs>

          <text x="20" y="25" fontSize="11" fontWeight="700" fill="#94a3b8">
            CORE (platform-neutral)
          </text>

          <rect
            x="20"
            y="40"
            width="280"
            height="100"
            rx="4"
            className={core}
            strokeWidth="2"
          />
          <text
            x="160"
            y="68"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            className={coreText}
          >
            @acg/core
          </text>
          <text
            x="160"
            y="88"
            textAnchor="middle"
            fontSize="11"
            className={coreText}
          >
            Ed25519 · JCS · DID resolution
          </text>
          <text
            x="160"
            y="103"
            textAnchor="middle"
            fontSize="11"
            className={coreText}
          >
            Mandate types · verification
          </text>
          <text
            x="160"
            y="118"
            textAnchor="middle"
            fontSize="11"
            className={coreText}
          >
            (no VTEX, no Shopify, no anything)
          </text>

          {/* CartProvider / CatalogProvider / KeyStore interfaces */}
          <text x="335" y="60" fontSize="11" fontWeight="700" fill="#94a3b8">
            INTERFACES
          </text>
          <rect
            x="335"
            y="70"
            width="120"
            height="20"
            rx="3"
            fill="white"
            stroke="#06b6d4"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <text x="395" y="84" textAnchor="middle" fontSize="11" fill="#164e63">
            CartProvider
          </text>
          <rect
            x="335"
            y="95"
            width="120"
            height="20"
            rx="3"
            fill="white"
            stroke="#06b6d4"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <text
            x="395"
            y="109"
            textAnchor="middle"
            fontSize="11"
            fill="#164e63"
          >
            CatalogProvider
          </text>
          <rect
            x="335"
            y="120"
            width="120"
            height="20"
            rx="3"
            fill="white"
            stroke="#06b6d4"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <text
            x="395"
            y="134"
            textAnchor="middle"
            fontSize="11"
            fill="#164e63"
          >
            KeyStore
          </text>

          <text x="490" y="25" fontSize="11" fontWeight="700" fill="#94a3b8">
            ADAPTERS (one per backend)
          </text>

          <rect
            x="490"
            y="40"
            width="250"
            height="40"
            rx="4"
            className={adapter}
            strokeWidth="1.5"
          />
          <text
            x="615"
            y="64"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className={adapterText}
          >
            VTEX adapter (shipped)
          </text>

          <rect
            x="490"
            y="90"
            width="250"
            height="40"
            rx="4"
            className={adapter}
            strokeWidth="1.5"
            opacity="0.7"
          />
          <text
            x="615"
            y="114"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className={adapterText}
          >
            Shopify adapter (drop-in pattern)
          </text>

          <rect
            x="490"
            y="140"
            width="250"
            height="40"
            rx="4"
            className={adapter}
            strokeWidth="1.5"
            opacity="0.5"
          />
          <text
            x="615"
            y="164"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className={adapterText}
          >
            BigCommerce / headless (same shape)
          </text>

          {/* Interface → adapter arrows */}
          <line
            x1="455"
            y1="80"
            x2="488"
            y2="60"
            stroke={arrow}
            strokeWidth="1"
            markerEnd="url(#ad-arrow)"
          />
          <line
            x1="455"
            y1="105"
            x2="488"
            y2="110"
            stroke={arrow}
            strokeWidth="1"
            markerEnd="url(#ad-arrow)"
            opacity="0.6"
          />
          <line
            x1="455"
            y1="130"
            x2="488"
            y2="160"
            stroke={arrow}
            strokeWidth="1"
            markerEnd="url(#ad-arrow)"
            opacity="0.4"
          />

          {/* Backend boxes */}
          <text x="20" y="200" fontSize="11" fontWeight="700" fill="#94a3b8">
            STORE BACKENDS
          </text>

          <rect
            x="20"
            y="220"
            width="170"
            height="40"
            rx="4"
            className={backend}
            strokeWidth="1.5"
          />
          <text
            x="105"
            y="244"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className={backendText}
          >
            VTEX IO + VBase
          </text>

          <rect
            x="200"
            y="220"
            width="170"
            height="40"
            rx="4"
            className={backend}
            strokeWidth="1.5"
            opacity="0.7"
          />
          <text
            x="285"
            y="244"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className={backendText}
          >
            Shopify Admin API
          </text>

          <rect
            x="380"
            y="220"
            width="170"
            height="40"
            rx="4"
            className={backend}
            strokeWidth="1.5"
            opacity="0.5"
          />
          <text
            x="465"
            y="244"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className={backendText}
          >
            BigCommerce / custom
          </text>

          <text
            x="380"
            y="295"
            textAnchor="middle"
            fontSize="11"
            fill="#475569"
            fontStyle="italic"
          >
            The engine doesn&rsquo;t change. Only the adapter changes. Three
            small interfaces are all the seam needs.
          </text>
        </svg>
      </div>
      <figcaption className="text-xs text-text-faint leading-relaxed p-4 border-t border-border">
        Backend adapters bridge the platform-neutral AP2 engine to a specific
        commerce backend. The engine never imports VTEX, Shopify, or any backend
        SDK directly — it only sees the three interfaces (CartProvider,
        CatalogProvider, KeyStore). Currently shipped: VTEX. Drop-in pattern:
        any backend that can implement the three interfaces.
      </figcaption>
    </figure>
  )
}

function VtexPaymentProviderDiagram() {
  const arrow = '#64748b'
  const sign = '#16a34a'
  const agentFill = 'fill-[#dbeafe] stroke-[#3b82f6]'
  const agentText = 'fill-[#1e3a8a]'
  const vtexFill = 'fill-[#fce7f3] stroke-[#ec4899]'
  const vtexText = 'fill-[#831843]'
  const providerFill = 'fill-[#fef9c3] stroke-[#eab308]'
  const providerText = 'fill-[#713f12]'
  const pspFill = 'fill-[#cffafe] stroke-[#06b6d4]'
  const pspText = 'fill-[#164e63]'

  return (
    <figure className="glass-card rounded-xl overflow-hidden mt-6">
      <div className="bg-white p-6 overflow-x-auto">
        <svg
          viewBox="0 0 760 460"
          role="img"
          aria-labelledby="vtex-ppp-title"
          className="w-full h-auto min-w-[640px]"
        >
          <title id="vtex-ppp-title">
            VTEX Payment Provider Protocol integration with the AP2 chain
          </title>
          <defs>
            <marker
              id="ppp-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={arrow} />
            </marker>
            <marker
              id="ppp-sign"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={sign} />
            </marker>
          </defs>

          {/* Agent surface */}
          <text x="20" y="25" fontSize="11" fontWeight="700" fill="#94a3b8">
            AGENT SURFACE
          </text>
          <rect
            x="20"
            y="40"
            width="220"
            height="65"
            rx="4"
            className={agentFill}
            strokeWidth="1.5"
          />
          <text
            x="130"
            y="65"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            className={agentText}
          >
            Widget · Claude · ChatGPT
          </text>
          <text
            x="130"
            y="82"
            textAnchor="middle"
            fontSize="11"
            className={agentText}
          >
            signs CartMandate
          </text>
          <text
            x="130"
            y="97"
            textAnchor="middle"
            fontSize="11"
            className={agentText}
          >
            writes id → orderForm.customData
          </text>

          {/* arrow agent → vtex */}
          <line
            x1="245"
            y1="72"
            x2="495"
            y2="72"
            stroke={sign}
            strokeWidth="1.5"
            markerEnd="url(#ppp-sign)"
          />
          <text
            x="370"
            y="62"
            textAnchor="middle"
            fontSize="10"
            fill={sign}
            fontWeight="600"
          >
            1. sign + write mandate id
          </text>

          {/* VTEX checkout */}
          <text x="500" y="25" fontSize="11" fontWeight="700" fill="#94a3b8">
            VTEX CHECKOUT (canonical)
          </text>
          <rect
            x="500"
            y="40"
            width="240"
            height="65"
            rx="4"
            className={vtexFill}
            strokeWidth="1.5"
          />
          <text
            x="620"
            y="65"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            className={vtexText}
          >
            orderForm.customData.ap2
          </text>
          <text
            x="620"
            y="82"
            textAnchor="middle"
            fontSize="11"
            className={vtexText}
          >
            VTEX checkout UI unchanged
          </text>
          <text
            x="620"
            y="97"
            textAnchor="middle"
            fontSize="11"
            className={vtexText}
          >
            (headless storefronts identical)
          </text>

          {/* Pay Now */}
          <line
            x1="620"
            y1="110"
            x2="620"
            y2="170"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#ppp-arrow)"
            strokeDasharray="4 2"
          />
          <text x="635" y="145" fontSize="10" fill={arrow}>
            2. user clicks Pay Now
          </text>

          {/* Custom Payment Provider */}
          <text x="200" y="190" fontSize="11" fontWeight="700" fill="#94a3b8">
            CUSTOM PAYMENT PROVIDER (PPP plugin)
          </text>
          <rect
            x="100"
            y="205"
            width="560"
            height="105"
            rx="4"
            className={providerFill}
            strokeWidth="2"
          />
          <text
            x="380"
            y="228"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            className={providerText}
          >
            AP2-aware Payment Provider
          </text>
          <text
            x="380"
            y="248"
            textAnchor="middle"
            fontSize="11"
            className={providerText}
          >
            POST /payments → reads customData.ap2.cartMandateId
          </text>
          <text
            x="380"
            y="265"
            textAnchor="middle"
            fontSize="11"
            className={providerText}
          >
            fetch CartMandate from VBase · call CP for PaymentMandate
          </text>
          <text
            x="380"
            y="282"
            textAnchor="middle"
            fontSize="11"
            className={providerText}
          >
            call PSP for settlement · sign PaymentReceipt via Network
          </text>
          <text
            x="380"
            y="299"
            textAnchor="middle"
            fontSize="11"
            className={providerText}
          >
            persist 3-artifact chain · return auth result to VTEX
          </text>

          {/* VTEX → PPP */}
          <line
            x1="620"
            y1="105"
            x2="500"
            y2="205"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#ppp-arrow)"
          />

          {/* Bottom row */}
          <text x="20" y="345" fontSize="11" fontWeight="700" fill="#94a3b8">
            REAL AP2 ACTORS &amp; SETTLEMENT
          </text>

          <rect
            x="20"
            y="360"
            width="165"
            height="55"
            rx="4"
            className={pspFill}
            strokeWidth="1.5"
          />
          <text
            x="102"
            y="383"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className={pspText}
          >
            Credentials Provider
          </text>
          <text
            x="102"
            y="400"
            textAnchor="middle"
            fontSize="10"
            className={pspText}
          >
            PayPal · Stripe Link · GPay
          </text>

          <rect
            x="200"
            y="360"
            width="165"
            height="55"
            rx="4"
            className={pspFill}
            strokeWidth="1.5"
          />
          <text
            x="282"
            y="383"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className={pspText}
          >
            Payment Network
          </text>
          <text
            x="282"
            y="400"
            textAnchor="middle"
            fontSize="10"
            className={pspText}
          >
            Visa · Mastercard · AmEx
          </text>

          <rect
            x="380"
            y="360"
            width="165"
            height="55"
            rx="4"
            className={pspFill}
            strokeWidth="1.5"
          />
          <text
            x="462"
            y="383"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className={pspText}
          >
            PSP / Acquirer
          </text>
          <text
            x="462"
            y="400"
            textAnchor="middle"
            fontSize="10"
            className={pspText}
          >
            Stripe · Adyen · Worldpay
          </text>

          <rect
            x="560"
            y="360"
            width="180"
            height="55"
            rx="4"
            className={pspFill}
            strokeWidth="1.5"
          />
          <text
            x="650"
            y="383"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className={pspText}
          >
            VBase audit store
          </text>
          <text
            x="650"
            y="400"
            textAnchor="middle"
            fontSize="10"
            className={pspText}
          >
            3 signed mandates retained
          </text>

          {/* Arrows from provider down to bottom row */}
          <line
            x1="200"
            y1="312"
            x2="102"
            y2="358"
            stroke={sign}
            strokeWidth="1.5"
            markerEnd="url(#ppp-sign)"
          />
          <line
            x1="300"
            y1="312"
            x2="282"
            y2="358"
            stroke={sign}
            strokeWidth="1.5"
            markerEnd="url(#ppp-sign)"
          />
          <line
            x1="460"
            y1="312"
            x2="462"
            y2="358"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#ppp-arrow)"
          />
          <line
            x1="600"
            y1="312"
            x2="650"
            y2="358"
            stroke={arrow}
            strokeWidth="1.5"
            markerEnd="url(#ppp-arrow)"
          />

          <text
            x="380"
            y="445"
            textAnchor="middle"
            fontSize="11"
            fill="#475569"
            fontStyle="italic"
          >
            VTEX checkout stays canonical · the AP2 chain lives inside the
            Payment Provider · PSP and AP2 are composable
          </text>
        </svg>
      </div>
      <figcaption className="text-xs text-text-faint leading-relaxed p-4 border-t border-border">
        Headless flow: the agent surface signs the CartMandate and writes the id
        into <code className="code-inline">orderForm.customData.ap2</code> via
        the VTEX Checkout API. When the customer clicks Pay Now, VTEX hands the
        orderForm to the registered Payment Provider whose{' '}
        <code className="code-inline">authorize</code> path runs the AP2 chain
        (verify cart → sign payment via CP → call PSP for settlement → sign
        receipt via Network). Cancel and refund pass through to the PSP with
        signed counter-mandates persisted alongside.
      </figcaption>
    </figure>
  )
}

function ReferenceLink({
  label,
  title,
  url,
}: {
  label: string
  title: string
  url: string
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card rounded-lg p-4 hover:bg-bg-muted/30 transition-colors group block"
    >
      <div className="text-[10px] font-semibold uppercase tracking-wider text-text-faint mb-1.5">
        {label}
      </div>
      <div className="text-sm text-text group-hover:text-primary transition-colors leading-snug">
        {title} <span className="text-text-faint">&rarr;</span>
      </div>
    </a>
  )
}
