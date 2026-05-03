"use client";

import React from "react";
import { TimelineStep } from "@/data/timeline";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { Card, CardContent } from "@/components/ui/Card";
import { Info, BookOpen, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";

interface TimelineCardProps {
  step: TimelineStep;
  index: number;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({ step, index }) => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex flex-col md:flex-row items-center justify-between w-full mb-12 opacity-0 transition-all duration-700 transform",
        isInView ? "opacity-100 translate-y-0" : "translate-y-12",
        isEven ? "md:flex-row-reverse" : ""
      )}
    >
      {/* Center timeline dot */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-bg-card border-4 border-accent-500 items-center justify-center z-10 shadow-sm">
        <span className="text-sm font-bold text-foreground-primary">{step.id}</span>
      </div>

      <div className="w-full md:w-[45%]">
        <Card className="hover:shadow-md transition-shadow overflow-hidden border-t-4" style={{ borderTopColor: `var(--phase-${step.phase.replace('-election', '') === 'election' ? 'election' : step.phase.split('-')[0]})` }}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl" aria-hidden="true">{step.icon}</span>
                <div>
                  <h3 className="font-heading font-bold text-xl text-foreground-primary">{step.title}</h3>
                  <p className="text-sm text-foreground-secondary">{step.subtitle}</p>
                </div>
              </div>
              <Badge variant={step.phase === "pre-election" ? "pre" : step.phase === "election" ? "election" : "post"}>
                {step.phase.replace("-", " ").toUpperCase()}
              </Badge>
            </div>

            <p className="text-foreground-secondary leading-relaxed mb-6">
              {step.description}
            </p>

            <Accordion title="Key Facts" className="mb-4">
              <ul className="list-disc pl-5 space-y-2">
                {step.keyFacts.map((fact, i) => (
                  <li key={i} className="text-sm">{fact}</li>
                ))}
              </ul>
            </Accordion>

            <div className="grid grid-cols-1 gap-3 mt-4 text-sm bg-bg-secondary p-4 rounded-lg">
              <div className="flex items-start space-x-2 text-foreground-secondary">
                <BookOpen size={16} className="mt-0.5 text-accent-600 flex-shrink-0" />
                <span><strong className="text-foreground-primary">Law:</strong> {step.constitutionalBasis}</span>
              </div>
              <div className="flex items-start space-x-2 text-foreground-secondary">
                <Clock size={16} className="mt-0.5 text-primary-600 flex-shrink-0" />
                <span><strong className="text-foreground-primary">Duration:</strong> {step.duration}</span>
              </div>
              <div className="flex items-start space-x-2 text-foreground-secondary">
                <Info size={16} className="mt-0.5 text-secondary-600 flex-shrink-0" />
                <span><strong className="text-foreground-primary">Fun Fact:</strong> {step.funFact}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Spacer for the other side */}
      <div className="hidden md:block w-[45%]"></div>
    </div>
  );
};
