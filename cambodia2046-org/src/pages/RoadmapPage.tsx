const phases = [
  {
    phase: '0',
    period: '2026',
    title: 'Ignition',
    desc: '25KM Seed Run: Morodok → VSK → PPC → ISI Park',
    detail: 'The origin point. A 25km run that proved the concept — that Cambodia could believe in a 20-year football journey. This was the authenticity proof.',
    status: 'complete' as const,
  },
  {
    phase: '1',
    period: '2026',
    title: 'Symbol',
    desc: '🇰🇭2046 — Not promise. Horizon.',
    detail: 'The symbol phase establishes the identity. 🇰🇭2046 is not a promise — it is a horizon. A direction, not a guarantee. The symbol must be earned through every phase that follows.',
    status: 'active' as const,
  },
  {
    phase: '2',
    period: '2026–2027',
    title: 'National Movement',
    desc: 'CPL Unity Runs across Cambodia',
    detail: 'Three major runs ignite the national movement:\n\nRun 1 — CPL Unity Run (~321 km): Akihiro → Kompong Thom → VSK → PPC → ISI Park\nRun 2 — Southern Corridor (~303 km): Life → Kampot → Kirivong → Naga → Olympic\nRun 3 — Eastern Corridor (~140 km): Svay Rieng → Army → Morodok',
    status: 'upcoming' as const,
  },
  {
    phase: '3',
    period: '2027–2028',
    title: 'Provincial Expansion',
    desc: '~1,453 km total. All 25 provinces activated.',
    detail: 'The movement goes nationwide. Every province becomes part of the 2046 story. Provincial runs, local clubs, and community engagement create a truly national football culture.',
    status: 'upcoming' as const,
  },
  {
    phase: '4',
    period: '2028–2032',
    title: 'System Build',
    desc: 'League strengthening. Academy system in 10+ provinces. 300+ licensed coaches.',
    detail: 'The transition from movement to system. Infrastructure, coaching pipelines, league structures, and academy systems are built across the country. This is the hardest phase — discipline over spectacle.',
    status: 'upcoming' as const,
  },
  {
    phase: '5',
    period: '2032–2046',
    title: 'Performance Era',
    desc: 'ASEAN → Regional → Asian → World Cup.',
    detail: '2030: ASEAN competitive\n2036: Regional contender\n2040: Asian competitive\n2046: World Cup qualification\n\nThe system delivers performance. Twenty years of discipline, structure, and unity culminate in Cambodia standing on the world stage.',
    status: 'upcoming' as const,
  },
]

const distances = [
  { run: '25KM Seed', distance: '25 km', role: 'Origin — authenticity proof' },
  { run: 'Run 1 (CPL Flagship)', distance: '~321 km', role: 'National movement ignition' },
  { run: 'Run 2 (Southern)', distance: '~303 km', role: 'Expansion beyond core regions' },
  { run: 'Run 3 (Eastern)', distance: '~140 km', role: 'Stronghold → national centre → future' },
  { run: 'Provincial phase', distance: '~1,453 km', role: 'Full national activation' },
  { run: 'Annual ritual', distance: '6 km/year', role: 'Memory and continuity' },
]

export function RoadmapPage() {
  return (
    <div className="px-6 pt-28 pb-24">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-khmer-red">
          Roadmap
        </p>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          The Journey to 2046
        </h1>
        <p className="mb-16 max-w-2xl text-lg text-zinc-400">
          Six phases over 20 years. From a single seed run to World Cup qualification.
        </p>

        {/* Timeline */}
        <div className="relative mb-24">
          <div className="absolute left-[23px] top-2 bottom-2 w-px bg-zinc-800" />

          <div className="space-y-10">
            {phases.map((p) => (
              <div key={p.phase} className="relative flex gap-6">
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

                <div className="pt-1 pb-2 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
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
                  <p className="mb-2 text-sm text-zinc-300">{p.desc}</p>
                  <p className="text-sm leading-relaxed text-zinc-500 whitespace-pre-line">{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Distance Strategy */}
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-khmer-red">
            Distance Strategy
          </p>
          <h2 className="mb-4 text-2xl font-bold tracking-tight">
            ~2,046 km — The Number is the Mission
          </h2>
          <p className="mb-8 text-sm text-zinc-400">
            Every kilometre is symbolic. The total distance mirrors the destination year.
          </p>

          <div className="overflow-hidden rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/80">
                  <th className="px-4 py-3 text-left font-semibold text-zinc-300">Run</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-300">Distance</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-300">Role</th>
                </tr>
              </thead>
              <tbody>
                {distances.map((d) => (
                  <tr key={d.run} className="border-b border-zinc-800/50 last:border-0">
                    <td className="px-4 py-3 font-medium text-white">{d.run}</td>
                    <td className="px-4 py-3 text-zinc-400">{d.distance}</td>
                    <td className="px-4 py-3 text-zinc-500">{d.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-lg bg-khmer-red/5 border border-khmer-red/20 p-4 text-center">
            <p className="text-sm font-semibold text-khmer-red">
              Total (symbolic): ~2,046 km
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
