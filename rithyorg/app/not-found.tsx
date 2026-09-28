import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Page not found", "This page could not be found.", "/404");

export default function NotFound() {
  return (
    <div className="reading page">
      <p className="label">404</p>
      <h1>Page not found</h1>
      <p>The address may have changed, or the page may no longer be here.</p>
      <a className="text-link" href="/writing">
        Find something in Writing <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
