import React from 'react';
import { getWhatsAppUrl } from '../../utils/whatsapp';

// Official WhatsApp Brand SVG Icon (Single compound path: speech bubble + handset cutout)
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.051 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.742.95 3.704 1.451 5.71 1.452h.006c6.558 0 11.892-5.335 11.895-11.893a11.82 11.82 0 00-3.48-8.414z" />
  </svg>
);

interface WhatsAppFloatingButtonProps {
  message?: string;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({ message }) => {
  return (
    <aside aria-label="WhatsApp Contact" className="hidden md:flex fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 items-center">
      <a
        href={getWhatsAppUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 btn-emerald-aura btn-shimmer text-white rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-[0_12px_36px_rgba(37,211,102,0.45)]"
        aria-label="Direct Chat on WhatsApp"
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-100 leading-none">
            Online 24×7
          </span>
          <span className="text-xs sm:text-[13px] font-bold leading-tight text-white whitespace-nowrap">
            Chat on WhatsApp
          </span>
        </div>
      </a>
    </aside>
  );
};
