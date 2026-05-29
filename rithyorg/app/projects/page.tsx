export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--color-fg)" }}>
        Projects
      </h1>
      <p className="mb-12" style={{ color: "var(--color-muted)" }}>
        Things I&apos;ve built and am working on.
      </p>

      <div className="py-20 text-center" style={{ color: "var(--color-muted)" }}>
        <p className="text-lg">Coming soon.</p>
        <p className="text-sm mt-2">Projects will be listed here.</p>
      </div>
    </div>
  );
}
