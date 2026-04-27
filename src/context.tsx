import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Lang } from "./i18n";

interface AppContext {
  lang: Lang;
  setLang: (l: Lang) => void;
  dark: boolean;
  toggleTheme: () => void;
}

const Ctx = createContext<AppContext>(null!);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const urlLang = new URLSearchParams(window.location.search).get("lang");
    if (urlLang === "ro" || urlLang === "en") return urlLang;
    const saved = localStorage.getItem("lang");
    if (saved === "ro" || saved === "en") return saved;
    return navigator.language.startsWith("ro") ? "ro" : "en";
  });

  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url.toString());
  }, [lang]);

  return (
    <Ctx.Provider value={{ lang, setLang, dark, toggleTheme: () => setDark((d) => !d) }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  return useContext(Ctx);
}
