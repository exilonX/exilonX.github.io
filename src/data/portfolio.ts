export interface Experience {
  roleKey: string;
  companyKey: string;
  period: string;
  location: string;
  descriptionEn: string[];
  descriptionRo: string[];
  tech: string[];
  caseStudy?: {
    slug: string;
    labelEn: string;
    labelRo: string;
  };
}

export interface Project {
  title: string;
  domain: string;
  descriptionEn: string;
  descriptionRo: string;
  architectureEn: string[];
  architectureRo: string[];
  challengesEn: string[];
  challengesRo: string[];
  solutionsEn: string[];
  solutionsRo: string[];
  impactEn: string[];
  impactRo: string[];
  tech: string[];
  color: string;
  link?: string;
  caseStudySlug?: string;
}

export interface SkillGroup {
  category: string;
  categoryRo: string;
  skills: string[];
}

export const experiences: Experience[] = [
  {
    roleKey: "freelance",
    companyKey: "independent",
    period: "2022 — Present",
    location: "Bucharest, Romania",
    descriptionEn: [
      "Built the cryptographic NFC stack for Romania's national eID mobile application — PACE protocol, Chip Authentication, AES-CMAC secure messaging, and Qualified Electronic Signatures",
      "Owned the backend identity-verification and request-security layer for the same platform — split-PACE with Passive Authentication against Romanian CSCA trust chains, a signed and encrypted request channel with cached asymmetric keys, enterprise IDM integration, cloud liveness verification with government face/address database cross-reference, TSA-stamped QES PDF signing, and a push-authentication module (tap-to-approve)",
      "Principal engineer on the back-office of REGES — Romania's Labor Inspection platform. Built the business APIs, the async access-request verification workflows on Kafka, and the report generation pipeline. Integrated the platform's document signing and signature validation services. Kubernetes",
      "End-to-end VTEX engineer — 11+ payment integrations across 6+ European countries (Adyen, PayU, Oney, P24, Netopia, Mokka, TBI, ING, Stripe, Checkout.com)",
      "Deep VTEX backend work — marketplace split payments with multi-seller commission engines for OBI/Adyen, VTEX IO services, MasterData, checkout orchestration, and payment gateway architecture",
      "Developed a cross-border journey planner for 6 Danube-region countries — an integration layer across national APIs implementing the EU OJP standard",
    ],
    descriptionRo: [
      "Am construit stiva criptografica NFC pentru aplicatia mobila nationala eID a Romaniei — protocol PACE, Chip Authentication, AES-CMAC secure messaging si Semnaturi Electronice Calificate",
      "Am detinut stratul de verificare a identitatii si securitate a cererilor pe backend pentru aceeasi platforma — split-PACE cu Passive Authentication pe lanturi de incredere CSCA romanesti, canal de cereri semnate si criptate cu chei asimetrice cache-uite, integrare IDM enterprise, verificare liveness in cloud cu cross-reference pe baza de date guvernamentala fata/adresa, semnare QES PDF cu timestamp TSA si modul push de autentificare (tap-to-approve)",
      "Inginer principal pe back-office-ul REGES — platforma Inspectiei Muncii din Romania. Am construit API-urile de business, workflow-urile asincrone de verificare a cererilor de acces pe Kafka si pipeline-ul de generare rapoarte. Am integrat serviciile de semnare documente si validare semnaturi ale platformei. Kubernetes",
      "Inginer end-to-end VTEX — 11+ integrari de plati in 6+ tari europene (Adyen, PayU, Oney, P24, Netopia, Mokka, TBI, ING, Stripe, Checkout.com)",
      "Lucru profund de backend VTEX — split payments marketplace cu motoare de comisioane multi-vanzator pentru OBI/Adyen, servicii VTEX IO, MasterData, orchestrare checkout si arhitectura gateway de plati",
      "Am dezvoltat un planificator de calatorii transfrontalier pentru 6 tari dunarene — un layer de integrare intre API-uri nationale implementand standardul EU OJP",
    ],
    tech: ["TypeScript", "VTEX", "Node.js", "Python", "Java", "Flutter", "Kafka", "Kubernetes", "NFC", "PACE"],
  },
  {
    roleKey: "vtex",
    companyKey: "vtex",
    period: "2020 — 2022",
    location: "Bucharest, Romania",
    descriptionEn: [
      "Engineer on the 1st-Party Apps team — fullstack on the VTEX e-commerce platform: VTEX IO services, admin apps, and checkout-side integrations",
      "Started the OBI/Adyen marketplace split-payment work that I continued to own and extend through the freelance years",
      "Payment connectors live in production across European markets",
    ],
    descriptionRo: [
      "Inginer in echipa 1st-Party Apps — fullstack pe platforma de e-commerce VTEX: servicii VTEX IO, aplicatii admin si integrari pe partea de checkout",
      "Am inceput lucrul pe split-payments OBI/Adyen, pe care l-am continuat si extins ca freelancer",
      "Conectori de plati live in productie pe piete europene",
    ],
    tech: ["TypeScript", "Node.js", "React", "GraphQL", "VTEX IO"],
  },
  {
    roleKey: "freelance",
    companyKey: "independent",
    period: "2019 — 2020",
    location: "Bucharest, Romania",
    descriptionEn: [
      "Led development of Flow — electric scooter rental platform with IoT/MQTT backend for real-time hardware telemetry and a Flutter rider app. Team lead for the second half of the engagement",
      "Built the Alini Medical App — fullstack mobile application in Flutter with a Firebase backend",
    ],
    descriptionRo: [
      "Am condus dezvoltarea Flow — platforma de inchiriere trotinete electrice cu backend IoT/MQTT pentru telemetrie hardware in timp real si aplicatia mobila de rider in Flutter. Team lead in a doua jumatate a colaborarii",
      "Am construit Alini Medical App — aplicatie mobila fullstack in Flutter cu backend Firebase",
    ],
    tech: ["Node.js", "Flutter", "Firebase", "MQTT"],
  },
  {
    roleKey: "researcher",
    companyKey: "upb",
    period: "2017 — 2018",
    location: "Bucharest, Romania",
    descriptionEn: [
      "NLP research and AI coursework at Politehnica Bucharest — Computer Vision, Data Mining, Knowledge Representation",
      "Built an NLP recommendation system matching project descriptions to relevant documentation",
    ],
    descriptionRo: [
      "Cercetare NLP si cursuri AI la Politehnica Bucuresti — Computer Vision, Data Mining, Reprezentarea Cunostintelor",
      "Am construit un sistem NLP de recomandare pentru potrivirea descrierilor de proiecte cu documentatia relevanta",
    ],
    tech: ["Python", "Java", "NLP", "Machine Learning"],
  },
  {
    roleKey: "engineer",
    companyKey: "teamnet",
    period: "2014 — 2017",
    location: "Bucharest, Romania",
    descriptionEn: [
      "Core engineer on the National Emergency Unit System — a fullstack medical application linking Romania's 112 dispatch, the responding ambulance, and the receiving hospital in real time, so the hospital could prepare before the patient arrived",
      "Bachelor's thesis: \"The Graph of Romanian Businessmen\" — graph analysis of business networks using social-network metrics",
    ],
    descriptionRo: [
      "Dezvoltator cheie pe Sistemul National al Unitatilor de Urgenta — aplicatie medicala fullstack care conecta in timp real dispeceratul 112, ambulanta care raspundea si spitalul receptor, astfel incat spitalul sa se pregateasca inainte de sosirea pacientului",
      "Lucrarea de licenta: \"The Graph of Romanian Businessmen\" — analiza graf a retelelor de afaceri folosind metrici de retele sociale",
    ],
    tech: ["Node.js", "AngularJS", "Java"],
    caseStudy: {
      slug: "diploma-project",
      labelEn: "The Graph of Romanian Businessmen — full case study",
      labelRo: "Graful Oamenilor de Afaceri din Romania — case study complet",
    },
  },
];

