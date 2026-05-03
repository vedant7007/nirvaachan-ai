"use client";

import React, { useState } from "react";
import { timelineSteps } from "@/data/timeline";
import { TimelineCard } from "@/components/timeline/TimelineCard";
import { PhaseFilter } from "@/components/timeline/PhaseFilter";

export default function TimelinePage() {
  const [filter, setFilter] = useState<"all" | "pre-election" | "election" | "post-election">("all");

  const filteredSteps = filter === "all" 
    ? timelineSteps 
    : timelineSteps.filter(step => step.phase === filter);

  return (
    <div className="min-h-screen bg-bg-primary pt-10 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground-primary mb-4">
            The Election Journey
          </h1>
          <p className="text-lg text-foreground-secondary">
            From redrawing boundaries to forming the government, explore the 12 critical steps that define the world&apos;s largest democratic exercise.
          </p>
        </div>

        <PhaseFilter currentFilter={filter} onFilterChange={setFilter} />

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border rounded-full z-0" aria-hidden="true" />
          
          <div className="relative z-10">
            {filteredSteps.map((step, index) => (
              <TimelineCard key={step.id} step={step} index={index} />
            ))}
          </div>

          {filteredSteps.length === 0 && (
            <div className="text-center text-foreground-secondary py-12">
              No timeline steps found for the selected phase.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
