import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface BentoCard3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  spotlightOpacity?: number;
  depth?: number;
  onClick?: () => void;
}

export const BentoCard3D: React.FC<BentoCard3DProps> = ({
  children,
  className = '',
  glowColor = 'rgba(1, 84, 152, 0.12)',
  spotlightOpacity = 0.15,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

  // Normalized cursor coordinates (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt physics (Antigravity weightless feel)
  const mouseXSpring = useSpring(x, { stiffness: 320, damping: 24 });
  const mouseYSpring = useSpring(y, { stiffness: 320, damping: 24 });

  // 3D rotation angles (clamped to comfortable, luxury ±6 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);

    setCursorPos({
      x: Math.round((mouseX / width) * 100),
      y: Math.round((mouseY / height) * 100)
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        filter: `brightness(${isHovered ? 1.01 : 1})`,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      className={`relative group rounded-3xl transition-shadow duration-300 ${className}`}
    >
      {/* Dynamic Cursor-Tracking Specular Sheen Spotlight */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 z-30"
        style={{
          opacity: isHovered ? spotlightOpacity : 0,
          background: `radial-gradient(550px circle at ${cursorPos.x}% ${cursorPos.y}%, ${glowColor}, transparent 70%)`
        }}
      />

      {/* Layered Content Container with true 3D spatial separation */}
      <div
        className="w-full h-full relative z-20"
        style={{
          transform: isHovered ? 'translateZ(12px)' : 'translateZ(0px)',
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};
