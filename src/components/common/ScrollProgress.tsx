import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin brand-gradient reading-progress bar pinned to the top of the viewport. */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[70] bg-gradient-to-r from-[#015498] via-sky-400 to-[#C31725]"
    />
  );
};
