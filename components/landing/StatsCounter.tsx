"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

interface StatItemProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
}

const StatItem: React.FC<StatItemProps> = ({ end, suffix = "", label, duration = 2000 }) => {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Easing function: easeOutExpo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCount(Math.floor(easeProgress * end));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 bg-bg-card rounded-2xl shadow-sm border border-border">
      <div className="text-4xl md:text-5xl font-heading font-bold text-accent-600 mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm md:text-base text-foreground-secondary font-medium text-center uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};

export const StatsCounter: React.FC = () => {
  return (
    <section className="py-12 bg-bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatItem end={968} suffix="M+" label="Registered Voters" />
          <StatItem end={543} suffix="" label="Lok Sabha Seats" />
          <StatItem end={1.05} suffix="M+" label="Polling Booths" />
          <StatItem end={15} suffix="M+" label="Polling Staff" />
        </div>
      </div>
    </section>
  );
};
