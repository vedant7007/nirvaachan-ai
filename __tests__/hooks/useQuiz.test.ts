import { renderHook, act } from "@testing-library/react";
import { useQuiz } from "@/hooks/useQuiz";

describe("useQuiz hook", () => {
  it("starts with no difficulty selected", () => {
    const { result } = renderHook(() => useQuiz());
    expect(result.current.difficulty).toBeNull();
    expect(result.current.isFinished).toBe(false);
  });

  it("starts quiz with easy difficulty", () => {
    const { result } = renderHook(() => useQuiz());
    act(() => { result.current.startQuiz("easy"); });
    expect(result.current.difficulty).toBe("easy");
    expect(result.current.totalQuestions).toBe(5);
    expect(result.current.currentQuestionIndex).toBe(0);
  });

  it("starts quiz with medium difficulty", () => {
    const { result } = renderHook(() => useQuiz());
    act(() => { result.current.startQuiz("medium"); });
    expect(result.current.difficulty).toBe("medium");
    expect(result.current.totalQuestions).toBe(5);
  });

  it("starts quiz with hard difficulty", () => {
    const { result } = renderHook(() => useQuiz());
    act(() => { result.current.startQuiz("hard"); });
    expect(result.current.difficulty).toBe("hard");
    expect(result.current.totalQuestions).toBe(5);
  });

  it("returns a current question after starting", () => {
    const { result } = renderHook(() => useQuiz());
    act(() => { result.current.startQuiz("easy"); });
    expect(result.current.currentQuestion).toBeDefined();
    expect(result.current.currentQuestion?.question).toBeTruthy();
  });

  it("records an answer for a question", () => {
    const { result } = renderHook(() => useQuiz());
    act(() => { result.current.startQuiz("easy"); });

    const questionId = result.current.currentQuestion!.id;
    act(() => { result.current.answerQuestion(questionId, 2); });
    expect(result.current.selectedAnswers[questionId]).toBe(2);
  });

  it("advances to next question", () => {
    const { result } = renderHook(() => useQuiz());
    act(() => { result.current.startQuiz("easy"); });
    act(() => { result.current.nextQuestion(); });
    expect(result.current.currentQuestionIndex).toBe(1);
  });

  it("finishes quiz after last question", () => {
    const { result } = renderHook(() => useQuiz());
    act(() => { result.current.startQuiz("easy"); });

    // Advance through all 5 questions
    for (let i = 0; i < 5; i++) {
      act(() => { result.current.nextQuestion(); });
    }
    expect(result.current.isFinished).toBe(true);
  });

  it("calculates score correctly for all correct answers", () => {
    const { result } = renderHook(() => useQuiz());
    act(() => { result.current.startQuiz("easy"); });

    // Answer all questions correctly
    result.current.allQuestions.forEach((q) => {
      act(() => { result.current.answerQuestion(q.id, q.correctIndex); });
    });

    expect(result.current.calculateScore()).toBe(5);
  });

  it("calculates score correctly for all wrong answers", () => {
    const { result } = renderHook(() => useQuiz());
    act(() => { result.current.startQuiz("easy"); });

    // Answer all questions incorrectly
    result.current.allQuestions.forEach((q) => {
      const wrongIndex = (q.correctIndex + 1) % 4;
      act(() => { result.current.answerQuestion(q.id, wrongIndex); });
    });

    expect(result.current.calculateScore()).toBe(0);
  });

  it("resets quiz difficulty on reset", () => {
    const { result } = renderHook(() => useQuiz());
    act(() => { result.current.startQuiz("hard"); });
    act(() => { result.current.nextQuestion(); });
    act(() => { result.current.reset(); });

    expect(result.current.difficulty).toBeNull();
    // Index resets when startQuiz is called again, not on reset
    expect(result.current.isFinished).toBe(false);
  });

  it("returns all filtered questions matching difficulty", () => {
    const { result } = renderHook(() => useQuiz());
    act(() => { result.current.startQuiz("medium"); });

    const questions = result.current.allQuestions;
    expect(questions.length).toBe(5);
    questions.forEach((q) => {
      expect(q.difficulty).toBe("medium");
    });
  });

  it("clears selected answers on restart", () => {
    const { result } = renderHook(() => useQuiz());
    act(() => { result.current.startQuiz("easy"); });
    act(() => { result.current.answerQuestion(1, 0); });
    act(() => { result.current.startQuiz("easy"); });

    expect(Object.keys(result.current.selectedAnswers).length).toBe(0);
  });
});
