import { Link } from 'react-router-dom'
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
  id: string
  icon: LucideIcon
  name: string
  label: string
  desc: string
  color: string
}

const engines: Engine[] = [
  {
    id: 'run2046',
    icon: Footprints,
    name: 'RUN2046',
    label: 'Cultural Engine',
    desc: '~2,046 km of national runs — making football part of Cambodian daily life and identity.',
    color: 'text-red-400',
  },
  {
    id: 'build2046',
    icon: Building2,
    name: 'BUILD2046',
    label: 'Structural Engine',
    desc: '1 Province — 1 Club — 1 Stadium. Building the physical and economic infrastructure.',
    color: 'text-blue-400',
  },
  {
    id: 'perform2046',
    icon: Trophy,
    name: 'PERFORM2046',
    label: 'Technical Engine',
    desc: 'Youth pipeline from U8 to U23. Coaching pathways, sports science, and national team integration.',
    color: 'text-amber-400',
  },
  {
    id: 'fund2046',
    icon: Wallet,
    name: 'FUND2046',
    label: 'Financial Engine',
    desc: 'Anti-fragile three-layer funding. The system survives even if funding drops 50%.',
    color: 'text-emerald-400',
  },
  {
    id: 'story2046',
    icon: Megaphone,
    name: 'STORY2046',
    label: 'Narrative Engine',
    desc: 'Document and amplify the movement. Restraint over volume. Truth over reach.',
    color: 'text-purple-400',
  },
  {
    id: 'convert2046',
    icon: ArrowRightLeft,
    name: 'CONVERT2046',
    label: 'Pipeline Engine',
    desc: 'The bridge between feeling and becoming. Converting cultural energy into player development.',
    color: 'text-orange-400',
  },
]

export { engines }

export function EnginesPage() {
  return (
    <div className="px-6 pt-28 pb-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-khmer-red">
          The System
        </p>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Six Engines
        </h1>
        <p className="mb-4 max-w-2xl text-lg text-zinc-400">
          A national football transformation system built on six interconnected engines,
          each driving Cambodia toward 2046.
        </p>
        <p className="mb-12 max-w-3xl text-sm text-zinc-500">
          Symbol &rarr; Movement &rarr; Culture &rarr; System &rarr; Performance &rarr; Legacy
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {engines.map((e) => (
            <Link
              key={e.id}
              to={`/engines/${e.id}`}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-zinc-700 hover:bg-zinc-900"
            >
              <e.icon className={`mb-4 h-8 w-8 ${e.color}`} strokeWidth={1.5} />
              <h3 className="mb-1 text-lg font-bold text-white group-hover:text-khmer-red transition">{e.name}</h3>
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                {e.label}
              </p>
              <p className="text-sm leading-relaxed text-zinc-400">{e.desc}</p>
              <p className="mt-4 text-xs font-medium text-khmer-red opacity-0 transition group-hover:opacity-100">
                Learn more &rarr;
              </p>
            </Link>
          ))}
        </div>

        {/* Control Layer */}
        <div className="mt-16 rounded-xl border border-zinc-800 bg-zinc-900/50 p-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-khmer-red">
            Control Layer
          </p>
          <h2 className="mb-4 text-2xl font-bold text-white">SYSTEM2046</h2>
          <p className="mb-6 max-w-2xl text-sm text-zinc-400">
            Coordination, KPI tracking, standards enforcement, and integrity protection.
            The system that keeps the six engines aligned and accountable.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-zinc-800/50 p-4">
              <p className="text-sm font-semibold text-white">Structure</p>
              <p className="text-xs text-zinc-500">National Steering Group, Technical Committee, Provincial Units</p>
            </div>
            <div className="rounded-lg bg-zinc-800/50 p-4">
              <p className="text-sm font-semibold text-white">Cadence</p>
              <p className="text-xs text-zinc-500">Weekly operational, Monthly review, Quarterly strategic, Annual summit</p>
            </div>
            <div className="rounded-lg bg-zinc-800/50 p-4">
              <p className="text-sm font-semibold text-white">Functions</p>
              <p className="text-xs text-zinc-500">Coordination, KPI tracking, Standards, Integrity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
