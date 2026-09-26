import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell">
      <div className="reading">
        <header className="page-head">
          <p className="eyebrow">404</p>
          <h1 className="page-title">This page isn’t here</h1>
          <p className="page-lede">
            It may have moved, or the address may be mistyped.
          </p>
        </header>
        <p>
          <Link href="/writing" className="text-link">
            Browse all writing
          </Link>
        </p>
        <p>
          <Link href="/" className="text-link">
            Go to the homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
