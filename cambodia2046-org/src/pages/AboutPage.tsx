export function AboutPage() {
  return (
    <div className="px-6 pt-28 pb-24">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-khmer-red">
          About
        </p>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Cambodia 2046
        </h1>
        <p className="mb-16 max-w-2xl text-lg text-zinc-400">
          A 20-year national football transformation journey.
          From movement to system — from system to World Cup.
        </p>

        {/* Vision */}
        <div className="mb-16">
          <h2 className="mb-4 text-2xl font-bold text-white">The Vision</h2>
          <p className="mb-4 text-sm leading-relaxed text-zinc-400">
            Cambodia 2046 is not a promise — it is a horizon. A national football transformation
            system built on six interconnected engines and one control layer, designed to take
            Cambodian football from cultural awakening to World Cup qualification over 20 years.
          </p>
          <p className="text-sm leading-relaxed text-zinc-400">
            The journey follows a deliberate evolution sequence:
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            {['Symbol', 'Movement', 'Culture', 'System', 'Performance', 'Legacy'].map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className={i === 0 ? 'font-semibold text-khmer-red' : 'text-zinc-400'}>
                  {step}
                </span>
                {i < 5 && <span className="text-zinc-700">&rarr;</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Gen2046 */}
        <div className="mb-16">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-khmer-red">
            Youth Identity
          </p>
          <h2 className="mb-6 text-2xl font-bold text-white">Gen2046</h2>
          <p className="mb-8 text-sm text-zinc-400">
            The generation that will carry Cambodia to 2046. Three cohorts, each with a distinct role.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-khmer-red">Core</p>
              <p className="mb-2 text-lg font-bold text-white">Born 2018–2025</p>
              <p className="text-sm text-zinc-400">The national team players of 2046. This generation grows up inside the system from the very beginning.</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Bridge</p>
              <p className="mb-2 text-lg font-bold text-white">Born 2010–2017</p>
              <p className="text-sm text-zinc-400">The coaches, analysts, and system builders. They bridge between the vision and the players.</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Future</p>
              <p className="mb-2 text-lg font-bold text-white">Born 2026+</p>
              <p className="text-sm text-zinc-400">The next generation. They inherit a system, not a dream. The legacy continues beyond 2046.</p>
            </div>
          </div>
        </div>

        {/* Strategic Truth */}
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">Strategic Truth</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { element: 'Symbol', meaning: 'Spark' },
              { element: 'Run', meaning: 'Movement' },
              { element: 'Convert', meaning: 'Pipeline' },
              { element: 'System', meaning: 'Stability' },
              { element: 'Performance', meaning: 'Legacy' },
            ].map((t) => (
              <div key={t.element} className="flex items-center gap-4 rounded-lg bg-zinc-900 border border-zinc-800 p-4">
                <span className="text-sm font-semibold text-white">{t.element}</span>
                <span className="text-zinc-700">=</span>
                <span className="text-sm text-khmer-red font-medium">{t.meaning}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Framework reference */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-zinc-500">
            Master Framework v3.1
          </p>
          <p className="text-sm text-zinc-400">
            Cambodia 2046 &middot; March 2026
          </p>
        </div>
      </div>
    </div>
  )
}
