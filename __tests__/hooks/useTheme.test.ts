import { renderHook, act } from "@testing-library/react";
import { useTheme } from "@/hooks/useTheme";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Mock matchMedia
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

describe("useTheme hook", () => {
  beforeEach(() => {
    localStorageMock.clear();
    mockMatchMedia(false);
    document.documentElement.classList.remove("dark");
  });

  it("defaults to light theme", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("light");
  });

  it("reads stored theme from localStorage", () => {
    localStorageMock.setItem("theme", "dark");
    const { result } = renderHook(() => useTheme());
    // After useEffect runs
    expect(result.current.theme).toBe("dark");
  });

  it("toggles from light to dark", () => {
    const { result } = renderHook(() => useTheme());
    act(() => { result.current.toggleTheme(); });
    expect(result.current.theme).toBe("dark");
  });

  it("toggles from dark back to light", () => {
    const { result } = renderHook(() => useTheme());
    act(() => { result.current.toggleTheme(); });
    act(() => { result.current.toggleTheme(); });
    expect(result.current.theme).toBe("light");
  });

  it("persists theme choice to localStorage", () => {
    const { result } = renderHook(() => useTheme());
    act(() => { result.current.toggleTheme(); });
    expect(localStorageMock.getItem("theme")).toBe("dark");
  });

  it("applies dark class to document root", () => {
    const { result } = renderHook(() => useTheme());
    act(() => { result.current.toggleTheme(); });
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("removes dark class when switching to light", () => {
    const { result } = renderHook(() => useTheme());
    act(() => { result.current.toggleTheme(); }); // dark
    act(() => { result.current.toggleTheme(); }); // light
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("returns a stable toggleTheme function", () => {
    const { result, rerender } = renderHook(() => useTheme());
    const firstToggle = result.current.toggleTheme;
    rerender();
    expect(result.current.toggleTheme).toBe(firstToggle);
  });
});
