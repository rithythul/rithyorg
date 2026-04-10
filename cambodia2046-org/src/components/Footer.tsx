import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-warm-border px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-8 text-center">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-khmer-red text-[10px] font-black text-white">
              KH
            </span>
            <span className="font-serif text-sm font-bold text-warm-dark">
              Cambodia <span className="text-khmer-red">2046</span>
            </span>
          </Link>

          <p className="max-w-md font-serif text-sm italic text-warm-muted">
            "From a single run to a nation's dream. Every step counts."
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-warm-light">
            <Link to="/philosophy" className="transition hover:text-khmer-red">Our Beliefs</Link>
            <Link to="/engines" className="transition hover:text-khmer-red">The Movement</Link>
            <Link to="/roadmap" className="transition hover:text-khmer-red">The Journey</Link>
            <Link to="/involved" className="transition hover:text-khmer-red">Join Us</Link>
          </div>

          <p className="text-xs text-warm-light">
            &copy; {new Date().getFullYear()} Cambodia 2046. Built with love for the beautiful game.
          </p>
        </div>
      </div>
    </footer>
  )
}
