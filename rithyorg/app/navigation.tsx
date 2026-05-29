"use client";

import { useEffect, useState } from "react";

export default function Navigation() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-lg font-bold text-[var(--color-fg)]" style={{ fontSize: "20px" }}>
          The Living Archive
        </a>
        <div className="flex items-center gap-6">
          <a href="/" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors" style={{ fontSize: "14px" }}>
            Index
          </a>
          <a href="/writing" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors" style={{ fontSize: "14px" }}>
            Writing
          </a>
          <a href="/crypto" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors" style={{ fontSize: "14px" }}>
            Crypto
          </a>
          <a href="/projects" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors" style={{ fontSize: "14px" }}>
            Projects
          </a>
          <a href="/about" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors" style={{ fontSize: "14px" }}>
            About
          </a>
          {mounted && (
            <button
              onClick={toggleTheme}
              className="text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
