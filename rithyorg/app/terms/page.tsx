export const metadata = {
  title: "Terms",
  description: "Terms for using rithy.org.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="shell">
      <div className="reading">
        <header className="page-head">
          <h1 className="page-title">Terms of Service</h1>
        </header>

        <div className="prose">
          <p>Last updated: May 2025</p>
          <p>
            The content on this site is provided for informational purposes
            only. Nothing here constitutes financial, legal, or professional
            advice.
          </p>
          <p>
            Crypto market commentary reflects personal opinions and should not
            be taken as investment advice. Always do your own research.
          </p>
          <p>
            All content is copyright of the author unless otherwise noted.
            Reproduction without permission is not permitted.
          </p>
        </div>
      </div>
    </div>
  );
}
