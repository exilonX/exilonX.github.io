import { useApp } from "../context";
import { t } from "../i18n";
import { socialLinks } from "../data/portfolio";
import { useFadeIn } from "../hooks/useFadeIn";

export function Contact() {
  const { lang } = useApp();
  const tr = t(lang);
  const ref = useFadeIn<HTMLElement>();

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden fade-in" ref={ref}>
      {/* Background glow */}
      <div
        className="glow-orb w-[400px] h-[400px] top-0 left-1/2 -translate-x-1/2"
        style={{ background: "hsl(var(--primary-h) var(--primary-s) var(--primary-l))" }}
      />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-text mb-6">{tr.contact.title}</h2>
        <p className="text-text-muted leading-relaxed mb-10 text-lg">{tr.contact.subtitle}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href={`mailto:${socialLinks.email}`}
            className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all text-center"
          >
            {tr.contact.cta}
          </a>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 glass-card rounded-xl font-medium text-text text-center hover:transform-none"
          >
            {tr.contact.github} &rarr;
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-text-faint">
          <span>{socialLinks.location}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>{socialLinks.phone}</span>
        </div>
      </div>
    </section>
  );
}
