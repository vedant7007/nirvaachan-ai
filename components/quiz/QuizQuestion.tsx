import React, { useState } from "react";
import { QuizQuestion as QuizQuestionType } from "@/data/quiz";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, XCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (questionId: number, optionIndex: number) => void;
  onNext: () => void;
}

export const QuizQuestionComponent: React.FC<QuizQuestionProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    onAnswer(question.id, index);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4">
      <div className="mb-8 flex justify-between items-center text-sm font-medium text-foreground-secondary">
        <span>Question {questionNumber} of {totalQuestions}</span>
        <span className="capitalize px-2.5 py-0.5 rounded-full bg-bg-card border border-border">
          {question.difficulty} Level
        </span>
      </div>

      <div className="w-full h-2 bg-bg-card rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-primary-500 transition-all duration-300"
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        />
      </div>

      <Card className="mb-8">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-primary mb-8 leading-relaxed">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrect = index === question.correctIndex;
              
              let optionClass = "bg-bg-secondary hover:bg-border text-foreground-primary";
              let icon = null;

              if (isAnswered) {
                if (isCorrect) {
                  optionClass = "bg-secondary-100 border-secondary-500 text-secondary-900 dark:bg-secondary-900/40 dark:text-secondary-100 border-2";
                  icon = <CheckCircle2 className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />;
                } else if (isSelected) {
                  optionClass = "bg-red-100 border-red-500 text-red-900 dark:bg-red-900/40 dark:text-red-100 border-2";
                  icon = <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
                } else {
                  optionClass = "bg-bg-secondary opacity-50";
                }
              } else if (isSelected) {
                optionClass = "bg-primary-100 border-primary-500 border-2";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  disabled={isAnswered}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between",
                    !isAnswered ? "border-transparent" : "",
                    optionClass
                  )}
                >
                  <span className="font-medium">{option}</span>
                  {icon}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="mt-8 p-4 bg-accent-50 dark:bg-accent-900/20 rounded-xl border border-accent-100 dark:border-accent-800/30 flex items-start">
              <Info className="h-5 w-5 text-accent-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-accent-800 dark:text-accent-300 mb-1">Explanation</h4>
                <p className="text-sm text-accent-700 dark:text-accent-400 leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={handleNext} 
          disabled={!isAnswered}
          size="lg"
        >
          {questionNumber === totalQuestions ? "See Results" : "Next Question"}
        </Button>
      </div>
    </div>
  );
};
