import React from "react";
import { CheckCircle2, UserPlus, MapPin, Search, Vote } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: CheckCircle2,
    title: "Check Eligibility",
    description: "Ensure you are 18+ and an Indian citizen.",
    color: "text-secondary-500",
    bg: "bg-secondary-100 dark:bg-secondary-900/30",
  },
  {
    icon: UserPlus,
    title: "Register to Vote",
    description: "Fill Form 6 online or via your local BLO.",
    color: "text-primary-500",
    bg: "bg-primary-100 dark:bg-primary-900/30",
  },
  {
    icon: Search,
    title: "Verify Name",
    description: "Check your name in the electoral roll.",
    color: "text-accent-500",
    bg: "bg-accent-100 dark:bg-accent-900/30",
  },
  {
    icon: MapPin,
    title: "Find Booth",
    description: "Locate your assigned polling station.",
    color: "text-rose-500",
    bg: "bg-rose-100 dark:bg-rose-900/30",
  },
  {
    icon: Vote,
    title: "Cast Vote",
    description: "Press the button on EVM & verify VVPAT.",
    color: "text-amber-500",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  }
];

export const QuickFlow: React.FC = () => {
  return (
    <section className="py-20 bg-bg-secondary overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground-primary mb-4">
            Your journey as a voter
          </h2>
          <p className="text-foreground-secondary text-lg">
            Five simple steps to participate in the world&apos;s largest democracy.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" aria-hidden="true" />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center relative group">
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-sm border-4 border-bg-secondary transition-transform group-hover:scale-110",
                    step.bg, step.color
                  )}>
                    <Icon size={28} />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground-primary mb-2">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed px-2">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
