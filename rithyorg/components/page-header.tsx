// eyebrow, title and intro shared by the index pages
export default function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="page-header">
      <p className="label">{eyebrow}</p>
      <h1>{title}</h1>
      {children && <div className="page-intro">{children}</div>}
    </header>
  );
}
