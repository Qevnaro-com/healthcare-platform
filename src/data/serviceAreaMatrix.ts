/**
 * Healthcare Staffing & Home Care Platform
 * Delhi NCR Service Area Registry & Pincode Matrix
 * Source of Truth: docs/client-experience/05-CLIENT-BOOKING-FLOW.md
 */

export interface ServiceAreaHub {
  id: string;
  name: string;
  city: 'Delhi NCR' | 'Delhi' | 'Noida' | 'Gurugram' | 'Faridabad';
  hubAddress: string;
  pincodePrefixes: string[];
  activeStaffCount: number;
  avgDispatchTimeMinutes: string;
  isOperational: boolean;
  coordinates: { latitude: number; longitude: number };
  coverageRadiusKm: number;
}

export const DELHI_NCR_SERVICE_HUBS: ServiceAreaHub[] = [
  {
    id: 'hub-delhi-south',
    name: 'South Delhi Care Zone',
    city: 'Delhi NCR',
    hubAddress: 'Defence Colony, Ring Road, New Delhi',
    pincodePrefixes: ['110001', '110003', '110014', '110016', '110017', '110019', '110020', '110024', '110048', '110065', '110070'],
    activeStaffCount: 85,
    avgDispatchTimeMinutes: '30-45 mins',
    isOperational: true,
    coordinates: { latitude: 28.5800, longitude: 77.2300 },
    coverageRadiusKm: 15
  },
  {
    id: 'hub-delhi-west',
    name: 'West & North Delhi Care Zone',
    city: 'Delhi NCR',
    hubAddress: 'Rajouri Garden / Rohini Sector 7, New Delhi',
    pincodePrefixes: ['110015', '110027', '110058', '110063', '110085', '110088'],
    activeStaffCount: 62,
    avgDispatchTimeMinutes: '35-50 mins',
    isOperational: true,
    coordinates: { latitude: 28.6700, longitude: 77.1200 },
    coverageRadiusKm: 15
  },
  {
    id: 'hub-gurugram-cyber',
    name: 'Gurugram Central Care Zone',
    city: 'Gurugram',
    hubAddress: 'DLF Cyber City, Phase 2, Gurugram',
    pincodePrefixes: ['122001', '122002', '122003', '122008', '122011', '122018', '122051'],
    activeStaffCount: 74,
    avgDispatchTimeMinutes: '25-40 mins',
    isOperational: true,
    coordinates: { latitude: 28.4950, longitude: 77.0890 },
    coverageRadiusKm: 18
  },
  {
    id: 'hub-noida-sec62',
    name: 'Noida Express Care Zone',
    city: 'Noida',
    hubAddress: 'Sector 62 / Sector 18, Noida',
    pincodePrefixes: ['201301', '201303', '201304', '201307', '201309', '201313'],
    activeStaffCount: 58,
    avgDispatchTimeMinutes: '30-45 mins',
    isOperational: true,
    coordinates: { latitude: 28.6280, longitude: 77.3750 },
    coverageRadiusKm: 18
  },
  {
    id: 'hub-faridabad-sec15',
    name: 'Faridabad Central Care Zone',
    city: 'Faridabad',
    hubAddress: 'Sector 15 / Mathura Road, Faridabad',
    pincodePrefixes: ['121001', '121002', '121003', '121006', '121007'],
    activeStaffCount: 41,
    avgDispatchTimeMinutes: '35-50 mins',
    isOperational: true,
    coordinates: { latitude: 28.4000, longitude: 77.3100 },
    coverageRadiusKm: 16
  }
];

export interface LocationValidationResult {
  isSupported: boolean;
  matchedHub?: ServiceAreaHub;
  reason?: string;
}

/**
 * Validates city name or pincode against active Delhi NCR Service Hubs
 */
export function validateNCRServiceLocation(city?: string, pincode?: string): LocationValidationResult {
  const cityTrim = (city || '').trim().toLowerCase();
  const pincodeTrim = (pincode || '').trim();

  // If pincode matches any hub prefix
  if (pincodeTrim) {
    const hubByPin = DELHI_NCR_SERVICE_HUBS.find((h) =>
      h.pincodePrefixes.some((prefix) => pincodeTrim.startsWith(prefix) || prefix === pincodeTrim)
    );
    if (hubByPin) {
      return { isSupported: true, matchedHub: hubByPin };
    }
  }

  // Generic NCR Pincode prefix check (Delhi 110xxx, Noida 2013xx, Gurugram 122xxx, Faridabad 121xxx)
  const isGenericNCRPin =
    pincodeTrim.startsWith('110') ||
    pincodeTrim.startsWith('2013') ||
    pincodeTrim.startsWith('122') ||
    pincodeTrim.startsWith('121');

  // Generic City name check
  const matchedHubByCity = DELHI_NCR_SERVICE_HUBS.find((h) =>
    cityTrim.includes(h.city.toLowerCase()) || (h.city === 'Gurugram' && cityTrim.includes('gurgaon'))
  );

  if (matchedHubByCity) {
    return { isSupported: true, matchedHub: matchedHubByCity };
  }

  if (isGenericNCRPin) {
    return { isSupported: true, matchedHub: DELHI_NCR_SERVICE_HUBS[0] };
  }

  // If city/pincode provided but outside NCR
  if (cityTrim || pincodeTrim) {
    return {
      isSupported: false,
      reason: `Pulse n Care currently operates exclusively within Delhi, Noida, Gurugram, and Faridabad. '${city || pincode}' is outside our active coverage boundary.`
    };
  }

  // Default fallback (prompting for entry)
  return { isSupported: true, matchedHub: DELHI_NCR_SERVICE_HUBS[0] };
}
