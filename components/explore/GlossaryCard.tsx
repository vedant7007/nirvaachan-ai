import React from "react";
import Link from "next/link";
import { GlossaryTerm } from "@/data/glossary";
import { Card, CardContent } from "@/components/ui/Card";
import { MessageCircle } from "lucide-react";

interface GlossaryCardProps {
  term: GlossaryTerm;
}

export const GlossaryCard: React.FC<GlossaryCardProps> = ({ term }) => {
  return (
    <Card className="h-full hover:border-accent-300 dark:hover:border-accent-700 transition-colors">
      <CardContent className="p-5 flex flex-col h-full">
        <h3 className="font-heading font-bold text-lg text-foreground-primary mb-1">
          {term.term}
        </h3>
        {term.fullForm !== term.term && (
          <p className="text-xs font-semibold text-accent-600 dark:text-accent-400 mb-3 uppercase tracking-wider">
            {term.fullForm}
          </p>
        )}
        <p className="text-sm text-foreground-secondary leading-relaxed flex-grow">
          {term.definition}
        </p>
        <div className="mt-3 pt-2 border-t border-border">
          <Link
            href={`/chat?q=${encodeURIComponent(`What is ${term.term}?`)}`}
            className="flex items-center text-xs text-primary-600 dark:text-primary-400 hover:underline font-medium"
          >
            <MessageCircle size={14} className="mr-1" />
            Ask AI about this term
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
