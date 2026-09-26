import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social",
  description: "Where to find rithythul online.",
  alternates: { canonical: "/social" },
};

// Carried over from the previous rithy.org social page.
const LINKS = [
  { name: "LinkedIn", handle: "rithythul", href: "https://linkedin.com/in/rithythul" },
  { name: "X", handle: "@rithythul", href: "https://x.com/rithythul" },
  { name: "Telegram", handle: "@rithy", href: "https://t.me/rithy" },
  { name: "GitHub", handle: "rithythul", href: "https://github.com/rithythul" },
];

export default function SocialPage() {
  return (
    <div className="shell">
      <div className="reading">
        <header className="page-head">
          <h1 className="page-title">Social</h1>
        </header>

        <ul className="writing-list pairs">
          {LINKS.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="writing-row">
                <span className="title">{link.name}</span>
                <span className="row-note">{link.handle}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
