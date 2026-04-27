import { useState, useEffect } from "react";
import { useApp } from "../context";
import { t } from "../i18n";

function GBFlag() {
  return (
    <svg width="18" height="13" viewBox="0 0 60 42" className="inline-block shrink-0 rounded-sm">
      <rect width="60" height="42" fill="#012169" />
      <path d="M0,0 L60,42 M60,0 L0,42" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,42 M60,0 L0,42" stroke="#C8102E" strokeWidth="2.5" />
      <rect x="25" width="10" height="42" fill="#fff" />
      <rect y="16" width="60" height="10" fill="#fff" />
      <rect x="27" width="6" height="42" fill="#C8102E" />
      <rect y="18" width="60" height="6" fill="#C8102E" />
    </svg>
  );
}

function ROFlag() {
  return (
    <svg width="18" height="13" viewBox="0 0 3 2" className="inline-block shrink-0 rounded-sm">
      <rect width="1" height="2" fill="#002B7F" />
      <rect x="1" width="1" height="2" fill="#FCD116" />
      <rect x="2" width="1" height="2" fill="#CE1126" />
    </svg>
  );
}

export function Nav() {
  const { lang, setLang, dark, toggleTheme } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const tr = t(lang);

  const links = [
    { label: tr.nav.experience, href: "#experience" },
    { label: tr.nav.projects, href: "#projects" },
    { label: tr.nav.skills, href: "#skills" },
    { label: tr.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-gradient">
          IM
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted hover:text-text transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Lang toggle — shows target language */}
          <button
            onClick={() => setLang(lang === "en" ? "ro" : "en")}
            className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-md border border-border text-text-muted hover:text-text hover:border-primary transition-all"
            aria-label={lang === "en" ? "Switch to Romanian" : "Switch to English"}
          >
            {lang === "en" ? <ROFlag /> : <GBFlag />}
            {lang === "en" ? "RO" : "EN"}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md border border-border text-text-muted hover:text-text hover:border-primary transition-all"
            aria-label="Toggle theme"
          >
            {dark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "ro" : "en")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded border border-border text-text-muted"
            aria-label={lang === "en" ? "Switch to Romanian" : "Switch to English"}
          >
            {lang === "en" ? <ROFlag /> : <GBFlag />}
            {lang === "en" ? "RO" : "EN"}
          </button>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded border border-border text-text-muted"
            aria-label="Toggle theme"
          >
            {dark ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            )}
          </button>
          <button
            className="p-1.5 text-text-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-bg/95 backdrop-blur-xl border-b border-border px-6 pb-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-text-muted hover:text-text transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
