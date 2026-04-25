import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Crypto Digest — rithy.org",
  description: "Privacy policy for BitcoinPrahok Crypto Digest on rithy.org.",
};

export default function CryptoPrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto pt-20 pb-20 space-y-12">
      <h1 className="font-serif text-3xl md:text-4xl font-bold">
        Privacy Policy
      </h1>
      <p className="font-mono text-xs uppercase tracking-wider text-amber-600">
        BitcoinPrahok Crypto Digest
      </p>

      <div className="space-y-10 text-muted-foreground leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-foreground">Overview</h2>
          <p>
            BitcoinPrahok Crypto Digest is a public news aggregator. We curate and
            summarize crypto news from publicly available sources. We do not collect
            personal data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-foreground">
            Information We Use
          </h2>
          <p>
            All news content comes from publicly accessible RSS feeds and sources
            including CoinDesk, CoinTelegraph, Google News, Reddit, and others. No
            user-submitted data is involved.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-foreground">
            How We Operate
          </h2>
          <p>
            News aggregation is fully automated. There are no user accounts, no
            cookies set by us, and no tracking beyond standard web analytics provided
            by our hosting platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-foreground">
            Third-Party Links
          </h2>
          <p>
            Articles link to external news sources. We do not control the privacy
            practices of these sites. Review their policies before sharing personal
            information with them.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-foreground">
            Telegram Channel
          </h2>
          <p>
            The BitcoinPrahok Telegram channel is a separate service. Telegram&apos;s
            own{" "}
            <a
              href="https://telegram.org/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:underline"
            >
              Privacy Policy
            </a>{" "}
            applies to interactions there.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-foreground">
            No Personal Data
          </h2>
          <p>
            We do not collect, store, or sell personal information. No sign-ups, no
            forms, no tracking pixels from us.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-foreground">Analytics</h2>
          <p>
            This site uses Vercel Analytics, which is privacy-friendly and does not
            collect personal data or use cookies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-foreground">Changes</h2>
          <p>
            We may update this policy from time to time. Check back periodically for
            the latest version.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-foreground">Contact</h2>
          <p>
            Questions?{" "}
            <a
              href="mailto:rithythul@gmail.com"
              className="text-amber-600 hover:underline"
            >
              rithythul@gmail.com
            </a>
          </p>
        </section>
      </div>

      <div className="pt-8 border-t border-foreground/10">
        <Link
          href="/crypto"
          className="font-mono text-xs text-muted hover:text-amber-600"
        >
          ← Back to Crypto Digest
        </Link>
      </div>
    </div>
  );
}
