import { describe, it, expect } from 'vitest';
import { timelineSteps } from '@/data/timeline';

describe('Timeline Data Integrity', () => {
  it('should have exactly 12 timeline steps', () => {
    expect(timelineSteps).toHaveLength(12);
  });

  it('each step should have all required fields', () => {
    timelineSteps.forEach(step => {
      expect(step.id).toBeDefined();
      expect(step.title).toBeTruthy();
      expect(step.subtitle).toBeTruthy();
      expect(step.icon).toBeTruthy();
      expect(step.description).toBeTruthy();
      expect(step.keyFacts.length).toBeGreaterThan(0);
      expect(step.constitutionalBasis).toBeTruthy();
      expect(step.duration).toBeTruthy();
      expect(step.funFact).toBeTruthy();
      expect(step.phase).toBeTruthy();
    });
  });

  it('steps should be in sequential order by id', () => {
    for (let i = 0; i < timelineSteps.length; i++) {
      expect(timelineSteps[i].id).toBe(i + 1);
    }
  });

  it('should have steps from all three phases', () => {
    const phases = new Set(timelineSteps.map(s => s.phase));
    expect(phases.has('pre-election')).toBe(true);
    expect(phases.has('election')).toBe(true);
    expect(phases.has('post-election')).toBe(true);
  });

  it('each step should have at least 3 key facts', () => {
    timelineSteps.forEach(step => {
      expect(step.keyFacts.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('first step should be Delimitation and last should be Government Formation', () => {
    expect(timelineSteps[0].title).toContain('Delimitation');
    expect(timelineSteps[11].title).toContain('Government Formation');
  });

  it('description should be at least 100 characters for each step', () => {
    timelineSteps.forEach(step => {
      expect(step.description.length).toBeGreaterThan(100);
    });
  });
});
