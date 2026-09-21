import React from 'react';
import { clsx } from 'clsx';

export interface PulseSkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'metric';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export const PulseSkeleton: React.FC<PulseSkeletonProps> = ({
  className,
  variant = 'text',
  width,
  height,
  lines = 1
}) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded';

  if (variant === 'card') {
    return (
      <div className={clsx('p-5 rounded-card bg-white border border-border-default space-y-4', className)}>
        <div className="flex items-center justify-between">
          <div className={clsx(baseClasses, 'h-5 w-1/3')} />
          <div className={clsx(baseClasses, 'h-8 w-8 rounded-full')} />
        </div>
        <div className={clsx(baseClasses, 'h-8 w-1/2')} />
        <div className={clsx(baseClasses, 'h-3 w-3/4')} />
      </div>
    );
  }

  if (variant === 'metric') {
    return (
      <div className={clsx('p-4 rounded-card bg-white border border-border-default space-y-3', className)}>
        <div className={clsx(baseClasses, 'h-3 w-1/4')} />
        <div className={clsx(baseClasses, 'h-8 w-1/2')} />
        <div className={clsx(baseClasses, 'h-3 w-full')} />
      </div>
    );
  }

  if (lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={clsx(baseClasses, className)}
            style={{
              width: i === lines - 1 ? '70%' : width || '100%',
              height: height || '1rem'
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        baseClasses,
        variant === 'circular' && 'rounded-full',
        className
      )}
      style={{
        width: width || (variant === 'circular' ? '2.5rem' : '100%'),
        height: height || (variant === 'circular' ? '2.5rem' : '1rem')
      }}
    />
  );
};
