import { renderHook } from "@testing-library/react";
import { useInView } from "@/hooks/useInView";

// Mock IntersectionObserver
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();
const mockDisconnect = vi.fn();

let intersectionCallback: IntersectionObserverCallback;

beforeEach(() => {
  vi.clearAllMocks();

  global.IntersectionObserver = vi.fn((callback: IntersectionObserverCallback) => {
    intersectionCallback = callback;
    return {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
      root: null,
      rootMargin: "",
      thresholds: [],
      takeRecords: vi.fn(),
    };
  }) as unknown as typeof IntersectionObserver;
});

describe("useInView hook", () => {
  it("starts with isInView as false", () => {
    const { result } = renderHook(() => useInView());
    expect(result.current.isInView).toBe(false);
  });

  it("returns a ref object", () => {
    const { result } = renderHook(() => useInView());
    expect(result.current.ref).toBeDefined();
    expect(result.current.ref.current).toBeNull();
  });

  it("does not observe when ref has no element", () => {
    renderHook(() => useInView());
    // No DOM element attached to ref, so observer.observe should not be called
    expect(mockObserve).not.toHaveBeenCalled();
  });

  it("accepts custom threshold option without error", () => {
    expect(() => renderHook(() => useInView({ threshold: 0.5 }))).not.toThrow();
  });

  it("accepts rootMargin option without error", () => {
    expect(() => renderHook(() => useInView({ rootMargin: "10px" }))).not.toThrow();
  });
});
