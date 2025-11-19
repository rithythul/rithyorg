"use client";
import dynamic from "next/dynamic";

const LinkedInIcon = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaLinkedin),
  { ssr: true }
);
const TwitterIcon = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaTwitter),
  { ssr: true }
);
const TelegramIcon = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaTelegram),
  { ssr: true }
);
const GithubIcon = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaGithub),
  { ssr: true }
);

const socialLinks = [
  {
    href: "https://linkedin.com/in/rithythul",
    icon: LinkedInIcon,
    label: "LinkedIn",
    handle: "rithythul"
  },
  {
    href: "https://twitter.com/rithythul",
    icon: TwitterIcon,
    label: "Twitter",
    handle: "@rithythul"
  },
  {
    href: "https://t.me/rithy",
    icon: TelegramIcon,
    label: "Telegram",
    handle: "t.me/rithy"
  },
  {
    href: "https://github.com/rithythul",
    icon: GithubIcon,
    label: "GitHub",
    handle: "rithythul"
  },
];

export default function Social() {
  return (
    <div className="space-y-16 pt-20 pb-20">
      <header className="border-b border-foreground/10 pb-8">
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-4">
          Connect
        </h1>
        <p className="font-mono text-muted max-w-xl text-sm md:text-base">
          Channels for communication and collaboration.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-12 border border-foreground/10 hover:border-foreground/30 bg-white/50 hover:bg-white transition-all duration-300 aspect-square"
            >
              <Icon className="w-12 h-12 text-foreground mb-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-serif text-xl font-bold">{social.label}</span>
              <span className="font-mono text-xs text-muted mt-2">{social.handle}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
