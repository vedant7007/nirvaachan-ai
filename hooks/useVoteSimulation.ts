import { useState, useCallback } from "react";

export interface Candidate {
  id: number;
  name: string;
  party: string;
  symbol: string;
}

export const CANDIDATES: readonly Candidate[] = [
  { id: 1, name: "Candidate A", party: "Party of the People", symbol: "🌾" },
  { id: 2, name: "Candidate B", party: "National Progress Front", symbol: "🌻" },
  { id: 3, name: "Candidate C", party: "Democratic Reform Alliance", symbol: "📖" },
  { id: 4, name: "Candidate D", party: "Green Development Party", symbol: "🌳" },
  { id: 5, name: "Candidate E", party: "Independent", symbol: "🕊️" },
  { id: 6, name: "NOTA", party: "None Of The Above", symbol: "🚫" },
] as const;

export const STEP_LABELS = ["Welcome", "ID Check", "Ink", "EVM", "VVPAT", "Exit", "Done"] as const;
export const TOTAL_STEPS = STEP_LABELS.length;

export interface UseVoteSimulationReturn {
  currentStep: number;
  votedCandidate: Candidate | null;
  showConfetti: boolean;
  handleVote: (candidateId: number) => void;
  handleReset: () => void;
  goNext: () => void;
}

/**
 * Encapsulates the 7-step mock voting simulation state machine.
 * Steps: Welcome → ID Check → Ink → EVM → VVPAT → Exit → Congratulations
 */
export function useVoteSimulation(): UseVoteSimulationReturn {
  const [currentStep, setCurrentStep] = useState(0);
  const [votedCandidate, setVotedCandidate] = useState<Candidate | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleVote = useCallback((candidateId: number) => {
    const candidate = CANDIDATES.find((c) => c.id === candidateId);
    if (!candidate) return;
    setVotedCandidate(candidate);
    setCurrentStep(4); // Jump to VVPAT step
  }, []);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setVotedCandidate(null);
    setShowConfetti(false);
  }, []);

  const goNext = useCallback(() => {
    setCurrentStep((prev) => {
      const next = prev + 1;
      if (next === 6) setShowConfetti(true);
      return next;
    });
  }, []);

  return { currentStep, votedCandidate, showConfetti, handleVote, handleReset, goNext };
}
