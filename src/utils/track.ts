/**
 * Minimal analytics hook. Does nothing until an analytics provider is configured:
 *  - Google Analytics 4: set VITE_GA_ID and load gtag in index.html, or
 *  - any provider that exposes window.dataLayer / window.gtag.
 * Safe to call anywhere; never throws.
 */
type TrackParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: string, params: TrackParams = {}): void {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, params);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...params });
    }
  } catch {
    // analytics must never break the page
  }
}
