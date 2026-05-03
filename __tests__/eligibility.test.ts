import { describe, it, expect } from 'vitest';
import { checkEligibility } from '@/lib/eligibility';

describe('Voter Eligibility Checker', () => {
  it('should reject non-citizens', () => {
    const result = checkEligibility({ age: 25, isCitizen: false, isNRI: false, isDisqualified: false, isRegistered: false });
    expect(result.status).toBe('Not Eligible');
  });

  it('should reject voters under 18', () => {
    const result = checkEligibility({ age: 17, isCitizen: true, isNRI: false, isDisqualified: false, isRegistered: true });
    expect(result.status).toBe('Not Eligible Yet');
  });

  it('should reject disqualified voters', () => {
    const result = checkEligibility({ age: 30, isCitizen: true, isNRI: false, isDisqualified: true, isRegistered: true });
    expect(result.status).toBe('Disqualified');
  });

  it('should handle NRI voters', () => {
    const result = checkEligibility({ age: 30, isCitizen: true, isNRI: true, isDisqualified: false, isRegistered: false });
    expect(result.status).toBe('Eligible as Overseas Elector');
    expect(result.actionForm).toBe('Form 6A');
  });

  it('should guide unregistered eligible voters', () => {
    const result = checkEligibility({ age: 19, isCitizen: true, isNRI: false, isDisqualified: false, isRegistered: false });
    expect(result.status).toBe('Eligible to Register');
    expect(result.actionForm).toBe('Form 6');
  });

  it('should confirm fully registered voters', () => {
    const result = checkEligibility({ age: 22, isCitizen: true, isNRI: false, isDisqualified: false, isRegistered: true });
    expect(result.status).toBe('Fully Eligible to Vote');
  });

  it('should provide action links when registration is needed', () => {
    const result = checkEligibility({ age: 20, isCitizen: true, isNRI: false, isDisqualified: false, isRegistered: false });
    expect(result.actionLink).toBeTruthy();
  });

  it('should not have action form for ineligible voters', () => {
    const result = checkEligibility({ age: 15, isCitizen: true, isNRI: false, isDisqualified: false, isRegistered: false });
    expect(result.actionForm).toBeUndefined();
  });
});
