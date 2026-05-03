import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';
import { suggestedQuestions } from '@/data/suggested-questions';
import { voterRights } from '@/data/rights';
import { statesData } from '@/data/states';

describe('UI Component Data — Button cn() utility', () => {
  it('should merge class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should filter out falsy values', () => {
    expect(cn('foo', undefined, null, false, 'bar')).toBe('foo bar');
  });

  it('should return empty string for no inputs', () => {
    expect(cn()).toBe('');
  });
});

describe('Suggested Questions', () => {
  it('should have exactly 12 suggested questions', () => {
    expect(suggestedQuestions).toHaveLength(12);
  });

  it('every question should be a non-empty string', () => {
    suggestedQuestions.forEach(q => {
      expect(typeof q).toBe('string');
      expect(q.length).toBeGreaterThan(0);
    });
  });

  it('should include at least one Hindi question', () => {
    const hasHindi = suggestedQuestions.some(q => /kya|kaise|hai/.test(q.toLowerCase()));
    expect(hasHindi).toBe(true);
  });
});

describe('Voter Rights Data', () => {
  it('should have exactly 8 voter rights', () => {
    expect(voterRights).toHaveLength(8);
  });

  it('every right should have title, article, description, and icon', () => {
    voterRights.forEach(right => {
      expect(right.title).toBeTruthy();
      expect(right.article).toBeTruthy();
      expect(right.description).toBeTruthy();
      expect(right.icon).toBeTruthy();
    });
  });
});

describe('States Data', () => {
  it('should have 36 states and UTs', () => {
    expect(statesData).toHaveLength(36);
  });

  it('every state should have required fields', () => {
    statesData.forEach(state => {
      expect(state.name).toBeTruthy();
      expect(state.code).toBeTruthy();
      expect(state.lokSabhaSeats).toBeGreaterThan(0);
      expect(state.capital).toBeTruthy();
    });
  });

  it('should include major states', () => {
    const codes = statesData.map(s => s.code);
    expect(codes).toContain('UP');
    expect(codes).toContain('MH');
    expect(codes).toContain('TN');
    expect(codes).toContain('KA');
    expect(codes).toContain('WB');
  });
});
