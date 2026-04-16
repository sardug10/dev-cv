/**
 * Canonical site URL for metadata and Open Graph.
 * Set `NEXT_PUBLIC_SITE_URL` in production (e.g. `https://yoursite.com`).
 * On Vercel, `VERCEL_URL` is used as a fallback when the env var is unset.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;

  return "http://localhost:3000";
}
