'use client'
import dynamic from 'next/dynamic'

const LinkedInIcon = dynamic(() => import('react-icons/fa').then(mod => mod.FaLinkedin), { ssr: true })
const TwitterIcon = dynamic(() => import('react-icons/fa').then(mod => mod.FaTwitter), { ssr: true })
const TelegramIcon = dynamic(() => import('react-icons/fa').then(mod => mod.FaTelegram), { ssr: true })
const GithubIcon = dynamic(() => import('react-icons/fa').then(mod => mod.FaGithub), { ssr: true })

const socialLinks = [
  {
    href: 'https://linkedin.com/in/rithythul',
    icon: LinkedInIcon,
    hoverColor: 'hover:text-[var(--foreground)]'
  },
  {
    href: 'https://twitter.com/rithythul',
    icon: TwitterIcon,
    hoverColor: 'hover:text-[var(--foreground)]'
  },
  {
    href: 'https://t.me/notestothyself',
    icon: TelegramIcon,
    hoverColor: 'hover:text-[var(--foreground)]'
  },
  {
    href: 'https://github.com/rithythul',
    icon: GithubIcon,
    hoverColor: 'hover:text-[var(--foreground)]'
  }
]

export default function Social() {
  return (
    <main className="flex flex-col flex-1 h-[calc(100vh-8rem)] items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-8">connect with me on</h1>
        <div className="flex justify-center gap-8 md:gap-12">
          {socialLinks.map((social, index) => {
            const Icon = social.icon
            return (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-[var(--foreground)] hover:underline ${social.hoverColor}`} /* Removed transition-colors, added hover:underline */
              >
                <Icon className="w-8 h-8 md:w-10 md:h-10" />
              </a>
            )
          })}
        </div>
      </div>
    </main>
  )
}