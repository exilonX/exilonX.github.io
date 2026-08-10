import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { AppProvider } from "./context";
import "@fontsource-variable/inter/index.css";
import "./index.css";
import App from "./App";

// Apply theme before first paint to prevent flash. This targets <html>, outside
// React's tree, so it can't cause a hydration mismatch.
const saved = localStorage.getItem("theme");
const dark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
document.documentElement.classList.toggle("dark", dark);

const container = document.getElementById("root")!;
const tree = (
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);

// Production HTML arrives prerendered by scripts/seo-postbuild.mjs, so adopt it
// rather than re-rendering over it. `npm run dev` serves an empty #root, where
// hydrateRoot would warn — hence the branch.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
