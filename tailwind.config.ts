import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cream: {
          base: "#FDF6E3", // Solarized Base3 - Warm Cream
          dark: "#FAFAF9", // Warm Stone
          text: "#1c1917", // Warm Black
          muted: "#57534e", // Warm Grey
          accent: "#44403c", // Dark Warm Grey
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
        mono: ["var(--font-roboto-mono)", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
