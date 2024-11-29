import './globals.css'
import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import Navigation from './components/navigation'
import Link from 'next/link'

const mono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Your Name',
  description: 'Personal website',
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
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 rounded-full bg-yellow-500 text-white flex items-center justify-center font-extrabold text-xl sm:text-2xl transition-all duration-300 ease-in-out hover:bg-yellow-600 mx-auto sm:mx-0"
          >
            r
          </Link>
          <Navigation />
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="mt-12 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} rithy.org. all rights not reserved.
        </footer>
      </body>
    </html>
  )
}
