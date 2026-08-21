import { useEffect, useState } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export function CaseStudyDiploma() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const url = "https://ionelmerca.com/case-study/diploma-project";
    const title = "The Graph of Romanian Businessmen — Case Study · Ionel Merca";
    const description =
      "Bachelor's diploma project: extraction, analysis, and visualisation of Romania's business-ownership network. From 6.8 GB of Official Gazette PDFs to a searchable graph of ~370,000 people.";

    const previousTitle = document.title;
    const descMeta = document.querySelector('meta[name="description"]');
    const previousDesc = descMeta?.getAttribute("content") ?? "";

    document.title = title;
    descMeta?.setAttribute("content", description);

    // Canonical link
    const canonical = document.createElement("link");
    canonical.id = "case-study-canonical";
    canonical.setAttribute("rel", "canonical");
    canonical.setAttribute("href", url);
    document.head.appendChild(canonical);

    // TechArticle structured data
    const schema = document.createElement("script");
    schema.id = "case-study-schema";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: "The Graph of Romanian Businessmen",
      alternativeHeadline: "Extraction, analysis, and visualisation of Romania's business-ownership network",
      description,
      author: { "@type": "Person", name: "Ionel Merca", url: "https://ionelmerca.com/" },
      publisher: { "@type": "Person", name: "Ionel Merca", url: "https://ionelmerca.com/" },
      datePublished: "2014-06-01",
      dateModified: "2026-04-22",
      mainEntityOfPage: url,
      inLanguage: "en",
      keywords: [
        "graph analysis",
        "information extraction",
        "Neo4j",
        "MongoDB",
        "Apache PDFBox",
        "Apache Solr",
        "Gephi",
        "SigmaJS",
        "social network metrics",
        "betweenness centrality",
        "Romanian businessmen graph",
      ],
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
            style={{ background: "#a78bfa" }}
          />
          <div className="absolute inset-0 dot-grid opacity-40" />
          <div className="absolute top-8 right-8 hidden md:block opacity-60 pointer-events-none">
            <GraphMotifDeco />
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="section-label">Case Study &middot; 2014</div>
            <h1 className="text-3xl md:text-5xl font-bold text-text mb-4 leading-tight">
              The Graph of Romanian Businessmen
            </h1>
            <p className="text-lg text-text-muted leading-relaxed max-w-2xl mb-8">
              Extraction, analysis, and visualisation of Romania&rsquo;s business-ownership network &mdash; from 6.8&nbsp;GB of Official Gazette PDFs to a searchable graph of ~370,000 people and the companies that link them.
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <HeroStat label="Raw dataset" value="48,240 PDFs · 6.8 GB" />
              <HeroStat label="Person graph" value="372,692 nodes" />
              <HeroStat label="Companies graph" value="218,284 nodes" />
              <HeroStat label="Components" value="120,547" />
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-4 mb-16">
          <Meta label="Role" value="Bachelor&rsquo;s diploma project &mdash; sole author, end-to-end" />
          <Meta label="Institution" value="Politehnica University of Bucharest &middot; Faculty of Automatic Control and Computers &middot; 2014" />
          <Meta label="Supervisor" value="Şl.dr.ing. Traian Rebedea" />
          <Meta label="Scope" value="Information extraction, graph construction, analysis, web service, visualisation client" />
        </div>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4">The brief</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            The Romanian Official Gazette, part 4, publishes every company establishment declaration in the country &mdash; founders, administrators, registered addresses, share distribution, CAEN activity code. Eleven years of it (2001&ndash;2011 and 2014), 48,240 PDFs, about 6.8&nbsp;GB of unstructured text, some of it pre-UTF-8, none of it machine-readable.
          </p>
          <p className="text-text-muted leading-relaxed">
            The goal: turn it into a graph &mdash; people linked through the companies they co-founded, and companies linked through shared founders &mdash; and make that graph searchable. A journalist or economist types a name, gets the connected component of that person&rsquo;s business network, plus centrality metrics for who matters inside it.
          </p>
        </section>

        <Figure
          src="/case-studies/diploma-project/people-graph.png"
          alt="Force-atlas layout of the Romanian business-persons graph"
          caption="The person graph after force-atlas layout in Gephi. The dense core is the single largest connected component — 63,991 people, about 17% of all extracted nodes. The clusters hanging off the periphery are smaller, self-contained components: family businesses, or city and county councils and the front companies registered around them."
        />

        <section>
          <h2 className="text-2xl font-bold text-text mb-6 mt-14">Pipeline</h2>
          <div className="space-y-8">
            <Stage
              title="1. Information extraction — Python + Apache PDFBox"
              body={
                <>
                  <p className="mb-2">
                    PDFBox (Java) converted the gazettes to text. A Python script classified each paragraph as company-establishment or not, then regex-extracted structured fields into MongoDB. The classifier was hand-verified across 7 randomly sampled gazettes &mdash; 98% correct.
                  </p>
                  <p>
                    The hardest part was character encoding: pre-2007 PDFs used non-UTF-8 Romanian glyph mappings that had to be reverse-mapped to UTF-8 by hand, glyph by glyph. Apache Solr sat alongside the pipeline as a fast full-text index for debugging and iterating on regex patterns.
                  </p>
                </>
              }
            />
            <Stage
              title="2. Graph construction — Java"
              body={
                <>
                  <p className="mb-2">
                    Two graphs built in parallel from the same MongoDB source. The person graph: nodes are people, an edge exists between two people if they co-founded the same company. The company graph: nodes are companies, an edge exists if they share a founder or administrator. Both hash-map backed for O(1) insert and lookup.
                  </p>
                  <p>
                    A name-extraction pass handled founders and administrators. Romanian names appear capitalised, all-caps, or last-name-capitalised, occasionally with a father initial. False positives like{" "}
                    <span className="skill-badge">EURO</span>{" "}
                    <span className="skill-badge">RON</span>{" "}
                    <span className="skill-badge">ROL</span>{" "}
                    had to be explicitly filtered.
                  </p>
                </>
              }
            />
            <Stage
              title="3. Analysis — Gephi and custom Java"
              body={
                <p>
                  Gephi for visual layout (force-atlas) and macro-level metrics. Custom implementations of Floyd&ndash;Warshall (all-pairs shortest paths) and Dijkstra backed the per-query metrics served by the web service &mdash; average shortest path, diameter, and betweenness centrality of any queried node.
                </p>
              }
            />
            <Stage
              title="4. Storage — Neo4j"
              body={
                <p>
                  The full person graph didn&rsquo;t fit in RAM. Moving it to Neo4j solved the memory problem and made per-component queries fast. Each connected component was labelled on insert, so Cypher could isolate a component by label rather than traversing from an arbitrary seed node. Switching from single-transaction inserts to Neo4j&rsquo;s batch insert mode dropped write time by roughly 100&times;.
                </p>
              }
            />
            <Stage
              title="5. Delivery — Java Servlets, PHP proxy, SigmaJS"
              body={
                <p>
                  A Java Servlet on Tomcat exposed an HTTP GET API. The JSON response carried the connected component plus metrics &mdash; node count, edge count, diameter, average path length, the betweenness and rank of the matched node, and the most influential node in the component. A PHP proxy forwarded the browser&rsquo;s AJAX requests to sidestep same-origin restrictions. SigmaJS rendered the graph in a browser canvas with force-atlas layout.
                </p>
              }
            />
          </div>

          <div className="mt-10">
            <PipelineDiagram />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">Key numbers</h2>
          <div className="glass-card rounded-xl p-6">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
              <Stat label="Raw dataset" value="48,240 PDFs · 6.8 GB · 2001–2011, 2014" />
              <Stat label="Paragraph classifier" value="98% accuracy (hand-verified)" />
              <Stat label="Person graph" value="372,692 nodes · 493,625 edges · 120,547 components" />
              <Stat label="Largest person component" value="63,991 nodes (≈17%)" />
              <Stat label="Companies graph" value="218,284 nodes · 732,310 edges · 45,167 components" />
              <Stat label="Average degree" value="2.65 (people) · 6.72 (companies)" />
              <Stat label="Clustering coefficient" value="0.707 (people) · 0.854 (companies)" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">What made it interesting</h2>
          <ul className="space-y-4 text-text-muted leading-relaxed">
            <li>
              <strong className="text-text">Disambiguation without PII.</strong> The gazette doesn&rsquo;t publish personal identifiers, so two people with the same name collapsed into one node. City-of-registration as a disambiguator was considered and dropped &mdash; one founder can register companies in multiple cities, so the fix would have invented false separations.
            </li>
            <li>
              <strong className="text-text">Pre-UTF-8 encodings.</strong> Older PDFs used bespoke glyph mappings for Romanian diacritics. Automated replacement got about 80% of the way. The rest was a hand-curated substitution table.
            </li>
            <li>
              <strong className="text-text">Scale versus memory.</strong> The person graph didn&rsquo;t fit in RAM. The fix was Neo4j with batched inserts and forced garbage collection after each component was persisted.
            </li>
            <li>
              <strong className="text-text">A bug I never fixed.</strong> Regex-matched property queries inside Cypher silently returned nothing against UTF-8 values. Filed upstream, never resolved during the project. Search by city, year, and CAEN code in the final app doesn&rsquo;t work because of it &mdash; and the case study is more honest for saying so.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">What the graph said</h2>
          <ul className="space-y-4 text-text-muted leading-relaxed mb-8">
            <li>
              <strong className="text-text">The Romanian business graph is sparse.</strong> Comparable social graphs put 99%+ of nodes in the giant component; this graph puts 17%. Most companies in the sample are small, often single-founder ventures with little cross-collaboration &mdash; a snapshot of an economy on the rise rather than a consolidated one.
            </li>
            <li>
              <strong className="text-text">Degree is a bad centrality metric here.</strong> Sorted by degree, the top &ldquo;business persons&rdquo; are the county and city councils of Cluj-Napoca, Constanta, Sibiu. They front public contracts and end up as parties on lots of paperwork. Eigenvector centrality surfaced actual individuals with meaningful corporate reach.
            </li>
            <li>
              <strong className="text-text">Companies are ~2.5&times; more connected than people.</strong> A company can link to many others through any of its founders; a person only links through co-founding. Average degree 6.72 vs 2.65. Clustering coefficient 0.854 vs 0.707.
            </li>
          </ul>

          <Figure
            src="/case-studies/diploma-project/companies-graph.png"
            alt="Force-atlas layout of the Romanian companies graph"
            caption="The companies graph, rendered with the same force-atlas layout as the person graph. It&rsquo;s visibly denser: each company inherits connections from all of its founders, so the graph picks up 2–3× the edges per node of the person graph."
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4 mt-14">Looking back</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Twelve years on, most of the core picks still look right: Python for text wrangling, MongoDB for flat records, Neo4j for the graph itself, a thin service layer between the database and the browser. What dates: Java Servlets as a choice (now a heavy pick for what this does), SigmaJS (newer renderers are cleaner), and the PHP proxy. The actual hard problem &mdash; structured extraction from poorly-OCR&rsquo;d legal PDFs in a non-English language &mdash; is still hard, and is arguably LLM-shaped today.
          </p>
          <p className="text-text-muted leading-relaxed">
            The interactive demo lived at <span className="text-text">ionelmerca.com</span> &mdash; the same domain this portfolio now occupies. Between then and now the page sat blank.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-text mb-4">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Python",
              "Java",
              "Apache PDFBox",
              "Apache Solr / Lucene",
              "MongoDB",
              "Neo4j",
              "Cypher",
              "Gephi",
              "Java Servlets",
              "Tomcat",
              "SigmaJS",
              "JavaScript",
              "PHP",
            ].map((t) => (
              <span key={t} className="skill-badge">
                {t}
              </span>
            ))}
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

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-text-faint mb-1">{label}</div>
      <div className="text-sm text-text" dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-text-faint mb-0.5">{label}</div>
      <div className="text-lg font-semibold text-text">{value}</div>
    </div>
  );
}

