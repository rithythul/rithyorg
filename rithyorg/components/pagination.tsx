export default function Pagination({ page, pages, base }: { page: number; pages: number; base: string }) {
  if (pages < 2) return null;
  const separator = base.includes("?") ? "&" : "?";
  return (
    <nav className="pagination" aria-label="Archive pages">
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <a
          key={n}
          href={n === 1 ? base : `${base}${separator}page=${n}`}
          aria-label={`Page ${n}`}
          aria-current={n === page ? "page" : undefined}
        >
          {n}
        </a>
      ))}
    </nav>
  );
}
