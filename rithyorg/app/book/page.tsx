import book from "@/content/pages/book.json";
import WritingList from "@/components/writing-list";
import { getCuratedPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(`${book.title}: ${book.subtitle}`, book.summary, "/book");

export default function BookPage() {
  return (
    <div className="shell book-page">
      <header className="book-page-header">
        <p className="label">First book</p>
        <h1 className="book-title">{book.title}</h1>
        <p className="book-subtitle">{book.subtitle}</p>
        <p className="book-author">{book.author}</p>
        <div className="book-description">
          {book.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="status">{book.status}</p>
        <p className="meta">{book.publicationNote}</p>
      </header>

      <section className="book-related" aria-labelledby="related-title">
        <div className="section-heading">
          <h2 id="related-title">Related writing</h2>
          <a href="/writing">
            All writing <span aria-hidden="true">→</span>
          </a>
        </div>
        <WritingList posts={getCuratedPosts()} />
      </section>
    </div>
  );
}
