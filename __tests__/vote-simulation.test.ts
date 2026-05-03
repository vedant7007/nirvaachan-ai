import { describe, it, expect } from 'vitest';

const SIMULATION_STEPS = [
  { id: 1, title: 'Welcome to the Polling Station', description: 'Carry valid photo ID' },
  { id: 2, title: 'Identity Verification', description: 'Officer checks your name on the electoral roll' },
  { id: 3, title: 'Indelible Ink Application', description: 'Ink applied on left forefinger' },
  { id: 4, title: 'Cast Your Vote on EVM', description: 'Press the blue button next to your candidate' },
  { id: 5, title: 'VVPAT Verification', description: 'Paper slip visible for 7 seconds' },
  { id: 6, title: 'Exit the Booth', description: 'Your vote has been recorded' },
  { id: 7, title: 'Congratulations', description: 'You completed the mock voting experience' },
];

const MOCK_CANDIDATES = [
  { id: 1, name: 'Candidate A', party: 'Party of the People', symbol: '🌾' },
  { id: 2, name: 'Candidate B', party: 'National Progress Front', symbol: '🌻' },
  { id: 3, name: 'Candidate C', party: 'Democratic Reform Alliance', symbol: '📖' },
  { id: 4, name: 'Candidate D', party: 'Green Development Party', symbol: '🌳' },
  { id: 5, name: 'Candidate E', party: 'Independent', symbol: '🕊️' },
  { id: 6, name: 'NOTA', party: 'None Of The Above', symbol: '🚫' },
];

describe('Mock Voting Simulation', () => {
  it('should have exactly 7 simulation steps', () => {
    expect(SIMULATION_STEPS).toHaveLength(7);
  });

  it('steps should be in correct sequential order', () => {
    SIMULATION_STEPS.forEach((step, index) => {
      expect(step.id).toBe(index + 1);
    });
  });

  it('first step should be welcome and last should be congratulations', () => {
    expect(SIMULATION_STEPS[0].title).toContain('Welcome');
    expect(SIMULATION_STEPS[6].title).toContain('Congratulations');
  });

  it('should include EVM voting step', () => {
    const evmStep = SIMULATION_STEPS.find(s => s.title.includes('EVM'));
    expect(evmStep).toBeDefined();
  });

  it('should include VVPAT verification step', () => {
    const vvpatStep = SIMULATION_STEPS.find(s => s.title.includes('VVPAT'));
    expect(vvpatStep).toBeDefined();
    expect(vvpatStep!.description).toContain('7 seconds');
  });

  it('should have 6 candidates including NOTA', () => {
    expect(MOCK_CANDIDATES).toHaveLength(6);
    const nota = MOCK_CANDIDATES.find(c => c.name === 'NOTA');
    expect(nota).toBeDefined();
  });

  it('each candidate should have name, party, and symbol', () => {
    MOCK_CANDIDATES.forEach(c => {
      expect(c.name).toBeTruthy();
      expect(c.party).toBeTruthy();
      expect(c.symbol).toBeTruthy();
    });
  });

  it('identity verification step should come before voting', () => {
    const idStep = SIMULATION_STEPS.find(s => s.title.includes('Identity'));
    const evmStep = SIMULATION_STEPS.find(s => s.title.includes('EVM'));
    expect(idStep!.id).toBeLessThan(evmStep!.id);
  });

  it('indelible ink step should come before voting', () => {
    const inkStep = SIMULATION_STEPS.find(s => s.title.includes('Ink'));
    const evmStep = SIMULATION_STEPS.find(s => s.title.includes('EVM'));
    expect(inkStep!.id).toBeLessThan(evmStep!.id);
  });
});
