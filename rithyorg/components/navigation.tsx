"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Wordmark, { Mark } from "./wordmark";

const links = [
  { href: "/writing", label: "Writing", sections: ["/writing", "/crypto"] },
  { href: "/book", label: "Book", sections: ["/book"] },
  { href: "/about", label: "About", sections: ["/about"] },
];

export default function Navigation() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);

  // details opens and closes without JS; this only adds Escape
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape" || !menu.current?.open) return;
      menu.current.open = false;
      menu.current.querySelector("summary")?.focus();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const current = (href: string, sections: string[]) => {
    if (pathname === href) return "page";
    const inSection = sections.some((section) => pathname === section || pathname.startsWith(`${section}/`));
    return inSection ? "true" : undefined;
  };

  const items = (
    <>
      {links.map(({ href, label, sections }) => (
        <a key={href} href={href} aria-current={current(href, sections)}>
          {label}
        </a>
      ))}
      <a className="external" href="https://smallworld.xyz/">
        smallworld <span aria-hidden="true">↗</span>
      </a>
    </>
  );

  return (
    <header className="site-header">
      <nav className="shell navigation" aria-label="Main navigation">
        <a className="wordmark" href="/" aria-current={pathname === "/" ? "page" : undefined}>
          <Wordmark />
          <Mark />
        </a>
        <div className="nav-links">{items}</div>
        <details className="nav-menu" ref={menu}>
          <summary aria-label="Menu">
            <span aria-hidden="true" />
          </summary>
          <div className="nav-menu-links">{items}</div>
        </details>
      </nav>
    </header>
  );
}
