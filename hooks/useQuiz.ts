import { useState, useCallback } from "react";
import { quizQuestions, QuizQuestion } from "@/data/quiz";

type Difficulty = "easy" | "medium" | "hard";

interface UseQuizReturn {
  difficulty: Difficulty | null;
  currentQuestion: QuizQuestion | undefined;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswers: Record<number, number>;
  isFinished: boolean;
  startQuiz: (level: Difficulty) => void;
  answerQuestion: (questionId: number, optionIndex: number) => void;
  nextQuestion: () => void;
  calculateScore: () => number;
  reset: () => void;
  allQuestions: QuizQuestion[];
}

export function useQuiz(): UseQuizReturn {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const filteredQuestions = difficulty
    ? quizQuestions.filter((q) => q.difficulty === difficulty)
    : [];

  const startQuiz = useCallback((level: Difficulty) => {
    setDifficulty(level);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsFinished(false);
  }, []);

  const answerQuestion = useCallback((questionId: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }, []);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  }, [currentQuestionIndex, filteredQuestions.length]);

  const calculateScore = useCallback(() => {
    return filteredQuestions.reduce((score, q) => {
      return score + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0);
    }, 0);
  }, [filteredQuestions, selectedAnswers]);

  const reset = useCallback(() => setDifficulty(null), []);

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
    reset,
    allQuestions: filteredQuestions,
  };
}
