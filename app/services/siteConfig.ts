// Global site configuration.
// The project name is defined once in .env.local / .env.production
// (NEXT_PUBLIC_SITE_NAME) and surfaced here through these methods so every
// page/component reads it from a single source of truth.

export const getSiteName = (): string =>
  process.env.NEXT_PUBLIC_SITE_NAME || "grepcheck";

// Human-facing helpers for common formatting patterns.
export const getSiteTitle = (): string => getSiteName();

export const getSiteDescription = (): string =>
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
  "Explore the latest chess news, analyze tactical patterns, solve daily puzzles, and join discussions with the community.";

// Appends the site name as a suffix, e.g. "About | grepcheck".
export const getPageTitle = (page: string): string =>
  `${page} | ${getSiteName()}`;

export const getFullTitle = (subtitle: string): string =>
  `${getSiteName()} — ${subtitle}`;
