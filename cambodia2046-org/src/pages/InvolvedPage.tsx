import { Footprints, ArrowRightLeft, Heart } from 'lucide-react'

const ways = [
  {
    icon: Footprints,
    title: 'Run',
    desc: 'Join a RUN2046 event. Every step is a statement that Cambodia believes in its football future.',
    detail: 'From the 25KM seed run to provincial activation runs across all 25 provinces. Every participant becomes part of the ~2,046 km journey.',
  },
  {
    icon: ArrowRightLeft,
    title: 'Convert',
    desc: 'Know a young talent? Connect them to CONVERT2046.',
    detail: 'Help bridge the gap between passion and pathway. The conversion funnel turns run participants into academy prospects through structured trials.',
  },
  {
    icon: Heart,
    title: 'Support',
    desc: 'Follow the story. Share the journey. Contribute to the movement.',
    detail: 'Every voice amplifies the mission. Whether through social media, community engagement, or direct contribution — there is a place for everyone.',
  },
]

const socials = [
  { name: 'Facebook', href: '#', priority: 'Primary broadcast', stars: 5 },
  { name: 'YouTube', href: '#', priority: 'Documentary archive', stars: 4 },
  { name: 'TikTok', href: '#', priority: 'Run moments & Gen2046', stars: 4 },
  { name: 'Instagram', href: '#', priority: 'Visual identity & diaspora', stars: 3 },
  { name: 'Telegram', href: '#', priority: 'Internal coordination', stars: 3 },
]

export function InvolvedPage() {
  return (
    <div className="px-6 pt-28 pb-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-khmer-red">
          Join Us
        </p>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Get Involved
        </h1>
        <p className="mb-16 max-w-2xl text-lg text-zinc-400">
          Cambodia 2046 is a national movement. There's a place for everyone.
        </p>

        <div className="mb-20 grid gap-8 lg:grid-cols-3">
          {ways.map((w) => (
            <div
              key={w.title}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 transition hover:border-khmer-red/40"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-khmer-red/10">
                <w.icon className="h-7 w-7 text-khmer-red" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">{w.title}</h3>
              <p className="mb-4 text-sm font-medium text-zinc-300">{w.desc}</p>
              <p className="text-sm leading-relaxed text-zinc-500">{w.detail}</p>
            </div>
          ))}
        </div>

        {/* Social Channels */}
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-khmer-red">
            Follow the Journey
          </p>
          <h2 className="mb-4 text-2xl font-bold tracking-tight">
            Digital Channels
          </h2>
          <p className="mb-8 max-w-2xl text-sm text-zinc-400">
            Each platform serves a specific purpose in the Cambodia 2046 narrative strategy.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition hover:border-zinc-600"
              >
                <div>
                  <p className="font-semibold text-white group-hover:text-khmer-red transition">{s.name}</p>
                  <p className="text-xs text-zinc-500">{s.priority}</p>
                </div>
                <div className="text-xs text-zinc-600">
                  {'★'.repeat(s.stars)}{'☆'.repeat(5 - s.stars)}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
