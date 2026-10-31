import React, { useEffect, useRef, useState } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  /** Reserved height so the page does not jump while the section mounts */
  minHeight?: number;
  /** Anchor id kept on the placeholder so #hash links still land here */
  id?: string;
}

/** Mounts its children only when the placeholder is within ~600px of the viewport. */
export const LazySection: React.FC<LazySectionProps> = ({ children, minHeight = 600, id }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show]);

  if (show) return <>{children}</>;
  return <div ref={ref} id={id} style={{ minHeight }} aria-hidden="true" />;
};
