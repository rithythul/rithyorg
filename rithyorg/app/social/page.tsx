import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Connect", "Reach rithythul by email, Telegram, LinkedIn, GitHub, or X.", "/social");

const profiles = [
  { name: "Email", url: "mailto:hello@rithy.org", detail: "hello@rithy.org" },
  { name: "Telegram", url: "https://t.me/rithy", detail: "@rithy" },
  { name: "LinkedIn", url: "https://linkedin.com/in/rithythul" },
  { name: "GitHub", url: "https://github.com/rithythul" },
  { name: "X (Twitter)", url: "https://twitter.com/rithythul" },
];

export default function SocialPage() {
  return (
    <div className="reading page">
      <h1>Connect</h1>
      <p className="page-intro">To build with smallworld, partner, fund, or invest, write to me.</p>
      <ul className="writing-list">
        {profiles.map(({ name, url, detail }) => (
          <li key={url}>
            <a href={url}>
              <span className="writing-title">{name}</span>
              <span className="writing-meta">
                {detail}
                <span aria-hidden="true">{url.startsWith("mailto:") ? "→" : "↗"}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
