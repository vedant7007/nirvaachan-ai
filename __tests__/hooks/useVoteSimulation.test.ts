import { renderHook, act } from "@testing-library/react";
import { useVoteSimulation, CANDIDATES, STEP_LABELS, TOTAL_STEPS } from "@/hooks/useVoteSimulation";

describe("useVoteSimulation hook", () => {
  it("starts at step 0 with no voted candidate", () => {
    const { result } = renderHook(() => useVoteSimulation());
    expect(result.current.currentStep).toBe(0);
    expect(result.current.votedCandidate).toBeNull();
    expect(result.current.showConfetti).toBe(false);
  });

  it("advances to next step with goNext", () => {
    const { result } = renderHook(() => useVoteSimulation());
    act(() => { result.current.goNext(); });
    expect(result.current.currentStep).toBe(1);
  });

  it("advances through multiple steps", () => {
    const { result } = renderHook(() => useVoteSimulation());
    act(() => { result.current.goNext(); }); // 1
    act(() => { result.current.goNext(); }); // 2
    act(() => { result.current.goNext(); }); // 3
    expect(result.current.currentStep).toBe(3);
  });

  it("handles vote and jumps to VVPAT step", () => {
    const { result } = renderHook(() => useVoteSimulation());
    act(() => { result.current.handleVote(1); });
    expect(result.current.currentStep).toBe(4);
    expect(result.current.votedCandidate).toEqual(CANDIDATES[0]);
  });

  it("ignores vote for non-existent candidate", () => {
    const { result } = renderHook(() => useVoteSimulation());
    act(() => { result.current.handleVote(999); });
    expect(result.current.votedCandidate).toBeNull();
    expect(result.current.currentStep).toBe(0);
  });

  it("shows confetti at congratulations step", () => {
    const { result } = renderHook(() => useVoteSimulation());
    // Go through all steps: 0->1->2->3, vote->4, 4->5, 5->6
    act(() => { result.current.goNext(); }); // 1
    act(() => { result.current.goNext(); }); // 2
    act(() => { result.current.goNext(); }); // 3
    act(() => { result.current.handleVote(1); }); // 4
    act(() => { result.current.goNext(); }); // 5
    act(() => { result.current.goNext(); }); // 6 → confetti!
    expect(result.current.showConfetti).toBe(true);
    expect(result.current.currentStep).toBe(6);
  });

  it("resets all state correctly", () => {
    const { result } = renderHook(() => useVoteSimulation());
    act(() => { result.current.handleVote(3); });
    act(() => { result.current.goNext(); }); // 5
    act(() => { result.current.goNext(); }); // 6
    act(() => { result.current.handleReset(); });

    expect(result.current.currentStep).toBe(0);
    expect(result.current.votedCandidate).toBeNull();
    expect(result.current.showConfetti).toBe(false);
  });

  it("allows voting for NOTA", () => {
    const { result } = renderHook(() => useVoteSimulation());
    const nota = CANDIDATES.find((c) => c.name === "NOTA");
    expect(nota).toBeDefined();
    act(() => { result.current.handleVote(nota!.id); });
    expect(result.current.votedCandidate?.name).toBe("NOTA");
  });
});

describe("Vote simulation constants", () => {
  it("has 6 candidates including NOTA", () => {
    expect(CANDIDATES).toHaveLength(6);
    expect(CANDIDATES.some((c) => c.name === "NOTA")).toBe(true);
  });

  it("has 7 step labels", () => {
    expect(STEP_LABELS).toHaveLength(7);
    expect(TOTAL_STEPS).toBe(7);
  });

  it("starts with Welcome and ends with Done", () => {
    expect(STEP_LABELS[0]).toBe("Welcome");
    expect(STEP_LABELS[6]).toBe("Done");
  });

  it("all candidates have required fields", () => {
    CANDIDATES.forEach((c) => {
      expect(c.id).toBeGreaterThan(0);
      expect(c.name).toBeTruthy();
      expect(c.party).toBeTruthy();
      expect(c.symbol).toBeTruthy();
    });
  });

  it("candidate IDs are unique", () => {
    const ids = CANDIDATES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