function GraphMotifDeco() {
  const accent = "#a78bfa";
  const muted = "#c4b5fd";

  // A small cluster of nodes with edges — echoes the actual person-graph visual
  const nodes: { x: number; y: number; r: number }[] = [
    { x: 110, y: 80, r: 3 },
    { x: 90, y: 60, r: 2 },
    { x: 130, y: 60, r: 2 },
    { x: 130, y: 100, r: 2 },
    { x: 90, y: 100, r: 2 },
    { x: 70, y: 80, r: 2 },
    { x: 150, y: 80, r: 2 },
    { x: 60, y: 50, r: 1.5 },
    { x: 60, y: 110, r: 1.5 },
    { x: 160, y: 50, r: 1.5 },
    { x: 160, y: 110, r: 1.5 },
    { x: 40, y: 80, r: 2.5 },
    { x: 180, y: 80, r: 2.5 },
    { x: 110, y: 30, r: 2.5 },
    { x: 110, y: 130, r: 2.5 },
    // outliers
    { x: 20, y: 30, r: 2 },
    { x: 200, y: 30, r: 2 },
    { x: 20, y: 130, r: 2 },
    { x: 200, y: 130, r: 2 },
  ];

  const edges: [number, number][] = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 2], [1, 4], [2, 3], [3, 4], [4, 5], [2, 6], [3, 6],
    [5, 7], [5, 8], [6, 9], [6, 10], [7, 11], [8, 11], [9, 12], [10, 12],
    [1, 13], [2, 13], [4, 14], [3, 14],
    [11, 15], [12, 16], [11, 17], [12, 18],
  ];

  return (
    <svg viewBox="0 0 220 160" width="220" height="160" xmlns="http://www.w3.org/2000/svg">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={muted}
          strokeWidth="0.7"
          opacity="0.6"
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={accent} opacity={n.r >= 2.5 ? 1 : 0.8} />
      ))}
    </svg>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-text-faint mb-1">{label}</div>
      <div className="text-sm text-text">{value}</div>
    </div>
  );
}

