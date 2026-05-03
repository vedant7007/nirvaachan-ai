"use client";

import React from "react";
import { StateElectionData } from "@/data/states";
import { X, MapPin, Building, Users, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";

interface StatePanelProps {
  state: StateElectionData | null;
  onClose: () => void;
}

export const StatePanel: React.FC<StatePanelProps> = ({ state, onClose }) => {
  if (!state) return null;

  return (
    <div className="bg-bg-card border border-border rounded-xl shadow-lg p-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-primary-500" />
          <h3 className="text-xl font-heading font-bold text-foreground-primary">{state.name}</h3>
        </div>
        <button
          onClick={onClose}
          className="text-foreground-muted hover:text-foreground-primary transition-colors"
          aria-label="Close state panel"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Building className="h-4 w-4 text-foreground-muted flex-shrink-0" />
          <span className="text-sm text-foreground-secondary">Capital:</span>
          <span className="text-sm font-semibold text-foreground-primary">{state.capital}</span>
        </div>

        <div className="flex items-center space-x-3">
          <Users className="h-4 w-4 text-foreground-muted flex-shrink-0" />
          <span className="text-sm text-foreground-secondary">Lok Sabha Seats:</span>
          <span className="text-sm font-semibold text-foreground-primary">{state.lokSabhaSeats}</span>
        </div>

        <div className="flex items-center space-x-3">
          <Users className="h-4 w-4 text-foreground-muted flex-shrink-0" />
          <span className="text-sm text-foreground-secondary">Assembly Seats:</span>
          <span className="text-sm font-semibold text-foreground-primary">{state.assemblySeats}</span>
        </div>

        <div className="flex items-center space-x-3">
          <Calendar className="h-4 w-4 text-foreground-muted flex-shrink-0" />
          <span className="text-sm text-foreground-secondary">Last Assembly Election:</span>
          <span className="text-sm font-semibold text-foreground-primary">{state.lastAssemblyElection}</span>
        </div>

        <div className="flex items-center space-x-3">
          <TrendingUp className="h-4 w-4 text-foreground-muted flex-shrink-0" />
          <span className="text-sm text-foreground-secondary">2024 LS Turnout:</span>
          <span className="text-sm font-semibold text-foreground-primary">{state.voterTurnout2024}</span>
        </div>

        <div className="flex items-center space-x-3">
          <Building className="h-4 w-4 text-foreground-muted flex-shrink-0" />
          <span className="text-sm text-foreground-secondary">Current Govt:</span>
          <span className="text-sm font-semibold text-foreground-primary">{state.currentGovernment}</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border space-y-2">
        <Link
          href="/my-constituency"
          className="block text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium"
        >
          Find My Constituency &rarr;
        </Link>
        <Link
          href={`/chat?q=Tell me about elections in ${state.name}`}
          className="block text-sm text-accent-600 dark:text-accent-400 hover:underline font-medium"
        >
          Ask AI about {state.name} elections &rarr;
        </Link>
      </div>
    </div>
  );
};
