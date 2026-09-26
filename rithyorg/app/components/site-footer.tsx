import { Wordmark } from "./site-header";
import ThemeToggle from "./theme-toggle";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-id">
          <Wordmark />
          <span className="muted">Phnom Penh, Cambodia</span>
        </div>
        <ul className="footer-links">
          <li>
            <a href="https://smallworld.xyz/">smallworld.xyz</a>
          </li>
          <li>
            <a href="/privacy">Privacy</a>
          </li>
          <li>
            <a href="/terms">Terms</a>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </footer>
  );
}
