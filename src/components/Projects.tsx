import { useApp } from "../context";
import { t } from "../i18n";
import { projects } from "../data/portfolio";
import { useFadeIn } from "../hooks/useFadeIn";

export function Projects() {
  const { lang } = useApp();
  const tr = t(lang);
  const ref = useFadeIn<HTMLElement>();

  return (
    <section id="projects" className="py-24 px-6 fade-in" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="section-label">{tr.projects.label}</div>
        <h2 className="text-3xl md:text-5xl font-bold text-text mb-2">{tr.projects.title}</h2>
        <p className="text-text-muted mb-12">{tr.projects.subtitle}</p>

        {/* Featured project (ROeID) */}
        <div className="glass-card rounded-2xl p-8 mb-6 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-20"
            style={{ background: projects[0].color }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full" style={{ background: projects[0].color }} />
              <span className="text-xs font-semibold uppercase tracking-wider text-text-faint">
                {projects[0].domain}
              </span>
              {projects[0].link && (
                <a
                  href={projects[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-xs text-primary hover:underline"
                >
                  GitHub &rarr;
                </a>
              )}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-text mb-3">{projects[0].title}</h3>
            <p className="text-text-muted leading-relaxed mb-6 max-w-3xl">
              {lang === "en" ? projects[0].descriptionEn : projects[0].descriptionRo}
            </p>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 mb-6">
              {(lang === "en" ? projects[0].highlightsEn : projects[0].highlightsRo).map((h, j) => (
                <div key={j} className="flex gap-2 text-sm text-text-muted">
                  <span style={{ color: projects[0].color }} className="shrink-0">&bull;</span>
                  {h}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {projects[0].tech.map((tech) => (
                <span key={tech} className="skill-badge">{tech}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Rest of projects grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.slice(1).map((project, i) => (
            <div
              key={i}
              className="glass-card rounded-xl p-6 relative overflow-hidden flex flex-col"
            >
              <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-15"
                style={{ background: project.color }}
              />
              <div className="relative z-10 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
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

                <h3 className="text-xl font-bold text-text mb-2">{project.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed mb-4 flex-1">
                  {lang === "en" ? project.descriptionEn : project.descriptionRo}
                </p>

                <ul className="space-y-1 mb-4">
                  {(lang === "en" ? project.highlightsEn : project.highlightsRo).map((h, j) => (
                    <li key={j} className="text-xs text-text-faint flex gap-2">
                      <span style={{ color: project.color }} className="shrink-0">&bull;</span>
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-border">
                  {project.tech.map((tech) => (
                    <span key={tech} className="skill-badge text-xs py-0.5 px-2">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
