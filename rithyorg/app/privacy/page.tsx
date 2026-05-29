export const metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-8" style={{ color: "var(--color-fg)" }}>
        Privacy Policy
      </h1>

      <div className="space-y-4" style={{ color: "var(--color-muted)", lineHeight: "1.75" }}>
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
  );
}
