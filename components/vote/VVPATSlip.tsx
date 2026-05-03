"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface VVPATSlipProps {
  candidateName: string;
  candidateSymbol: string;
  partyName: string;
  show: boolean;
}

export const VVPATSlip: React.FC<VVPATSlipProps> = ({
  candidateName,
  candidateSymbol,
  partyName,
  show,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState(7);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setCountdown(7);

      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            // Slip disappears after 7 seconds, as per real VVPAT
            setTimeout(() => setIsVisible(false), 500);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="relative max-w-xs mx-auto mt-8">
      {/* VVPAT Machine Casing */}
      <div className="bg-neutral-200 dark:bg-neutral-700 border-4 border-neutral-400 dark:border-neutral-500 rounded-2xl p-4 shadow-xl">
        <div className="bg-neutral-300 dark:bg-neutral-600 rounded-lg p-2 mb-3 text-center">
          <p className="text-[10px] font-bold text-foreground-secondary uppercase tracking-wider">
            VVPAT — Voter Verifiable Paper Audit Trail
          </p>
        </div>

        {/* Viewing window */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-700 rounded-lg overflow-hidden">
          <div
            className={cn(
              "transition-all duration-500 ease-in-out p-6 text-center",
              isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
            )}
          >
            {/* The paper slip */}
            <div className="bg-white dark:bg-neutral-100 rounded-lg p-5 shadow-inner border border-neutral-200 text-neutral-900">
              <p className="text-4xl mb-3">{candidateSymbol}</p>
              <p className="font-bold text-lg">{candidateName}</p>
              <p className="text-xs text-neutral-500 mt-1">{partyName}</p>
              <div className="mt-3 border-t border-dashed border-neutral-300 pt-2">
                <p className="text-[10px] text-neutral-400">Serial No. MOCK-2024-XXXX</p>
              </div>
            </div>
          </div>
        </div>

        {/* Countdown timer */}
        <div className="mt-3 text-center">
          <p className="text-xs text-foreground-secondary">
            Slip visible for: <span className="font-bold text-primary-600 dark:text-primary-400 text-sm">{countdown}s</span>
          </p>
          <div className="w-full h-1.5 bg-neutral-300 dark:bg-neutral-600 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-primary-500 transition-all duration-1000 rounded-full"
              style={{ width: `${(countdown / 7) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
