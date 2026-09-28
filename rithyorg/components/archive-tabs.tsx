export default function ArchiveTabs({ current }: { current: "writing" | "crypto" }) {
  return (
    <nav className="archive-tabs" aria-label="Writing collections">
      <a href="/writing" aria-current={current === "writing" ? "page" : undefined}>
        Essays &amp; notes
      </a>
      <a href="/crypto" aria-current={current === "crypto" ? "page" : undefined}>
        Crypto archive
      </a>
    </nav>
  );
}
