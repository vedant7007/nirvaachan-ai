import { useState, useCallback } from "react";
import { quizQuestions, QuizQuestion } from "@/data/quiz";

export function useQuiz() {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const filteredQuestions = difficulty
    ? quizQuestions.filter((q) => q.difficulty === difficulty)
    : [];

  const startQuiz = useCallback((level: "easy" | "medium" | "hard") => {
    setDifficulty(level);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsFinished(false);
  }, []);

  const answerQuestion = useCallback((questionId: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  }, [currentQuestionIndex, filteredQuestions.length]);

  const calculateScore = useCallback(() => {
    let score = 0;
    filteredQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  }, [filteredQuestions, selectedAnswers]);

  return {
    difficulty,
    currentQuestion: filteredQuestions[currentQuestionIndex],
    currentQuestionIndex,
    totalQuestions: filteredQuestions.length,
    selectedAnswers,
    isFinished,
    startQuiz,
    answerQuestion,
    nextQuestion,
    calculateScore,
    reset: () => setDifficulty(null),
    allQuestions: filteredQuestions,
  };
}
