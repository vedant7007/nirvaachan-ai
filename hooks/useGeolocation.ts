import { useState, useCallback } from "react";

export interface LocationData {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  isLoading: boolean;
}

interface UseGeolocationReturn {
  location: LocationData;
  getLocation: () => void;
}

export function useGeolocation(): UseGeolocationReturn {
  const [location, setLocation] = useState<LocationData>({
    latitude: null,
    longitude: null,
    error: null,
    isLoading: false,
  });

  const getLocation = useCallback(() => {
    setLocation((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!navigator.geolocation) {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by your browser.",
        isLoading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          isLoading: false,
        });
      },
      (err) => {
        const errorMessages: Record<number, string> = {
          [err.PERMISSION_DENIED]: "Location access was denied. Please enable permissions or use manual selection.",
          [err.POSITION_UNAVAILABLE]: "Location information is unavailable. Please use manual selection.",
          [err.TIMEOUT]: "The request to get your location timed out. Please try again.",
        };

        setLocation({
          latitude: null,
          longitude: null,
          error: errorMessages[err.code] || "Unable to retrieve your location.",
          isLoading: false,
        });
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 60000 }
    );
  }, []);

  return { location, getLocation };
}
