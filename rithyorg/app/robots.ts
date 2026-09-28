import type { MetadataRoute } from "next";
import { indexable, siteUrl } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", ...(indexable ? { allow: "/" } : { disallow: "/" }) },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
