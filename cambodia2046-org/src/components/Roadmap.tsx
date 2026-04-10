const phases = [
  {
    phase: '0',
    period: '2026',
    title: 'Ignition',
    desc: '25KM Seed Run: Morodok → VSK → PPC → ISI Park',
    status: 'complete' as const,
  },
  {
    phase: '1',
    period: '2026',
    title: 'Symbol',
    desc: '🇰🇭2046 — Not promise. Horizon.',
    status: 'active' as const,
  },
  {
    phase: '2',
    period: '2026–2027',
    title: 'National Movement',
    desc: 'CPL Unity Runs across Cambodia — Run 1 (~321 km), Run 2 (~303 km), Run 3 (~140 km)',
    status: 'upcoming' as const,
  },
  {
    phase: '3',
    period: '2027–2028',
    title: 'Provincial Expansion',
    desc: '~1,453 km total. All 25 provinces activated.',
    status: 'upcoming' as const,
  },
  {
    phase: '4',
    period: '2028–2032',
    title: 'System Build',
    desc: 'League strengthening. Academy system in 10+ provinces. 300+ licensed coaches.',
    status: 'upcoming' as const,
  },
  {
    phase: '5',
    period: '2032–2046',
    title: 'Performance Era',
    desc: '2030 ASEAN competitive → 2036 Regional contender → 2040 Asian competitive → 2046 World Cup qualification.',
    status: 'upcoming' as const,
  },
]

export function Roadmap() {
  return (
    <section id="roadmap" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-khmer-red">
          Roadmap
        </p>
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          The Journey to 2046
        </h2>
        <p className="mb-12 max-w-2xl text-zinc-400">
          Six phases over 20 years. From a single seed run to World Cup qualification.
        </p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[23px] top-2 bottom-2 w-px bg-zinc-800" />

          <div className="space-y-8">
            {phases.map((p) => (
              <div key={p.phase} className="relative flex gap-6">
                {/* Dot */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-bold ${
                      p.status === 'complete'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : p.status === 'active'
                          ? 'border-khmer-red bg-khmer-red/10 text-khmer-red'
                          : 'border-zinc-700 bg-zinc-900 text-zinc-500'
                    }`}
                  >
                    {p.phase}
                  </div>
                </div>

                {/* Content */}
                <div className="pt-1 pb-2">
                  <div className="mb-1 flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                    <span className="rounded-full bg-zinc-800 px-3 py-0.5 text-xs text-zinc-400">
                      {p.period}
                    </span>
                    {p.status === 'complete' && (
                      <span className="rounded-full bg-emerald-500/10 px-3 py-0.5 text-xs font-medium text-emerald-400">
                        Complete
                      </span>
                    )}
                    {p.status === 'active' && (
                      <span className="rounded-full bg-khmer-red/10 px-3 py-0.5 text-xs font-medium text-khmer-red">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-400">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
