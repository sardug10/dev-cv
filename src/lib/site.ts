/**
 * Canonical site URL for metadata and Open Graph.
 * Set `NEXT_PUBLIC_SITE_URL` in production (e.g. `https://yoursite.com`) so
 * previews (WhatsApp, Slack, etc.) always point at your real domain.
 *
 * On Vercel: production builds prefer `VERCEL_PROJECT_PRODUCTION_URL` so
 * `metadataBase` matches your primary hostname; preview deployments use
 * `VERCEL_URL`.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  if (process.env.VERCEL_ENV === "production") {
    const primary = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
    if (primary) {
      return `https://${primary.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;
    }
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    return `https://${vercel.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;
  }

  return "http://localhost:3000";
}

/** Absolute `https://…` URL for a path (e.g. `/assets/…`) or pass-through if already absolute. */
export function absoluteFromSite(pathOrUrl: string): string {
  const trimmed = pathOrUrl.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  const base = getSiteUrl().replace(/\/$/, "");
  const path = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return new URL(path, `${base}/`).href;
}
