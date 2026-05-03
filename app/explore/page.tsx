import React from "react";
import { IndiaMap } from "@/components/explore/IndiaMap";
import { GlossarySearch } from "@/components/explore/GlossarySearch";
import { RightsAccordion } from "@/components/explore/RightsAccordion";

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-bg-primary pt-10 pb-20">
      <div className="container mx-auto px-4">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground-primary mb-4">
            Explore India&apos;s Democracy
          </h1>
          <p className="text-lg text-foreground-secondary">
            Discover the geography, terminology, and your constitutional rights that form the bedrock of the world&apos;s largest democratic exercise.
          </p>
        </div>

        {/* Section 1: Interactive India Map */}
        <section id="map" className="mb-24">
          <div className="max-w-5xl mx-auto">
            <IndiaMap />
          </div>
        </section>

        {/* Section 2: Glossary */}
        <section id="glossary" className="mb-24 bg-bg-secondary -mx-4 px-4 py-16 border-y border-border">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-heading font-bold text-foreground-primary mb-3">
                Election Glossary
              </h2>
              <p className="text-foreground-secondary max-w-2xl mx-auto">
                EVM? MCC? VVPAT? Decode the jargon of Indian elections.
              </p>
            </div>
            <GlossarySearch />
          </div>
        </section>

        {/* Section 3: Know Your Rights */}
        <section id="rights">
          <RightsAccordion />
        </section>

      </div>
    </div>
  );
}
