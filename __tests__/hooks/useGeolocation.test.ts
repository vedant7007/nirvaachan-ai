import { renderHook, act } from "@testing-library/react";
import { useGeolocation } from "@/hooks/useGeolocation";

describe("useGeolocation hook", () => {
  const mockGetCurrentPosition = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(navigator, "geolocation", {
      writable: true,
      value: { getCurrentPosition: mockGetCurrentPosition },
    });
  });

  it("starts with null coordinates and not loading", () => {
    const { result } = renderHook(() => useGeolocation());
    expect(result.current.location.latitude).toBeNull();
    expect(result.current.location.longitude).toBeNull();
    expect(result.current.location.isLoading).toBe(false);
    expect(result.current.location.error).toBeNull();
  });

  it("sets loading state when getLocation is called", () => {
    mockGetCurrentPosition.mockImplementation(() => {}); // never resolves
    const { result } = renderHook(() => useGeolocation());
    act(() => { result.current.getLocation(); });
    expect(result.current.location.isLoading).toBe(true);
  });

  it("returns coordinates on successful geolocation", () => {
    mockGetCurrentPosition.mockImplementation((success: PositionCallback) => {
      success({
        coords: { latitude: 28.6139, longitude: 77.209, accuracy: 10 },
        timestamp: Date.now(),
      } as GeolocationPosition);
    });

    const { result } = renderHook(() => useGeolocation());
    act(() => { result.current.getLocation(); });

    expect(result.current.location.latitude).toBe(28.6139);
    expect(result.current.location.longitude).toBe(77.209);
    expect(result.current.location.isLoading).toBe(false);
    expect(result.current.location.error).toBeNull();
  });

  it("handles permission denied error", () => {
    mockGetCurrentPosition.mockImplementation((_: PositionCallback, error: PositionErrorCallback) => {
      error({
        code: 1, // PERMISSION_DENIED
        message: "User denied",
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      } as GeolocationPositionError);
    });

    const { result } = renderHook(() => useGeolocation());
    act(() => { result.current.getLocation(); });

    expect(result.current.location.error).toContain("denied");
    expect(result.current.location.isLoading).toBe(false);
  });

  it("handles position unavailable error", () => {
    mockGetCurrentPosition.mockImplementation((_: PositionCallback, error: PositionErrorCallback) => {
      error({
        code: 2, // POSITION_UNAVAILABLE
        message: "Position unavailable",
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      } as GeolocationPositionError);
    });

    const { result } = renderHook(() => useGeolocation());
    act(() => { result.current.getLocation(); });

    expect(result.current.location.error).toContain("unavailable");
    expect(result.current.location.isLoading).toBe(false);
  });

  it("handles timeout error", () => {
    mockGetCurrentPosition.mockImplementation((_: PositionCallback, error: PositionErrorCallback) => {
      error({
        code: 3, // TIMEOUT
        message: "Timeout",
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      } as GeolocationPositionError);
    });

    const { result } = renderHook(() => useGeolocation());
    act(() => { result.current.getLocation(); });

    expect(result.current.location.error).toContain("timed out");
    expect(result.current.location.isLoading).toBe(false);
  });

  it("handles missing geolocation API", () => {
    Object.defineProperty(navigator, "geolocation", {
      writable: true,
      value: undefined,
    });

    const { result } = renderHook(() => useGeolocation());
    act(() => { result.current.getLocation(); });

    expect(result.current.location.error).toContain("not supported");
    expect(result.current.location.isLoading).toBe(false);
  });

  it("returns a stable getLocation function", () => {
    const { result, rerender } = renderHook(() => useGeolocation());
    const firstGetLocation = result.current.getLocation;
    rerender();
    expect(result.current.getLocation).toBe(firstGetLocation);
  });
});
