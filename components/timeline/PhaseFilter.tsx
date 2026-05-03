"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PhaseFilterProps {
  currentFilter: "all" | "pre-election" | "election" | "post-election";
  onFilterChange: (filter: "all" | "pre-election" | "election" | "post-election") => void;
}

export const PhaseFilter: React.FC<PhaseFilterProps> = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { id: "all", label: "All Phases" },
    { id: "pre-election", label: "Pre-Election" },
    { id: "election", label: "Election" },
    { id: "post-election", label: "Post-Election" }
  ] as const;

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
            currentFilter === filter.id
              ? "bg-primary-500 text-white shadow-sm"
              : "bg-bg-card text-foreground-secondary hover:bg-bg-secondary border border-border"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};