function Stage({ title, body }: { title: string; body: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <div className="text-text-muted leading-relaxed">{body}</div>
    </div>
  );
}

function PipelineDiagram() {
  const caption =
    "End-to-end flow. Ingestion and classification on top: gazettes are fetched, text is extracted, paragraphs are parsed, and a classifier decides if each paragraph declares a new company. Non-matches are discarded. Matches land as structured fields in MongoDB. On the bottom lane, MongoDB is iterated entry by entry, names are extracted, and nodes and edges are added to the graph.";

  const box = "fill-[#dbeafe] stroke-[#3b82f6]";
  const boxText = "fill-[#1e3a8a]";
  const terminal = "fill-[#d1fae5] stroke-[#10b981]";
  const terminalText = "fill-[#065f46]";
  const discard = "fill-[#fee2e2] stroke-[#ef4444]";
  const discardText = "fill-[#991b1b]";
  const decision = "fill-[#ede9fe] stroke-[#8b5cf6]";
  const decisionText = "fill-[#4c1d95]";
  const db = "fill-[#fce7f3] stroke-[#ec4899]";
  const dbText = "fill-[#831843]";
  const arrow = "#64748b";

  return (
    <figure className="glass-card rounded-xl overflow-hidden my-6">
      <div className="bg-white p-6 overflow-x-auto">
        <svg
          viewBox="0 0 900 320"
          role="img"
          aria-labelledby="pipeline-title"
          className="w-full h-auto min-w-[720px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="pipeline-title">End-to-end pipeline: ingestion, classification, structuring, and graph construction</title>

          <defs>
            <marker id="arrow-end" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={arrow} />
            </marker>
          </defs>

          {/* -------- TOP ROW -------- */}
          {/* START */}
          <rect x="20" y="40" width="70" height="50" rx="24" className={terminal} strokeWidth="1.5" />
          <text x="55" y="71" textAnchor="middle" fontSize="13" fontWeight="600" className={terminalText}>START</text>

          <line x1="90" y1="65" x2="116" y2="65" stroke={arrow} strokeWidth="1.5" markerEnd="url(#arrow-end)" />

          {/* Fetch PDFs */}
          <rect x="120" y="40" width="110" height="50" rx="4" className={box} strokeWidth="1.5" />
          <text x="175" y="71" textAnchor="middle" fontSize="13" fontWeight="600" className={boxText}>Fetch PDFs</text>

          <line x1="230" y1="65" x2="256" y2="65" stroke={arrow} strokeWidth="1.5" markerEnd="url(#arrow-end)" />

          {/* Extract Text */}
          <rect x="260" y="40" width="110" height="50" rx="4" className={box} strokeWidth="1.5" />
          <text x="315" y="71" textAnchor="middle" fontSize="13" fontWeight="600" className={boxText}>Extract Text</text>

          <line x1="370" y1="65" x2="396" y2="65" stroke={arrow} strokeWidth="1.5" markerEnd="url(#arrow-end)" />

          {/* Parse Paragraphs */}
          <rect x="400" y="40" width="140" height="50" rx="4" className={box} strokeWidth="1.5" />
          <text x="470" y="71" textAnchor="middle" fontSize="13" fontWeight="600" className={boxText}>Parse Paragraphs</text>

          <line x1="540" y1="65" x2="566" y2="65" stroke={arrow} strokeWidth="1.5" markerEnd="url(#arrow-end)" />

          {/* Decision diamond */}
          <polygon points="635,18 702,65 635,112 568,65" className={decision} strokeWidth="1.5" />
          <text x="635" y="62" textAnchor="middle" fontSize="12" fontWeight="600" className={decisionText}>Establishment</text>
          <text x="635" y="77" textAnchor="middle" fontSize="12" fontWeight="600" className={decisionText}>declaration?</text>

          {/* No branch (right) */}
          <line x1="702" y1="65" x2="728" y2="65" stroke={arrow} strokeWidth="1.5" markerEnd="url(#arrow-end)" />
          <text x="713" y="57" textAnchor="middle" fontSize="11" fontWeight="600" fill={arrow}>No</text>

          {/* Discard terminal */}
          <rect x="730" y="40" width="80" height="50" rx="24" className={discard} strokeWidth="1.5" />
          <text x="770" y="71" textAnchor="middle" fontSize="13" fontWeight="600" className={discardText}>Discard</text>

          {/* Yes branch (down) */}
          <line x1="635" y1="112" x2="635" y2="180" stroke={arrow} strokeWidth="1.5" markerEnd="url(#arrow-end)" />
          <text x="650" y="150" fontSize="11" fontWeight="600" fill={arrow}>Yes</text>

          {/* -------- BOTTOM ROW (right → left snake) -------- */}

          {/* Extract Fields */}
          <rect x="560" y="185" width="150" height="50" rx="4" className={box} strokeWidth="1.5" />
          <text x="635" y="216" textAnchor="middle" fontSize="13" fontWeight="600" className={boxText}>Extract Fields</text>

          <line x1="560" y1="210" x2="528" y2="210" stroke={arrow} strokeWidth="1.5" markerEnd="url(#arrow-end)" />

          {/* MongoDB cylinder */}
          <rect x="410" y="192" width="110" height="36" className={db} strokeWidth="0" />
          <line x1="410" y1="192" x2="410" y2="228" stroke="#ec4899" strokeWidth="1.5" />
          <line x1="520" y1="192" x2="520" y2="228" stroke="#ec4899" strokeWidth="1.5" />
          <ellipse cx="465" cy="228" rx="55" ry="7" className={db} strokeWidth="1.5" />
          <ellipse cx="465" cy="192" rx="55" ry="7" className={db} strokeWidth="1.5" />
          <text x="465" y="214" textAnchor="middle" fontSize="13" fontWeight="600" className={dbText}>MongoDB</text>

          <line x1="410" y1="210" x2="378" y2="210" stroke={arrow} strokeWidth="1.5" markerEnd="url(#arrow-end)" />
          <text x="394" y="200" textAnchor="middle" fontSize="11" fontWeight="600" fill={arrow}>iterate</text>

          {/* Add Nodes & Edges */}
          <rect x="210" y="185" width="170" height="50" rx="4" className={box} strokeWidth="1.5" />
          <text x="295" y="209" textAnchor="middle" fontSize="12" fontWeight="600" className={boxText}>Extract Names +</text>
          <text x="295" y="224" textAnchor="middle" fontSize="12" fontWeight="600" className={boxText}>Add Nodes &amp; Edges</text>

          <line x1="210" y1="210" x2="178" y2="210" stroke={arrow} strokeWidth="1.5" markerEnd="url(#arrow-end)" />

          {/* Graph terminal */}
          <rect x="60" y="185" width="120" height="50" rx="24" className={terminal} strokeWidth="1.5" />
          <text x="120" y="216" textAnchor="middle" fontSize="13" fontWeight="600" className={terminalText}>Graph</text>

          {/* -------- Lane labels -------- */}
          <text x="20" y="22" fontSize="10" fontWeight="700" fill="#94a3b8" letterSpacing="0.08em">INGESTION &middot; CLASSIFICATION</text>
          <text x="20" y="170" fontSize="10" fontWeight="700" fill="#94a3b8" letterSpacing="0.08em">STRUCTURING &middot; GRAPH CONSTRUCTION</text>

          {/* Faint row dividers */}
          <line x1="20" y1="28" x2="880" y2="28" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 3" />
          <line x1="20" y1="175" x2="880" y2="175" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 3" />
        </svg>
      </div>
      <figcaption className="text-xs text-text-faint leading-relaxed p-4 border-t border-border">
        {caption}
      </figcaption>
    </figure>
  );
}

function Figure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="glass-card rounded-xl overflow-hidden my-6">
      {failed ? (
        <div className="bg-bg-muted border-b border-border flex flex-col items-center justify-center text-center px-6 py-16 text-text-faint">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3 opacity-60">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <div className="text-xs font-medium text-text mb-1">Image pending</div>
          <div className="text-xs max-w-md">{alt}</div>
          <code className="text-[10px] text-text-faint mt-3 bg-bg px-2 py-1 rounded">{src}</code>
        </div>
      ) : (
        <div className="bg-white flex items-center justify-center p-4">
          <img
            src={src}
            alt={alt}
            onError={() => setFailed(true)}
            loading="lazy"
            decoding="async"
            className="w-full h-auto max-h-[520px] object-contain"
          />
        </div>
      )}
      <figcaption className="text-xs text-text-faint leading-relaxed p-4 border-t border-border">
        {caption}
      </figcaption>
    </figure>
  );
}
