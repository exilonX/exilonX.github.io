import { useApp } from "../context";
import { t } from "../i18n";
import { projects, type Project } from "../data/portfolio";
import { useFadeIn } from "../hooks/useFadeIn";

export function Projects() {
  const { lang } = useApp();
  const tr = t(lang);
  const ref = useFadeIn<HTMLElement>();

  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <section id="projects" className="py-24 px-6 fade-in" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="section-label">{tr.projects.label}</div>
        <h2 className="text-3xl md:text-5xl font-bold text-text mb-2">{tr.projects.title}</h2>
        <p className="text-text-muted mb-12">{tr.projects.subtitle}</p>

        <ProjectCard project={featured} lang={lang} featured />

        <div className="mt-6 space-y-6">
          {rest.map((project, i) => (
            <ProjectCard key={i} project={project} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, lang, featured = false }: { project: Project; lang: "en" | "ro"; featured?: boolean }) {
  const description = lang === "en" ? project.descriptionEn : project.descriptionRo;
  const architecture = lang === "en" ? project.architectureEn : project.architectureRo;
  const challenges = lang === "en" ? project.challengesEn : project.challengesRo;
  const solutions = lang === "en" ? project.solutionsEn : project.solutionsRo;
  const impact = lang === "en" ? project.impactEn : project.impactRo;

  const sectionLabels = {
    architecture: lang === "en" ? "Architecture" : "Arhitectura",
    challenges: lang === "en" ? "Key Challenges" : "Provocari cheie",
    solutions: lang === "en" ? "Solutions" : "Solutii",
    impact: lang === "en" ? "Impact" : "Impact",
  };

  return (
    <div
      className={`glass-card relative overflow-hidden ${
        featured ? "rounded-2xl p-8 md:p-10" : "rounded-xl p-6 md:p-8"
      }`}
    >
      <div
        className={`absolute rounded-full ${
          featured ? "top-0 right-0 w-64 h-64 blur-[100px] opacity-20" : "-top-10 -right-10 w-40 h-40 blur-[80px] opacity-15"
        }`}
        style={{ background: project.color }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: project.color }} />
          <span className="text-xs font-semibold uppercase tracking-wider text-text-faint">
            {project.domain}
          </span>
          <div className="ml-auto flex items-center gap-3">
            {project.caseStudySlug && (
              <a
                href={`#/case-study/${project.caseStudySlug}`}
                className="text-xs text-primary hover:underline"
              >
                Case study &rarr;
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline"
              >
                GitHub &rarr;
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className={`font-bold text-text mb-3 ${featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}>
          {project.title}
        </h3>

        {/* Overview */}
        <p className={`text-text-muted leading-relaxed mb-6 max-w-3xl ${featured ? "text-base md:text-lg" : "text-sm md:text-base"}`}>
          {description}
        </p>

        {/* Sections grid */}
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
          <Section label={sectionLabels.architecture} items={architecture} color={project.color} />
          <Section label={sectionLabels.impact} items={impact} color={project.color} />
          <Section label={sectionLabels.challenges} items={challenges} color={project.color} />
          <Section label={sectionLabels.solutions} items={solutions} color={project.color} />
        </div>

        {/* Tech */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
          {project.tech.map((tech) => (
            <span key={tech} className="skill-badge text-xs py-0.5 px-2">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({ label, items, color }: { label: string; items: string[]; color: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color }}>
        {label}
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-text-muted leading-relaxed flex gap-2">
            <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ background: color }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
