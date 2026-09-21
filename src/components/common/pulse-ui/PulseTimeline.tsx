import React from 'react';
import { clsx } from 'clsx';
import { Check, Clock, AlertCircle } from 'lucide-react';
import type { PulseStatusType } from './PulseStatus';

export interface TimelineItem {
  id: string | number;
  title: string;
  description?: React.ReactNode;
  timestamp?: string;
  status?: PulseStatusType | 'completed' | 'current' | 'upcoming';
  icon?: React.ReactNode;
  actor?: string;
}

export interface PulseTimelineProps {
  items: TimelineItem[];
  className?: string;
  compact?: boolean;
}

export const PulseTimeline: React.FC<PulseTimelineProps> = ({
  items,
  className
}) => {
  return (
    <div className={clsx('relative flex flex-col', className)}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        const isCompleted = item.status === 'completed' || item.status === 'success';
        const isCurrent = item.status === 'current' || item.status === 'active' || item.status === 'info';
        const isFailed = item.status === 'danger';

        const nodeBg = isCompleted
          ? 'bg-emerald-500 text-white shadow-sm'
          : isCurrent
          ? 'bg-brand-teal text-white ring-4 ring-brand-teal/20 shadow-sm animate-pulse'
          : isFailed
          ? 'bg-rose-500 text-white shadow-sm'
          : 'bg-slate-100 text-slate-400 border border-slate-300';

        const lineBg = isCompleted
          ? 'bg-emerald-400'
          : isCurrent
          ? 'bg-gradient-to-b from-brand-teal to-slate-200'
          : 'bg-slate-200';

        return (
          <div key={item.id || idx} className="relative flex gap-4 pb-6 last:pb-0 group">
            {/* Vertical connector line */}
            {!isLast && (
              <span
                className={clsx(
                  'absolute left-[15px] top-8 bottom-0 w-0.5 rounded transition-colors',
                  lineBg
                )}
                aria-hidden="true"
              />
            )}

            {/* Node Icon */}
            <div
              className={clsx(
                'relative z-10 flex items-center justify-center w-8 h-8 rounded-full font-semibold text-xs shrink-0 transition-transform group-hover:scale-110',
                nodeBg
              )}
            >
              {item.icon ? (
                item.icon
              ) : isCompleted ? (
                <Check className="w-4 h-4 stroke-[2.5]" />
              ) : isFailed ? (
                <AlertCircle className="w-4 h-4" />
              ) : isCurrent ? (
                <Clock className="w-4 h-4" />
              ) : (
                <span>{idx + 1}</span>
              )}
            </div>

            {/* Item Content */}
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-center justify-between gap-2">
                <h4
                  className={clsx(
                    'font-heading font-semibold text-sm tracking-tight',
                    isCurrent ? 'text-brand-teal font-bold' : 'text-text-primary'
                  )}
                >
                  {item.title}
                </h4>
                {item.timestamp && (
                  <span className="text-2xs text-text-muted font-sans shrink-0">
                    {item.timestamp}
                  </span>
                )}
              </div>

              {item.description && (
                <div className="mt-1 text-xs text-text-secondary leading-relaxed">
                  {item.description}
                </div>
              )}

              {item.actor && (
                <div className="mt-1.5 flex items-center gap-1.5 text-2xs text-text-muted">
                  <span className="font-medium text-text-primary">{item.actor}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
