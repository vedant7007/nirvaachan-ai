"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

// Mock candidate data for the EVM simulation
const candidates = [
  { id: 1, name: "Candidate A", party: "Party of the People", symbol: "🌾" },
  { id: 2, name: "Candidate B", party: "National Progress Front", symbol: "🌻" },
  { id: 3, name: "Candidate C", party: "Democratic Reform Alliance", symbol: "📖" },
  { id: 4, name: "Candidate D", party: "Green Development Party", symbol: "🌳" },
  { id: 5, name: "Candidate E", party: "Independent", symbol: "🕊️" },
  { id: 6, name: "NOTA", party: "None Of The Above", symbol: "🚫" },
];

interface EVMMachineProps {
  onVote: (candidateId: number) => void;
  hasVoted: boolean;
}

export const EVMMachine: React.FC<EVMMachineProps> = ({ onVote, hasVoted }) => {
  const [pressedId, setPressedId] = useState<number | null>(null);

  const handlePress = (id: number) => {
    if (hasVoted) return;
    setPressedId(id);
    
    // Simulate button press delay
    setTimeout(() => {
      onVote(id);
    }, 300);
  };

  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 border-4 border-neutral-400 dark:border-neutral-600 rounded-2xl p-6 md:p-8 shadow-xl max-w-md mx-auto">
      {/* EVM Header */}
      <div className="bg-neutral-200 dark:bg-neutral-700 rounded-lg p-3 mb-6 text-center border border-neutral-300 dark:border-neutral-600">
        <p className="text-xs font-bold text-foreground-secondary uppercase tracking-wider">
          Electronic Voting Machine
        </p>
        <p className="text-[10px] text-foreground-muted mt-0.5">
          Ballot Unit — Mock Simulation
        </p>
      </div>

      {/* Candidate rows */}
      <div className="space-y-0 border border-neutral-300 dark:border-neutral-600 rounded-lg overflow-hidden">
        {candidates.map((candidate, index) => {
          const isPressed = pressedId === candidate.id;
          return (
            <div
              key={candidate.id}
              className={cn(
                "flex items-center justify-between px-4 py-3 transition-colors",
                index !== candidates.length - 1 && "border-b border-neutral-300 dark:border-neutral-600",
                candidate.name === "NOTA" ? "bg-neutral-200 dark:bg-neutral-700" : "bg-white dark:bg-neutral-900",
              )}
            >
              {/* Candidate info */}
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <span className="text-sm font-bold text-foreground-muted w-5 text-center">{candidate.id}</span>
                <span className="text-2xl flex-shrink-0">{candidate.symbol}</span>
                <div className="min-w-0">
                  <p className="font-bold text-sm text-foreground-primary truncate">{candidate.name}</p>
                  <p className="text-[11px] text-foreground-muted truncate">{candidate.party}</p>
                </div>
              </div>

              {/* Blue vote button */}
              <button
                onClick={() => handlePress(candidate.id)}
                disabled={hasVoted}
                className={cn(
                  "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ml-4",
                  hasVoted
                    ? "bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 border-blue-800 active:scale-90 cursor-pointer shadow-md",
                  isPressed && "ring-4 ring-blue-400/50 scale-90"
                )}
                aria-label={`Vote for ${candidate.name}`}
              >
                {!hasVoted && (
                  <div className="w-3 h-3 rounded-full bg-blue-100"></div>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Status indicator */}
      <div className="mt-6 flex items-center justify-center space-x-2">
        <div className={cn(
          "w-3 h-3 rounded-full",
          hasVoted ? "bg-red-500" : "bg-green-500 animate-pulse"
        )}></div>
        <span className="text-xs font-semibold text-foreground-secondary">
          {hasVoted ? "Vote Recorded — Machine Locked" : "Ready — Press the blue button to vote"}
        </span>
      </div>
    </div>
  );
};
