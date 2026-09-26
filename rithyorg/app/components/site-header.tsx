import Link from "next/link";
import NavLinks from "./nav-links";

export function Wordmark() {
  return (
    <Link href="/" className="wordmark">
      rithythul<span className="dot" aria-hidden="true">.</span>
    </Link>
  );
}

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell">
        <Wordmark />
        <NavLinks />
      </div>
    </header>
  );
}
