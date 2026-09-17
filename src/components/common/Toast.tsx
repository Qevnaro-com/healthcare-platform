import React from 'react';
import { clsx } from 'clsx';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

export interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (!toasts || toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-600 shrink-0" />
  };

  const borders = {
    success: 'border-emerald-200 bg-white text-slate-900',
    error: 'border-rose-200 bg-white text-slate-900',
    warning: 'border-amber-200 bg-white text-slate-900',
    info: 'border-sky-200 bg-white text-slate-900'
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            'pointer-events-auto p-4 rounded-xl border shadow-floating flex items-start justify-between gap-3 transition-all duration-300 animate-in slide-in-from-bottom-5',
            borders[toast.type]
          )}
        >
          <div className="flex items-start gap-3">
            {icons[toast.type]}
            <div className="space-y-0.5 text-xs text-left">
              <h5 className="font-extrabold text-slate-900 text-sm leading-tight">{toast.title}</h5>
              {toast.description && <p className="text-slate-600 leading-relaxed">{toast.description}</p>}
            </div>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="p-1 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-600 cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
