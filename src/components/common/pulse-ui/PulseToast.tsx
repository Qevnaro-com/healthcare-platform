import React from 'react';
import { clsx } from 'clsx';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { PulseSurface } from './PulseSurface';

export type ToastVariant = 'success' | 'warning' | 'error' | 'info';

export interface PulseToastProps {
  variant?: ToastVariant;
  title: string;
  message?: string;
  onClose?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const PulseToast: React.FC<PulseToastProps> = ({
  variant = 'info',
  title,
  message,
  onClose,
  actionLabel,
  onAction,
  className
}) => {
  const variantConfig = {
    success: {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
      accent: 'border-l-4 border-l-emerald-500',
      bg: 'bg-emerald-50/50'
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
      accent: 'border-l-4 border-l-amber-500',
      bg: 'bg-amber-50/50'
    },
    error: {
      icon: <XCircle className="w-5 h-5 text-rose-600 shrink-0" />,
      accent: 'border-l-4 border-l-rose-500',
      bg: 'bg-rose-50/50'
    },
    info: {
      icon: <Info className="w-5 h-5 text-brand-teal shrink-0" />,
      accent: 'border-l-4 border-l-brand-teal',
      bg: 'bg-teal-50/50'
    }
  };

  const cfg = variantConfig[variant];

  return (
    <PulseSurface
      variant="floating"
      padding="sm"
      className={clsx(
        'max-w-md w-full shadow-floating flex items-start gap-3 p-4 rounded-lg',
        cfg.accent,
        cfg.bg,
        className
      )}
    >
      {cfg.icon}

      <div className="flex-1 min-w-0 text-xs">
        <h4 className="font-heading font-semibold text-text-primary text-sm tracking-tight">{title}</h4>
        {message && <p className="text-text-muted mt-0.5 leading-relaxed">{message}</p>}

        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="mt-2 text-2xs font-bold text-brand-teal hover:underline inline-block cursor-pointer"
          >
            {actionLabel}
          </button>
        )}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="text-text-muted hover:text-text-primary p-1 rounded-full hover:bg-black/5"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </PulseSurface>
  );
};
