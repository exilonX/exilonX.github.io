import { useApp } from "../context";
import { t } from "../i18n";

export function Footer() {
  const { lang } = useApp();
  const tr = t(lang);

  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-faint">
        <span>&copy; {new Date().getFullYear()} Ionel Merca</span>
        <span>{tr.footer.built}</span>
      </div>
    </footer>
  );
}
