import "./globals.css";
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import Navigation from "./components/navigation";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Rithy Thul",
  description: "Notes, Works, Life, Experiences",
  icons: {
    icon: [{ url: "/favicon.svg" }, { url: "/favicon.ico" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <body>
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-8 flex flex-col min-h-screen">
          <header className="w-full mb-8 sm:mb-12">
            <Navigation />
          </header>
          <main className="flex-grow">{children}</main>
          <footer className="mt-8 sm:mt-12 text-center text-xs sm:text-sm pt-4">
            © {new Date().getFullYear()}{" "}
            <Link
              href="/"
              className="hover:underline"
            >
              {" "}
              rithy.org{" "}
            </Link>
            . all rights not reserved.
          </footer>
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
