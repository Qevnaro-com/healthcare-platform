import React from 'react';
import { clsx } from 'clsx';
import { Card } from './Card';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* 1. METRIC CARD                                                             */
/* -------------------------------------------------------------------------- */
export interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  subtitle?: string;
  className?: string;
  badge?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  changeType = 'neutral',
  icon,
  subtitle,
  className,
  badge,
  onClick
}) => {
  return (
    <Card
      variant={onClick ? 'interactive' : 'default'}
      onClick={onClick}
      className={clsx('p-5 space-y-3 relative overflow-hidden bg-white border border-border-default shadow-subtle', className)}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold text-text-muted uppercase tracking-wider">{label}</span>
        {badge && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-canvas-cool text-brand-teal border border-border-default">
            {badge}
          </span>
        )}
        {icon && (
          <div className="w-9 h-9 rounded-xl bg-canvas-cool text-brand-teal flex items-center justify-center shrink-0 border border-border-default/60">
            {icon}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="text-2xl sm:text-3xl font-black text-text-primary tabular-nums tracking-tight">
          {value}
        </div>
        
        {(change || subtitle) && (
          <div className="flex items-center gap-2 text-xs">
            {change && (
              <span
                className={clsx(
                  'inline-flex items-center gap-1 font-extrabold px-1.5 py-0.5 rounded-md text-[11px]',
                  changeType === 'positive' && 'bg-emerald-50 text-emerald-700',
                  changeType === 'negative' && 'bg-rose-50 text-rose-700',
                  changeType === 'neutral' && 'bg-slate-100 text-slate-700'
                )}
              >
                {changeType === 'positive' && <TrendingUp className="w-3 h-3" />}
                {changeType === 'negative' && <TrendingDown className="w-3 h-3" />}
                {change}
              </span>
            )}
            {subtitle && <span className="text-text-muted text-[11px] font-medium">{subtitle}</span>}
          </div>
        )}
      </div>
    </Card>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. OPERATIONAL CARD                                                        */
/* -------------------------------------------------------------------------- */
export interface OperationalCardProps {
  title: string;
  category?: string;
  statusBadge?: React.ReactNode;
  metadata?: { label: string; value: string; icon?: React.ReactNode }[];
  actionButtons?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const OperationalCard: React.FC<OperationalCardProps> = ({
  title,
  category,
  statusBadge,
  metadata,
  actionButtons,
  children,
  className,
  onClick
}) => {
  return (
    <Card
      variant={onClick ? 'interactive' : 'default'}
      onClick={onClick}
      className={clsx('p-5 space-y-4 bg-white border border-border-default shadow-subtle rounded-card', className)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-0.5">
          {category && (
            <span className="text-[10px] font-extrabold text-brand-teal uppercase tracking-widest block">
              {category}
            </span>
          )}
          <h4 className="font-extrabold text-text-primary text-base leading-snug">{title}</h4>
        </div>
        {statusBadge && <div className="shrink-0">{statusBadge}</div>}
      </div>

      {children}

      {metadata && metadata.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-3 border-t border-border-default/80 text-xs">
          {metadata.map((item, idx) => (
            <div key={idx} className="space-y-0.5">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                {item.label}
              </span>
              <div className="flex items-center gap-1.5 font-bold text-text-secondary truncate">
                {item.icon}
                <span className="truncate">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {actionButtons && <div className="pt-2 flex items-center justify-end gap-2">{actionButtons}</div>}
    </Card>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. ALERT CARD                                                              */
/* -------------------------------------------------------------------------- */
export interface AlertCardProps {
  title: string;
  description: string;
  severity?: 'warning' | 'danger' | 'info' | 'success';
  action?: React.ReactNode;
  className?: string;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  title,
  description,
  severity = 'warning',
  action,
  className
}) => {
  const styles = {
    warning: 'bg-amber-50/80 border-amber-200 text-amber-950',
    danger: 'bg-rose-50/80 border-rose-200 text-rose-950',
    info: 'bg-sky-50/80 border-sky-200 text-sky-950',
    success: 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
  };

  const icons = {
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
    danger: <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />,
    info: <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
  };

  return (
    <div className={clsx('p-4 rounded-xl border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3', styles[severity], className)}>
      <div className="flex items-start gap-3">
        {icons[severity]}
        <div className="space-y-0.5">
          <span className="font-extrabold text-sm block">{title}</span>
          <p className="text-text-secondary leading-relaxed">{description}</p>
        </div>
      </div>
      {action && <div className="shrink-0 w-full sm:w-auto">{action}</div>}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. SUMMARY CARD                                                            */
/* -------------------------------------------------------------------------- */
export interface SummaryCardProps {
  title: string;
  items: { label: string; value: string | React.ReactNode; isBold?: boolean }[];
  footer?: React.ReactNode;
  className?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, items, footer, className }) => {
  return (
    <Card className={clsx('p-5 space-y-4 bg-white border border-border-default shadow-subtle', className)}>
      <h4 className="text-xs font-black text-text-muted uppercase tracking-widest border-b border-border-default pb-2">
        {title}
      </h4>
      <div className="space-y-2.5 text-xs">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between gap-2">
            <span className="text-text-muted font-medium">{item.label}</span>
            <span className={clsx('tabular-nums text-text-primary', item.isBold ? 'font-black text-sm' : 'font-semibold')}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
      {footer && <div className="pt-3 border-t border-border-default">{footer}</div>}
    </Card>
  );
};
