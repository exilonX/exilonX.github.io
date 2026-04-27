import { useApp } from "../context";
import { t } from "../i18n";
import { experiences } from "../data/portfolio";
import { useFadeIn } from "../hooks/useFadeIn";

const competencyIcons = {
  crypto: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  payments: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  micro: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  identity: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  ai: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.27A7 7 0 0 1 8 18.27V20H7a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a5 5 0 0 1 5-5V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
    </svg>
  ),
  fullstack: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  devops: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  ),
  vtex: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" />
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="17" cy="20" r="1.5" />
    </svg>
  ),
  delivery: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
};

export function Experience() {
  const { lang } = useApp();
  const tr = t(lang);
  const ref = useFadeIn<HTMLElement>();

  const competencies = [
    { icon: competencyIcons.fullstack, title: tr.competencies.fullstackTitle, desc: tr.competencies.fullstackDesc },
    { icon: competencyIcons.micro, title: tr.competencies.microTitle, desc: tr.competencies.microDesc },
    { icon: competencyIcons.delivery, title: tr.competencies.deliveryTitle, desc: tr.competencies.deliveryDesc },
    { icon: competencyIcons.vtex, title: tr.competencies.vtexTitle, desc: tr.competencies.vtexDesc },
    { icon: competencyIcons.payments, title: tr.competencies.paymentsTitle, desc: tr.competencies.paymentsDesc },
    { icon: competencyIcons.crypto, title: tr.competencies.cryptoTitle, desc: tr.competencies.cryptoDesc },
    { icon: competencyIcons.identity, title: tr.competencies.identityTitle, desc: tr.competencies.identityDesc },
    { icon: competencyIcons.devops, title: tr.competencies.devopsTitle, desc: tr.competencies.devopsDesc },
    { icon: competencyIcons.ai, title: tr.competencies.aiTitle, desc: tr.competencies.aiDesc },
  ];

  return (
    <section id="experience" className="py-24 px-6 fade-in" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="section-label">{tr.experience.label}</div>
        <h2 className="text-3xl md:text-5xl font-bold text-text mb-2">{tr.experience.title}</h2>
        <p className="text-text-muted mb-12">{tr.experience.subtitle}</p>

        {/* Competency grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {competencies.map((c) => (
            <div key={c.title} className="glass-card rounded-xl p-5 flex gap-4">
              <div className="text-primary shrink-0 mt-0.5">{c.icon}</div>
              <div>
                <h3 className="font-semibold text-text text-sm mb-1">{c.title}</h3>
                <p className="text-xs text-text-faint leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div key={i} className="relative pl-12 md:pl-16">
                <div
                  className="absolute left-4 md:left-6 top-6 w-2.5 h-2.5 rounded-full border-2 border-primary bg-bg"
                  style={{ transform: "translateX(-50%)" }}
                />

                <div className="glass-card rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-text">
                        {tr.roles[exp.roleKey as keyof typeof tr.roles]}
                      </h3>
                      <p className="text-primary text-sm font-medium">
                        {tr.companies[exp.companyKey as keyof typeof tr.companies]}
                      </p>
                    </div>
                    <span className="text-xs text-text-faint whitespace-nowrap mt-1">
                      {exp.period} &middot; {exp.location}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {(lang === "en" ? exp.descriptionEn : exp.descriptionRo).map((desc, j) => (
                      <li key={j} className="text-text-muted text-sm leading-relaxed flex gap-2">
                        <span className="text-primary mt-0.5 shrink-0">&rsaquo;</span>
                        {desc}
                      </li>
                    ))}
                  </ul>

                  {exp.caseStudy && (
                    <a
                      href={`#/case-study/${exp.caseStudy.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline mb-4"
                    >
                      &rarr; {lang === "en" ? exp.caseStudy.labelEn : exp.caseStudy.labelRo}
                    </a>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((tech) => (
                      <span key={tech} className="skill-badge text-xs py-0.5 px-2">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
