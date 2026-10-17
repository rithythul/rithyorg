import ArchiveTabs from "@/components/archive-tabs";
import PageHeader from "@/components/page-header";
import Pagination from "@/components/pagination";
import WritingList from "@/components/writing-list";
import { getAllWritingPosts, paginate, singleParam } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

type Props = { searchParams: Promise<{ page?: string | string[] }> };

export async function generateMetadata({ searchParams }: Props) {
  const { page } = paginate(getAllWritingPosts(), singleParam((await searchParams).page));
  return pageMetadata(
    page > 1 ? `Writing · Page ${page}` : "Writing",
    "Essays on building startups in Cambodia, what running them teaches, and the life around the work.",
    page > 1 ? `/writing?page=${page}` : "/writing",
  );
}

export default async function WritingPage({ searchParams }: Props) {
  const all = getAllWritingPosts();
  const { items, page, pages } = paginate(all, singleParam((await searchParams).page));
  return (
    <div className="shell page">
      <PageHeader eyebrow={`${all.length} essays`} title="Writing">
        <p>Essays on building startups in Cambodia, what running them teaches, and the life around the work.</p>
      </PageHeader>
      <ArchiveTabs current="writing" />
      <WritingList posts={items} byYear />
      <Pagination page={page} pages={pages} base="/writing" />
    </div>
  );
}
