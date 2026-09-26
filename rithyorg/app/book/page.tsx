import type { Metadata } from "next";
import Link from "next/link";
import { getBook } from "@/lib/book";

export function generateMetadata(): Metadata {
  const book = getBook();
  return {
    title: book.title,
    description: `${book.title}, the first book by ${book.author}. ${book.summary[0] ?? ""} ${book.status}.`,
    alternates: { canonical: "/book" },
  };
}

export default function BookPage() {
  const book = getBook();

  return (
    <div className="shell book-page">
      <div className="reading">
        <header className="page-head">
          <p className="eyebrow">{book.label}</p>
          <h1 className="page-title">{book.title}</h1>
          <p className="book-meta">
            <span>by {book.author}</span>
            <span className="status">{book.status}</span>
            {book.statusNote && <span>{book.statusNote}</span>}
          </p>
        </header>

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: book.description }}
        />

        {book.introduction && (
          <section aria-labelledby="introduction">
            <h2 id="introduction" className="section-title">
              Introduction
            </h2>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: book.introduction }}
            />
          </section>
        )}

        <div className="article-end">
          <p>
            While the book is being written, my other writing is here.
          </p>
          <p>
            <Link href="/writing" className="text-link">
              Read the writing
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
