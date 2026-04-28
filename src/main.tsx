import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "./context";
import "@fontsource-variable/inter/index.css";
import "./index.css";
import App from "./App";

// Apply theme before first paint to prevent flash
const saved = localStorage.getItem("theme");
const dark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
document.documentElement.classList.toggle("dark", dark);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);