export const projects: Project[] = [
  {
    title: "ROeID",
    domain: "Digital Identity & Cryptography",
    descriptionEn:
      "Romania's national electronic identity mobile application. The NFC chip stack on the phone plus the identity-verification and request-security layer on the backend.",
    descriptionRo:
      "Aplicatia mobila nationala de identitate electronica a Romaniei. Stiva NFC a chip-ului pe telefon plus stratul de verificare a identitatii si securitate a cererilor pe backend.",
    architectureEn: [
      "Mobile client — Flutter + a forked, extended dmrtd Dart library: NFC chip reading, PACE, Chip Authentication",
      "Node.js backend — request-security boundary and identity-verification orchestration",
      "Python verification service — CSCA trust-chain validation and document-hash verification",
      "Split-PACE topology — ephemeral session keys live on the backend, never on the phone",
    ],
    architectureRo: [
      "Client mobil — Flutter + libraria dmrtd Dart fork-uita si extinsa: citire chip NFC, PACE, Chip Authentication",
      "Backend Node.js — boundary de securitate a cererilor si orchestrare verificare identitate",
      "Serviciu Python de verificare — validare lant CSCA si verificare hash-uri documente",
      "Topologie split-PACE — cheile de sesiune efemere traiesc pe backend, niciodata pe telefon",
    ],
    challengesEn: [
      "Public eID libraries stop at BAC; PACE on brainpoolP256r1 with AES-CMAC had to be built from scratch",
      "Mobile-to-backend request channel had to survive replay, MITM, and key rotation",
      "Identity cross-reference across MRZ, CNP, and QES certificate without false positives",
      "End-to-end chip authenticity verified against the Romanian CSCA trust chain",
    ],
    challengesRo: [
      "Librariile publice eID se opresc la BAC; PACE pe brainpoolP256r1 cu AES-CMAC trebuit construit de la zero",
      "Canal de cereri rezistent la replay, MITM si rotatia cheilor",
      "Cross-reference identitate prin MRZ, CNP si certificat QES fara fals pozitiv",
      "Autenticitate chip verificata end-to-end pe lantul de incredere CSCA romanesc",
    ],
    solutionsEn: [
      "Forked dmrtd and added full PACE + Chip Authentication on the Dart side; published the fork as open source",
      "Signed-and-encrypted request channel with cached asymmetric keys",
      "Strict matching on identity boundaries with MRZ/CNP/QES cross-reference",
      "Passive Authentication against the multi-CSCA Romanian trust chain in the Python verification service",
    ],
    solutionsRo: [
      "Fork dmrtd cu suport complet PACE + Chip Authentication pe partea Dart; publicat ca open source",
      "Canal de cereri semnat si criptat cu chei asimetrice cache-uite",
      "Potrivire stricta pe limitele identitatii cu cross-reference MRZ/CNP/QES",
      "Passive Authentication pe lantul multi-CSCA romanesc in serviciul Python",
    ],
    impactEn: [
      "Production-deployed cryptographic stack for Romania's national eID",
      "Same protocols implemented consistently across Dart, Node.js, and Python",
      "TSA-stamped QES PDF signing for legally binding documents",
      "Tap-to-approve push-authentication module powering external-service logins",
    ],
    impactRo: [
      "Stiva criptografica deployata in productie pentru eID-ul national al Romaniei",
      "Aceleasi protocoale implementate consistent in Dart, Node.js si Python",
      "Semnare QES PDF cu timestamp TSA pentru documente cu valoare legala",
      "Modul de autentificare push (tap-to-approve) pentru login la servicii externe",
    ],
    tech: ["Flutter/Dart", "Node.js", "Python", "NFC", "PACE", "ECDH", "AES-CMAC"],
    color: "#a78bfa",
    link: "https://github.com/exilonX/dmrtd",
  },
  {
    title: "REGES",
    domain: "Government Platform",
    descriptionEn:
      "The back-office of Romania's Labor Inspection platform — services used internally by labor inspectors to manage registry access, run verification workflows, and generate signed reports. Front-office owned by a separate team.",
    descriptionRo:
      "Back-office-ul platformei Inspectiei Muncii din Romania — servicii folosite intern de inspectorii de munca pentru managementul accesului la registru, workflow-uri de verificare si generare rapoarte semnate. Front-office detinut de o echipa separata.",
    architectureEn: [
      "TypeScript / NestJS — business APIs (reges-bapi)",
      "TypeScript / NestJS workers — async processing on Kafka (reges-process)",
      "C# / .NET — document signing service (reges-sign)",
      "Java — signature validation, EU DSS compliance (reges-dss)",
      "Kafka event bus, Kubernetes deployment, mTLS-bounded ingress",
    ],
    architectureRo: [
      "TypeScript / NestJS — API-uri de business (reges-bapi)",
      "Worker-i TypeScript / NestJS — procesare asincrona pe Kafka (reges-process)",
      "C# / .NET — serviciu de semnare documente (reges-sign)",
      "Java — validare semnaturi, conformitate EU DSS (reges-dss)",
      "Bus de evenimente Kafka, deployment Kubernetes, ingress cu mTLS",
    ],
    challengesEn: [
      "Long-running validation and external registry lookups couldn't block the request path",
      "PDF signing flows had to remain compliant with EU DSS",
      "Multi-language services needed a shared validation and contract layer",
    ],
    challengesRo: [
      "Validarea de durata lunga si lookup-urile in registre externe nu puteau bloca calea cererii",
      "Fluxurile de semnare PDF trebuiau sa ramana conforme EU DSS",
      "Servicii multi-limbaj aveau nevoie de un strat comun de validare si contracte",
    ],
    solutionsEn: [
      "Async workflows on Kafka — PDF validation, registry lookups, and data extraction kept off the request path",
      "Document signing routed through a dedicated C# service backed by a state signing API",
      "Shared NestJS library (reges-cmn) for axios+retry, MinIO, Kafka config, and validation pipes",
    ],
    solutionsRo: [
      "Workflow-uri asincrone pe Kafka — validare PDF, lookup-uri in registre, extragere date in afara caii cererii",
      "Semnare documente printr-un serviciu C# dedicat backed de un API de semnare al statului",
      "Librarie NestJS comuna (reges-cmn) pentru axios+retry, MinIO, config Kafka, pipe-uri de validare",
    ],
    impactEn: [
      "Principal engineer on the back-office — full ownership of business APIs and the async workflow layer",
      "Access management for delegated representatives and employee accounts in production",
      "Kafka-driven report generation pipeline with horizontal scaling per topic",
    ],
    impactRo: [
      "Inginer principal pe back-office — detinerea completa a API-urilor de business si a stratului de workflow-uri asincrone",
      "Management acces pentru reprezentanti delegati si conturi de angajati in productie",
      "Pipeline de generare rapoarte pe Kafka cu scalare orizontala per topic",
    ],
    tech: ["TypeScript/NestJS", "C#/.NET", "Java", "Kafka", "Kubernetes", "Redis"],
    color: "#34d399",
  },
  {
    title: "VTEX Payment Connectors",
    domain: "Payment Engineering",
    descriptionEn:
      "Payment integrations for European e-commerce clients on the VTEX platform — authorizations, captures, marketplace splits, and refunds wired into VTEX checkout. 11+ providers across 6 countries, all live in production.",
    descriptionRo:
      "Integrari de plati pentru clienti de e-commerce europeni pe platforma VTEX — autorizari, capturi, split-uri marketplace si refund-uri conectate la checkout-ul VTEX. 11+ furnizori in 6 tari, totul live in productie.",
    architectureEn: [
      "TypeScript on VTEX IO — provider-side connector apps integrated with VTEX checkout",
      "Per-provider integrations (auth, capture, refund, settlement, webhooks)",
      "MasterData for distributed locking and stateful flows",
      "Shared multi-seller commission engine for marketplace splits (OBI/Adyen)",
    ],
    architectureRo: [
      "TypeScript pe VTEX IO — aplicatii conector partea furnizor integrate cu checkout-ul VTEX",
      "Integrari per furnizor (auth, capture, refund, settlement, webhook-uri)",
      "MasterData pentru locking distribuit si fluxuri cu stare",
      "Motor comun de comisioane multi-vanzator pentru split-uri marketplace (OBI/Adyen)",
    ],
    challengesEn: [
      "Each provider has its own state machines, webhook contracts, and refund semantics",
      "Marketplace splits with multi-seller commissions across 6+ regulatory environments",
      "Race conditions between webhook arrival and order-state mutation",
    ],
    challengesRo: [
      "Fiecare furnizor are propriile state machines, contracte webhook si semantici de refund",
      "Split-uri marketplace cu comisioane multi-vanzator in 6+ medii de reglementare",
      "Race conditions intre sosirea webhook-ului si mutatia starii comenzii",
    ],
    solutionsEn: [
      "11+ connectors implemented to a common VTEX payment-provider protocol",
      "Multi-seller commission engine with 4 distinct refund flows (full cancel, partial, returns, goodwill) — each recomputing commissions correctly",
      "Distributed locking via MasterData; idempotency keys for webhook dedup",
    ],
    solutionsRo: [
      "11+ conectori implementati la un protocol comun VTEX",
      "Motor de comisioane multi-vanzator cu 4 fluxuri distincte de refund (cancel complet, partial, retur, goodwill) — fiecare recalculand corect comisioanele",
      "Locking distribuit via MasterData; chei de idempotenta pentru deduplicare webhook",
    ],
    impactEn: [
      "11+ payment connectors live in production across DE, PL, FR, RO, BG, and Asia (Adyen, PayU, Oney, P24, Netopia, Mokka, TBI, ING, Stripe, Checkout.com)",
      "OBI/Adyen flagship: ~20K LOC TypeScript, dominant contributor",
      "Klarna partial-capture flows, mixed-cart handling, multi-seller checkouts shipped",
    ],
    impactRo: [
      "11+ conectori de plati live in productie in DE, PL, FR, RO, BG si Asia (Adyen, PayU, Oney, P24, Netopia, Mokka, TBI, ING, Stripe, Checkout.com)",
      "Flagship OBI/Adyen: ~20K LOC TypeScript, contribuitor dominant",
      "Capturi partiale Klarna, cos mixt, checkout-uri multi-vanzator livrate",
    ],
    tech: ["TypeScript", "Node.js", "Adyen API", "VTEX IO"],
    color: "#60a5fa",
  },
  {
    title: "OJP4Danube",
    domain: "EU Transport Integration",
    descriptionEn:
      "An EU project to let travellers plan a single trip across 6 Danube-region countries' public transport networks — each country with its own OJP-XML dialect, journey planner, and border-crossing rules. Delivered solo.",
    descriptionRo:
      "Un proiect EU pentru a permite planificarea unei calatorii unice in retelele de transport public din 6 tari dunarene — fiecare tara cu propriul dialect OJP-XML, planificator si reguli de tranzit. Livrat solo.",
    architectureEn: [
      "TypeScript backend on Firebase Cloud Functions — federated journey planner",
      "Multi-platform Flutter client (web, Android, iOS, Windows) on AsyncRedux + Freezed",
      "Parallel federation across 6 national journey planners",
    ],
    architectureRo: [
      "Backend TypeScript pe Firebase Cloud Functions — planificator de calatorii federat",
      "Client Flutter multi-platforma (web, Android, iOS, Windows) pe AsyncRedux + Freezed",
      "Federare paralela peste 6 planificatoare nationale",
    ],
    challengesEn: [
      "Each country uses its own OJP-XML dialect — schemas, namespaces, and optional fields all vary",
      "Cross-border trips require chaining through exchange points",
      "Three transport modes (bike-only, public-transport, mixed) need separate routing logic",
    ],
    challengesRo: [
      "Fiecare tara foloseste propriul dialect OJP-XML — scheme, namespace-uri, campuri optionale variaza",
      "Calatoriile transfrontaliere necesita inlantuire prin puncte de schimb",
      "Trei moduri de transport (doar bicicleta, transport public, mixt) au nevoie de logica de routing separata",
    ],
    solutionsEn: [
      "XML namespace and schema normalisation layer per country",
      "Exchange-point chaining algorithm with per-mode path resolution",
      "Parallel federation across 6 planners; results merged and ranked",
    ],
    solutionsRo: [
      "Strat de normalizare namespace si schema XML per tara",
      "Algoritm de inlantuire prin puncte de schimb cu rezolvare de cale per mod",
      "Federare paralela peste 6 planificatoare; rezultatele agregate si rankate",
    ],
    impactEn: [
      "307 of 325 commits (94%) — sole architect of backend, client, and CI/CD",
      "6 Danube-region countries served in production",
      "EU OJP standard compliance",
    ],
    impactRo: [
      "307 din 325 commit-uri (94%) — arhitect unic al backend-ului, clientului si CI/CD",
      "6 tari dunarene servite in productie",
      "Conformitate cu standardul EU OJP",
    ],
    tech: ["TypeScript", "Flutter", "Firebase", "OJP/XML"],
    color: "#fbbf24",
  },
  {
    title: "Flow",
    domain: "IoT & Mobility",
    descriptionEn:
      "Real-time IoT backend for an electric scooter rental platform — unlock commands, GPS, battery state over MQTT with a proprietary scooter protocol.",
    descriptionRo:
      "Backend IoT in timp real pentru o platforma de inchiriere trotinete electrice — comenzi de deblocare, GPS, stare baterie prin MQTT cu un protocol proprietar.",
    architectureEn: [
      "Node.js IoT backend — MQTT broker talking directly to scooter controllers",
      "Flutter rider app — Redux + epics, real-time map clustering, MobilePay tokenised payments",
      "Proprietary scooter telemetry protocol (~50 field codes)",
    ],
    architectureRo: [
      "Backend IoT Node.js — broker MQTT comunicand direct cu controlerele trotinetelor",
      "Aplicatie Flutter de rider — Redux + epics, clustering harta in timp real, plati tokenizate MobilePay",
      "Protocol proprietar de telemetrie (~50 coduri de camp)",
    ],
    challengesEn: [
      "Hardware unlock had to confirm reception with no protocol-level guarantees",
      "Telemetry from many scooters at once required parsing variable-rate streams",
      "Cross-platform map clustering had to render thousands of pins on mobile",
    ],
    challengesRo: [
      "Deblocarea hardware trebuia sa confirme receptia fara garantii la nivel de protocol",
      "Telemetria de la multe trotinete simultan necesita parsare de stream-uri cu rata variabila",
      "Clustering-ul hartii cross-platform trebuia sa redeze mii de pini pe mobil",
    ],
    solutionsEn: [
      "Unlock handshake — MQTT command → EventEmitter callback awaiting hardware ACK with a 1.5s timeout",
      "Decoded ~50 telemetry field codes across GPS, BMS cell voltages, ESC firmware",
      "Custom map clustering on Flutter for performance at scale",
    ],
    solutionsRo: [
      "Handshake de deblocare — comanda MQTT → callback EventEmitter asteptand ACK hardware cu timeout 1.5s",
      "Decodat ~50 coduri de telemetrie pentru GPS, voltaje BMS, firmware ESC",
      "Clustering harta custom pe Flutter pentru performanta la scara",
    ],
    impactEn: [
      "Dominant contributor on the IoT backend (56% of commits)",
      "#1 contributor on the Flutter rider app",
      "Production deployment with live telemetry, payments, and ride state",
    ],
    impactRo: [
      "Contribuitor dominant pe backend-ul IoT (56% din commit-uri)",
      "Contribuitor #1 pe aplicatia Flutter de rider",
      "Deployment in productie cu telemetrie live, plati si stare ride",
    ],
    tech: ["Node.js", "MQTT", "MongoDB", "Redis", "Flutter"],
    color: "#f472b6",
  },
  {
    title: "cryptobot",
    domain: "Algorithmic Trading · Research",
    descriptionEn:
      "Personal exploration into systematic crypto trading on Binance — an orchestrated execution framework, not another buy-the-dip script. Built over four months as a sandbox for strategy and architecture ideas, never shipped commercially.",
    descriptionRo:
      "Explorare personala in tranzactionare crypto sistematica pe Binance — un framework de executie orchestrat, nu inca un script buy-the-dip. Construit in patru luni ca sandbox pentru idei de strategie si arhitectura, niciodata livrat comercial.",
    architectureEn: [
      "Python orchestrator with a pluggable Strategy interface",
      "Three execution modes from the same code path — live Binance, BacktestExchange (Redis-backed), PaperBinance",
      "State + Persistence layer (PersistLayer) for crash recovery",
      "Telegram notifications for fills, exceptions, and wallet status",
    ],
    architectureRo: [
      "Orchestrator Python cu interfata Strategy pluggable",
      "Trei moduri de executie din acelasi cod — Binance live, BacktestExchange (backed pe Redis), PaperBinance",
      "Strat de stare si persistenta (PersistLayer) pentru recovery dupa crash",
      "Notificari Telegram pentru fill-uri, exceptii si status wallet",
    ],
    challengesEn: [
      "Multiple strategies needed independent iteration without touching the execution core",
      "Backtests had to share the same code as live runs to avoid drift",
      "A multi-pair live bot will die — open positions can't be lost on restart",
    ],
    challengesRo: [
      "Mai multe strategii necesitau iteratie independenta fara sa atinga core-ul de executie",
      "Backtest-urile trebuiau sa partajeze acelasi cod cu rularile live pentru a evita drift-ul",
      "Un bot multi-pair live va muri — pozitiile deschise nu se pot pierde la restart",
    ],
    solutionsEn: [
      "Orchestrator / Strategy split — strategies are subclasses with four entry points (check_entry, open_position, exit_limits, check_exit)",
      "BacktestExchange replays Redis-backed historical candles through the same orchestrator",
      "PersistLayer hydrates open positions and wallet state on restart; MAX_COINS guard enforced before strategy entry",
    ],
    solutionsRo: [
      "Split Orchestrator / Strategy — strategiile sunt subclase cu patru entry points (check_entry, open_position, exit_limits, check_exit)",
      "BacktestExchange reia candle-urile istorice din Redis prin acelasi orchestrator",
      "PersistLayer hidrateaza pozitiile deschise si starea wallet-ului la restart; guard MAX_COINS aplicat inainte de entry",
    ],
    impactEn: [
      "16 strategy variants run interchangeably (MACD, SAR, ADX, Fractal combinations)",
      "Quantified per-strategy results — win rate, drawdown, fees ratio, average holding time",
      "78 commits across 4 months of active iteration",
      "Open source — github.com/exilonX/cryptobot",
    ],
    impactRo: [
      "16 variante de strategie ruleaza interchangeable (combinatii MACD, SAR, ADX, Fractal)",
      "Rezultate cuantificate per strategie — win rate, drawdown, ratio comisioane, timp mediu de detinere",
      "78 commit-uri pe parcursul a 4 luni de iteratie activa",
      "Open source — github.com/exilonX/cryptobot",
    ],
    tech: ["Python", "python-binance", "Redis", "pytest"],
    color: "#22d3ee",
    link: "https://github.com/exilonX/cryptobot",
    caseStudySlug: "cryptobot",
  },
];

