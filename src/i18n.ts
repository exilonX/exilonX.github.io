export type Lang = 'en' | 'ro'

const translations = {
  en: {
    nav: {
      experience: 'Experience',
      projects: 'Projects',
      caseStudies: 'Case Studies',
      skills: 'Skills',
      contact: 'Contact',
    },
    hero: {
      available: 'Available for contract work',
      title: 'Ionel Merca',
      subtitle:
        'Software engineer. 10 years building backends, microservices, and the occasional cryptographic protocol — mostly in places where the cost of being wrong is high: identity, payments, compliance.',
      tagline:
        "Give me a problem and a deadline. I've shipped everything from {crypto}NFC smartcard authentication{/crypto} to {payments}marketplace payment splits across 6 countries{/payments} — usually as the one person who owns it end-to-end.",
      location: 'Based in Bucharest, working across Europe.',
      cta: 'View Projects',
      contact: 'Email Me',
      stats: {
        years: 'Years in Production',
        countries: 'European Markets',
        systems: 'Production Systems',
        languages: 'Languages',
      },
    },
    experience: {
      label: 'Career',
      title: 'Experience',
      subtitle: 'A decade across payments, identity, and government systems.',
      educationLabel: 'Education',
    },
    competencies: {
      cryptoTitle: 'Cryptographic Protocols',
      cryptoDesc:
        'PACE, ECDH, AES-CMAC secure messaging · EU DSS / eIDAS digital signatures and validation · PKI, trust chains, and timestamping · QES · NFC smartcard authentication',
      paymentsTitle: 'Payment Architecture',
      paymentsDesc:
        'Marketplace splits, multi-provider connectors, and commission engines across 6+ European markets',
      microTitle: 'Microservice Platforms',
      microDesc:
        'Event-driven systems with Kafka, Kubernetes, and OpenAPI REST contracts — cross-team coordination on service integrations across TS, Python, C#, and Java backends',
      identityTitle: 'Digital Identity & eID',
      identityDesc:
        'National eID apps, MRTD document reading, QES signing, and push-based authentication for external services',
      aiTitle: 'AI & LLM Integration',
      aiDesc:
        'MCP protocol servers, Claude/Gemini tool-use, agentic patterns, RAG pipelines',
      fullstackTitle: 'Full Stack Development',
      fullstackDesc:
        'Node.js backends, Flutter and React frontends, end-to-end ownership from API contracts to deployment',
      devopsTitle: 'DevOps & Infrastructure',
      devopsDesc:
        'Kubernetes orchestration, Docker, CI/CD pipelines, Nginx, Firebase, GCP, monitoring with Elastic APM',
      vtexTitle: 'VTEX Platform',
      vtexDesc:
        'VTEX IO, VTEX API, MasterData modelling, checkout orchestration, admin apps, and 11+ payment providers across 6+ European markets — plus order lifecycle, catalog, and multi-seller marketplace operations',
      deliveryTitle: 'Requirements to Production',
      deliveryDesc:
        'Translating business requirements into shipped software — scoping, architecture, build, delivery, and production support, usually as the single owner',
    },
    projects: {
      label: 'Portfolio',
      title: 'Projects',
      subtitle:
        'Production systems processing real data, real money, real identities',
    },
    caseStudies: {
      label: 'Discovery',
      title: 'Case Studies',
      subtitle:
        "Long-form breakdowns of specific projects — architecture, numbers, and what didn't work.",
      readMore: 'Read',
    },
    skills: {
      label: 'Stack',
      title: 'Skills & Technologies',
      subtitle: 'The stack and domains behind the projects above.',
    },
    clients: {
      label: 'Clients & Partners',
      title: 'Clients & Markets',
      subtitle:
        "Corporate, government, and payment-platform clients I've shipped production code for.",
      paymentProviders: 'Payment Providers Integrated',
    },
    contact: {
      title: 'Engagements I take',
      subtitle:
        'Back-end contract work in payments, identity, or compliance-heavy systems. End-to-end ownership preferred — architecture, build, deployment, production hardening. European clients, Bucharest timezone, remote.',
      cta: 'Send Email',
      github: 'GitHub',
    },
    footer: {
      built: 'Built with React, TypeScript & Tailwind',
    },
    roles: {
      freelance: 'Freelance Software Engineer',
      vtex: 'Software Engineer',
      researcher: 'NLP Researcher',
      engineer: 'Software Engineer',
    },
    companies: {
      independent: 'Independent',
      vtex: 'VTEX',
      upb: 'University Politehnica Bucharest',
      teamnet: 'Teamnet',
    },
  },
  ro: {
    nav: {
      experience: 'Experienta',
      projects: 'Proiecte',
      caseStudies: 'Studii de caz',
      skills: 'Competente',
      contact: 'Contact',
    },
    hero: {
      available: 'Disponibil pentru contracte',
      title: 'Ionel Merca',
      subtitle:
        'Inginer software. 10 ani construind backend-uri, microservicii si, din cand in cand, protocoale criptografice — in mare parte acolo unde costul unei erori este mare: identitate, plati, conformitate.',
      tagline:
        'Da-mi o problema si un deadline. Am livrat de la {crypto}autentificare NFC cu smartcard{/crypto} la {payments}split-uri de plati marketplace in 6 tari{/payments} — de obicei ca persoana care le detine end-to-end.',
      location: 'In Bucuresti, lucrand in toata Europa.',
      cta: 'Vezi Proiectele',
      contact: 'Trimite-mi Email',
      stats: {
        years: 'Ani in Productie',
        countries: 'Piete Europene',
        systems: 'Sisteme in Productie',
        languages: 'Limbaje',
      },
    },
    experience: {
      label: 'Cariera',
      title: 'Experienta',
      subtitle: 'Un deceniu in plati, identitate si sisteme guvernamentale.',
      educationLabel: 'Studii',
    },
    competencies: {
      cryptoTitle: 'Protocoale Criptografice',
      cryptoDesc:
        'PACE, ECDH, AES-CMAC secure messaging · Semnaturi digitale EU DSS / eIDAS si validare · PKI, lanturi de incredere si timestamping · QES · Autentificare NFC smartcard',
      paymentsTitle: 'Arhitectura de Plati',
      paymentsDesc:
        'Split-uri marketplace, conectori multi-furnizor si motoare de comisioane in 6+ piete europene',
      microTitle: 'Platforme Microservicii',
      microDesc:
        'Sisteme event-driven cu Kafka, Kubernetes si contracte REST OpenAPI — coordonare inter-echipe pe integrari intre servicii in backend-uri TS, Python, C#, Java',
      identityTitle: 'Identitate Digitala & eID',
      identityDesc:
        'Aplicatii nationale eID, citire documente MRTD, semnare QES si autentificare push pentru servicii externe',
      aiTitle: 'AI & Integrare LLM',
      aiDesc:
        'Servere protocol MCP, tool-use Claude/Gemini, pattern-uri agentice, pipeline-uri RAG',
      fullstackTitle: 'Dezvoltare Full Stack',
      fullstackDesc:
        'Backend-uri Node.js, frontend-uri Flutter si React, detinerea end-to-end de la contracte API la deployment',
      devopsTitle: 'DevOps & Infrastructura',
      devopsDesc:
        'Orchestrare Kubernetes, Docker, pipeline-uri CI/CD, Nginx, Firebase, GCP, monitorizare cu Elastic APM',
      vtexTitle: 'Platforma VTEX',
      vtexDesc:
        'VTEX IO, VTEX API, modelare MasterData, orchestrare checkout, aplicatii admin si 11+ furnizori de plati in 6+ piete europene — plus ciclul de viata al comenzii, catalog si operatiuni marketplace multi-vanzator',
      deliveryTitle: 'De la Cerinte la Productie',
      deliveryDesc:
        'Translatarea cerintelor business in software livrat — scoping, arhitectura, build, livrare si suport in productie, de obicei ca unic owner',
    },
    projects: {
      label: 'Portofoliu',
      title: 'Proiecte',
      subtitle:
        'Sisteme in productie procesand date reale, bani reali, identitati reale',
    },
    caseStudies: {
      label: 'Analize',
      title: 'Case Studies',
      subtitle:
        'Analize detaliate ale unor proiecte — arhitectura, cifre si ce nu a functionat.',
      readMore: 'Citeste',
    },
    skills: {
      label: 'Tehnologii',
      title: 'Competente & Tehnologii',
      subtitle: 'Stiva si domeniile din spatele proiectelor de mai sus.',
    },
    clients: {
      label: 'Clienti & Parteneri',
      title: 'Clienti si Piete',
      subtitle:
        'Clienti corporativi, guvernamentali si platforme de plati pentru care am livrat cod in productie.',
      paymentProviders: 'Furnizori de Plati Integrati',
    },
    contact: {
      title: 'Tipuri de colaborare',
      subtitle:
        'Contracte de backend in plati, identitate sau sisteme cu cerinte stricte de conformitate. Preferabil cu detinerea end-to-end — arhitectura, build, deployment, hardening in productie. Clienti europeni, fus orar Bucuresti, remote.',
      cta: 'Trimite Email',
      github: 'GitHub',
    },
    footer: {
      built: 'Construit cu React, TypeScript & Tailwind',
    },
    roles: {
      freelance: 'Inginer Software Freelance',
      vtex: 'Inginer Software',
      researcher: 'Cercetator NLP',
      engineer: 'Inginer Software',
    },
    companies: {
      independent: 'Independent',
      vtex: 'VTEX',
      upb: 'Universitatea Politehnica Bucuresti',
      teamnet: 'Teamnet',
    },
  },
} as const

export type Translations = typeof translations.en

export function t(lang: Lang): Translations {
  return translations[lang] as Translations
}
