export const SITE_NAME = "Florida Man of the Day";

export const SITE_DESCRIPTION =
  "The daily archive of Florida's strangest, funniest, verified news stories — gators, mugshots, and all.";

// Prefer an explicit override, then Vercel's stable production domain (not
// the per-deployment VERCEL_URL, which changes on every preview), then a
// safe localhost fallback for local dev.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
