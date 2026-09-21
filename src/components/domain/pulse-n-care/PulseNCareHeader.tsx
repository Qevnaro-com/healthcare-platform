import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Calendar } from 'lucide-react';
import { Button } from '../../common/Button';

export const PulseNCareHeader: React.FC = () => {
  return (
    <div className="bg-white border-b border-border-default sticky top-0 z-40 backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Master Pulse n Care Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/brand/pulse-n-care/pulse-n-care-logo.svg"
            alt="Pulse n Care — Nurse care at doorstep"
            className="h-12 w-auto"
          />
        </Link>

        {/* Location & Contact Bar */}
        <div className="hidden lg:flex items-center gap-6 text-xs text-text-secondary">
          <div className="flex items-center gap-2 bg-canvas-teal px-3.5 py-1.5 rounded-full border border-teal-200">
            <MapPin className="w-4 h-4 text-brand-teal" />
            <span className="font-extrabold text-brand-teal">Home Care Operations</span>
            <span className="text-text-muted">• 24×7 Managed Care</span>
          </div>

          <div className="flex items-center gap-2 text-text-primary font-bold">
            <Phone className="w-4 h-4 text-brand-teal" />
            <span>24×7 Hotline: +91-80-4920-8800</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link to="/client/booking/wizard?serviceId=srv-nursing-post-op">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Calendar className="w-4 h-4" />}
              className="bg-brand-teal hover:bg-brand-teal-hover text-white font-extrabold px-5 py-2.5 rounded-xl cursor-pointer shadow-xs text-xs"
            >
              Book Home Nursing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
