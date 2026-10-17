import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Page not found", "This page moved or no longer exists.", "/404");

export default function NotFound() {
  return (
    <div className="reading page">
      <p className="label">404</p>
      <h1>Page not found</h1>
      <p className="page-intro">This page moved or no longer exists.</p>
      <div className="link-row">
        <a className="button" href="/writing">
          Go to Writing <span aria-hidden="true">→</span>
        </a>
        <a className="text-link" href="/">
          Home
        </a>
      </div>
    </div>
  );
}
