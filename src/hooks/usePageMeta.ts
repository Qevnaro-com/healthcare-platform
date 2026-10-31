import { useEffect } from 'react';

const SITE = 'Pulse n Care';

/** Sets the document title and meta description for the current page. */
export function usePageMeta(title: string, description?: string): void {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : `${SITE} — Nurse care at doorstep`;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }, [title, description]);
}
