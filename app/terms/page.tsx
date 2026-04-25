import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use — rithy.org",
  description: "Terms of use for rithy.org.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto pt-20 pb-20 space-y-12">
      <h1 className="font-serif text-3xl md:text-4xl font-bold">
        Terms of Use
      </h1>
      <p className="font-mono text-xs uppercase tracking-wider text-amber-600">
        rithy.org
      </p>

      <div className="space-y-10 text-muted-foreground leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-foreground">1. Acceptance</h2>
          <p>
            By accessing and using rithy.org, you agree to be bound by these
            Terms of Use. If you do not agree, please do not use this site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-foreground">2. Content</h2>
          <p>
            All content on rithy.org is for informational purposes only. It is
            not financial, legal, or professional advice. This applies especially
            to crypto news — nothing published here constitutes investment advice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-foreground">3. Intellectual Property</h2>
          <p>
            Content on rithy.org is original work unless otherwise credited. You
            may not reproduce, distribute, or republish any content without
            prior written permission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-foreground">4. External Links</h2>
          <p>
            This site links to third-party sources. We do not control their
            content, accuracy, or policies. Visiting linked sites is at your own
            risk.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-foreground">
            5. Limitation of Liability
          </h2>
          <p>
            We are not responsible for decisions made based on content on this
            site. Crypto markets are volatile — always do your own research and
            consult qualified professionals before making financial decisions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-foreground">6. Accuracy</h2>
          <p>
            We strive for accuracy but do not guarantee that all content is
            error-free or up to date. News moves fast — information may change
            after publication.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-foreground">7. Changes</h2>
          <p>
            We may update these terms at any time. Continued use of rithy.org
            after changes are posted constitutes acceptance of the revised terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-foreground">8. Questions?</h2>
          <p>
            <a
              href="mailto:contact@rithy.org"
              className="text-amber-600 hover:underline"
            >
              Get in touch
            </a>
          </p>
        </section>
      </div>

      <div className="pt-8 border-t border-foreground/10">
        <Link
          href="/"
          className="font-mono text-xs text-muted hover:text-amber-600"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
