import PageHeader from "@/components/page-header";
import Pagination from "@/components/pagination";
import { formatNoteTime, getNotes, paginate, singleParam } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

// scheduled notes carry a future date; render per request so each shows up on time
export const dynamic = "force-dynamic";

const intro = "Short thoughts on tech, building, and the rest. Most of them start on Facebook.";
const facebook = "https://www.facebook.com/rithythul";

// label a note's source by where it was first posted
function sourceLabel(url: string): string {
  const host = new URL(url).hostname;
  if (/(^|\.)facebook\.com$/.test(host)) return "Facebook";
  if (host === "t.me" || /(^|\.)telegram\.(org|me)$/.test(host)) return "Telegram";
  return "Source";
}

const pageSize = 30;

type Props = { searchParams: Promise<{ page?: string | string[] }> };

export async function generateMetadata({ searchParams }: Props) {
  const { page } = paginate(getNotes(), singleParam((await searchParams).page), pageSize);
  return pageMetadata(page > 1 ? `Notes · Page ${page}` : "Notes", intro, page > 1 ? `/notes?page=${page}` : "/notes");
}

export default async function NotesPage({ searchParams }: Props) {
  const all = getNotes();
  const { items, page, pages } = paginate(all, singleParam((await searchParams).page), pageSize);
  const base = page > 1 ? `/notes?page=${page}` : "/notes";

  return (
    <div className="reading page">
      <PageHeader eyebrow={`${all.length} notes`} title="Notes">
        <p>
          Short thoughts on tech, building, and the rest. Most of them start on <a href={facebook}>Facebook</a>.
        </p>
      </PageHeader>
      {items.length ? (
        <ol className="notes-list">
          {items.map((note) => (
            <li key={note.slug} id={note.slug} lang={note.lang}>
              <div className="prose note-body" dangerouslySetInnerHTML={{ __html: note.content }} />
              <p className="note-meta">
                <a href={`${base}#${note.slug}`}>
                  <time dateTime={note.date}>{formatNoteTime(note.date)}</time>
                </a>
                {note.source && (
                  <a href={note.source}>
                    {sourceLabel(note.source)} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </p>
            </li>
          ))}
        </ol>
      ) : (
        <p className="empty-state">No notes yet.</p>
      )}
      <Pagination page={page} pages={pages} base="/notes" />
    </div>
  );
}
