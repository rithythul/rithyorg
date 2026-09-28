import ThemeToggle from "./theme-toggle";

const secondaryLinks = [
  ["/crypto", "Crypto archive"],
  ["/projects", "Projects"],
  ["/social", "Connect"],
  ["/terms", "Terms"],
  ["/privacy", "Privacy"],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <a href="/" className="wordmark">
            rithythul<span aria-hidden="true">.</span>
          </a>
          <p>Phnom Penh, Cambodia</p>
          <a href="https://smallworld.xyz/">
            smallworld <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="footer-bottom">
          <nav aria-label="Archive and legal">
            {secondaryLinks.map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
