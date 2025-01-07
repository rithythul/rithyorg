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
  description: 'Notes, Works, Life, Experiences',
  icons: {
    icon: [
      { url: '/favicon.svg' },
      { url: '/favicon.ico' }  // Fallback for browsers that don't support SVG
    ],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${mono.className} antialiased max-w-2xl mx-auto px-4 py-8 flex flex-col min-h-screen`}>
        <header className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center mb-12 space-y-4 sm:space-y-0">
          <Navigation />
          <Analytics />
          <SpeedInsights />
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
