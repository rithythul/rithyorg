import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  const indexable = process.env.SITE_ENV === "production";
  return {
    rules: { userAgent: "*", ...(indexable ? { allow: "/" } : { disallow: "/" }) },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
