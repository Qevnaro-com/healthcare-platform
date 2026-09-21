import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBookings } from '../../context/BookingContext';
import { ProfessionalCard } from '../../components/domain/ProfessionalCard';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import type { ProfessionalProfile } from '../../types';
import { MapPin, Search, Map as MapIcon, List } from 'lucide-react';
import { clsx } from 'clsx';
import { RealDelhiNCRMap } from '../../components/domain/RealDelhiNCRMap';

export const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { professionals } = useBookings();

  const [locationQuery, setLocationQuery] = useState('Defence Colony, New Delhi');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProId, setSelectedProId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'list' | 'map'>('split');

  useEffect(() => {
    const loc = searchParams.get('location');
    if (loc) {
      setLocationQuery(decodeURIComponent(loc));
    }
    const cat = searchParams.get('serviceId');
    if (cat) {
      setSelectedCategory('all');
    }
  }, [searchParams]);

  const filteredPros = professionals.filter((pro) => {
    if (!pro.isVerified) return false;
    return true;
  });

  const selectedPro = filteredPros.find((p) => p.id === selectedProId) || filteredPros[0];

  const handleBookPro = (pro: ProfessionalProfile) => {
    navigate(`/client/booking/wizard?proId=${pro.id}&serviceId=${pro.servicesOffered[0] || 'srv-nursing-post-op'}&location=${encodeURIComponent(locationQuery)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Search Header */}
      <div className="bg-white p-4 sm:p-6 rounded-card border border-border-default shadow-subtle space-y-4 text-left">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <Input
              label="Location / Address"
              placeholder="e.g. Defence Colony, New Delhi"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              leftIcon={<MapPin className="w-4 h-4 text-brand-teal" />}
            />
          </div>

          <div className="w-full md:w-64">
            <label className="text-sm font-medium text-text-primary block mb-1.5">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-11 px-3 text-sm bg-white text-text-primary border border-border-default rounded-btn focus:outline-none focus:border-brand-teal"
            >
              <option value="all">All Home Care Categories</option>
              <option value="home_nursing">Home Nursing Care</option>
              <option value="caregiver_attendant">Caregiver / Attendant</option>
              <option value="specialized_care">High-Dependency Nursing</option>
            </select>
          </div>

          <div className="w-full md:w-auto flex items-end pt-6">
            <Button variant="primary" className="w-full md:w-auto" leftIcon={<Search className="w-4 h-4" />}>
              Search Care
            </Button>
          </div>
        </div>

        {/* View Toggle Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-border-light text-xs">
          <span className="font-semibold text-text-secondary">
            Found <strong className="text-brand-teal">{filteredPros.length} Verified Care Professionals</strong> near {locationQuery}
          </span>

          <div className="flex items-center gap-1 bg-canvas-secondary p-1 rounded-lg border border-border-default">
            <button
              onClick={() => setViewMode('split')}
              className={clsx('px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer', viewMode === 'split' ? 'bg-white text-brand-teal shadow-xs' : 'text-text-muted')}
            >
              Split View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={clsx('px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer', viewMode === 'list' ? 'bg-white text-brand-teal shadow-xs' : 'text-text-muted')}
            >
              <List className="w-3.5 h-3.5 inline mr-1" /> List
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={clsx('px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer', viewMode === 'map' ? 'bg-white text-brand-teal shadow-xs' : 'text-text-muted')}
            >
              <MapIcon className="w-3.5 h-3.5 inline mr-1" /> Map
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid / Map Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Results List */}
        <div className={clsx(viewMode === 'map' ? 'hidden' : viewMode === 'split' ? 'lg:col-span-7' : 'lg:col-span-12', 'space-y-4 text-left')}>
          {filteredPros.map((pro) => (
            <div key={pro.id} onMouseEnter={() => setSelectedProId(pro.id)}>
              <ProfessionalCard
                professional={pro}
                selected={selectedProId === pro.id}
                onSelect={() => handleBookPro(pro)}
                onViewProfile={() => navigate(`/pros/${pro.id}`)}
              />
            </div>
          ))}
        </div>

        {/* Real Interactive Leaflet Map Component */}
        <div className={clsx(viewMode === 'list' ? 'hidden' : viewMode === 'split' ? 'lg:col-span-5' : 'lg:col-span-12', 'sticky top-20 text-left')}>
          <Card padding="none" className="overflow-hidden border border-border-default shadow-card space-y-0">
            <div className="bg-canvas-cool p-3.5 border-b border-border-default flex items-center justify-between">
              <span className="text-xs font-bold text-text-primary flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-teal" /> Care Network Map: {locationQuery}
              </span>
              <span className="text-[10px] bg-canvas-teal text-brand-teal px-2 py-0.5 rounded-full font-extrabold uppercase border border-teal-200">
                Live Coverage
              </span>
            </div>

            {/* Real Interactive Leaflet Delhi NCR Map */}
            <RealDelhiNCRMap
              selectedCity={locationQuery}
              latitude={selectedPro?.location.latitude || 28.5800}
              longitude={selectedPro?.location.longitude || 77.2300}
              locationName={selectedPro?.displayName || locationQuery}
              height="540px"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};
