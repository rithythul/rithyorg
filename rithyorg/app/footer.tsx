export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-20">
      <div className="mx-auto max-w-6xl px-6 py-8 flex items-center justify-between">
        <p className="text-[var(--color-muted)]" style={{ fontSize: "14px" }}>
          &copy; {new Date().getFullYear()} The Living Archive
        </p>
        <div className="flex gap-4">
          <a
            href="/privacy"
            className="text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors"
            style={{ fontSize: "14px" }}
          >
            Terms
          </a>
          <a
            href="/privacy"
            className="text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors"
            style={{ fontSize: "14px" }}
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
