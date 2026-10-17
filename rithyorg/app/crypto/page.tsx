import ArchiveTabs from "@/components/archive-tabs";
import PageHeader from "@/components/page-header";
import TopicScroll from "@/components/topic-scroll";
import Pagination from "@/components/pagination";
import WritingList from "@/components/writing-list";
import { cryptoTopics, getAllCryptoDigests, hasTag, paginate, singleParam } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

type Props = { searchParams: Promise<{ page?: string | string[]; category?: string | string[] }> };

async function selection(searchParams: Props["searchParams"]) {
  const params = await searchParams;
  const category = singleParam(params.category);
  const all = getAllCryptoDigests();
  const filtered = category ? all.filter((post) => hasTag(post, category)) : all;
  return { category, total: all.length, ...paginate(filtered, singleParam(params.page)) };
}

export async function generateMetadata({ searchParams }: Props) {
  const { category, page } = await selection(searchParams);
  const query = new URLSearchParams();
  if (cryptoTopics.includes(category)) query.set("category", category);
  if (page > 1) query.set("page", String(page));
  const title = ["Crypto archive", category, page > 1 ? `Page ${page}` : ""].filter(Boolean).join(" · ");
  return pageMetadata(
    title,
    "Crypto news, commentary, and digests from the BitcoinPrahok Crypto Digest. Not investment advice.",
    query.size ? `/crypto?${query}` : "/crypto",
  );
}

export default async function CryptoPage({ searchParams }: Props) {
  const { category, total, items, page, pages } = await selection(searchParams);

  return (
    <div className="shell page">
      <PageHeader eyebrow={`${total} articles · not investment advice`} title="Crypto archive">
        <p>
          News, commentary, and digests from the BitcoinPrahok Crypto Digest.{" "}
          <a href="https://t.me/bitcoinprahok">
            BitcoinPrahok on Telegram <span aria-hidden="true">↗</span>
          </a>
        </p>
      </PageHeader>
      <ArchiveTabs current="crypto" />

      <nav className="topics" aria-label="Topics">
        <a href="/crypto" aria-current={category ? undefined : "page"}>
          all
        </a>
        {cryptoTopics.map((topic) => (
          <a
            key={topic}
            href={`/crypto?category=${topic}`}
            aria-current={topic === category.toLowerCase() ? "page" : undefined}
          >
            {topic}
          </a>
        ))}
      </nav>
      <TopicScroll />

      {items.length ? (
        <WritingList posts={items} byYear />
      ) : (
        <p className="empty-state">
          No articles match this topic. <a href="/crypto">Show all crypto articles</a>.
        </p>
      )}
      <Pagination
        page={page}
        pages={pages}
        base={category ? `/crypto?category=${encodeURIComponent(category)}` : "/crypto"}
      />
    </div>
  );
}
