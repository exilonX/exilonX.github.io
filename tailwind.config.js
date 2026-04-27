/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg))",
        "bg-card": "hsl(var(--bg-card) / <alpha-value>)",
        "bg-muted": "hsl(var(--bg-muted))",
        text: "hsl(var(--text))",
        "text-muted": "hsl(var(--text-muted))",
        "text-faint": "hsl(var(--text-faint))",
        border: "hsl(var(--border))",
        primary: "hsl(var(--primary-h) var(--primary-s) var(--primary-l))",
        accent: "hsl(var(--accent-h) var(--accent-s) var(--accent-l))",
        emerald: "hsl(var(--emerald-h) var(--emerald-s) var(--emerald-l))",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
}
