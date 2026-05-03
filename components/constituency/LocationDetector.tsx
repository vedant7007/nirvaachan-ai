"use client";

import React, { useState } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { statesData } from "@/data/states";
import { constituencyData, Constituency } from "@/data/constituencies";
import { Button } from "@/components/ui/Button";
import { MapPin, Navigation, AlertTriangle, Building, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

interface ConstituencyApiData {
  constituency: string;
  state: string;
  representatives: string[];
  upcomingElections: string;
  error?: string | null;
}

export const LocationDetector: React.FC = () => {
  const { location, getLocation } = useGeolocation();
  const [constituencyApiData, setConstituencyApiData] = useState<ConstituencyApiData | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Manual selection state
  const [selectedStateCode, setSelectedStateCode] = useState<string>("");
  const [selectedConstituency, setSelectedConstituency] = useState<Constituency | null>(null);

  const availableStates = statesData.filter(s => constituencyData[s.code]);
  const availableConstituencies = selectedStateCode ? (constituencyData[selectedStateCode] || []) : [];

  const handleDetect = async () => {
    setConstituencyApiData(null);
    setApiError(null);
    setSelectedStateCode("");
    setSelectedConstituency(null);
    getLocation();
  };

  React.useEffect(() => {
    const fetchConstituency = async () => {
      if (location.latitude && location.longitude && !location.isLoading) {
        setIsFetching(true);
        try {
          const res = await fetch("/api/constituency", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lat: location.latitude, lng: location.longitude }),
          });

          if (!res.ok) throw new Error("Failed to identify constituency.");

          const data = await res.json();
          if (data.error) throw new Error(data.error);

          setConstituencyApiData(data);
        } catch (error: unknown) {
          setApiError(error instanceof Error ? error.message : "An error occurred.");
        } finally {
          setIsFetching(false);
        }
      }
    };

    fetchConstituency();
  }, [location.latitude, location.longitude, location.isLoading]);

  const handleStateChange = (code: string) => {
    setSelectedStateCode(code);
    setSelectedConstituency(null);
    setConstituencyApiData(null);
  };

  const handleConstituencySelect = (name: string) => {
    const c = availableConstituencies.find(x => x.name === name) || null;
    setSelectedConstituency(c);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="mb-8">
        <CardContent className="p-8 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-rose-100 dark:bg-rose-900/30 text-rose-500 rounded-full flex items-center justify-center mb-6">
            <MapPin size={40} />
          </div>

          <h2 className="text-2xl font-heading font-bold text-foreground-primary mb-3">
            Find Your Representatives
          </h2>
          <p className="text-foreground-secondary mb-6 max-w-md">
            Allow location access or manually select your state and constituency.
          </p>

          <Button
            onClick={handleDetect}
            disabled={location.isLoading || isFetching}
            className="w-full sm:w-auto mb-6"
            size="lg"
          >
            {location.isLoading || isFetching ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Locating...
              </span>
            ) : (
              <span className="flex items-center">
                <Navigation className="mr-2 h-4 w-4" />
                Detect My Location
              </span>
            )}
          </Button>

          <div className="w-full text-center mb-4">
            <span className="text-sm text-foreground-muted">OR select manually</span>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select
              value={selectedStateCode}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-bg-secondary border border-border text-foreground-primary text-sm"
              aria-label="Select state"
            >
              <option value="">Select State</option>
              {availableStates.map(s => (
                <option key={s.code} value={s.code}>{s.name}</option>
              ))}
            </select>

            <select
              value={selectedConstituency?.name || ""}
              onChange={(e) => handleConstituencySelect(e.target.value)}
              disabled={!selectedStateCode}
              className="w-full px-4 py-2 rounded-lg bg-bg-secondary border border-border text-foreground-primary text-sm disabled:opacity-50"
              aria-label="Select constituency"
            >
              <option value="">Select Constituency</option>
              {availableConstituencies.map(c => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {(location.error || apiError) && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm flex items-start text-left w-full">
              <AlertTriangle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
              <p>{location.error || apiError}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Show API-detected constituency data */}
      {constituencyApiData && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-xl font-heading font-bold text-foreground-primary mb-4 px-2">
            Your Constituency Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-t-4 border-primary-500">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4 text-primary-600 dark:text-primary-400">
                  <MapPin size={20} />
                  <span className="font-semibold uppercase tracking-wider text-sm">Location</span>
                </div>
                <p className="text-2xl font-bold text-foreground-primary">{constituencyApiData.constituency}</p>
                <p className="text-foreground-secondary">{constituencyApiData.state}</p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-accent-500">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4 text-accent-600 dark:text-accent-400">
                  <Users size={20} />
                  <span className="font-semibold uppercase tracking-wider text-sm">Representatives</span>
                </div>
                <ul className="space-y-2">
                  {constituencyApiData.representatives.map((rep: string, i: number) => (
                    <li key={i} className="text-lg font-medium text-foreground-primary">{rep}</li>
                  ))}
                  {constituencyApiData.representatives.length === 0 && (
                    <li className="text-foreground-secondary italic">Data unavailable</li>
                  )}
                </ul>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 border-t-4 border-secondary-500">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4 text-secondary-600 dark:text-secondary-400">
                  <Building size={20} />
                  <span className="font-semibold uppercase tracking-wider text-sm">Upcoming Elections</span>
                </div>
                <p className="text-xl font-medium text-foreground-primary">{constituencyApiData.upcomingElections}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Show manually selected constituency data */}
      {selectedConstituency && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-xl font-heading font-bold text-foreground-primary mb-4 px-2">
            Constituency Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-t-4 border-primary-500">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4 text-primary-600 dark:text-primary-400">
                  <MapPin size={20} />
                  <span className="font-semibold uppercase tracking-wider text-sm">{selectedConstituency.type}</span>
                </div>
                <p className="text-2xl font-bold text-foreground-primary">{selectedConstituency.name}</p>
                <p className="text-foreground-secondary">{selectedConstituency.state}</p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-accent-500">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4 text-accent-600 dark:text-accent-400">
                  <Users size={20} />
                  <span className="font-semibold uppercase tracking-wider text-sm">Current Representative</span>
                </div>
                <p className="text-lg font-bold text-foreground-primary">{selectedConstituency.currentRepresentative}</p>
                <p className="text-sm text-foreground-secondary">{selectedConstituency.party} &middot; Elected {selectedConstituency.lastElectionYear}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