export interface Education {
  degreeEn: string;
  degreeRo: string;
  institutionEn: string;
  institutionRo: string;
  period: string;
  location: string;
}

export const education: Education[] = [
  {
    degreeEn: "BSc Computer Science Engineering",
    degreeRo: "Diploma de Inginer · Calculatoare si Tehnologia Informatiei",
    institutionEn: "Politehnica University of Bucharest · Faculty of Automatic Control and Computers",
    institutionRo: "Universitatea Politehnica Bucuresti · Facultatea de Automatica si Calculatoare",
    period: "2010 — 2014",
    location: "Bucharest, Romania",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    categoryRo: "Limbaje",
    skills: ["TypeScript", "JavaScript", "Dart", "C#", "Java", "Python", "Go", "C++"],
  },
  {
    category: "Backend & APIs",
    categoryRo: "Backend & API-uri",
    skills: ["Node.js", "NestJS", "Express", ".NET Core", "GraphQL", "REST", "Microservices", "MQTT"],
  },
  {
    category: "Frontend & Mobile",
    categoryRo: "Frontend & Mobil",
    skills: ["React", "Flutter", "Angular", "Tailwind CSS", "Redux"],
  },
  {
    category: "Infrastructure",
    categoryRo: "Infrastructura",
    skills: ["Kubernetes", "Docker", "Firebase", "GCP", "Vercel", "GitHub Actions", "Nginx"],
  },
  {
    category: "Data & Messaging",
    categoryRo: "Date & Mesagerie",
    skills: ["Kafka", "Redis", "PostgreSQL", "MongoDB", "MSSQL", "Firestore"],
  },
  {
    category: "Security & Identity",
    categoryRo: "Securitate & Identitate",
    skills: ["NFC/MRTD", "PACE Protocol", "AES-CMAC", "ECDH", "mTLS", "EU DSS", "QES", "Digital Signatures"],
  },
  {
    category: "Domain Expertise",
    categoryRo: "Expertiza de Domeniu",
    skills: ["Payment Systems", "eID/eIDAS", "E-commerce", "Government Platforms", "IoT", "Algorithmic Trading"],
  },
  {
    category: "AI & LLM",
    categoryRo: "AI & LLM",
    skills: ["Claude API", "Gemini API", "MCP Protocol", "Tool Use", "RAG", "NLP", "PyTorch", "fastai"],
  },
];

export const socialLinks = {
  github: "https://github.com/exilonX",
  email: "ionel.merca@gmail.com",
  phone: "+40-730-197-176",
  location: "Bucharest, Romania",
};
