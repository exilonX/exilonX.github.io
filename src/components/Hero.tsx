import type { JSX } from "react";
import { useApp } from "../context";
import { t } from "../i18n";
import { socialLinks } from "../data/portfolio";

const highlightColors: Record<string, string> = {
  crypto: "text-accent",
  payments: "text-primary",
};

function renderTagline(tagline: string) {
  // Parse {tag}text{/tag} patterns into highlighted spans
  const parts: JSX.Element[] = [];
  let remaining = tagline;
  let key = 0;

  while (remaining.length > 0) {
    const match = remaining.match(/\{(\w+)\}(.*?)\{\/\1\}/);
    if (!match) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }

    const beforeMatch = remaining.slice(0, match.index!);
    if (beforeMatch) {
      parts.push(<span key={key++}>{beforeMatch}</span>);
    }

    const tag = match[1];
    const text = match[2];
    const colorClass = highlightColors[tag] || "text-primary";
    parts.push(
      <span key={key++} className={`${colorClass} font-medium`}>
        {text}
      </span>
    );

    remaining = remaining.slice(match.index! + match[0].length);
  }

  return parts;
}

export function Hero() {
  const { lang } = useApp();
  const tr = t(lang);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden dot-grid">
      {/* Subtle glow orbs */}
      <div
        className="glow-orb w-[600px] h-[600px] -top-40 -left-48"
        style={{ background: "hsl(var(--primary-h) var(--primary-s) var(--primary-l))" }}
      />
      <div
        className="glow-orb w-[500px] h-[500px] -bottom-32 -right-40"
        style={{
          background: "hsl(var(--accent-h) var(--accent-s) var(--accent-l))",
          animationDelay: "4s",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 pt-20">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card text-sm text-text-muted mb-10 cursor-default hover:transform-none">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-90" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
          </span>
          <span className="text-emerald-400 font-medium">{tr.hero.available}</span>
        </div>

        {/* Name */}
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-4">
          <span className="text-gradient">{tr.hero.title}</span>
        </h1>

        {/* Subtitle — intro + positioning in one */}
        <p className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto mb-5 leading-relaxed">
          {tr.hero.subtitle}
        </p>

        {/* Tagline with highlighted keywords */}
        <p className="text-base md:text-lg text-text-faint max-w-3xl mx-auto mb-3 leading-relaxed">
          {renderTagline(tr.hero.tagline)}
        </p>

        {/* Location */}
        <p className="text-sm text-text-faint mb-10">
          {tr.hero.location}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="#projects"
            className="px-7 py-3.5 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all"
          >
            {tr.hero.cta}
          </a>
          <a
            href={`mailto:${socialLinks.email}`}
            className="px-7 py-3.5 glass-card rounded-xl font-medium text-text hover:transform-none"
          >
            {tr.hero.contact}
          </a>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 glass-card rounded-xl font-medium text-text hover:transform-none"
          >
            GitHub
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          {[
            { value: "10+", label: tr.hero.stats.years },
            { value: "6+", label: tr.hero.stats.countries },
            { value: "7+", label: tr.hero.stats.systems },
            { value: "5+", label: tr.hero.stats.languages },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-4 cursor-default hover:transform-none">
              <div className="text-3xl font-bold text-gradient">{stat.value}</div>
              <div className="text-xs text-text-faint mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
