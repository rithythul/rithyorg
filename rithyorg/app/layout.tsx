import "./globals.css";
import type { Metadata, Viewport } from "next";
import SiteHeader from "./components/site-header";
import SiteFooter from "./components/site-footer";
import { AUTHOR, SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: AUTHOR,
    template: `%s · ${AUTHOR}`,
  },
  description:
    "Writing by rithythul, founder of SmallWorld, from Phnom Penh, Cambodia.",
  authors: [{ name: AUTHOR, url: SITE_URL }],
  openGraph: {
    siteName: AUTHOR,
    locale: "en_US",
    type: "website",
  },
};

// Browser chrome matches the page.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7f3" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1b19" },
  ],
};

// Apply the saved or system theme before first paint (existing behaviour).
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
