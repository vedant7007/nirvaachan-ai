import React from "react";
import { Brain, Star, Trophy, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface QuizStartProps {
  onStart: (difficulty: "easy" | "medium" | "hard") => void;
}

export const QuizStart: React.FC<QuizStartProps> = ({ onStart }) => {
  const difficulties = [
    {
      id: "easy" as const,
      title: "Novice Voter",
      description: "Basic knowledge about voting rights and simple facts.",
      icon: Target,
      color: "text-secondary-500",
      bg: "bg-secondary-100 dark:bg-secondary-900/30",
    },
    {
      id: "medium" as const,
      title: "Informed Citizen",
      description: "Intermediate concepts, rules, and procedures.",
      icon: Star,
      color: "text-primary-500",
      bg: "bg-primary-100 dark:bg-primary-900/30",
    },
    {
      id: "hard" as const,
      title: "Democracy Expert",
      description: "Advanced constitutional provisions and landmark cases.",
      icon: Trophy,
      color: "text-accent-500",
      bg: "bg-accent-100 dark:bg-accent-900/30",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto text-center px-4">
      <div className="w-20 h-20 bg-bg-card rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-border">
        <Brain className="h-10 w-10 text-primary-500" />
      </div>
      
      <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground-primary mb-4">
        Test Your Democracy Knowledge
      </h1>
      
      <p className="text-lg text-foreground-secondary mb-12 max-w-2xl mx-auto">
        Choose your difficulty level and see how well you understand the Indian election process.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {difficulties.map((level) => {
          const Icon = level.icon;
          return (
            <Card key={level.id} className="hover:border-primary-300 dark:hover:border-primary-700 transition-colors">
              <CardContent className="p-6 md:p-8 flex flex-col h-full">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6", level.bg, level.color)}>
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold font-heading text-foreground-primary mb-2 capitalize">
                  {level.title}
                </h3>
                <p className="text-foreground-secondary mb-8 flex-grow">
                  {level.description}
                </p>
                <Button onClick={() => onStart(level.id)} className="w-full">
                  Start {level.title}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
