import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Connect", "Find rithythul on Telegram, LinkedIn, GitHub, and Twitter.", "/social");

const profiles = [
  ["Telegram", "https://t.me/rithy"],
  ["LinkedIn", "https://linkedin.com/in/rithythul"],
  ["GitHub", "https://github.com/rithythul"],
  ["Twitter", "https://twitter.com/rithythul"],
];

export default function SocialPage() {
  return (
    <div className="reading page">
      <h1>Connect</h1>
      <ul className="writing-list">
        {profiles.map(([name, url]) => (
          <li key={url}>
            <a href={url}>
              <span className="writing-title">{name}</span>
              <span className="writing-meta">
                <span aria-hidden="true">↗</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
