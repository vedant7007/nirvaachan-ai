"use client";

import React from "react";
import { cn } from "@/lib/utils";

const categories = [
  { label: "All", value: "all" },
  { label: "Results", value: "results" },
  { label: "Analysis", value: "analysis" },
  { label: "Policy", value: "policy" },
  { label: "Updates", value: "updates" },
];

interface CategoryFilterProps {
  activeCategory: string;
  onChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8" role="tablist" aria-label="Filter news by category">
      {categories.map((cat) => (
        <button
          key={cat.value}
          role="tab"
          aria-selected={activeCategory === cat.value}
          onClick={() => onChange(cat.value)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all",
            activeCategory === cat.value
              ? "bg-primary-500 text-white shadow-md"
              : "bg-bg-secondary text-foreground-secondary hover:bg-bg-card hover:text-foreground-primary border border-border"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};
