import { NextResponse } from "next/server";
import { model } from "@/lib/gemini";
import { rateLimiter } from "@/lib/rate-limiter";
import { guessStateFromCoords, isValidCoordinates } from "@/lib/constituency-lookup";

export const dynamic = "force-dynamic";

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

    if (!isValidCoordinates(lat, lng)) {
      return NextResponse.json({ error: "Invalid coordinates provided." }, { status: 400 });
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
