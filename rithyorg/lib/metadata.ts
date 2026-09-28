import type { Metadata } from "next";

export const siteUrl = "https://rithy.org";
export const siteName = "rithythul";

// vercel sets VERCEL_ENV at build; SITE_ENV covers other hosts
export const indexable = process.env.VERCEL_ENV === "production" || process.env.SITE_ENV === "production";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · ${siteName}`,
      description,
      url,
      type: "website",
      locale: "en_US",
      siteName,
    },
    twitter: { card: "summary", title, description },
  };
}
