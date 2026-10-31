import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { revealUp, staggerContainer } from '../../lib/motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article';
}

/** Scroll-triggered fade / rise / de-blur. Renders statically for reduced-motion users. */
export const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0, as = 'div' }) => {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  if (reduce) return <Comp className={className}>{children}</Comp>;
  return (
    <Comp
      className={className}
      variants={revealUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
};

/** Wrap a group of <Reveal> children (or motion children using revealUp) to stagger them. */
export const RevealGroup: React.FC<{ children: React.ReactNode; className?: string; stagger?: number }> = ({
  children,
  className,
  stagger = 0.09,
}) => (
  <motion.div
    className={className}
    variants={staggerContainer(stagger)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
  >
    {children}
  </motion.div>
);
