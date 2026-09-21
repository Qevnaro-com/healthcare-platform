import React from 'react';
import { clsx } from 'clsx';
import { PulseLine } from './PulseLine';

export interface PulseSectionProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  texture?: 'none' | 'grid' | 'dots' | 'glow' | 'radial';
  pulseAccent?: boolean;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

export const PulseSection: React.FC<PulseSectionProps> = ({
  title,
  subtitle,
  badge,
  actions,
  texture = 'none',
  pulseAccent = false,
  className,
  containerClassName,
  children
}) => {
  const textureMap = {
    none: '',
    grid: 'bg-pulse-grid',
    dots: 'bg-pulse-dots',
    glow: 'bg-pulse-glow',
    radial: 'bg-pulse-radial'
  };

  return (
    <section className={clsx('relative py-6 sm:py-8', textureMap[texture], className)}>
      <div className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', containerClassName)}>
        {(title || actions || subtitle || badge) && (
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3">
                  {typeof title === 'string' ? (
                    <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-primary tracking-tight">
                      {title}
                    </h2>
                  ) : (
                    title
                  )}
                  {badge && <div>{badge}</div>}
                </div>
                {subtitle && (
                  <p className="text-sm text-text-muted mt-1 font-sans">{subtitle}</p>
                )}
              </div>
              {actions && <div className="flex items-center gap-2.5 shrink-0">{actions}</div>}
            </div>

            {pulseAccent && <PulseLine variant="divider" animated color="gradient" className="mt-4" />}
          </div>
        )}

        {children}
      </div>
    </section>
  );
};
