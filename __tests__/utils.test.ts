import { describe, it, expect } from 'vitest';
import { cn, formatDate } from '@/lib/utils';

describe('cn() — Class Name Utility', () => {
  it('should join class names with space', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c');
  });

  it('should filter out undefined values', () => {
    expect(cn('a', undefined, 'b')).toBe('a b');
  });

  it('should filter out null values', () => {
    expect(cn('a', null, 'b')).toBe('a b');
  });

  it('should filter out false values', () => {
    expect(cn('a', false, 'b')).toBe('a b');
  });

  it('should return empty string for all falsy', () => {
    expect(cn(undefined, null, false)).toBe('');
  });

  it('should handle single class', () => {
    expect(cn('solo')).toBe('solo');
  });
});

describe('formatDate()', () => {
  it('should format a date string', () => {
    const result = formatDate('2024-03-16');
    expect(result).toContain('March');
    expect(result).toContain('16');
    expect(result).toContain('2024');
  });

  it('should format another date correctly', () => {
    const result = formatDate('2026-05-04');
    expect(result).toContain('May');
    expect(result).toContain('4');
    expect(result).toContain('2026');
  });
});
