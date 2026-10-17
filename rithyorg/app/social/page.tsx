import PageHeader from "@/components/page-header";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Connect", "Reach rithythul by email, Telegram, LinkedIn, GitHub, or X.", "/social");

const profiles = [
  { name: "Email", url: "mailto:hello@rithy.org", detail: "hello@rithy.org" },
  { name: "Telegram", url: "https://t.me/rithy", detail: "@rithy" },
  { name: "LinkedIn", url: "https://linkedin.com/in/rithythul", detail: "in/rithythul" },
  { name: "GitHub", url: "https://github.com/rithythul", detail: "rithythul" },
  { name: "X (Twitter)", url: "https://twitter.com/rithythul", detail: "@rithythul" },
];

export default function SocialPage() {
  return (
    <div className="reading page">
      <PageHeader eyebrow="Get in touch" title="Connect">
        <p>To build with smallworld, partner, fund, or invest, write to me.</p>
      </PageHeader>
      <ul className="link-list compact">
        {profiles.map(({ name, url, detail }) => (
          <li key={url}>
            <a href={url}>
              <span className="link-list-name">{name}</span>
              <span className="link-list-meta">
                {detail} <span aria-hidden="true">{url.startsWith("mailto:") ? "→" : "↗"}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
