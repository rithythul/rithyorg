const principles = [
  {
    title: 'Culture before ambition',
    desc: 'Build identity first — results follow culture.',
  },
  {
    title: 'Structure before results',
    desc: 'No shortcut — systems must exist before performance.',
  },
  {
    title: 'Discipline over spectacle',
    desc: 'Authentic execution over viral moments.',
  },
  {
    title: 'Unity over division',
    desc: 'National cohesion drives every decision.',
  },
  {
    title: 'Horizon, not hype',
    desc: 'Long-term thinking resists short-term pressure.',
  },
]

export function Philosophy() {
  return (
    <section id="philosophy" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-khmer-red">
          Philosophy
        </p>
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Five Principles
        </h2>
        <p className="mb-12 max-w-2xl text-zinc-400">
          The foundation upon which every decision, every run, and every system is built.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <div
              key={i}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-khmer-red/40 hover:bg-zinc-900"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-md bg-khmer-red/10 text-sm font-bold text-khmer-red">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{p.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
