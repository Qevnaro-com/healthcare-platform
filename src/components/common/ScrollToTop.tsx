import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Ensures that whenever a user navigates to a new route in the SPA,
 * the viewport instantly resets to the top (0, 0) instead of retaining
 * the previous page's scroll position.
 */
export const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Smooth scroll to target anchor section if specified
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        const timer = setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
        return () => clearTimeout(timer);
      }
    } else {
      // Unconditional reset to top (0, 0) across all browsers
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Frame + timeout protection for lazy route chunk transitions
      const raf = requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });

      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 60);

      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
      };
    }
  }, [pathname, search, hash]);

  return null;
};
