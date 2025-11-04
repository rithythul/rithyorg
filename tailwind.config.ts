import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-roboto-mono)"],
      },
      colors: {
        solarized: {
          // Solarized Light theme colors
          base03: "#002b36", // darkest
          base02: "#073642",
          base01: "#586e75", // emphasis
          base00: "#657b83", // body text
          base0: "#839496", // secondary text
          base1: "#93a1a1", // muted text
          base2: "#eee8d5", // subtle background
          base3: "#fdf6e3", // background
          blue: "#268bd2", // primary accent
          cyan: "#2aa198", // secondary accent
          green: "#859900", // success
          yellow: "#b58900", // warning/highlight
          orange: "#cb4b16", // attention
          red: "#dc322f", // error
          magenta: "#d33682", // special accent
          violet: "#6c71c4", // secondary accent
        },
        // Keep some legacy terminal names for easier transition
        terminal: {
          green: "#859900", // Solarized green
          amber: "#b58900", // Solarized yellow
          blue: "#268bd2", // Solarized blue
          red: "#dc322f", // Solarized red
          gray: "#93a1a1", // Solarized base1
          "dark-gray": "#586e75", // Solarized base01
          "light-gray": "#839496", // Solarized base0
        },
      },
      animation: {
        "cursor-blink": "blink 1s infinite",
        type: "typing 2s steps(40, end)",
      },
      keyframes: {
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
