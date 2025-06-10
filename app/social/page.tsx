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
    hoverColor: "hover:text-solarized-cyan",
  },
  {
    href: "https://twitter.com/rithythul",
    icon: TwitterIcon,
    hoverColor: "hover:text-solarized-cyan",
  },
  {
    href: "https://t.me/rithy",
    icon: TelegramIcon,
    hoverColor: "hover:text-solarized-cyan",
  },
  {
    href: "https://github.com/rithythul",
    icon: GithubIcon,
    hoverColor: "hover:text-solarized-cyan",
  },
];

export default function Social() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-base font-medium mb-6 sm:mb-8 terminal-header text-solarized-yellow">
          connect with me on
        </h1>
        <div className="flex justify-center gap-6 sm:gap-8 md:gap-12">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-solarized-blue ${social.hoverColor} p-2 -m-2`} /* Added touch target padding */
              >
                <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
