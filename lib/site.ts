/** Canonical production URL until custom domain is attached in Vercel. */
export const DEFAULT_SITE_URL =
  'https://emersone-etates-homes-janet-duffys-projects.vercel.app';

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    return raw.replace(/\/$/, '');
  }
  return DEFAULT_SITE_URL;
}

export function absoluteUrl(pathname: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${getSiteUrl()}${path}`;
}

/** Encode path segments for use in meta tags (handles spaces in filenames). */
export function absoluteAssetUrl(assetPath: string): string {
  const normalized = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  const segments = normalized.split('/').filter(Boolean).map(encodeURIComponent);
  return `${getSiteUrl()}/${segments.join('/')}`;
}
