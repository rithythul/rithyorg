import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Privacy", "Privacy information for rithy.org.", "/privacy");

export default function PrivacyPage() {
  return (
    <div className="reading page">
      <h1>Privacy Policy</h1>

      <div className="prose">
        <p className="meta">Last updated: May 2025</p>
        <p>
          This site does not collect personal data. No cookies are used for
          tracking. Analytics may use anonymized, aggregated data.
        </p>
        <p>
          No data is sold or shared with third parties. If you contact us
          through any linked service (e.g., Telegram), that service&apos;s
          privacy policy applies.
        </p>
      </div>
    </div>
  );
}
