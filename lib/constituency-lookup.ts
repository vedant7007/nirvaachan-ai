/**
 * Coordinate-based constituency lookup for offline fallback.
 * Maps geographic coordinates to approximate Lok Sabha constituencies
 * using bounding box regions for major Indian cities.
 */

interface CoordinateRegion {
  state: string;
  constituency: string;
  latMin: number;
  latMax: number;
  lngMin: number;
  lngMax: number;
}

const COORDINATE_REGIONS: readonly CoordinateRegion[] = [
  { state: "Delhi", constituency: "New Delhi", latMin: 28.4, latMax: 28.9, lngMin: 76.8, lngMax: 77.4 },
  { state: "Maharashtra", constituency: "Mumbai North", latMin: 18.8, latMax: 19.3, lngMin: 72.7, lngMax: 73.0 },
  { state: "Maharashtra", constituency: "Pune", latMin: 18.3, latMax: 18.7, lngMin: 73.7, lngMax: 74.0 },
  { state: "Karnataka", constituency: "Bengaluru South", latMin: 12.7, latMax: 13.2, lngMin: 77.4, lngMax: 77.8 },
  { state: "Tamil Nadu", constituency: "Chennai South", latMin: 12.9, latMax: 13.2, lngMin: 80.1, lngMax: 80.4 },
  { state: "Telangana", constituency: "Hyderabad", latMin: 17.2, latMax: 17.6, lngMin: 78.3, lngMax: 78.6 },
  { state: "West Bengal", constituency: "Kolkata North", latMin: 22.4, latMax: 22.7, lngMin: 88.2, lngMax: 88.5 },
  { state: "Uttar Pradesh", constituency: "Lucknow", latMin: 26.7, latMax: 27.0, lngMin: 80.8, lngMax: 81.1 },
  { state: "Uttar Pradesh", constituency: "Varanasi", latMin: 25.2, latMax: 25.5, lngMin: 82.9, lngMax: 83.1 },
  { state: "Uttar Pradesh", constituency: "Noida (Gautam Buddha Nagar)", latMin: 28.4, latMax: 28.7, lngMin: 77.3, lngMax: 77.6 },
  { state: "Gujarat", constituency: "Ahmedabad East", latMin: 22.9, latMax: 23.2, lngMin: 72.4, lngMax: 72.7 },
  { state: "Rajasthan", constituency: "Jaipur", latMin: 26.7, latMax: 27.1, lngMin: 75.6, lngMax: 76.0 },
  { state: "Madhya Pradesh", constituency: "Bhopal", latMin: 23.1, latMax: 23.4, lngMin: 77.3, lngMax: 77.5 },
  { state: "Kerala", constituency: "Thiruvananthapuram", latMin: 8.3, latMax: 8.7, lngMin: 76.8, lngMax: 77.1 },
  { state: "Kerala", constituency: "Ernakulam", latMin: 9.8, latMax: 10.1, lngMin: 76.2, lngMax: 76.5 },
  { state: "Andhra Pradesh", constituency: "Visakhapatnam", latMin: 17.6, latMax: 17.9, lngMin: 83.1, lngMax: 83.4 },
  { state: "Punjab", constituency: "Amritsar", latMin: 31.5, latMax: 31.7, lngMin: 74.8, lngMax: 75.0 },
  { state: "Punjab", constituency: "Ludhiana", latMin: 30.8, latMax: 31.0, lngMin: 75.7, lngMax: 76.0 },
  { state: "Bihar", constituency: "Patna Sahib", latMin: 25.5, latMax: 25.7, lngMin: 85.0, lngMax: 85.3 },
  { state: "Odisha", constituency: "Bhubaneswar", latMin: 20.2, latMax: 20.4, lngMin: 85.7, lngMax: 86.0 },
  { state: "Assam", constituency: "Guwahati", latMin: 26.1, latMax: 26.3, lngMin: 91.6, lngMax: 91.9 },
  { state: "Jharkhand", constituency: "Ranchi", latMin: 23.3, latMax: 23.5, lngMin: 85.2, lngMax: 85.5 },
  { state: "Chhattisgarh", constituency: "Raipur", latMin: 21.2, latMax: 21.4, lngMin: 81.5, lngMax: 81.8 },
  { state: "Haryana", constituency: "Gurugram", latMin: 28.3, latMax: 28.6, lngMin: 76.9, lngMax: 77.2 },
  { state: "Uttarakhand", constituency: "Dehradun", latMin: 30.2, latMax: 30.5, lngMin: 77.9, lngMax: 78.2 },
  { state: "Himachal Pradesh", constituency: "Shimla", latMin: 31.0, latMax: 31.2, lngMin: 77.1, lngMax: 77.3 },
  { state: "Goa", constituency: "North Goa", latMin: 15.3, latMax: 15.6, lngMin: 73.7, lngMax: 74.0 },
  { state: "Jammu & Kashmir", constituency: "Srinagar", latMin: 33.9, latMax: 34.2, lngMin: 74.7, lngMax: 75.0 },
] as const;

/** India's geographic bounding box */
const INDIA_BOUNDS = { latMin: 8, latMax: 37, lngMin: 68, lngMax: 97 };

export interface ConstituencyMatch {
  state: string;
  constituency: string;
}

/**
 * Attempts to identify the Lok Sabha constituency from geographic coordinates.
 * Uses bounding box matching for major Indian cities as a fallback when
 * the Gemini API is unavailable.
 *
 * @returns The matched state and constituency, or null if coordinates are outside India
 */
export function guessStateFromCoords(lat: number, lng: number): ConstituencyMatch | null {
  for (const region of COORDINATE_REGIONS) {
    if (lat >= region.latMin && lat <= region.latMax && lng >= region.lngMin && lng <= region.lngMax) {
      return { state: region.state, constituency: region.constituency };
    }
  }

  if (lat >= INDIA_BOUNDS.latMin && lat <= INDIA_BOUNDS.latMax &&
      lng >= INDIA_BOUNDS.lngMin && lng <= INDIA_BOUNDS.lngMax) {
    return { state: "India", constituency: "Could not determine exact constituency. Please use manual selection." };
  }

  return null;
}

/**
 * Validates that coordinates are within a valid geographic range.
 */
export function isValidCoordinates(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

/** Number of defined coordinate regions */
export const REGION_COUNT = COORDINATE_REGIONS.length;
