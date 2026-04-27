import { useApp } from "../context";
import { t } from "../i18n";
import { skillGroups } from "../data/portfolio";
import { useFadeIn } from "../hooks/useFadeIn";

export function Skills() {
  const { lang } = useApp();
  const tr = t(lang);
  const ref = useFadeIn<HTMLElement>();

  return (
    <section id="skills" className="py-24 px-6 fade-in" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="section-label">{tr.skills.label}</div>
        <h2 className="text-3xl md:text-5xl font-bold text-text mb-2">{tr.skills.title}</h2>
        <p className="text-text-muted mb-12">{tr.skills.subtitle}</p>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 stagger-children visible">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="glass-card rounded-xl p-5"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">
                {lang === "en" ? group.category : group.categoryRo}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
