"use client";

import { usePathname } from "next/navigation";

const links = [
  { href: "/writing", label: "Writing", sections: ["/writing", "/crypto"] },
  { href: "/book", label: "Book", sections: ["/book"] },
  { href: "/about", label: "About", sections: ["/about"] },
];

export default function Navigation() {
  const pathname = usePathname();
  const current = (href: string, sections: string[]) => {
    if (pathname === href) return "page";
    const inSection = sections.some((section) => pathname === section || pathname.startsWith(`${section}/`));
    return inSection ? "true" : undefined;
  };

  return (
    <header className="site-header">
      <nav className="shell navigation" aria-label="Main navigation">
        <a className="wordmark" href="/" aria-current={pathname === "/" ? "page" : undefined}>
          rithythul<span aria-hidden="true">.</span>
        </a>
        <div className="nav-links">
          {links.map(({ href, label, sections }) => (
            <a key={href} href={href} aria-current={current(href, sections)}>
              {label}
            </a>
          ))}
          <a className="external" href="https://smallworld.xyz/">
            smallworld <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
