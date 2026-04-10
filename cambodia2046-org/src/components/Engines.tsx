import {
  Footprints,
  Building2,
  Trophy,
  Wallet,
  Megaphone,
  ArrowRightLeft,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Engine {
  icon: LucideIcon
  name: string
  label: string
  desc: string
  color: string
}

const engines: Engine[] = [
  {
    icon: Footprints,
    name: 'RUN2046',
    label: 'Cultural Engine',
    desc: '~2,046 km of national runs — making football part of Cambodian daily life and identity. From the 25KM seed run to provincial activation across all 25 provinces.',
    color: 'text-red-400',
  },
  {
    icon: Building2,
    name: 'BUILD2046',
    label: 'Structural Engine',
    desc: '1 Province — 1 Club — 1 Stadium. Building the physical and economic infrastructure: stadiums, training centres, academies, and provincial club formation.',
    color: 'text-blue-400',
  },
  {
    icon: Trophy,
    name: 'PERFORM2046',
    label: 'Technical Engine',
    desc: 'Youth pipeline from U8 to U23. Coaching pathways, sports science, and national team integration — growing from 500 to 30,000+ registered players.',
    color: 'text-amber-400',
  },
  {
    icon: Wallet,
    name: 'FUND2046',
    label: 'Financial Engine',
    desc: 'Anti-fragile three-layer funding: community base, corporate growth, and major event spikes. The system survives even if funding drops 50%.',
    color: 'text-emerald-400',
  },
  {
    icon: Megaphone,
    name: 'STORY2046',
    label: 'Narrative Engine',
    desc: 'Document and amplify the movement. Restraint over volume. Truth over reach. Arc over moment. Every story serves the 20-year journey.',
    color: 'text-purple-400',
  },
  {
    icon: ArrowRightLeft,
    name: 'CONVERT2046',
    label: 'Pipeline Engine',
    desc: 'The bridge between feeling and becoming. Run → Emotion → Sign-up → Trial → Academy pathway. Converting cultural energy into player development.',
    color: 'text-orange-400',
  },
]

export function Engines() {
  return (
    <section id="engines" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-khmer-red">
          The System
        </p>
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Six Engines
        </h2>
        <p className="mb-12 max-w-2xl text-zinc-400">
          A national football transformation system built on six interconnected engines,
          each driving Cambodia toward 2046.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {engines.map((e) => (
            <div
              key={e.name}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-zinc-700 hover:bg-zinc-900"
            >
              <e.icon className={`mb-4 h-8 w-8 ${e.color}`} strokeWidth={1.5} />
              <h3 className="mb-1 text-lg font-bold text-white">{e.name}</h3>
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                {e.label}
              </p>
              <p className="text-sm leading-relaxed text-zinc-400">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
