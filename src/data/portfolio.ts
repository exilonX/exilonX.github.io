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
  highlightsEn: string[];
  highlightsRo: string[];
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
      "Masters in Artificial Intelligence — Computer Vision, Data Mining, Knowledge Representation",
      "Built NLP recommendation system for matching project descriptions to relevant documentation",
    ],
    descriptionRo: [
      "Master in Inteligenta Artificiala — Computer Vision, Data Mining, Reprezentarea Cunostintelor",
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
      "Romania's national electronic identity mobile application. The NFC chip stack on the phone plus the identity-verification and request-security layer on the backend — delivered across the mobile client, Node.js backend, and Python verification service.",
    descriptionRo:
      "Aplicatia mobila nationala de identitate electronica a Romaniei. Stiva NFC a chip-ului pe telefon plus stratul de verificare a identitatii si securitate a cererilor pe backend — livrata pe clientul mobil, backend-ul Node.js si serviciul de verificare Python.",
    highlightsEn: [
      "Owned the full crypto/NFC stack — dmrtd Dart fork, Flutter readers, Node.js backend, Python verification",
      "PACE and Chip Authentication on brainpoolP256r1 with AES-CMAC secure messaging. Split-PACE — the phone never holds ephemeral session keys, the backend does",
      "Backend request-security boundary — signed and encrypted request channel with cached asymmetric keys, and Passive Authentication against Romanian CSCA trust chains",
      "Identity-verification pipeline — MRZ/CNP/QES cross-reference, enterprise IDM integration, cloud liveness verification, and government face/address database matching",
      "QES via PKI applet (SHA-384) with TSA-stamped PDFs, and a push-authentication module (tap-to-approve) for external-service logins",
    ],
    highlightsRo: [
      "Am detinut tot stack-ul crypto/NFC — fork dmrtd Dart, cititoare Flutter, backend Node.js, verificare Python",
      "PACE si Chip Authentication pe brainpoolP256r1 cu AES-CMAC secure messaging. Split-PACE — telefonul nu detine niciodata chei de sesiune, backend-ul da",
      "Boundary de securitate a cererilor pe backend — canal de cereri semnate si criptate cu chei asimetrice cache-uite, si Passive Authentication pe lanturi CSCA romanesti",
      "Pipeline de verificare a identitatii — cross-reference MRZ/CNP/QES, integrare IDM enterprise, verificare liveness in cloud si potrivire pe baza de date guvernamentala fata/adresa",
      "QES via applet PKI (SHA-384) cu PDF-uri cu timestamp TSA si modul push de autentificare (tap-to-approve) pentru login la servicii externe",
    ],
    tech: ["Flutter/Dart", "Node.js", "Python", "NFC", "PACE", "ECDH", "AES-CMAC"],
    color: "#a78bfa",
    link: "https://github.com/exilonX/dmrtd",
  },
  {
    title: "REGES",
    domain: "Government Platform",
    descriptionEn:
      "The back-office of Romania's Labor Inspection platform — services used internally by labor inspectors to manage registry access, run verification workflows, and generate signed reports. Front-office is owned by a separate team.",
    descriptionRo:
      "Back-office-ul platformei Inspectiei Muncii din Romania — servicii folosite intern de inspectorii de munca pentru managementul accesului la registru, rularea workflow-urilor de verificare si generarea rapoartelor semnate. Front-office-ul este detinut de o echipa separata.",
    highlightsEn: [
      "Principal engineer on the back-office — full ownership of the business APIs and the async workflow layer",
      "Access management APIs — labor inspectors approve or reject registry access for delegated representatives and employee accounts",
      "Async verification workflows on Kafka — PDF signature validation, external registry lookups, and data extraction kept off the request path",
      "Report generation pipeline — back-office trigger, Kafka-driven PDF assembly, signed via the platform's signing service",
      "Multi-language microservices — TypeScript/NestJS for business logic, C#/.NET for document signing, Java for signature validation. Kafka, Kubernetes, mTLS-bounded ingress",
    ],
    highlightsRo: [
      "Inginer principal pe back-office — detinerea completa a API-urilor de business si a stratului de workflow-uri asincrone",
      "API-uri de management acces — inspectorii de munca aproba sau resping accesul la registru pentru reprezentanti delegati si conturi de angajati",
      "Workflow-uri asincrone de verificare pe Kafka — validare semnaturi PDF, lookup-uri in registre externe si extragere de date, in afara caii cererii",
      "Pipeline de generare rapoarte — declansat din back-office, asamblare PDF pe Kafka, semnat prin serviciul de semnare al platformei",
      "Microservicii multi-limbaj — TypeScript/NestJS pentru business logic, C#/.NET pentru semnare documente, Java pentru validare semnaturi. Kafka, Kubernetes, ingress cu mTLS",
    ],
    tech: ["TypeScript/NestJS", "C#/.NET", "Java", "Kafka", "Kubernetes", "Redis"],
    color: "#34d399",
  },
  {
    title: "VTEX Payment Connectors",
    domain: "Payment Engineering",
    descriptionEn:
      "Payment integrations for European e-commerce clients on the VTEX platform — authorizations, captures, marketplace splits, and refunds wired into VTEX checkout. 11+ providers across 6 countries, each with its own regulatory and edge-case landscape. All live in production.",
    descriptionRo:
      "Integrari de plati pentru clienti de e-commerce europeni pe platforma VTEX — autorizari, capturi, split-uri marketplace si refund-uri conectate la checkout-ul VTEX. 11+ furnizori in 6 tari, fiecare cu propriul peisaj de reglementari si cazuri speciale. Totul live in productie.",
    highlightsEn: [
      "11+ connectors across DE, PL, FR, RO, BG, and Asia — Adyen, PayU, Oney, P24, Netopia, Mokka, TBI, ING, Stripe, Checkout.com",
      "OBI/Adyen flagship: marketplace split payments with multi-seller commission computation (~20K LOC, dominant contributor)",
      "4 distinct refund flows (full cancel, partial, returns, goodwill) each recomputing commissions correctly",
      "Klarna partial-capture flows, mixed-cart handling, distributed locking via MasterData for race conditions",
    ],
    highlightsRo: [
      "11+ conectori in DE, PL, FR, RO, BG si Asia — Adyen, PayU, Oney, P24, Netopia, Mokka, TBI, ING, Stripe, Checkout.com",
      "Flagship OBI/Adyen: split payments marketplace cu calcul comisioane multi-vanzator (~20K LOC, contribuitor dominant)",
      "4 fluxuri distincte de refund (cancel complet, partial, retur, goodwill) fiecare recalculand corect comisioanele",
      "Capturi partiale Klarna, cos mixt, locking distribuit via MasterData pentru race conditions",
    ],
    tech: ["TypeScript", "Node.js", "Adyen API", "VTEX IO"],
    color: "#60a5fa",
  },
  {
    title: "OJP4Danube",
    domain: "EU Transport Integration",
    descriptionEn:
      "An EU project to let travellers plan a single trip across 6 Danube-region countries' public transport networks — each country with its own OJP-XML dialect, journey planner, and border-crossing rules. Delivered solo: backend, client, infra.",
    descriptionRo:
      "Un proiect EU pentru a permite planificarea unei calatorii unice in retelele de transport public din 6 tari dunarene — fiecare tara cu propriul dialect OJP-XML, planificator si reguli de tranzit. Livrat solo: backend, client, infrastructura.",
    highlightsEn: [
      "307 of 325 commits (94%) — sole architect of backend routing engine, Flutter client, and CI/CD",
      "Federates 6 national journey planners in parallel, normalising XML namespace differences per country",
      "Cross-border trip chaining through exchange points with separate paths for bike-only, public-transport, and mixed modes",
      "Multi-platform Flutter client (web, Android, iOS, Windows) on AsyncRedux + Freezed",
    ],
    highlightsRo: [
      "307 din 325 commit-uri (94%) — arhitect unic al backend-ului de routing, al clientului Flutter si CI/CD",
      "Federeaza 6 planificatoare nationale in paralel, normalizand diferentele de namespace XML per tara",
      "Inlantuirea calatoriilor transfrontaliere prin puncte de schimb cu cai separate pentru bicicleta, transport public si mixt",
      "Client Flutter multi-platforma (web, Android, iOS, Windows) pe AsyncRedux + Freezed",
    ],
    tech: ["TypeScript", "Flutter", "Firebase", "OJP/XML"],
    color: "#fbbf24",
  },
  {
    title: "Flow",
    domain: "IoT & Mobility",
    descriptionEn:
      "Real-time IoT backend for an electric scooter rental platform — unlock commands, GPS, battery state over MQTT with a proprietary scooter protocol. The rider app surfaced live ride telemetry and handled tokenised payments.",
    descriptionRo:
      "Backend IoT in timp real pentru o platforma de inchiriere trotinete electrice — comenzi de deblocare, GPS, stare baterie prin MQTT cu un protocol proprietar. Aplicatia de rider afisa telemetrie live si gestiona plati tokenizate.",
    highlightsEn: [
      "Dominant contributor on the IoT backend (56% of commits) — MQTT broker talking directly to scooter controllers",
      "Decoded the proprietary telemetry protocol — ~50 field codes across GPS, BMS cell voltages, ESC firmware",
      "Unlock handshake: MQTT command → EventEmitter callback awaiting hardware ACK with 1.5s timeout",
      "Also #1 on the Flutter rider app — Redux + epics, map clustering, MobilePay EU tokenised payments",
    ],
    highlightsRo: [
      "Contribuitor dominant pe backend-ul IoT (56% din commit-uri) — broker MQTT comunicand direct cu controlerele",
      "Am decodat protocolul proprietar de telemetrie — ~50 coduri de camp pentru GPS, voltaje BMS, firmware ESC",
      "Handshake de deblocare: comanda MQTT → callback EventEmitter asteptand ACK hardware cu timeout 1.5s",
      "Si #1 pe aplicatia Flutter — Redux + epics, clustering harta, plati tokenizate MobilePay EU",
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
    highlightsEn: [
      "Orchestrator pattern decoupling signal generation from order execution and wallet state",
      "Pluggable strategy interface with 16 variants — MACD, SAR, ADX, and Fractal combinations",
      "Redis-backed backtesting harness with quantified per-strategy results (win rate, drawdown, fees ratio)",
    ],
    highlightsRo: [
      "Pattern de orchestrator care decupleaza generarea semnalelor de executia ordinelor si starea wallet-ului",
      "Interfata pluggable de strategie cu 16 variante — combinatii MACD, SAR, ADX si Fractal",
      "Harness de backtesting bazat pe Redis cu rezultate cuantificate per strategie (win rate, drawdown, ratio comisioane)",
    ],
    tech: ["Python", "python-binance", "Redis", "pytest"],
    color: "#22d3ee",
    link: "https://github.com/exilonX/cryptobot",
    caseStudySlug: "cryptobot",
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
