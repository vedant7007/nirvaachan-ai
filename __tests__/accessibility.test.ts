import { describe, it, expect } from 'vitest';
import { timelineSteps } from '@/data/timeline';
import { quizQuestions } from '@/data/quiz';
import { voterRights } from '@/data/rights';
import { glossaryTerms } from '@/data/glossary';

describe('Accessibility — Content Structure', () => {
  it('timeline steps should have descriptive titles for screen readers', () => {
    timelineSteps.forEach(step => {
      expect(step.title.length).toBeGreaterThan(5);
      expect(step.subtitle.length).toBeGreaterThan(5);
    });
  });

  it('quiz questions should be readable text (not just codes)', () => {
    quizQuestions.forEach(q => {
      expect(q.question.length).toBeGreaterThan(20);
      expect(q.question.endsWith('?')).toBe(true);
    });
  });

  it('quiz options should be distinguishable text', () => {
    quizQuestions.forEach(q => {
      q.options.forEach(opt => {
        expect(opt.length).toBeGreaterThan(2);
      });
      const unique = new Set(q.options);
      expect(unique.size).toBe(q.options.length);
    });
  });

  it('voter rights should have article references for credibility', () => {
    voterRights.forEach(right => {
      expect(right.article).toBeTruthy();
      expect(right.article.length).toBeGreaterThan(3);
    });
  });

  it('glossary definitions should be understandable (min length)', () => {
    glossaryTerms.forEach(term => {
      expect(term.definition.length).toBeGreaterThan(30);
    });
  });

  it('all glossary terms should have full forms for screen reader clarity', () => {
    glossaryTerms.forEach(term => {
      expect(term.fullForm).toBeTruthy();
    });
  });
});

describe('Accessibility — Keyboard Navigation Data', () => {
  it('timeline phases should be filterable (pre-election, election, post-election)', () => {
    const phases = ['pre-election', 'election', 'post-election'] as const;
    phases.forEach(phase => {
      const filtered = timelineSteps.filter(s => s.phase === phase);
      expect(filtered.length).toBeGreaterThan(0);
    });
  });

  it('quiz difficulty levels should be selectable', () => {
    const difficulties = ['easy', 'medium', 'hard'] as const;
    difficulties.forEach(diff => {
      const filtered = quizQuestions.filter(q => q.difficulty === diff);
      expect(filtered).toHaveLength(5);
    });
  });
});
