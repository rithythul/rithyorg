import { Inter, Playfair_Display, Roboto_Mono } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import Navigation from "./components/navigation";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${robotoMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        <Navigation />
        <div className="container-custom pt-28 pb-8 flex flex-col min-h-screen">
          <main className="flex-grow">{children}</main>
          <footer className="mt-16 text-center text-sm text-muted border-t border-border pt-8 font-mono">
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} @rithy.org
          </footer>
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
