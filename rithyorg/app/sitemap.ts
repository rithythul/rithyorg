import { MetadataRoute } from "next";
import { SITE_URL, getWritingIndex } from "@/lib/content";

export const dynamic = "force-static";

// Published routes only. Drafts are filtered out by getWritingIndex().
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getWritingIndex();
  const latest = posts[0]?.date ? new Date(posts[0].date) : undefined;

  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: latest, priority: 1 },
    { url: `${SITE_URL}/book`, priority: 0.9 },
    { url: `${SITE_URL}/writing`, lastModified: latest, priority: 0.8 },
    { url: `${SITE_URL}/crypto`, priority: 0.5 },
    { url: `${SITE_URL}/about`, priority: 0.7 },
    { url: `${SITE_URL}/projects`, priority: 0.4 },
    { url: `${SITE_URL}/social`, priority: 0.3 },
    { url: `${SITE_URL}/privacy`, priority: 0.1 },
    { url: `${SITE_URL}/terms`, priority: 0.1 },
  ];

  return [
    ...pages,
    ...posts.map((post) => ({
      url: `${SITE_URL}${post.href}`,
      lastModified: post.date ? new Date(post.date) : undefined,
      priority: post.collection === "posts" ? 0.7 : 0.4,
    })),
  ];
}
