import Link from "next/link";
import type { Book } from "@/lib/book";

export default function BookFeature({ book }: { book: Book }) {
  return (
    <section className="book-feature" aria-labelledby="book-feature-title">
      <div>
        <p className="eyebrow">{book.label}</p>
        <h2 id="book-feature-title" className="book-title">
          {book.title}
        </h2>
        <p className="book-meta">
          <span>by {book.author}</span>
          <span className="status">{book.status}</span>
        </p>
      </div>
      <div className="book-body">
        {book.summary.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <Link href="/book" className="button">
          About the book
        </Link>
        {book.statusNote && <p className="status-note">{book.statusNote}</p>}
      </div>
    </section>
  );
}
