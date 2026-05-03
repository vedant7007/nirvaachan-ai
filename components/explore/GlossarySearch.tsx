"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { glossaryTerms } from "@/data/glossary";
import { GlossaryCard } from "./GlossaryCard";

export const GlossarySearch: React.FC = () => {
  const [query, setQuery] = useState("");

  const filteredTerms = useMemo(() => {
    if (!query.trim()) return glossaryTerms;
    const lowerQuery = query.toLowerCase();
    return glossaryTerms.filter(
      (t) =>
        t.term.toLowerCase().includes(lowerQuery) ||
        t.fullForm.toLowerCase().includes(lowerQuery) ||
        t.definition.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  return (
    <div className="w-full">
      <div className="relative max-w-2xl mx-auto mb-10">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-foreground-muted" />
        </div>
        <input
          type="text"
          placeholder="Search for EVM, NOTA, MCC..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-bg-card border border-border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors text-foreground-primary"
        />
      </div>

      {filteredTerms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTerms.map((term, i) => (
            <GlossaryCard key={i} term={term} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-foreground-secondary bg-bg-secondary rounded-xl border border-border">
          No terms found matching &quot;{query}&quot;. Try another keyword.
        </div>
      )}
    </div>
  );
};
