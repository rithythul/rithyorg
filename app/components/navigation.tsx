'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

function Logo() {
  return (
    <svg 
      viewBox="0 0 32 32"
      className="w-12 h-12 mr-4" // Adjust size and spacing as needed
      aria-label="rithy.org logo"
    >
      <circle cx="16" cy="16" r="15" className="fill-[var(--foreground)] border border-[var(--foreground)]"/>
      <text
        x="16"
        y="22"
        fontFamily="monospace"
        fontSize="16"
        fontWeight="bold"
        fill="var(--background)"
        textAnchor="middle"
        dominantBaseline="middle"
      >
      T
      </text>
    </svg>
  )
}


export default function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'about', path: '/about' },
    { name: 'writing', path: '/writing' },
    { name: 'projects', path: '/projects' },
    { name: 'social', path: '/social' },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="w-full px-2 sm:px-0">
      <div className="w-full overflow-x-auto">
        <div className="border border-[var(--foreground)] px-1 py-1 flex items-center justify-between w-full relative"> {/* Ensure border is correct */}
          {/* Logo (Left) */}
          <Link href="/" aria-label="Home" className="flex items-center">
            <Logo />
          </Link>
          
          {/* Hamburger Icon (Mobile) */}
          <button 
            onClick={toggleMenu} 
            className="sm:hidden text-xl focus:outline-none ml-2 text-[var(--foreground)]"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? 'X' : '☰'}
          </button>

          {/* Navigation Items for Desktop */}
          <div className="hidden sm:flex space-x-4 w-full justify-end">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`text-lg sm:text-lg px-4 sm:px-3 py-1.5 hover:underline ${
                  pathname === item.path 
                    ? 'font-bold' 
                    : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu (Overlay) */}
        <div
          className={`sm:hidden fixed inset-0 bg-[var(--background)] z-50 ${isMenuOpen ? 'block' : 'hidden'}`}
          onClick={() => setIsMenuOpen(false)} // Close the menu if the overlay is clicked
        >
          <div className={`absolute top-0 left-0 w-full bg-[var(--background)] p-8 flex flex-col items-center space-y-4 text-[var(--foreground)] ${isMenuOpen ? 'block' : 'hidden'}`}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`text-lg px-4 py-2 hover:underline ${
                  pathname === item.path 
                    ? 'font-bold' 
                    : ''
                }`}
                onClick={() => setIsMenuOpen(false)} // Close menu when an item is clicked
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}