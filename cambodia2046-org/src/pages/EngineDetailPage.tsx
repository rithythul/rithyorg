import { useParams, Link } from 'react-router-dom'
import {
  Footprints,
  Building2,
  Trophy,
  Wallet,
  Megaphone,
  ArrowRightLeft,
  ArrowLeft,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface EngineDetail {
  icon: LucideIcon
  name: string
  label: string
  color: string
  tagline: string
  overview: string
  details: { heading: string; content: string }[]
  metrics?: { label: string; value: string }[]
}

const engineData: Record<string, EngineDetail> = {
  run2046: {
    icon: Footprints,
    name: 'RUN2046',
    label: 'Cultural Engine',
    color: 'text-red-400',
    tagline: '~2,046 km of national runs — making football part of Cambodian daily life.',
    overview:
      'RUN2046 is the cultural heartbeat of Cambodia 2046. Through a symbolic network of ~2,046 km of national runs, it transforms football from a spectator sport into a lived experience. Every run is a statement: Cambodia believes in its football future.',
    details: [
      {
        heading: 'Components',
        content:
          '25KM seed run, CPL Unity Runs (Run 1/2/3), Provincial runs (~1,453 km), Annual ritual on 20 April (6 km).',
      },
      {
        heading: 'CONVERT Link',
        content:
          'Every run event includes a CONVERT2046 booth — the cultural engine feeds directly into the pipeline engine. Run participants become academy prospects.',
      },
      {
        heading: 'Outcome',
        content: 'Football becomes part of Cambodian daily life and identity.',
      },
    ],
    metrics: [
      { label: '2027', value: '500 participants' },
      { label: '2030', value: '5,000 participants' },
      { label: '2036', value: '10,000+ participants' },
    ],
  },
  build2046: {
    icon: Building2,
    name: 'BUILD2046',
    label: 'Structural Engine',
    color: 'text-blue-400',
    tagline: '1 Province — 1 Club — 1 Stadium.',
    overview:
      'BUILD2046 creates the physical and economic infrastructure for Cambodian football. From stadium construction to academy systems, it ensures football is physically and economically viable nationwide.',
    details: [
      {
        heading: 'Focus',
        content:
          'Stadium construction, training centres, academy system nationwide, and provincial club formation.',
      },
      {
        heading: 'Model',
        content: '1 Province — 1 Club — 1 Stadium. Every province gets its own football identity.',
      },
      {
        heading: 'Outcome',
        content: 'Football becomes physically and economically viable across all 25 provinces.',
      },
    ],
    metrics: [
      { label: 'Phase 1', value: '5 upgraded facilities' },
      { label: 'Phase 2', value: '12 provincial clubs' },
      { label: 'Phase 3', value: '25 full-spec academies' },
    ],
  },
  perform2046: {
    icon: Trophy,
    name: 'PERFORM2046',
    label: 'Technical Engine',
    color: 'text-amber-400',
    tagline: 'Youth pipeline U8 to U23. Cambodia becomes competitive.',
    overview:
      'PERFORM2046 builds the talent pipeline that turns young Cambodians into world-class footballers. From grassroots U8 programs to U23 national team integration, it covers coaching pathways, sports science, and performance systems.',
    details: [
      {
        heading: 'Focus',
        content: 'Youth pipeline U8→U23, coaching pathway, sports science, national team integration.',
      },
      {
        heading: 'Player Pipeline',
        content: '500 registered (2026) → 5,000 (2030) → 15,000 (2036) → 30,000+ (2040).',
      },
      {
        heading: 'Coaching Pipeline',
        content: '50 licensed (2026) → 300 (2030) → 1,000 (2036) → 2,500 (2040).',
      },
    ],
  },
  fund2046: {
    icon: Wallet,
    name: 'FUND2046',
    label: 'Financial Engine',
    color: 'text-emerald-400',
    tagline: 'Anti-fragile. The system survives even if funding drops 50%.',
    overview:
      'FUND2046 implements a three-layer funding architecture designed to be anti-fragile. The system is built to survive dramatic funding drops while scaling operations over 20 years.',
    details: [
      {
        heading: 'Base Layer (Survival)',
        content:
          'Diaspora micro-funding and community giving. $5K–$50K/yr. Survives with zero sponsor income.',
      },
      {
        heading: 'Growth Layer (Scale)',
        content: 'Corporate sponsors and government grants. $1M–$30M. Scales operations.',
      },
      {
        heading: 'Spike Layer (Accelerate)',
        content: 'Major events and international grants. $5M–$50M+. Treated as bonus, not dependency.',
      },
    ],
  },
  story2046: {
    icon: Megaphone,
    name: 'STORY2046',
    label: 'Narrative Engine',
    color: 'text-purple-400',
    tagline: 'Restraint over volume. Truth over reach. Arc over moment.',
    overview:
      'STORY2046 documents and amplifies the movement with discipline. Every story serves the 20-year journey — not the news cycle. The narrative engine ensures Cambodia 2046 is heard, felt, and remembered.',
    details: [
      {
        heading: 'Function',
        content:
          'Document and amplify the movement — runs, reveals, Gen2046 journeys, milestones.',
      },
      {
        heading: 'Channels',
        content: 'Facebook (primary broadcast), YouTube (documentary archive), TikTok (youth/Gen2046), Instagram (visual identity/diaspora).',
      },
      {
        heading: 'Discipline',
        content: 'Restraint over volume. Truth over reach. Arc over moment. Every piece of content serves the long game.',
      },
    ],
  },
  convert2046: {
    icon: ArrowRightLeft,
    name: 'CONVERT2046',
    label: 'Pipeline Engine',
    color: 'text-orange-400',
    tagline: 'The bridge between feeling and becoming.',
    overview:
      'CONVERT2046 is the missing link between cultural movement and talent pipeline. It replaces the "???" in: Run → Emotion → ??? → Academy → Player. It converts emotional connection into structured pathways.',
    details: [
      {
        heading: 'The Conversion Funnel',
        content:
          '1. Awareness — Run participant connects with 🇰🇭2046\n2. Interest — CONVERT2046 booth at run finish line\n3. Sign-up — "Run with us → Train with us"\n4. Trial — Open academy trial within 2 weeks\n5. Pathway — Youth enters U8–U16 programme',
      },
      {
        heading: 'Key Insight',
        content:
          'Every RUN2046 event feeds directly into CONVERT2046. Cultural energy becomes player development. Emotion becomes structure.',
      },
    ],
  },
}

export function EngineDetailPage() {
  const { engineId } = useParams<{ engineId: string }>()
  const engine = engineId ? engineData[engineId] : null

  if (!engine) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 pt-16">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-white">Engine not found</h1>
          <Link to="/engines" className="text-sm text-khmer-red hover:underline">
            &larr; Back to Engines
          </Link>
        </div>
      </div>
    )
  }

  const Icon = engine.icon

  return (
    <div className="px-6 pt-28 pb-24">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/engines"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          All Engines
        </Link>

        <div className="mb-8 flex items-center gap-4">
          <Icon className={`h-10 w-10 ${engine.color}`} strokeWidth={1.5} />
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              {engine.name}
            </h1>
            <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
              {engine.label}
            </p>
          </div>
        </div>

        <p className="mb-4 text-lg font-medium text-zinc-300">{engine.tagline}</p>
        <p className="mb-12 text-sm leading-relaxed text-zinc-400">{engine.overview}</p>

        <div className="space-y-6">
          {engine.details.map((d) => (
            <div
              key={d.heading}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
            >
              <h3 className="mb-3 text-base font-semibold text-white">{d.heading}</h3>
              <p className="text-sm leading-relaxed text-zinc-400 whitespace-pre-line">{d.content}</p>
            </div>
          ))}
        </div>

        {engine.metrics && (
          <div className="mt-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500">
              Targets
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {engine.metrics.map((m) => (
                <div key={m.label} className="rounded-lg bg-zinc-900 border border-zinc-800 p-4 text-center">
                  <p className="text-xs font-medium text-zinc-500">{m.label}</p>
                  <p className="mt-1 text-lg font-bold text-white">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
