import React from 'react';
import { clsx } from 'clsx';
import { PulseSurface } from './PulseSurface';
import type { SurfaceVariant } from './PulseSurface';
import { PulseLine } from './PulseLine';

export interface PulsePanelProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  badge?: React.ReactNode;
  variant?: SurfaceVariant;
  texture?: 'none' | 'grid' | 'dots' | 'glow' | 'radial' | 'blueprint' | 'cross' | 'surface' | 'paper';
  pulseAccent?: boolean | 'top' | 'left';
  showPulseLine?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  headerClassName?: string;
  children: React.ReactNode;
}

export const PulsePanel: React.FC<PulsePanelProps> = ({
  title,
  subtitle,
  icon,
  actions,
  badge,
  variant = 'raised',
  texture = 'none',
  pulseAccent = false,
  showPulseLine = false,
  padding = 'md',
  className,
  headerClassName,
  children
}) => {
  const textureClasses: Record<string, string> = {
    none: '',
    grid: 'bg-pulse-grid',
    dots: 'bg-pulse-dots',
    glow: 'bg-pulse-glow',
    radial: 'bg-pulse-radial',
    blueprint: 'bg-pulse-blueprint',
    cross: 'bg-pulse-cross-grid',
    surface: 'bg-pulse-surface',
    paper: 'bg-pulse-paper'
  };

  return (
    <PulseSurface
      variant={variant}
      pulseAccent={pulseAccent}
      padding={padding}
      className={clsx('relative flex flex-col', textureClasses[texture], className)}
    >
      {(title || actions || subtitle || icon || badge) && (
        <div className={clsx('pb-4 mb-4 border-b border-border-light flex flex-col gap-2', headerClassName)}>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2.5">
              {icon && (
                <div className="p-2 rounded-lg bg-brand-teal/10 text-brand-teal font-medium flex items-center justify-center shrink-0">
                  {icon}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  {typeof title === 'string' ? (
                    <h3 className="font-heading font-semibold text-text-primary text-base sm:text-lg tracking-tight">
                      {title}
                    </h3>
                  ) : (
                    title
                  )}
                  {badge && <span className="shrink-0">{badge}</span>}
                </div>
                {subtitle && (
                  <p className="text-xs sm:text-sm text-text-muted mt-0.5 font-sans">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
          </div>

          {showPulseLine && <PulseLine variant="mini" animated color="gradient" className="mt-2" />}
        </div>
      )}

      <div className="flex-1">{children}</div>
    </PulseSurface>
  );
};
