export default function Pagination({ page, pages, base }: { page: number; pages: number; base: string }) {
  if (pages < 2) return null;
  const separator = base.includes("?") ? "&" : "?";
  const href = (n: number) => (n === 1 ? base : `${base}${separator}page=${n}`);
  return (
    <nav className="pagination" aria-label="Archive pages">
      {page > 1 && (
        <a className="pagination-step" href={href(page - 1)} rel="prev">
          <span aria-hidden="true">←</span> Newer
        </a>
      )}
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <a key={n} href={href(n)} aria-label={`Page ${n}`} aria-current={n === page ? "page" : undefined}>
          {n}
        </a>
      ))}
      {page < pages && (
        <a className="pagination-step" href={href(page + 1)} rel="next">
          Older <span aria-hidden="true">→</span>
        </a>
      )}
    </nav>
  );
}
