import ArchiveTabs from "@/components/archive-tabs";
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
  return { category, ...paginate(filtered, singleParam(params.page)) };
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
  const { category, items, page, pages } = await selection(searchParams);
  const unknownTopic = category !== "" && !cryptoTopics.includes(category);

  return (
    <div className="shell page">
      <h1>Crypto archive</h1>
      <p className="page-intro">
        News, commentary, and digests from the BitcoinPrahok Crypto Digest. Not investment advice.{" "}
        <a href="https://t.me/bitcoinprahok">
          BitcoinPrahok on Telegram <span aria-hidden="true">↗</span>
        </a>
      </p>
      <ArchiveTabs current="crypto" />

      <form className="filter-form" action="/crypto">
        <label htmlFor="category">Topic</label>
        <select id="category" name="category" defaultValue={category}>
          <option value="">All topics</option>
          {unknownTopic && <option value={category}>{category}</option>}
          {cryptoTopics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
        <button type="submit">Filter</button>
      </form>

      {items.length ? (
        <WritingList posts={items} />
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
