import React from "react";
import { suggestedQuestions } from "@/data/suggested-questions";

interface SuggestedChipsProps {
  onSelect: (question: string) => void;
}

export const SuggestedChips: React.FC<SuggestedChipsProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {suggestedQuestions.map((q, i) => (
        <button
          key={i}
          onClick={() => onSelect(q)}
          className="px-4 py-2 bg-bg-card border border-border text-foreground-secondary text-sm rounded-full hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 dark:hover:border-primary-800 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500"
        >
          {q}
        </button>
      ))}
    </div>
  );
};
