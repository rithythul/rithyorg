import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Terms of Use", "Terms of use for rithy.org.", "/terms");

export default function TermsPage() {
  return (
    <div className="reading page">
      <h1>Terms of Use</h1>
      <div className="prose">
        <p className="meta">rithy.org</p>

        <h2>1. Acceptance</h2>
        <p>
          By accessing and using rithy.org, you agree to be bound by these Terms of Use. If you do not agree,
          please do not use this site.
        </p>

        <h2>2. Content</h2>
        <p>
          All content on rithy.org is for informational purposes only. It is not financial, legal, or
          professional advice. This applies especially to crypto news — nothing published here constitutes
          investment advice.
        </p>

        <h2>3. Intellectual Property</h2>
        <p>
          Content on rithy.org is original work unless otherwise credited. You may not reproduce, distribute,
          or republish any content without prior written permission.
        </p>

        <h2>4. External Links</h2>
        <p>
          This site links to third-party sources. We do not control their content, accuracy, or policies.
          Visiting linked sites is at your own risk.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          We are not responsible for decisions made based on content on this site. Crypto markets are volatile
          — always do your own research and consult qualified professionals before making financial decisions.
        </p>

        <h2>6. Accuracy</h2>
        <p>
          We strive for accuracy but do not guarantee that all content is error-free or up to date. News moves
          fast — information may change after publication.
        </p>

        <h2>7. Changes</h2>
        <p>
          We may update these terms at any time. Continued use of rithy.org after changes are posted constitutes
          acceptance of the revised terms.
        </p>

        <h2>8. Questions?</h2>
        <p>
          <a href="mailto:hello@rithy.org">Get in touch</a>
        </p>
      </div>
    </div>
  );
}
