import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Lang } from "./i18n";

interface AppContext {
  lang: Lang;
  setLang: (l: Lang) => void;
  dark: boolean;
  toggleTheme: () => void;
}

const Ctx = createContext<AppContext>(null!);

// Server-render defaults, which are also the browser's FIRST render — otherwise
// hydration mismatches. The prerendered HTML is English, and its <title>,
// canonical and Open Graph tags all describe the English page, so "en" is the
// only self-consistent choice here. Real preferences load in the effect below.
const SSR_LANG: Lang = "en";
const SSR_DARK = true;

interface Prefs {
  lang: Lang;
  dark: boolean;
  /** False until the browser-only preferences have been read. */
  ready: boolean;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>({ lang: SSR_LANG, dark: SSR_DARK, ready: false });
  const { lang, dark, ready } = prefs;

  // Pass two: adopt the visitor's actual preferences once we're in the browser.
  // Kept as a single state object so this costs exactly one extra render.
  useEffect(() => {
    const urlLang = new URLSearchParams(window.location.search).get("lang");
    const savedLang = localStorage.getItem("lang");
    const savedTheme = localStorage.getItem("theme");

    // URL param beats localStorage, which beats the browser's language.
    const nextLang: Lang =
      urlLang === "ro" || urlLang === "en"
        ? urlLang
        : savedLang === "ro" || savedLang === "en"
          ? savedLang
          : navigator.language.startsWith("ro")
            ? "ro"
            : SSR_LANG;

    const nextDark = savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Deliberate two-pass render: localStorage/navigator/matchMedia don't exist
    // on the server, so the visitor's real preferences can't be known until after
    // mount. Reading them in the useState initializer instead would desync the
    // first client render from the prerendered HTML and break hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefs({ lang: nextLang, dark: nextDark, ready: true });
  }, []);

  // The `ready` guard stops these from running on the first render and writing
  // the SSR defaults over preferences the effect above hasn't read yet.
  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang, ready]);

  // Only an explicit toggle writes ?lang= to the URL. Doing it on every load (as
  // this used to) minted /?lang=en and /?lang=ro as separate crawlable URLs —
  // both are in Search Console today as duplicates of "/".
  const setLang = (l: Lang) => {
    setPrefs((p) => ({ ...p, lang: l }));
    const url = new URL(window.location.href);
    url.searchParams.set("lang", l);
    window.history.replaceState({}, "", url.toString());
  };

  const toggleTheme = () => setPrefs((p) => ({ ...p, dark: !p.dark }));

  return (
    <Ctx.Provider value={{ lang, setLang, dark, toggleTheme }}>{children}</Ctx.Provider>
  );
}

export function useApp() {
  return useContext(Ctx);
}
