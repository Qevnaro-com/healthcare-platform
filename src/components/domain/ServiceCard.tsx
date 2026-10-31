import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Service } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { HealthcareTexture } from '../common/HealthcareTexture';
import {
  Activity,
  HeartPulse,
  UserCheck,
  Clock,
  Zap,
  Stethoscope,
  ShieldPlus,
  Heart,
  Baby,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { clsx } from 'clsx';

export interface ServiceCardProps {
  service: Service;
  onSelect?: (service: Service) => void;
  selected?: boolean;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Activity: <Activity className="w-5 h-5 text-brand-teal" />,
  HeartPulse: <HeartPulse className="w-5 h-5 text-brand-teal" />,
  UserCheck: <UserCheck className="w-5 h-5 text-brand-teal" />,
  Clock: <Clock className="w-5 h-5 text-brand-teal" />,
  Zap: <Zap className="w-5 h-5 text-brand-teal" />,
  Stethoscope: <Stethoscope className="w-5 h-5 text-brand-teal" />,
  ShieldPlus: <ShieldPlus className="w-5 h-5 text-brand-teal" />,
  Heart: <Heart className="w-5 h-5 text-brand-teal" />,
  Baby: <Baby className="w-5 h-5 text-brand-teal" />
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSelect,
  selected = false
}) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const targetRoute = `/services/${service.slug || service.id}`;

  return (
    <Card
      variant="interactive"
      onClick={() => navigate(targetRoute)}
      className={clsx(
        'p-0 overflow-hidden flex flex-col justify-between h-full group transition-all duration-200 border-border-default hover:border-teal-300 hover:shadow-card hover:-translate-y-[2px]',
        selected && 'border-brand-teal ring-2 ring-brand-teal/20 bg-canvas-teal/10'
      )}
    >
      <div className="space-y-4">
        {/* 01. Visual Header Container */}
        <div className="aspect-[4/3] sm:aspect-[16/10] w-full bg-slate-100 relative overflow-hidden flex items-center justify-center">
          {!imageError && service.cardMedia ? (
            <img
              src={service.cardMedia}
              alt={service.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
            />
          ) : (
            // Designed Healthcare SVG Fallback (Never broken icon)
            <div className="w-full h-full bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center relative p-6">
              <HealthcareTexture type="medical-grid" opacity={0.08} />
              <div className="w-14 h-14 rounded-2xl bg-white border border-teal-200 flex items-center justify-center shadow-xs relative z-10">
                {ICON_MAP[service.iconName] || <Activity className="w-7 h-7 text-brand-teal" />}
              </div>
            </div>
          )}

          {/* Category Pill Tag */}
          <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold text-brand-teal border border-teal-200 uppercase tracking-wider shadow-2xs">
            {service.category.replace('_', ' ')}
          </span>

          {/* Featured Badge */}
          {service.featured && (
            <span className="absolute top-3 right-3 bg-teal-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-extrabold shadow-2xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
        </div>

        {/* 02. Body Content Hierarchy */}
        <div className="px-5 space-y-3">
          {/* Service Title */}
          <h3 className="font-extrabold text-lg text-text-primary leading-snug group-hover:text-brand-teal transition-colors">
            {service.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-text-secondary leading-relaxed line-clamp-2 font-medium">
            {service.shortDescription}
          </p>

          {/* Ideal For Badges */}
          {service.idealFor && service.idealFor.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block w-full">Ideal for:</span>
              {service.idealFor.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="bg-canvas-secondary text-text-secondary px-2 py-0.5 rounded-md text-[11px] font-semibold border border-border-light">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Key Inclusions Preview */}
          <div className="space-y-1 pt-2 border-t border-border-light">
            {service.keyInclusions.slice(0, 2).map((inc, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-text-secondary">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                <span className="truncate">{inc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 03. Footer: Pricing & CTAs */}
      <div className="p-5 pt-4 mt-4 border-t border-border-light flex items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Starting from</span>
          <p className="text-lg font-extrabold text-brand-teal leading-none">
            ₹{service.pricing.basePrice}
            <span className="text-[11px] font-normal text-text-muted ml-0.5">/{service.pricing.priceUnit.replace('per_', '')}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(targetRoute);
            }}
            className="text-xs font-bold text-brand-teal hover:bg-teal-50"
          >
            View Details
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              if (onSelect) {
                onSelect(service);
              } else {
                navigate(`/client/booking/wizard?serviceId=${service.id}`);
              }
            }}
            rightIcon={<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />}
            className="text-xs font-bold"
          >
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  );
};
