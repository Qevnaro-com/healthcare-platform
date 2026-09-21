import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DELHI_NCR_SERVICE_HUBS } from '../../data/serviceAreaMatrix';
import type { ServiceAreaHub } from '../../data/serviceAreaMatrix';
import { LottieAnimation } from '../common/LottieAnimation';

export interface RealDelhiNCRMapProps {
  className?: string;
  activeHubId?: string;
  selectedCity?: string;
  latitude?: number;
  longitude?: number;
  locationName?: string;
  onSelectHub?: (hub: ServiceAreaHub) => void;
  onLocationClick?: (lat: number, lng: number) => void;
  height?: string;
}

export const RealDelhiNCRMap: React.FC<RealDelhiNCRMapProps> = ({
  className = 'w-full rounded-2xl overflow-hidden shadow-card border border-border-default',
  activeHubId,
  selectedCity,
  latitude,
  longitude,
  locationName = 'Care Destination',
  onSelectHub,
  onLocationClick,
  height = '360px'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  // Determine active hub
  const getMatchedHub = (): ServiceAreaHub => {
    if (activeHubId) {
      const found = DELHI_NCR_SERVICE_HUBS.find((h) => h.id === activeHubId);
      if (found) return found;
    }
    if (selectedCity) {
      const cityNorm = selectedCity.toLowerCase();
      if (cityNorm.includes('noida')) return DELHI_NCR_SERVICE_HUBS.find((h) => h.id === 'hub-noida') || DELHI_NCR_SERVICE_HUBS[1];
      if (cityNorm.includes('gurugram') || cityNorm.includes('gurgaon')) return DELHI_NCR_SERVICE_HUBS.find((h) => h.id === 'hub-gurugram') || DELHI_NCR_SERVICE_HUBS[2];
      if (cityNorm.includes('faridabad')) return DELHI_NCR_SERVICE_HUBS.find((h) => h.id === 'hub-faridabad') || DELHI_NCR_SERVICE_HUBS[3];
    }
    return DELHI_NCR_SERVICE_HUBS[0]; // South Delhi Hub default
  };

  const activeHub = getMatchedHub();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Clean up existing map instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Default center on Delhi NCR (28.58, 77.22)
    const initialLat = latitude || activeHub.coordinates.latitude || 28.58;
    const initialLng = longitude || activeHub.coordinates.longitude || 77.22;

    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: 12,
      zoomControl: false,
      scrollWheelZoom: false
    });

    mapInstanceRef.current = map;

    // Guarantee tile sizing rendering on mount
    setTimeout(() => {
      map.invalidateSize();
    }, 150);

    // Click handler to drop/move pin
    map.on('click', (e: L.LeafletMouseEvent) => {
      if (onLocationClick) {
        onLocationClick(e.latlng.lat, e.latlng.lng);
      }
    });

    // Add Custom Leaflet Zoom Control at top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // High quality CartoDB Voyager tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
      maxZoom: 18,
      subdomains: 'abcd'
    }).addTo(map);

    // Add Delhi NCR Service Hub Markers & Coverage Circles
    DELHI_NCR_SERVICE_HUBS.forEach((hub) => {
      const isHubActive = hub.id === activeHub.id;

      // 2-Hour Dispatch Radius Circle Overlay
      L.circle([hub.coordinates.latitude, hub.coordinates.longitude], {
        color: isHubActive ? '#0D7E80' : '#3B82F6',
        fillColor: isHubActive ? '#14B8A6' : '#60A5FA',
        fillOpacity: isHubActive ? 0.15 : 0.06,
        weight: isHubActive ? 2 : 1,
        dashArray: isHubActive ? undefined : '4 4',
        radius: (hub.coverageRadiusKm || 15) * 1000
      }).addTo(map);

      // Custom Hub Marker DivIcon
      const markerHtml = `
        <div class="relative flex flex-col items-center group cursor-pointer">
          <div class="${isHubActive ? 'w-10 h-10 bg-teal-800 text-white ring-4 ring-teal-400/50 shadow-xl' : 'w-8 h-8 bg-slate-800 text-slate-200'} rounded-full flex items-center justify-center font-black text-xs border-2 border-white transition-all transform hover:scale-110">
            🏥
          </div>
          <div class="${isHubActive ? 'bg-slate-900 text-white border-teal-400 font-extrabold' : 'bg-white text-slate-800 border-slate-300 font-bold'} text-[10px] px-2.5 py-0.5 rounded-full border shadow-md mt-1 whitespace-nowrap">
            ${hub.name}
          </div>
        </div>
      `;

      const hubIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-hub-marker',
        iconSize: [120, 50],
        iconAnchor: [60, 25]
      });

      const marker = L.marker([hub.coordinates.latitude, hub.coordinates.longitude], { icon: hubIcon }).addTo(map);

      // Popup Content
      const popupContent = `
        <div class="p-2 space-y-1.5 text-left font-sans text-xs">
          <div class="flex items-center gap-1.5 text-teal-700 font-extrabold uppercase tracking-wider text-[10px]">
            <span>● Operational Service Zone</span>
          </div>
          <h4 class="font-extrabold text-slate-900 text-sm leading-tight">${hub.name}</h4>
          <p class="text-[11px] text-slate-600">${hub.hubAddress}</p>
          <div class="pt-1 flex items-center justify-between">
            <span class="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
              ⚡ Avg Arrival: ${hub.avgDispatchTimeMinutes}
            </span>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        if (onSelectHub) onSelectHub(hub);
      });

      markersRef.current[hub.id] = marker;
    });

    // Add Client Destination Marker if Lat/Lng present or specified
    if (latitude && longitude) {
      const destHtml = `
        <div class="relative flex flex-col items-center animate-bounce z-50">
          <div class="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-2xl border-2 border-white font-extrabold">
            📍
          </div>
          <div class="bg-slate-950 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-rose-400 shadow-lg mt-1 whitespace-nowrap">
            ${locationName}
          </div>
        </div>
      `;

      const destIcon = L.divIcon({
        html: destHtml,
        className: 'custom-dest-marker',
        iconSize: [140, 50],
        iconAnchor: [70, 18]
      });

      L.marker([latitude, longitude], { icon: destIcon }).addTo(map);

      // Smooth camera pan to destination coordinates
      map.flyTo([latitude, longitude], 13, { duration: 0.8 });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [activeHub.id, latitude, longitude, locationName]);

  return (
    <div className={`relative ${className}`} style={{ height }}>
      {/* Real Interactive Leaflet Container */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Lottie Radar Scanner Overlay Badge (Top Left) */}
      <div className="absolute top-3 left-3 z-20 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-teal-400/40 shadow-xl flex items-center gap-2">
        <LottieAnimation type="radar-beacon" className="w-6 h-6 shrink-0" />
        <div className="text-left">
          <span className="text-[9px] font-extrabold text-teal-300 uppercase tracking-widest block leading-none">
            DELHI NCR LIVE SERVICE MAP
          </span>
          <span className="text-[11px] font-black text-white leading-tight block">
            {activeHub.name} ({activeHub.avgDispatchTimeMinutes})
          </span>
        </div>
      </div>

      {/* Interactive Region Selection Strip (Bottom Overlay Bar) */}
      <div className="absolute bottom-3 left-3 right-3 z-20 bg-white/95 backdrop-blur-md p-2 rounded-2xl border border-slate-200 shadow-xl flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-2 shrink-0 hidden sm:inline">
          Service Regions:
        </span>
        <div className="flex items-center gap-1.5">
          {DELHI_NCR_SERVICE_HUBS.map((hub) => {
            const isSelected = hub.id === activeHub.id;
            return (
              <button
                key={hub.id}
                type="button"
                onClick={() => {
                  if (onSelectHub) onSelectHub(hub);
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current.flyTo(
                      [hub.coordinates.latitude, hub.coordinates.longitude],
                      12,
                      { duration: 1.2 }
                    );
                  }
                }}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-extrabold cursor-pointer transition-all shrink-0 border ${
                  isSelected
                    ? 'bg-brand-teal text-white border-brand-teal shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                {hub.city}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
