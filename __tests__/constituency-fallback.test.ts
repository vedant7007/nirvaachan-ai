import { guessStateFromCoords, isValidCoordinates, REGION_COUNT } from "@/lib/constituency-lookup";

describe("Constituency coordinate lookup", () => {
  it("identifies Delhi from coordinates", () => {
    const result = guessStateFromCoords(28.6139, 77.209);
    expect(result).not.toBeNull();
    expect(result!.state).toBe("Delhi");
    expect(result!.constituency).toBe("New Delhi");
  });

  it("identifies Mumbai from coordinates", () => {
    const result = guessStateFromCoords(19.076, 72.877);
    expect(result).not.toBeNull();
    expect(result!.state).toBe("Maharashtra");
    expect(result!.constituency).toContain("Mumbai");
  });

  it("identifies Bengaluru from coordinates", () => {
    const result = guessStateFromCoords(12.9716, 77.5946);
    expect(result).not.toBeNull();
    expect(result!.state).toBe("Karnataka");
  });

  it("identifies Chennai from coordinates", () => {
    const result = guessStateFromCoords(13.0827, 80.2707);
    expect(result).not.toBeNull();
    expect(result!.state).toBe("Tamil Nadu");
  });

  it("identifies Hyderabad from coordinates", () => {
    const result = guessStateFromCoords(17.385, 78.4867);
    expect(result).not.toBeNull();
    expect(result!.state).toBe("Telangana");
  });

  it("identifies Kolkata from coordinates", () => {
    const result = guessStateFromCoords(22.5726, 88.3639);
    expect(result).not.toBeNull();
    expect(result!.state).toBe("West Bengal");
  });

  it("identifies Lucknow from coordinates", () => {
    const result = guessStateFromCoords(26.8467, 80.9462);
    expect(result).not.toBeNull();
    expect(result!.state).toBe("Uttar Pradesh");
  });

  it("identifies Ahmedabad from coordinates", () => {
    const result = guessStateFromCoords(23.0225, 72.5714);
    expect(result).not.toBeNull();
    expect(result!.state).toBe("Gujarat");
  });

  it("identifies Jaipur from coordinates", () => {
    const result = guessStateFromCoords(26.9124, 75.7873);
    expect(result).not.toBeNull();
    expect(result!.state).toBe("Rajasthan");
  });

  it("returns generic India fallback for unknown Indian coordinates", () => {
    // Random coordinates within India but not matching any specific region
    const result = guessStateFromCoords(20.0, 80.0);
    expect(result).not.toBeNull();
    expect(result!.state).toBe("India");
    expect(result!.constituency).toContain("manual selection");
  });

  it("returns null for coordinates outside India", () => {
    expect(guessStateFromCoords(51.5074, -0.1278)).toBeNull(); // London
    expect(guessStateFromCoords(40.7128, -74.006)).toBeNull(); // New York
    expect(guessStateFromCoords(-33.8688, 151.2093)).toBeNull(); // Sydney
  });

  it("returns null for extreme coordinates", () => {
    expect(guessStateFromCoords(90, 180)).toBeNull();
    expect(guessStateFromCoords(-90, -180)).toBeNull();
  });

  it("has defined regions covering major Indian cities", () => {
    expect(REGION_COUNT).toBeGreaterThanOrEqual(25);
  });
});

describe("Coordinate validation", () => {
  it("validates correct coordinates", () => {
    expect(isValidCoordinates(28.6, 77.2)).toBe(true);
    expect(isValidCoordinates(0, 0)).toBe(true);
    expect(isValidCoordinates(-90, -180)).toBe(true);
    expect(isValidCoordinates(90, 180)).toBe(true);
  });

  it("rejects invalid latitude", () => {
    expect(isValidCoordinates(91, 77.2)).toBe(false);
    expect(isValidCoordinates(-91, 77.2)).toBe(false);
  });

  it("rejects invalid longitude", () => {
    expect(isValidCoordinates(28.6, 181)).toBe(false);
    expect(isValidCoordinates(28.6, -181)).toBe(false);
  });
});
