"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  if (dark === null) return <span className="theme-space" />;

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch (error) {
      console.warn("Theme preference not saved", error); // storage blocked: theme still applies for this page
    }
  }

  return (
    <button type="button" className="theme-toggle" aria-pressed={dark} onClick={toggle}>
      Dark theme <span aria-hidden="true">{dark ? "on" : "off"}</span>
    </button>
  );
}
