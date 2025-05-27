import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // colors object removed
      // typography object removed
      // animation and keyframes removed
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;