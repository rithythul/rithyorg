import { Footprints, ArrowRightLeft, Heart } from 'lucide-react'

const ways = [
  {
    icon: Footprints,
    title: 'Run',
    desc: 'Join a RUN2046 event. Every step is a statement that Cambodia believes in its football future.',
  },
  {
    icon: ArrowRightLeft,
    title: 'Convert',
    desc: 'Know a young talent? Connect them to CONVERT2046. Help bridge the gap between passion and pathway.',
  },
  {
    icon: Heart,
    title: 'Support',
    desc: 'Follow the story. Share the journey. Contribute to the movement. Every voice amplifies the mission.',
  },
]

const socials = [
  { name: 'Facebook', href: '#', icon: 'fb' },
  { name: 'YouTube', href: '#', icon: 'yt' },
  { name: 'TikTok', href: '#', icon: 'tt' },
  { name: 'Instagram', href: '#', icon: 'ig' },
  { name: 'Telegram', href: '#', icon: 'tg' },
]

export function GetInvolved() {
  return (
    <section id="get-involved" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-khmer-red">
          Join Us
        </p>
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Get Involved
        </h2>
        <p className="mb-12 max-w-2xl text-zinc-400">
          Cambodia 2046 is a national movement. There's a place for everyone.
        </p>

        <div className="mb-16 grid gap-6 sm:grid-cols-3">
          {ways.map((w) => (
            <div
              key={w.title}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center transition hover:border-khmer-red/40"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-khmer-red/10">
                <w.icon className="h-6 w-6 text-khmer-red" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{w.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{w.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="mb-6 text-sm font-medium uppercase tracking-widest text-zinc-500">
            Follow the journey
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-sm text-zinc-400 transition hover:border-zinc-600 hover:text-white"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
