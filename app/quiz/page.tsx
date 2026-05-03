"use client";

import React from "react";
import { useQuiz } from "@/hooks/useQuiz";
import { QuizStart } from "@/components/quiz/QuizStart";
import { QuizQuestionComponent } from "@/components/quiz/QuizQuestion";
import { QuizResult } from "@/components/quiz/QuizResult";

export default function QuizPage() {
  const {
    difficulty,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    isFinished,
    startQuiz,
    answerQuestion,
    nextQuestion,
    calculateScore,
    reset,
  } = useQuiz();

  return (
    <div className="min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-8.5rem)] bg-bg-primary py-12 md:py-20 flex flex-col justify-center">
      <div className="container mx-auto">
        {!difficulty ? (
          <QuizStart onStart={startQuiz} />
        ) : !isFinished && currentQuestion ? (
          <QuizQuestionComponent
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            onAnswer={answerQuestion}
            onNext={nextQuestion}
          />
        ) : (
          <QuizResult
            score={calculateScore()}
            totalQuestions={totalQuestions}
            difficulty={difficulty}
            onRestart={reset}
          />
        )}
      </div>
    </div>
  );
}
