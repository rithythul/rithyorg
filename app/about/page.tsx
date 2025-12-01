export default function About() {
  return (
    <div className="space-y-16 pt-20 pb-20 max-w-3xl">
      {/* Manifesto Hero */}
      <section className="border-b border-foreground/10 pb-12">
        <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-foreground leading-[0.9]">
          Building <br />
          <span className="text-muted-foreground italic">systems</span> for <br />
          emerging markets.
        </h1>
      </section>

      {/* Bio */}
      <section className="space-y-8">
        <p className="font-serif text-3xl md:text-4xl leading-tight text-foreground">
          Phnom Penh, Cambodia. Founder of <strong className="text-foreground underline decoration-2 underline-offset-4">SmallWorld</strong>, a venture builder behind <strong className="text-foreground">KOOMPI</strong>, <strong className="text-foreground">Selendra</strong>, and <strong className="text-foreground">StadiumX</strong>.
        </p>

        <div className="prose prose-lg prose-stone max-w-none 
          prose-p:font-sans prose-p:text-lg prose-p:leading-relaxed prose-p:text-muted-foreground
        ">
          <p>
            Work at the intersection of technology, education, and sovereignty. Emerging markets thrive when they build their own digital and physical infrastructure.
          </p>
          <p>
            From KOOMPI OS to blockchain networks (Selendra), the goal is to create tools that empower the next generation of builders.
          </p>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="space-y-6">
        <h3 className="font-mono text-sm text-muted uppercase tracking-wider border-b border-foreground/10 pb-2">
          Focus Areas
        </h3>
        <div className="grid grid-cols-2 gap-6">
          {[
            { title: "Venture Building", desc: "Creating sustainable business models." },
            { title: "Open Source", desc: "Advocating for digital sovereignty." },
            { title: "Education", desc: "Rethinking learning in the digital age." },
            { title: "Hardware", desc: "Physical tools for builders." }
          ].map((item) => (
            <div key={item.title} className="group">
              <div className="font-serif text-xl font-bold group-hover:text-amber-600 transition-colors">
                {item.title}
              </div>
              <div className="font-mono text-sm text-muted mt-2">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="p-8 bg-foreground text-background rounded-sm">
        <h3 className="font-mono text-sm text-white/60 uppercase tracking-wider mb-6">
          The Philosophy
        </h3>
        <p className="font-serif text-2xl md:text-3xl leading-tight font-medium">
          "The Living Archive" is the conviction that our work, thoughts, and systems must be documented, shared, and allowed to evolve.
        </p>
        <div className="h-px bg-white/20 my-6" />
        <p className="font-sans text-lg text-white/80 leading-relaxed">
          Building infrastructure that empowers the next generation of builders to surpass us.
        </p>
      </section>
    </div>
  );
}
