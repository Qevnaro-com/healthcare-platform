import React, { useEffect, useState } from 'react';
import { Button } from '../../common/Button';
import { PhoneCall, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from '../../common/WhatsAppButton';
import { openWhatsApp } from '../../../utils/whatsapp';

interface StickyBarProps {
  onOpenCallback: () => void;
}

export const StickyBookingBar: React.FC<StickyBarProps> = ({ onOpenCallback }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-xl p-3.5 animate-in slide-in-from-bottom duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <img loading="lazy" decoding="async" src="/assets/brand/pulse-n-care/pulse-n-care-mark.webp" alt="" className="w-8 h-8 hidden sm:block" />
          <div>
            <span className="font-extrabold text-slate-900 text-sm block leading-tight">
              Pulse n Care • 24×7 Home Nursing
            </span>
            <span className="text-[11px] font-bold text-[#015498] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#015498]" /> Day Care • Night Care • 12h/24h Rotational Shifts
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenCallback}
            leftIcon={<PhoneCall className="w-4 h-4 text-[#015498]" />}
            className="hidden sm:flex font-bold border-slate-200 text-slate-700 text-xs cursor-pointer hover:bg-slate-50"
          >
            Talk to Care Team
          </Button>

          <button
            type="button"
            onClick={() => openWhatsApp('Hello Pulse n Care, I want to book 24x7 Home Nursing care at doorstep.')}
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold px-5 py-2.5 rounded-xl cursor-pointer text-xs shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <WhatsAppIcon className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
