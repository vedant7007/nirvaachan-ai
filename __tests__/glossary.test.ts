import { describe, it, expect } from 'vitest';
import { glossaryTerms } from '@/data/glossary';

describe('Glossary Data Integrity', () => {
  it('should have at least 50 glossary terms', () => {
    expect(glossaryTerms.length).toBeGreaterThanOrEqual(50);
  });

  it('every term should have term, fullForm, and definition', () => {
    glossaryTerms.forEach(term => {
      expect(term.term).toBeTruthy();
      expect(term.fullForm).toBeTruthy();
      expect(term.definition).toBeTruthy();
    });
  });

  it('every definition should be at least 20 characters', () => {
    glossaryTerms.forEach(term => {
      expect(term.definition.length).toBeGreaterThanOrEqual(20);
    });
  });

  it('should include key election terms', () => {
    const terms = glossaryTerms.map(t => t.term.toLowerCase());
    expect(terms).toContain('evm');
    expect(terms).toContain('vvpat');
    expect(terms).toContain('nota');
    expect(terms).toContain('mcc');
    expect(terms).toContain('eci');
  });

  it('search filter should work on term field', () => {
    const searchTerm = 'evm';
    const results = glossaryTerms.filter(t =>
      t.term.toLowerCase().includes(searchTerm) ||
      t.fullForm.toLowerCase().includes(searchTerm) ||
      t.definition.toLowerCase().includes(searchTerm)
    );
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].term).toBe('EVM');
  });

  it('search filter should work on fullForm field', () => {
    const searchTerm = 'electronic voting';
    const results = glossaryTerms.filter(t =>
      t.fullForm.toLowerCase().includes(searchTerm)
    );
    expect(results.length).toBeGreaterThan(0);
  });

  it('should have no duplicate terms', () => {
    const terms = glossaryTerms.map(t => t.term);
    expect(new Set(terms).size).toBe(terms.length);
  });
});
