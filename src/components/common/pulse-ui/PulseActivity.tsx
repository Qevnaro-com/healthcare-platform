import React from 'react';
import { clsx } from 'clsx';
import { PulseStatus } from './PulseStatus';
import type { PulseStatusType } from './PulseStatus';

export interface ActivityItem {
  id: string | number;
  user?: string;
  avatar?: string;
  action: string;
  target?: string;
  time: string;
  status?: PulseStatusType;
  details?: React.ReactNode;
}

export interface PulseActivityProps {
  items: ActivityItem[];
  className?: string;
  maxItems?: number;
}

export const PulseActivityFeed: React.FC<PulseActivityProps> = ({
  items,
  className,
  maxItems
}) => {
  const displayedItems = maxItems ? items.slice(0, maxItems) : items;

  return (
    <div className={clsx('divide-y divide-border-light', className)}>
      {displayedItems.map((item) => (
        <div
          key={item.id}
          className="py-3 sm:py-3.5 flex items-start gap-3 transition-colors hover:bg-teal-50/20 px-2 rounded-lg"
        >
          {/* Avatar or fallback */}
          <div className="relative shrink-0 mt-0.5">
            {item.avatar ? (
              <img
                src={item.avatar}
                alt={item.user || 'User'}
                className="w-8 h-8 rounded-full object-cover border border-border-default"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-brand-teal/10 text-brand-teal font-heading font-semibold text-xs flex items-center justify-center border border-brand-teal/20">
                {(item.user || 'PC').substring(0, 2).toUpperCase()}
              </div>
            )}
            {item.status && (
              <span className="absolute -bottom-0.5 -right-0.5">
                <PulseStatus status={item.status} pulse size="sm" />
              </span>
            )}
          </div>

          {/* Activity text */}
          <div className="flex-1 min-w-0 text-xs">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-semibold text-text-primary">
                {item.user || 'System'}
              </span>
              <span className="text-2xs text-text-muted font-sans shrink-0">{item.time}</span>
            </div>

            <p className="text-text-secondary mt-0.5 leading-snug">
              <span>{item.action}</span>
              {item.target && (
                <span className="font-medium text-brand-teal ml-1">{item.target}</span>
              )}
            </p>

            {item.details && (
              <div className="mt-1 p-2 rounded bg-surface-subtle text-text-muted text-2xs border border-border-light">
                {item.details}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
