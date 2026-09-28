import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "BitcoinPrahok Crypto Digest privacy policy",
  "Privacy policy for the BitcoinPrahok Crypto Digest on rithy.org.",
  "/crypto/privacy",
);

export default function CryptoPrivacyPage() {
  return (
    <div className="reading page">
      <h1>Privacy Policy</h1>
      <div className="prose">
        <p className="meta">BitcoinPrahok Crypto Digest</p>

        <h2>Overview</h2>
        <p>
          BitcoinPrahok Crypto Digest is a public news aggregator. We curate and summarize crypto news from
          publicly available sources. We do not collect personal data.
        </p>

        <h2>Information We Use</h2>
        <p>
          All news content comes from publicly accessible RSS feeds and sources including CoinDesk,
          CoinTelegraph, Google News, Reddit, and others. No user-submitted data is involved.
        </p>

        <h2>How We Operate</h2>
        <p>
          News aggregation is fully automated. There are no user accounts, no cookies set by us, and no tracking
          beyond standard web analytics provided by our hosting platform.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          Articles link to external news sources. We do not control the privacy practices of these sites.
          Review their policies before sharing personal information with them.
        </p>

        <h2>Telegram Channel</h2>
        <p>
          The BitcoinPrahok Telegram channel is a separate service. Telegram&apos;s own{" "}
          <a href="https://telegram.org/privacy">Privacy Policy</a> applies to interactions there.
        </p>

        <h2>No Personal Data</h2>
        <p>We do not collect, store, or sell personal information. No sign-ups, no forms, no tracking pixels from us.</p>

        <h2>Analytics</h2>
        <p>This site uses Vercel Analytics, which is privacy-friendly and does not collect personal data or use cookies.</p>

        <h2>Changes</h2>
        <p>We may update this policy from time to time. Check back periodically for the latest version.</p>

        <h2>Questions?</h2>
        <p>
          <a href="mailto:hello@rithy.org">Get in touch</a>
        </p>
      </div>
      <a className="text-link" href="/crypto">
        <span aria-hidden="true">←</span> Back to Crypto archive
      </a>
    </div>
  );
}
