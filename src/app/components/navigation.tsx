'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  const navItems = [
    { name: 'home', path: '/' },
    { name: 'about', path: '/about' },
    { name: 'writing', path: '/writing' },
    { name: 'projects', path: '/projects' },
    { name: 'social', path: '/social' },
  ]

  return (
    <nav className="w-full px-2 sm:px-0 sm:w-auto">
      <div className="max-w-full overflow-x-auto">
        <div className="border border-foreground/20 rounded-full px-1 py-1 flex whitespace-nowrap justify-start sm:justify-center min-w-fit mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`text-lg sm:text-lg px-4 sm:px-3 py-1.5 rounded-full transition-colors ${
                pathname === item.path 
                  ? 'bg-foreground/10' 
                  : 'hover:bg-foreground/5'
              } ${
                item.name !== navItems[navItems.length - 1].name ? 'mr-1' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}