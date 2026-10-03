import book from "@/content/pages/book.json";

export default function BookFeature() {
  return (
    <section className="book-feature" aria-labelledby="book-title">
      <div className="book-heading">
        <p className="label">First book</p>
        <h2 id="book-title" className="book-title">
          {book.title}
        </h2>
        <p className="book-author">{book.author}</p>
      </div>
      <div className="book-copy">
        <p className="status">{book.status}</p>
        <p>{book.summary}</p>
        <p>{book.homeNote}</p>
        <a className="button" href="/book">
          About the book <span aria-hidden="true">→</span>
        </a>
        <p className="meta publication-note">{book.publicationNote}</p>
      </div>
    </section>
  );
}
