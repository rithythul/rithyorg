export const metadata = {
  title: "Privacy",
  description: "How rithy.org handles personal data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="shell">
      <div className="reading">
        <header className="page-head">
          <h1 className="page-title">Privacy Policy</h1>
        </header>

        <div className="prose">
          <p>Last updated: May 2025</p>
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
    </div>
  );
}
