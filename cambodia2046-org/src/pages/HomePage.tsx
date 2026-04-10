import { Link } from 'react-router-dom'
import { ArrowDown } from 'lucide-react'

export function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16">
        <div className="pointer-events-none absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-khmer-red/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-8 text-8xl sm:text-9xl">🇰🇭</div>

          <h1 className="mb-2 text-5xl font-extrabold tracking-tight sm:text-7xl">
            <span className="text-khmer-red">2046</span>
          </h1>

          <p className="mx-auto mb-6 max-w-2xl text-xl font-medium text-zinc-300 sm:text-2xl">
            From movement to system — from system to World Cup
          </p>

          <p className="mx-auto mb-10 max-w-lg text-base text-zinc-500">
            A 20-year national football transformation journey.
            Symbol &rarr; Movement &rarr; Culture &rarr; System &rarr; Performance &rarr; Legacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/engines"
              className="rounded-lg bg-khmer-red px-6 py-3 text-sm font-semibold text-white transition hover:bg-khmer-red-dark"
            >
              Explore the System
            </Link>
            <Link
              to="/involved"
              className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              Get Involved
            </Link>
          </div>
        </div>

        <Link
          to="/philosophy"
          className="absolute bottom-10 animate-bounce text-zinc-600 transition hover:text-zinc-400"
          aria-label="Explore philosophy"
        >
          <ArrowDown size={24} />
        </Link>
      </section>

      {/* Brief overview sections */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-3">
            <Link to="/philosophy" className="group">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-khmer-red">Philosophy</p>
              <h3 className="mb-2 text-xl font-bold text-white group-hover:text-khmer-red transition">Five Principles</h3>
              <p className="text-sm text-zinc-400">Culture before ambition. Structure before results. The foundation of everything.</p>
            </Link>
            <Link to="/engines" className="group">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-khmer-red">The System</p>
              <h3 className="mb-2 text-xl font-bold text-white group-hover:text-khmer-red transition">Six Engines</h3>
              <p className="text-sm text-zinc-400">RUN, BUILD, PERFORM, FUND, STORY, CONVERT — six interconnected engines driving transformation.</p>
            </Link>
            <Link to="/roadmap" className="group">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-khmer-red">Roadmap</p>
              <h3 className="mb-2 text-xl font-bold text-white group-hover:text-khmer-red transition">2026 — 2046</h3>
              <p className="text-sm text-zinc-400">Six phases over 20 years. From a single seed run to World Cup qualification.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
