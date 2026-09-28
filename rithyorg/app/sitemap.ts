import type { MetadataRoute } from "next";
import { getAllCryptoDigests, getAllWritingPosts } from "@/lib/content";
import { siteUrl } from "@/lib/metadata";

const pages = ["/", "/writing", "/book", "/about", "/crypto", "/projects", "/social", "/privacy", "/crypto/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = [...getAllWritingPosts(), ...getAllCryptoDigests()].map((post) => ({
    url: `${siteUrl}${post.url}`,
    ...(post.date ? { lastModified: new Date(post.date) } : {}),
  }));
  return [...pages.map((path) => ({ url: `${siteUrl}${path}` })), ...articles];
}
