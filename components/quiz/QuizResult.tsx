import React from "react";
import { Trophy, ArrowRight, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  difficulty: "easy" | "medium" | "hard";
  onRestart: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({
  score,
  totalQuestions,
  difficulty,
  onRestart,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let message = "";
  let colorClass = "";
  
  if (percentage >= 80) {
    message = "Outstanding! You are a true champion of democracy.";
    colorClass = "text-secondary-500";
  } else if (percentage >= 50) {
    message = "Good job! You have a solid understanding of the election process.";
    colorClass = "text-primary-500";
  } else {
    message = "Keep learning! Exploring our timeline will help you master these concepts.";
    colorClass = "text-accent-500";
  }

  return (
    <div className="max-w-2xl mx-auto w-full px-4 text-center">
      <Card className="mb-8 overflow-hidden">
        <div className="h-2 w-full bg-border">
          <div 
            className={cn("h-full transition-all duration-1000", percentage >= 80 ? "bg-secondary-500" : percentage >= 50 ? "bg-primary-500" : "bg-accent-500")}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <CardContent className="p-8 md:p-12">
          <div className="w-24 h-24 bg-bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className={cn("h-12 w-12", colorClass)} />
          </div>
          
          <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-2">
            {difficulty} Level Completed
          </h2>
          
          <div className="text-5xl md:text-6xl font-heading font-bold text-foreground-primary mb-6">
            {score} <span className="text-2xl md:text-3xl text-foreground-muted">/ {totalQuestions}</span>
          </div>
          
          <p className="text-xl font-medium text-foreground-secondary mb-2">
            {percentage}% Score
          </p>
          <p className="text-foreground-secondary leading-relaxed">
            {message}
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <Button onClick={onRestart} variant="outline" className="w-full sm:w-auto">
          <RotateCcw className="mr-2 h-4 w-4" />
          Try Another Level
        </Button>
        <Link href="/timeline" passHref legacyBehavior>
          <Button className="w-full sm:w-auto">
            Explore Timeline
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
