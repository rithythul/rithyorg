export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--color-fg)" }}>
        About
      </h1>
      <p className="text-xl mb-8" style={{ color: "var(--color-muted)" }}>
        Building systems for emerging markets.
      </p>

      <div className="space-y-6" style={{ color: "var(--color-muted)", lineHeight: "1.75" }}>
        <p>
          This is a personal archive — a place to collect thoughts, research,
          and project updates. Everything here is written with intention.
        </p>
        <p>
          The crypto digest is a daily series tracking the most important
          developments in digital assets, DeFi, and the broader financial
          landscape.
        </p>
      </div>
    </div>
  );
}
