import type { Metadata } from "next";

export const siteUrl = "https://rithy.org";
export const siteName = "rithythul";

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
