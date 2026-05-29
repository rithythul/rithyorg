export const metadata = {
  title: "Terms",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-8" style={{ color: "var(--color-fg)" }}>
        Terms of Service
      </h1>

      <div className="space-y-4" style={{ color: "var(--color-muted)", lineHeight: "1.75" }}>
        <p>Last updated: May 2025</p>
        <p>
          The content on this site is provided for informational purposes only.
          Nothing here constitutes financial, legal, or professional advice.
        </p>
        <p>
          Crypto market commentary reflects personal opinions and should not be
          taken as investment advice. Always do your own research.
        </p>
        <p>
          All content is copyright of the author unless otherwise noted.
          Reproduction without permission is not permitted.
        </p>
      </div>
    </div>
  );
}
