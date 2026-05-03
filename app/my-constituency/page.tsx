"use client";

import React from "react";
import { LocationDetector } from "@/components/constituency/LocationDetector";

export default function MyConstituencyPage() {
  return (
    <div className="min-h-screen bg-bg-primary py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground-primary mb-4">
            My Constituency
          </h1>
          <p className="text-lg text-foreground-secondary">
            Discover your Lok Sabha constituency, your elected representatives, and upcoming elections — all powered by your location.
          </p>
        </div>

        <LocationDetector />
      </div>
    </div>
  );
}
