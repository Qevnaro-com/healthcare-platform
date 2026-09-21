import React from 'react';
import { clsx } from 'clsx';

export type SurfaceVariant = 'flat' | 'raised' | 'floating' | 'highlight' | 'feature';

export interface PulseSurfaceProps {
  variant?: SurfaceVariant;
  pulseAccent?: boolean | 'top' | 'left';
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  title?: string;
  children: React.ReactNode;
  onClick?: () => void;
  as?: React.ElementType;
}

export const PulseSurface: React.FC<PulseSurfaceProps> = ({
  variant = 'flat',
  pulseAccent = false,
  interactive = false,
  padding = 'md',
  className,
  title,
  children,
  onClick,
  as: Component = 'div'
}) => {
  const variantStyles: Record<SurfaceVariant, string> = {
    flat: 'bg-white border border-border-default shadow-none',
    raised: 'bg-white border border-border-default shadow-card',
    floating: 'bg-white border border-border-default shadow-floating',
    highlight: 'bg-gradient-to-br from-teal-50/40 via-white to-blue-50/30 border border-brand-teal/30 shadow-card',
    feature: 'bg-white border border-brand-teal/20 shadow-card relative overflow-hidden'
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-5',
    lg: 'p-5 sm:p-6',
    xl: 'p-6 sm:p-8'
  };

  const interactiveStyles = interactive || onClick
    ? 'cursor-pointer transition-all duration-200 hover:border-brand-teal/50 hover:shadow-floating hover:-translate-y-0.5 active:translate-y-0'
    : '';

  return (
    <Component
      onClick={onClick}
      title={title}
      className={clsx(
        'rounded-card relative transition-colors',
        variantStyles[variant],
        paddingStyles[padding],
        interactiveStyles,
        className
      )}
    >
      {/* Top Pulse Accent Bar */}
      {(pulseAccent === true || pulseAccent === 'top') && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-teal via-brand-blue to-brand-teal rounded-t-card" />
      )}

      {/* Left Pulse Accent Bar */}
      {pulseAccent === 'left' && (
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-brand-teal via-brand-blue to-brand-teal rounded-l-card" />
      )}

      {/* Feature Background Accent */}
      {variant === 'feature' && !pulseAccent && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-teal to-brand-blue" />
      )}

      {children}
    </Component>
  );
};
