export default function About() {
  return (
    <div className="space-y-24 pt-20 pb-20">
      {/* Manifesto Hero */}
      <section className="border-b border-foreground/10 pb-12">
        <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-foreground leading-[0.9]">
          I build <br />
          <span className="text-muted-foreground italic">systems</span> for <br />
          emerging markets.
        </h1>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        {/* Left Column: Bio (Narrative) */}
        <div className="md:col-span-5 space-y-8">
          <p className="font-serif text-3xl md:text-4xl leading-tight text-foreground">
            Based in Phnom Penh, Cambodia. I am the founder of <strong className="text-foreground underline decoration-2 underline-offset-4">SmallWorld</strong>, a venture builder that has launched companies like <strong className="text-foreground">KOOMPI</strong> and <strong className="text-foreground">VitaminAir</strong>.
          </p>

          <div className="prose prose-lg prose-stone max-w-none 
            prose-p:font-sans prose-p:text-lg prose-p:leading-relaxed prose-p:text-muted-foreground
          ">
            <p>
              My work sits at the intersection of technology, education, and sovereignty. I believe that for emerging markets to thrive, they must build their own digital and physical infrastructure.
            </p>
            <p>
              From designing hardware (KOOMPI) to architecting blockchain networks (Selendra), my goal is to create tools that empower the next generation of builders.
            </p>
          </div>
        </div>

        {/* Right Column: Focus & Philosophy (Structure) */}
        <div className="md:col-span-7 space-y-16">
          {/* Focus Areas */}
          <div className="space-y-8">
            <h3 className="font-mono text-sm text-muted uppercase tracking-wider border-b border-foreground/10 pb-2">
              Focus Areas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: "Venture Building", desc: "Creating sustainable business models." },
                { title: "Open Source", desc: "Advocating for digital sovereignty." },
                { title: "Education", desc: "Rethinking learning in the digital age." },
                { title: "Hardware", desc: "Building physical tools for builders." }
              ].map((item) => (
                <div key={item.title} className="group">
                  <div className="font-serif text-xl font-bold group-hover:text-muted-foreground transition-colors">
                    {item.title}
                  </div>
                  <div className="font-mono text-sm text-muted mt-2">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Philosophy (Lowest) */}
          <div className="p-8 bg-foreground text-background rounded-sm">
            <h3 className="font-mono text-sm text-white/60 uppercase tracking-wider mb-6">
              The Philosophy
            </h3>
            <p className="font-serif text-2xl md:text-3xl leading-tight font-medium">
              "The Living Archive" is the conviction that our work, thoughts, and systems must be documented, shared, and allowed to evolve.
            </p>
            <div className="h-px bg-white/20 my-6" />
            <p className="font-sans text-lg text-white/80 leading-relaxed">
              We don't just build for today. We build infrastructure that empowers the next generation of builders to surpass us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
