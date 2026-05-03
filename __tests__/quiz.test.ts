import { describe, it, expect } from 'vitest';
import { quizQuestions } from '@/data/quiz';

describe('Quiz Data Integrity', () => {
  it('should have exactly 15 questions', () => {
    expect(quizQuestions).toHaveLength(15);
  });

  it('should have 5 questions per difficulty level', () => {
    const easy = quizQuestions.filter(q => q.difficulty === 'easy');
    const medium = quizQuestions.filter(q => q.difficulty === 'medium');
    const hard = quizQuestions.filter(q => q.difficulty === 'hard');
    expect(easy).toHaveLength(5);
    expect(medium).toHaveLength(5);
    expect(hard).toHaveLength(5);
  });

  it('each question should have exactly 4 options', () => {
    quizQuestions.forEach(q => {
      expect(q.options).toHaveLength(4);
    });
  });

  it('correctIndex should be valid for each question', () => {
    quizQuestions.forEach(q => {
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(q.options.length);
    });
  });

  it('every question should have an explanation', () => {
    quizQuestions.forEach(q => {
      expect(q.explanation).toBeTruthy();
      expect(q.explanation.length).toBeGreaterThan(20);
    });
  });

  it('each question should have a unique id', () => {
    const ids = quizQuestions.map(q => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all questions should reference a valid timeline step', () => {
    quizQuestions.forEach(q => {
      if (q.relatedTimelineStep !== undefined) {
        expect(q.relatedTimelineStep).toBeGreaterThanOrEqual(1);
        expect(q.relatedTimelineStep).toBeLessThanOrEqual(12);
      }
    });
  });
});
