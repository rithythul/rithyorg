import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Our Beliefs', to: '/philosophy' },
  { label: 'The Movement', to: '/engines' },
  { label: 'The Journey', to: '/roadmap' },
  { label: 'Join Us', to: '/involved' },
  { label: 'About', to: '/about' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-warm-border/60 bg-cream/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-khmer-red text-xs font-black text-white">
            KH
          </span>
          <span className="font-serif text-warm-dark">
            Cambodia <span className="text-khmer-red">2046</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `text-sm transition ${isActive ? 'font-medium text-khmer-red' : 'text-warm-muted hover:text-warm-dark'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-warm-muted md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-warm-border bg-cream px-6 pb-4 md:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-3 text-sm transition ${isActive ? 'font-medium text-khmer-red' : 'text-warm-muted hover:text-warm-dark'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}
