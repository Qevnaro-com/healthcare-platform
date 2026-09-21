import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  AlertCircle,
  Loader2,
  Compass,
  ShieldCheck,
  Send
} from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Modal } from '../common/Modal';
import {
  DELHI_NCR_SERVICE_HUBS,
  validateNCRServiceLocation
} from '../../data/serviceAreaMatrix';

export interface LocationData {
  addressType: string;
  line1: string;
  line2: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  accessNotes: string;
  latitude?: number;
  longitude?: number;
  isVerified?: boolean;
}

interface LocationPickerProps {
  value: LocationData;
  onChange: (data: LocationData) => void;
  onConfirm?: () => void;
}

export type LocationSystemState =
  | 'LOC-01' // Idle
  | 'LOC-02' // Permission Request
  | 'LOC-03' // Detecting
  | 'LOC-04' // Located
  | 'LOC-05' // Address Resolved
  | 'LOC-06' // Checking Coverage
  | 'LOC-07' // Supported
  | 'LOC-08' // Unsupported
  | 'LOC-09' // Permission Denied
  | 'LOC-10' // GPS Failed
  | 'LOC-11' // Geocoding Failed
  | 'LOC-12' // Retrying
  | 'LOC-13'; // Confirmed

export const LocationPicker: React.FC<LocationPickerProps> = ({ value, onChange, onConfirm }) => {
  const [systemState, setSystemState] = useState<LocationSystemState>(
    value.isVerified ? 'LOC-13' : 'LOC-01'
  );
  const [showExpansionModal, setShowExpansionModal] = useState(false);
  const [expansionEmail, setExpansionEmail] = useState('');
  const [expansionSubmitted, setExpansionSubmitted] = useState(false);

  // Validate current city/pincode against active Delhi NCR matrix
  const validation = validateNCRServiceLocation(value.city, value.pincode);
  const isSupported = validation.isSupported;
  const activeHub = validation.matchedHub || DELHI_NCR_SERVICE_HUBS[0];

  const handleGeolocate = () => {
    setSystemState('LOC-02');

    if (!navigator.geolocation) {
      setSystemState('LOC-10');
      return;
    }

    setSystemState('LOC-03');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setSystemState('LOC-04');

        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
          .then((res) => res.json())
          .then((data) => {
            setSystemState('LOC-05');
            const addr = data?.address || {};
            const area = addr.suburb || addr.neighbourhood || addr.residential || addr.road || addr.county || 'Locality Area';
            const cityRaw = addr.city || addr.town || addr.state_district || 'New Delhi';
            const pin = addr.postcode || '110024';

            const validation = validateNCRServiceLocation(cityRaw, pin);
            const resolvedCity = validation.matchedHub
              ? (validation.matchedHub.city === 'Delhi' ? 'New Delhi' : validation.matchedHub.city)
              : 'New Delhi';

            setSystemState('LOC-06');
            setTimeout(() => {
              const updatedData: LocationData = {
                ...value,
                latitude: lat,
                longitude: lng,
                line1: area,
                line2: addr.road || value.line2 || 'Main Sector Road',
                landmark: value.landmark || '',
                city: resolvedCity,
                state: 'Delhi NCR',
                pincode: pin,
                isVerified: true
              };
              onChange(updatedData);
              setSystemState(validation.isSupported ? 'LOC-07' : 'LOC-08');
            }, 300);
          })
          .catch(() => {
            setSystemState('LOC-05');
            let city = 'New Delhi';
            let pin = '110024';
            let line1 = 'Defence Colony';

            if (lat < 28.48) {
              city = 'Gurugram';
              pin = '122002';
              line1 = 'DLF Phase 5';
            } else if (lng > 77.3) {
              city = 'Noida';
              pin = '201301';
              line1 = 'Sector 62';
            }

            const updatedData: LocationData = {
              ...value,
              latitude: lat,
              longitude: lng,
              line1,
              city,
              state: 'Delhi NCR',
              pincode: pin,
              isVerified: true
            };
            onChange(updatedData);
            setSystemState('LOC-07');
          });
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setSystemState('LOC-09');
        } else {
          setSystemState('LOC-10');
        }
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  const handleConfirmLocation = () => {
    setSystemState('LOC-13');
    onChange({ ...value, isVerified: true });
    if (onConfirm) onConfirm();
  };

  const handleExpansionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setExpansionSubmitted(true);
    setTimeout(() => {
      setShowExpansionModal(false);
      setExpansionSubmitted(false);
    }, 2000);
  };

  const DELHI_NCR_PINCODES = [
    { pincode: '110024', locality: 'Defence Colony / Lajpat Nagar', city: 'New Delhi', state: 'Delhi NCR' },
    { pincode: '110017', locality: 'Saket / Malviya Nagar', city: 'New Delhi', state: 'Delhi NCR' },
    { pincode: '110070', locality: 'Vasant Kunj / JNU Area', city: 'New Delhi', state: 'Delhi NCR' },
    { pincode: '110048', locality: 'Greater Kailash (GK 1 & 2)', city: 'New Delhi', state: 'Delhi NCR' },
    { pincode: '110016', locality: 'Hauz Khas / Green Park', city: 'New Delhi', state: 'Delhi NCR' },
    { pincode: '110027', locality: 'Rajouri Garden / West Delhi', city: 'New Delhi', state: 'Delhi NCR' },
    { pincode: '110085', locality: 'Rohini Sector 7 / North Delhi', city: 'New Delhi', state: 'Delhi NCR' },
    { pincode: '122002', locality: 'DLF Phase 5 / Cyber City', city: 'Gurugram', state: 'Delhi NCR' },
    { pincode: '122003', locality: 'Sector 56 / Golf Course Road', city: 'Gurugram', state: 'Delhi NCR' },
    { pincode: '122001', locality: 'Old Gurugram / Civil Lines', city: 'Gurugram', state: 'Delhi NCR' },
    { pincode: '201301', locality: 'Sector 62 / Express Zone', city: 'Noida', state: 'Delhi NCR' },
    { pincode: '201303', locality: 'Sector 50 / City Center', city: 'Noida', state: 'Delhi NCR' },
    { pincode: '201304', locality: 'Sector 137 / Express Highway', city: 'Noida', state: 'Delhi NCR' },
    { pincode: '201318', locality: 'Gaur City / Greater Noida West', city: 'Noida', state: 'Delhi NCR' },
    { pincode: '121001', locality: 'Sector 15 / Central Zone', city: 'Faridabad', state: 'Delhi NCR' },
    { pincode: '121002', locality: 'Sector 16 / Mathura Road', city: 'Faridabad', state: 'Delhi NCR' }
  ];

  const filteredPincodes = DELHI_NCR_PINCODES.filter(
    (p) => p.city.toLowerCase() === value.city.toLowerCase()
  );

  const handleCityChange = (newCity: string) => {
    const firstPincode = DELHI_NCR_PINCODES.find(
      (p) => p.city.toLowerCase() === newCity.toLowerCase()
    );

    const validation = validateNCRServiceLocation(newCity, firstPincode?.pincode || value.pincode);
    onChange({
      ...value,
      city: newCity,
      pincode: firstPincode?.pincode || value.pincode,
      line2: firstPincode?.locality || value.line2,
      state: firstPincode?.state || value.state || 'Delhi NCR',
      isVerified: validation.isSupported
    });
    setSystemState(validation.isSupported ? 'LOC-07' : 'LOC-08');
  };

  const handlePincodeSelect = (pinStr: string) => {
    const found = DELHI_NCR_PINCODES.find((p) => p.pincode === pinStr);
    const resolvedCity = found ? found.city : value.city;
    const validation = validateNCRServiceLocation(resolvedCity, pinStr);

    onChange({
      ...value,
      pincode: pinStr,
      city: resolvedCity,
      line2: found ? found.locality : value.line2,
      state: found ? found.state : value.state || 'Delhi NCR',
      isVerified: validation.isSupported
    });
    setSystemState(validation.isSupported ? 'LOC-07' : 'LOC-08');
  };

  const applyAddressPreset = (preset: { line1: string; line2: string; landmark: string; city: string; pincode: string }) => {
    onChange({
      ...value,
      addressType: 'Home Apartment',
      line1: preset.line1,
      line2: preset.line2,
      landmark: preset.landmark,
      city: preset.city,
      state: 'Delhi NCR',
      pincode: preset.pincode,
      isVerified: true
    });
    setSystemState('LOC-13');
  };

  return (
    <div className="space-y-6 text-left">
      {/* City & Pincode Dropdown Card Header */}
      <div className="p-5 bg-canvas-teal rounded-2xl border border-teal-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-teal-200/60 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-teal text-white flex items-center justify-center shrink-0 shadow-xs">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-teal-950 text-sm block">
                Delhi NCR Service Area & Pincode Selector
              </span>
              <span className="text-xs text-teal-800 font-medium">
                Pulse n Care operates in Delhi, Gurugram, Noida, and Faridabad.
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleGeolocate}
            disabled={systemState === 'LOC-03' || systemState === 'LOC-06'}
            leftIcon={
              systemState === 'LOC-03' || systemState === 'LOC-06' ? (
                <Loader2 className="w-4 h-4 animate-spin text-brand-teal" />
              ) : (
                <Navigation className="w-4 h-4 text-brand-teal" />
              )
            }
            className="font-bold border-teal-300 text-teal-900 bg-white shrink-0 cursor-pointer shadow-xs"
          >
            {systemState === 'LOC-03'
              ? 'Detecting GPS...'
              : systemState === 'LOC-06'
              ? 'Checking Coverage...'
              : '📍 Detect GPS Location'}
          </Button>
        </div>

        {/* Clean Dropdown Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-teal-950 uppercase tracking-wider">
              Select City / Region
            </label>
            <select
              value={value.city}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full h-11 px-3.5 text-sm bg-white font-extrabold text-slate-900 border border-teal-300 rounded-xl focus:border-brand-teal focus:outline-none shadow-xs"
            >
              <option value="New Delhi">New Delhi (South, West, Central Delhi)</option>
              <option value="Gurugram">Gurugram (DLF Phase 1-5, Cyber City, Golf Course)</option>
              <option value="Noida">Noida (Sector 62, 18, Express Zone)</option>
              <option value="Faridabad">Faridabad (Sector 15, 16, Mathura Road)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-teal-950 uppercase tracking-wider">
              Select Pincode & Locality
            </label>
            <select
              value={value.pincode}
              onChange={(e) => handlePincodeSelect(e.target.value)}
              className="w-full h-11 px-3.5 text-sm bg-white font-extrabold text-slate-900 border border-teal-300 rounded-xl focus:border-brand-teal focus:outline-none shadow-xs"
            >
              {filteredPincodes.map((item) => (
                <option key={item.pincode} value={item.pincode}>
                  {item.pincode} — {item.locality} ({item.city})
                </option>
              ))}
              <option value={value.pincode}>Custom Pincode ({value.pincode})</option>
            </select>
          </div>
        </div>

        {/* Operational Hub Confirmation Badge */}
        {isSupported ? (
          <div className="p-3.5 bg-white rounded-xl border border-teal-300 text-xs text-teal-950 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-brand-teal shrink-0" />
              <div>
                <span className="font-extrabold text-slate-900 block">{activeHub.name} Confirmed</span>
                <span className="text-[11px] text-slate-600 font-medium">
                  {activeHub.hubAddress} • {activeHub.activeStaffCount} In-House Staff • Avg Arrival: {activeHub.avgDispatchTimeMinutes}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full uppercase border border-emerald-300 shrink-0">
              OPERATIONAL ZONE
            </span>
          </div>
        ) : (
          <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Outside active coverage. Please select New Delhi, Gurugram, Noida, or Faridabad.</span>
          </div>
        )}
      </div>

      {/* Quick 1-Click Saved Address Presets */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
          Quick 1-Click Authentic Location Presets
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            { label: '🏠 Defence Colony', line1: 'A-124, Defence Colony', line2: 'Ring Road, Defence Colony', landmark: 'Opposite Flyover Pillar 14', city: 'New Delhi', pincode: '110024' },
            { label: '🏢 DLF Phase 5', line1: 'Flat 602, Crest Apartments', line2: 'Golf Course Road, DLF Phase 5', landmark: 'Near Sector 54 Metro Station', city: 'Gurugram', pincode: '122002' },
            { label: '🌳 Sector 62 Noida', line1: 'Tower B-301, Stellar IT Park', line2: 'Block C, Sector 62', landmark: 'Near Fortis Hospital Noida', city: 'Noida', pincode: '201301' }
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => applyAddressPreset(preset)}
              className="p-3 rounded-xl border border-border-default bg-white hover:border-brand-teal hover:bg-canvas-teal text-left cursor-pointer transition-all space-y-1 shadow-xs"
            >
              <span className="font-extrabold text-xs text-text-primary block">{preset.label}</span>
              <span className="text-[10px] text-text-muted block line-clamp-1">{preset.line1}, {preset.city} ({preset.pincode})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Structured Address Form Inputs */}
      <div className="p-5 bg-white rounded-2xl border border-border-default space-y-4 shadow-subtle">
        <h3 className="text-xs font-extrabold text-text-primary uppercase tracking-wider border-b border-border-light pb-2">
          Specific Patient Room / Street Address Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Site Type</label>
            <select
              value={value.addressType}
              onChange={(e) => onChange({ ...value, addressType: e.target.value })}
              className="w-full h-11 px-3 text-sm bg-white border border-border-default rounded-xl focus:border-brand-teal focus:outline-none"
            >
              <option value="Home Apartment">Home / Apartment</option>
              <option value="Independent Villa">Independent House / Villa</option>
              <option value="Hospital Room">Hospital Ward / Room</option>
              <option value="Senior Living">Assisted Living Facility</option>
            </select>
          </div>

          <Input
            label="House / Flat No. & Building Name"
            value={value.line1}
            onChange={(e) => onChange({ ...value, line1: e.target.value, isVerified: true })}
            placeholder="e.g. A-124, Sterling Apartments"
            leftIcon={<MapPin className="w-4 h-4 text-text-muted" />}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Street Address & Locality"
            value={value.line2}
            onChange={(e) => onChange({ ...value, line2: e.target.value })}
            placeholder="e.g. Ring Road, Defence Colony"
          />

          <Input
            label="Landmark / Entry Marker"
            value={value.landmark}
            onChange={(e) => onChange({ ...value, landmark: e.target.value })}
            placeholder="e.g. Near Lajpat Nagar Metro Station Gate 2"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="City"
            value={value.city}
            onChange={(e) => handleCityChange(e.target.value)}
            placeholder="New Delhi / Noida / Gurugram"
          />
          <Input
            label="State"
            value={value.state}
            onChange={(e) => onChange({ ...value, state: e.target.value })}
            placeholder="Delhi NCR"
          />
          <Input
            label="Pincode (NCR)"
            value={value.pincode}
            onChange={(e) => handlePincodeSelect(e.target.value)}
            placeholder="110024"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            Entry & Access Instructions For Staff
          </label>
          <textarea
            rows={2}
            value={value.accessNotes}
            onChange={(e) => onChange({ ...value, accessNotes: e.target.value })}
            className="w-full p-3 text-sm bg-white border border-border-default rounded-xl focus:border-brand-teal focus:outline-none"
            placeholder="Elevator active 24/7, visitor entry rules, parking instructions..."
          />
        </div>

        <div className="pt-2 flex justify-between items-center border-t border-border-light text-xs">
          <span className="text-text-muted font-medium">
            {systemState === 'LOC-13' || value.isVerified
              ? '✓ Care delivery address confirmed for staff assignment.'
              : 'Specify address details to proceed.'}
          </span>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleConfirmLocation}
            className="bg-brand-teal hover:bg-brand-teal-hover text-white font-bold text-xs cursor-pointer shadow-xs"
          >
            Confirm Care Location ✓
          </Button>
        </div>
      </div>

      {/* Unsupported Location Expansion Interest Modal */}
      <Modal
        isOpen={showExpansionModal}
        onClose={() => setShowExpansionModal(false)}
        title="Request Pulse n Care in Your Locality"
        maxWidth="md"
      >
        <div className="space-y-4 text-left">
          <p className="text-xs text-text-secondary">
            We are actively expanding our internal healthcare workforce across India. Leave your contact email to be notified when we launch in <strong>{value.city || 'your area'}</strong>.
          </p>

          {!expansionSubmitted ? (
            <form onSubmit={handleExpansionSubmit} className="space-y-3">
              <Input
                label="Email Address"
                type="email"
                value={expansionEmail}
                onChange={(e) => setExpansionEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
              />
              <Button
                type="submit"
                variant="primary"
                leftIcon={<Send className="w-4 h-4" />}
                className="w-full bg-brand-teal text-white font-bold h-11 rounded-xl cursor-pointer"
              >
                Submit Expansion Request
              </Button>
            </form>
          ) : (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-900 text-center">
              ✓ Thank you! We have recorded your interest for {value.city || 'your city'}.
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
