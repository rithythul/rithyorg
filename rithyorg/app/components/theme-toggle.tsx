"use client";

import { useEffect, useState } from "react";

/** Keeps the existing site's dark mode. Hidden until JavaScript runs. */
export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  if (dark === null) return null;

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggle}>
      {dark ? "Light theme" : "Dark theme"}
    </button>
  );
}
