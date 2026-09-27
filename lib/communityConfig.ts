/**
 * Emerson Estates community center — coordinates from MLS listing geo for
 * 2583 Regency Cove Ct, Las Vegas, NV 89121 (Compass / GLVAR listing data).
 */
export const EMERSON_ESTATES = {
  name: 'Emerson Estates',
  streetAddress: '2583 Regency Cove Ct',
  city: 'Las Vegas',
  region: 'NV',
  postalCode: '89121',
  country: 'US',
  center: {
    lat: 36.123261,
    lng: -115.114749,
  },
  /** Default map search radius in meters */
  searchRadiusMeters: 8000,
} as const;

export type CommunityConfig = typeof EMERSON_ESTATES;
