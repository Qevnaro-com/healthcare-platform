import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import { WhatsAppIcon } from '../../common/WhatsAppButton';
import { openWhatsApp, WHATSAPP_DISPLAY_PHONE } from '../../../utils/whatsapp';

export const PulseNCareHeader: React.FC = () => {
  return (
    <div className="bg-white border-b border-border-default sticky top-0 z-40 backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Master Pulse n Care Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img loading="lazy" decoding="async"
            src="/assets/brand/pulse-n-care/pulse-n-care-logo-horizontal.webp"
            alt="Pulse n Care — Nurse care at doorstep"
            className="h-11 sm:h-12 w-auto"
          />
        </Link>

        {/* Location & Contact Bar */}
        <div className="hidden lg:flex items-center gap-6 text-xs text-text-secondary">
          <div className="flex items-center gap-2 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            <MapPin className="w-4 h-4 text-[#015498]" />
            <span className="font-extrabold text-[#015498]">Home Care Operations</span>
            <span className="text-text-muted">• Delhi NCR 24×7</span>
          </div>

          <div className="flex items-center gap-2 text-text-primary font-bold">
            <Phone className="w-4 h-4 text-[#015498]" />
            <span>24×7 Hotline: {WHATSAPP_DISPLAY_PHONE}</span>
          </div>
        </div>

        {/* WhatsApp Direct Action Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => openWhatsApp('Hello Pulse n Care, I want to book home nursing care in Delhi NCR.')}
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-4 py-2 rounded-full cursor-pointer shadow-sm text-xs transition-transform hover:scale-105 active:scale-95"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
