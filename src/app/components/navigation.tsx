'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  const navItems = [
    { name: 'about', path: '/about' },
    { name: 'writing', path: '/writing' },
    { name: 'projects', path: '/projects' },
    { name: 'social', path: '/social' },
  ]

  return (
    <nav className="w-full sm:w-auto">
      <div className="border border-foreground/20 rounded-full px-1 py-1 flex space-x-1 justify-center sm:justify-start">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`text-base px-4 py-1 rounded-full transition-colors ${
              pathname === item.path 
                ? 'bg-foreground/10' 
                : 'hover:bg-foreground/10'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}