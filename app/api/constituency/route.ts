import { NextResponse } from "next/server";
import { model } from "@/lib/gemini";
import { rateLimiter } from "@/lib/rate-limiter";

export const dynamic = "force-dynamic";

// Approximate state lookup by lat/lng when Gemini is unavailable
function guessStateFromCoords(lat: number, lng: number): { state: string; constituency: string } | null {
  // Rough bounding boxes for major Indian states
  const regions = [
    { state: "Delhi", constituency: "New Delhi", latMin: 28.4, latMax: 28.9, lngMin: 76.8, lngMax: 77.4 },
    { state: "Maharashtra", constituency: "Mumbai North", latMin: 18.8, latMax: 19.3, lngMin: 72.7, lngMax: 73.0 },
    { state: "Maharashtra", constituency: "Pune", latMin: 18.3, latMax: 18.7, lngMin: 73.7, lngMax: 74.0 },
    { state: "Karnataka", constituency: "Bengaluru South", latMin: 12.7, latMax: 13.2, lngMin: 77.4, lngMax: 77.8 },
    { state: "Tamil Nadu", constituency: "Chennai South", latMin: 12.9, latMax: 13.2, lngMin: 80.1, lngMax: 80.4 },
    { state: "Telangana", constituency: "Hyderabad", latMin: 17.2, latMax: 17.6, lngMin: 78.3, lngMax: 78.6 },
    { state: "West Bengal", constituency: "Kolkata North", latMin: 22.4, latMax: 22.7, lngMin: 88.2, lngMax: 88.5 },
    { state: "Uttar Pradesh", constituency: "Lucknow", latMin: 26.7, latMax: 27.0, lngMin: 80.8, lngMax: 81.1 },
    { state: "Uttar Pradesh", constituency: "Varanasi", latMin: 25.2, latMax: 25.5, lngMin: 82.9, lngMax: 83.1 },
    { state: "Uttar Pradesh", constituency: "Noida (Gautam Buddha Nagar)", latMin: 28.4, latMax: 28.7, lngMin: 77.3, lngMax: 77.6 },
    { state: "Gujarat", constituency: "Ahmedabad East", latMin: 22.9, latMax: 23.2, lngMin: 72.4, lngMax: 72.7 },
    { state: "Rajasthan", constituency: "Jaipur", latMin: 26.7, latMax: 27.1, lngMin: 75.6, lngMax: 76.0 },
    { state: "Madhya Pradesh", constituency: "Bhopal", latMin: 23.1, latMax: 23.4, lngMin: 77.3, lngMax: 77.5 },
    { state: "Kerala", constituency: "Thiruvananthapuram", latMin: 8.3, latMax: 8.7, lngMin: 76.8, lngMax: 77.1 },
    { state: "Kerala", constituency: "Ernakulam", latMin: 9.8, latMax: 10.1, lngMin: 76.2, lngMax: 76.5 },
    { state: "Andhra Pradesh", constituency: "Visakhapatnam", latMin: 17.6, latMax: 17.9, lngMin: 83.1, lngMax: 83.4 },
    { state: "Punjab", constituency: "Amritsar", latMin: 31.5, latMax: 31.7, lngMin: 74.8, lngMax: 75.0 },
    { state: "Punjab", constituency: "Ludhiana", latMin: 30.8, latMax: 31.0, lngMin: 75.7, lngMax: 76.0 },
    { state: "Bihar", constituency: "Patna Sahib", latMin: 25.5, latMax: 25.7, lngMin: 85.0, lngMax: 85.3 },
    { state: "Odisha", constituency: "Bhubaneswar", latMin: 20.2, latMax: 20.4, lngMin: 85.7, lngMax: 86.0 },
    { state: "Assam", constituency: "Guwahati", latMin: 26.1, latMax: 26.3, lngMin: 91.6, lngMax: 91.9 },
    { state: "Jharkhand", constituency: "Ranchi", latMin: 23.3, latMax: 23.5, lngMin: 85.2, lngMax: 85.5 },
    { state: "Chhattisgarh", constituency: "Raipur", latMin: 21.2, latMax: 21.4, lngMin: 81.5, lngMax: 81.8 },
    { state: "Haryana", constituency: "Gurugram", latMin: 28.3, latMax: 28.6, lngMin: 76.9, lngMax: 77.2 },
    { state: "Uttarakhand", constituency: "Dehradun", latMin: 30.2, latMax: 30.5, lngMin: 77.9, lngMax: 78.2 },
    { state: "Himachal Pradesh", constituency: "Shimla", latMin: 31.0, latMax: 31.2, lngMin: 77.1, lngMax: 77.3 },
    { state: "Goa", constituency: "North Goa", latMin: 15.3, latMax: 15.6, lngMin: 73.7, lngMax: 74.0 },
    { state: "Jammu & Kashmir", constituency: "Srinagar", latMin: 33.9, latMax: 34.2, lngMin: 74.7, lngMax: 75.0 },
  ];

  for (const r of regions) {
    if (lat >= r.latMin && lat <= r.latMax && lng >= r.lngMin && lng <= r.lngMax) {
      return { state: r.state, constituency: r.constituency };
    }
  }

  // Broad state-level fallback
  if (lat >= 8 && lat <= 37 && lng >= 68 && lng <= 97) {
    return { state: "India", constituency: "Could not determine exact constituency. Please use manual selection." };
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    if (!rateLimiter.check(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { lat, lng } = body;

    if (!lat || !lng) {
      return NextResponse.json({ error: "Latitude and longitude are required." }, { status: 400 });
    }

    // Try Gemini API first
    try {
      const prompt = `
        Given the coordinates Latitude: ${lat}, Longitude: ${lng} in India, identify the approximate Lok Sabha constituency and State.
        If the coordinates are not in India, return an error message.
        Format the output STRICTLY as a JSON object with the following keys:
        - state (string)
        - constituency (string)
        - representatives (array of strings, e.g., ["MP Name (Party)"])
        - upcomingElections (string, e.g., "Lok Sabha 2029")
        - error (string, null if successful)

        Do NOT include any markdown formatting like \`\`\`json or \`\`\` in the response. Just the raw JSON object.
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text().trim();
      const data = JSON.parse(responseText.replace(/```json/g, '').replace(/```/g, '').trim());
      return NextResponse.json(data);
    } catch (apiError) {
      console.warn("Gemini Constituency API unavailable, using coordinate lookup:", apiError);

      const match = guessStateFromCoords(lat, lng);
      if (match) {
        return NextResponse.json({
          state: match.state,
          constituency: match.constituency,
          representatives: [],
          upcomingElections: "Lok Sabha 2029",
          error: null,
        });
      }

      return NextResponse.json({
        state: "Unknown",
        constituency: "Unknown",
        representatives: [],
        upcomingElections: "Unknown",
        error: "Could not determine constituency. Please use manual selection below.",
      });
    }
  } catch (error) {
    console.error("Constituency API Error:", error);
    return NextResponse.json(
      { error: "An error occurred. Please use manual selection below." },
      { status: 500 }
    );
  }
}
