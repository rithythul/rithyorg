import "./globals.css";
import type { Metadata } from "next";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { indexable, siteName, siteUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${siteName} · Building, Learning, Writing`, template: `%s · ${siteName}` },
  description: "rithythul builds startups in Cambodia with smallworld, learns by running them, and writes down what the work teaches.",
  icons: { icon: "/favicon.svg" },
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
};

// cream light is the default; dark only when chosen, applied before first paint
const themeScript = `(function(){try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/bagel-fat-one-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/baloo-2-var-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
