import ArchiveTabs from "@/components/archive-tabs";
import Pagination from "@/components/pagination";
import WritingList from "@/components/writing-list";
import { getAllWritingPosts, paginate, singleParam } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

type Props = { searchParams: Promise<{ page?: string | string[] }> };

export async function generateMetadata({ searchParams }: Props) {
  const { page } = paginate(getAllWritingPosts(), singleParam((await searchParams).page));
  return pageMetadata(
    page > 1 ? `Writing · Page ${page}` : "Writing",
    "Essays and notes on building startups, Cambodia, technology, and the life around the work.",
    page > 1 ? `/writing?page=${page}` : "/writing",
  );
}

export default async function WritingPage({ searchParams }: Props) {
  const { items, page, pages } = paginate(getAllWritingPosts(), singleParam((await searchParams).page));
  return (
    <div className="shell page">
      <h1>Writing</h1>
      <p className="page-intro">Notes on the companies we start, the people I learn from, and the life around the work.</p>
      <ArchiveTabs current="writing" />
      <WritingList posts={items} />
      <Pagination page={page} pages={pages} base="/writing" />
    </div>
  );
}
