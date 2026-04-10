const principles = [
  {
    title: 'Culture before ambition',
    desc: 'Build identity first — results follow culture.',
    detail:
      'Cambodia 2046 starts not with tactics or infrastructure, but with identity. A nation must believe in its football soul before it can build a football system. Cultural roots anchor every decision.',
  },
  {
    title: 'Structure before results',
    desc: 'No shortcut — systems must exist before performance.',
    detail:
      'Results without structure are accidents. Structure without results is patience. We choose patience — building academies, coaching pathways, and league systems before demanding trophies.',
  },
  {
    title: 'Discipline over spectacle',
    desc: 'Authentic execution over viral moments.',
    detail:
      'Every story, every run, every reveal is measured. We do not chase attention — we earn it through consistent, disciplined execution. The work speaks louder than the announcement.',
  },
  {
    title: 'Unity over division',
    desc: 'National cohesion drives every decision.',
    detail:
      'Football in Cambodia must unite, not divide. Every province, every club, every community is part of the same mission. Competition strengthens — tribalism destroys.',
  },
  {
    title: 'Horizon, not hype',
    desc: 'Long-term thinking resists short-term pressure.',
    detail:
      '2046 is not a marketing slogan — it is a 20-year commitment. Every phase, every decision is evaluated against the horizon. We resist the pressure to shortcut the journey.',
  },
]

export function PhilosophyPage() {
  return (
    <div className="px-6 pt-28 pb-24">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-khmer-red">
          Philosophy
        </p>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Five Principles
        </h1>
        <p className="mb-16 max-w-2xl text-lg text-zinc-400">
          The foundation upon which every decision, every run, and every system is built.
          These are not slogans — they are operational constraints.
        </p>

        <div className="space-y-8">
          {principles.map((p, i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 transition hover:border-khmer-red/40"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-khmer-red/10 text-sm font-bold text-khmer-red">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h2 className="text-xl font-bold text-white">{p.title}</h2>
              </div>
              <p className="mb-3 font-medium text-zinc-300">{p.desc}</p>
              <p className="text-sm leading-relaxed text-zinc-500">{p.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
