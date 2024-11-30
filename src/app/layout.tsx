import './globals.css'
import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import Navigation from './components/navigation'
import Link from 'next/link'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const mono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rithy Thul',
  description: 'Personal Website - writing',
  icons: {
    icon: [
      { url: '/favicon.svg' },
      { url: '/favicon.ico' }  // Fallback for browsers that don't support SVG
    ],
  }
}

function Logo() {
  return (
    <svg 
      viewBox="0 0 32 32"
      className="w-full h-full"
      aria-label="rithy.org logo"
    >
      <circle cx="16" cy="16" r="15" className="fill-yellow-500"/>
      <text
        x="16"
        y="22"
        fontFamily="monospace"
        fontSize="20"
        fontWeight="bold"
        fill="black"
        textAnchor="middle"
        dominantBaseline="middle"
      >r</text>
    </svg>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${mono.className} antialiased max-w-2xl mx-auto px-4 py-8 flex flex-col min-h-screen`}>
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-12 space-y-4 sm:space-y-0">
          <Link
            href="/"
            className="w-20 h-20 sm:w-14 sm:h-14 rounded-full transition-all duration-300 ease-in-out hover:opacity-80 mx-auto sm:mx-0"
          >
            <Logo />
          </Link>
          <Navigation />
          <Analytics/>
          <SpeedInsights/>
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="mt-12 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} <Link href="/" className="text-blue-600"> rithy.org </Link>. all rights not reserved.
        </footer>
      </body>
    </html>
  )
}