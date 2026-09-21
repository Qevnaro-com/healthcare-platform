import React from 'react';
import type { ProfessionalProfile } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { RatingStars } from '../common/RatingStars';
import { ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';

export interface ProfessionalCardProps {
  professional: ProfessionalProfile;
  onSelect?: (pro: ProfessionalProfile) => void;
  onViewProfile?: (pro: ProfessionalProfile) => void;
  selected?: boolean;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  professional,
  onSelect,
  onViewProfile,
  selected = false
}) => {
  return (
    <Card
      variant={selected ? 'interactive' : 'default'}
      className={clsx(
        'flex flex-col justify-between transition-all duration-200',
        selected && 'border-brand-teal ring-2 ring-brand-teal/20 bg-canvas-teal/10'
      )}
    >
      <div className="space-y-4">
        {/* Header: Photo, Name, Badge */}
        <div className="flex items-start gap-4">
          <div
            className="relative shrink-0 cursor-pointer group"
            onClick={() => onViewProfile && onViewProfile(professional)}
          >
            <img
              src={professional.profilePhoto}
              alt={professional.displayName}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80';
              }}
              className="w-16 h-16 rounded-2xl object-cover border border-border-default shadow-xs group-hover:ring-2 group-hover:ring-brand-teal transition-all"
            />
            {professional.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-brand-teal text-white p-1 rounded-full shadow-xs" title="KYC Verified">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4
                onClick={() => onViewProfile && onViewProfile(professional)}
                className="font-bold text-base text-text-primary truncate cursor-pointer hover:text-brand-teal transition-colors"
              >
                {professional.displayName}
              </h4>
              {professional.badge && (
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-canvas-teal text-brand-teal border border-teal-200 px-2 py-0.5 rounded-full shrink-0">
                  {professional.badge}
                </span>
              )}
            </div>

            <p className="text-xs text-text-muted font-medium mt-0.5">
              {professional.qualification}
            </p>

            <div className="flex items-center gap-3 mt-2 text-xs">
              <RatingStars rating={professional.rating} reviewCount={professional.reviewCount} size="sm" />
              <span className="text-border-default">|</span>
              <span className="font-medium text-text-secondary">
                {professional.experienceYears} Yrs Exp
              </span>
            </div>
          </div>
        </div>

        {/* Location & Languages */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted pt-2 border-t border-border-light">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-brand-teal shrink-0" />
            <span className="truncate">{professional.location.addressName}</span>
          </div>
          <span>•</span>
          <div>
            <span>Languages: </span>
            <span className="font-medium text-text-secondary">{professional.languages.join(', ')}</span>
          </div>
        </div>

        {/* Specializations Tags */}
        <div className="flex flex-wrap gap-1.5">
          {professional.specializations.map((spec) => (
            <span
              key={spec}
              className="text-[11px] font-medium bg-canvas-secondary text-text-secondary px-2 py-0.5 rounded-md border border-border-default"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Footer: Price & Action */}
      <div className="pt-4 mt-4 border-t border-border-light flex items-center justify-between gap-3">
        <div>
          <span className="text-xs text-text-muted block">Starting from</span>
          <span className="text-lg font-extrabold text-brand-teal">
            ₹{professional.hourlyRate}
            <span className="text-xs font-normal text-text-muted"> / visit</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onViewProfile && (
            <Button variant="ghost" size="sm" onClick={() => onViewProfile(professional)}>
              Profile
            </Button>
          )}
          {onSelect && (
            <Button
              variant={selected ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onSelect(professional)}
              leftIcon={selected ? <CheckCircle2 className="w-4 h-4" /> : undefined}
            >
              {selected ? 'Selected' : 'Select'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
