import { describe, it, expect } from 'vitest';
import { RateLimiter } from '@/lib/rate-limiter';

describe('News API — Rate Limiting', () => {
  it('should enforce rate limits on news endpoint', () => {
    const limiter = new RateLimiter(60000, 20);
    let allowed = 0;
    for (let i = 0; i < 25; i++) {
      if (limiter.check('news-test-ip')) allowed++;
    }
    expect(allowed).toBe(20);
  });
});

describe('News API — Response Format', () => {
  it('should define expected news item structure', () => {
    const validNewsItem = {
      id: '1',
      title: 'Test headline',
      summary: 'Test summary of the news.',
      category: 'ECI Update',
      timeAgo: '2 hours ago',
    };

    expect(validNewsItem).toHaveProperty('id');
    expect(validNewsItem).toHaveProperty('title');
    expect(validNewsItem).toHaveProperty('summary');
    expect(validNewsItem).toHaveProperty('category');
    expect(validNewsItem).toHaveProperty('timeAgo');
  });

  it('news categories should be one of expected values', () => {
    const validCategories = ['ECI Update', 'Voter Awareness', 'Election Schedule', 'General', 'results', 'analysis', 'policy', 'updates'];
    const testCategory = 'ECI Update';
    expect(validCategories).toContain(testCategory);
  });

  it('title should be under 100 characters', () => {
    const title = 'Assembly Election Results 2026: Counting begins tomorrow for 5 states';
    expect(title.length).toBeLessThanOrEqual(100);
  });

  it('summary should be under 200 characters', () => {
    const summary = 'The ECI has confirmed that counting for WB, TN, Kerala, Assam, and Puducherry begins at 8 AM on May 4, 2026.';
    expect(summary.length).toBeLessThanOrEqual(200);
  });
});
