import { NextResponse } from "next/server";
import { model } from "@/lib/gemini";
import { rateLimiter } from "@/lib/rate-limiter";

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
    
    let data;
    try {
      data = JSON.parse(responseText.replace(/```json/g, '').replace(/```/g, '').trim());
    } catch {
      console.error("Failed to parse Gemini constituency response:", responseText);
      // Fallback
      data = {
        state: "Unknown",
        constituency: "Unknown",
        representatives: [],
        upcomingElections: "Unknown",
        error: "Could not determine constituency from coordinates."
      };
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Constituency API Error:", error);
    return NextResponse.json(
      { error: "An error occurred while finding your constituency." },
      { status: 500 }
    );
  }
}
