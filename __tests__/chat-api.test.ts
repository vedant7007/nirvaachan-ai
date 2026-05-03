import { describe, it, expect } from 'vitest';
import { sanitizeInput } from '@/lib/sanitize';
import { RateLimiter } from '@/lib/rate-limiter';
import { SYSTEM_PROMPT } from '@/lib/gemini';

describe('Chat API — Input Sanitization', () => {
  it('should strip HTML tags from input', () => {
    const result = sanitizeInput('<script>alert("xss")</script>Hello');
    expect(result).not.toContain('<script>');
    expect(result).toContain('Hello');
  });

  it('should return empty string for empty input', () => {
    expect(sanitizeInput('')).toBe('');
  });

  it('should return empty string for null/undefined input', () => {
    expect(sanitizeInput(null as unknown as string)).toBe('');
    expect(sanitizeInput(undefined as unknown as string)).toBe('');
  });

  it('should trim whitespace', () => {
    const result = sanitizeInput('  Hello World  ');
    expect(result).toBe('Hello World');
  });

  it('should remove dangerous HTML attributes', () => {
    const result = sanitizeInput('<div onload="alert(1)">Text</div>');
    expect(result).not.toContain('onload');
  });
});

describe('Chat API — Rate Limiting', () => {
  it('should allow requests within the limit', () => {
    const limiter = new RateLimiter(60000, 5);
    for (let i = 0; i < 5; i++) {
      expect(limiter.check('test-ip')).toBe(true);
    }
  });

  it('should block requests exceeding the limit', () => {
    const limiter = new RateLimiter(60000, 3);
    limiter.check('test-ip');
    limiter.check('test-ip');
    limiter.check('test-ip');
    expect(limiter.check('test-ip')).toBe(false);
  });

  it('should track different IPs separately', () => {
    const limiter = new RateLimiter(60000, 1);
    expect(limiter.check('ip-1')).toBe(true);
    expect(limiter.check('ip-2')).toBe(true);
    expect(limiter.check('ip-1')).toBe(false);
  });
});

describe('Chat API — System Prompt', () => {
  it('should include election-related instructions', () => {
    expect(SYSTEM_PROMPT).toContain('election');
  });

  it('should include neutrality requirement', () => {
    expect(SYSTEM_PROMPT.toLowerCase()).toContain('neutral');
  });

  it('should instruct refusal for political party questions', () => {
    expect(SYSTEM_PROMPT).toContain('political part');
  });
});
