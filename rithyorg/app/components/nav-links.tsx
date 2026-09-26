"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  // The crypto digest lives in the writing archive, so it counts as Writing.
  { href: "/writing", label: "Writing", match: ["/writing", "/crypto"] },
  { href: "/book", label: "Book", match: ["/book"] },
  { href: "/about", label: "About", match: ["/about"] },
];

export default function NavLinks() {
  const pathname = usePathname() ?? "/";
  const isCurrent = (prefixes: string[]) =>
    prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  return (
    <nav className="site-nav" aria-label="Main">
      <ul>
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={
                pathname === link.href
                  ? "page"
                  : isCurrent(link.match)
                    ? "true"
                    : undefined
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li className="company">
          <a href="https://smallworld.xyz/">
            smallworld<span className="visually-hidden"> (company website)</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
