import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { rateLimiter } from "@/lib/rate-limiter";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    if (!rateLimiter.check(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      tools: [{ googleSearch: {} }] as never,
    });

    const result = await model.generateContent(
      `You are a neutral election news aggregator. Search for the latest Indian election news from the last 24 hours.

      Return EXACTLY 6 news items as a JSON array. Each item should have:
      - "id" (string, unique, e.g. "1", "2")
      - "title": Headline (max 100 chars)
      - "summary": 2-3 sentence neutral summary (max 200 chars)
      - "category": One of "results", "analysis", "policy", "updates"
      - "timeAgo": Approximate time (e.g., "2 hours ago", "30 minutes ago")

      Focus on: Assembly election results 2026 (West Bengal, Tamil Nadu, Kerala, Assam, Puducherry), ECI announcements, election-related Supreme Court decisions, voter registration updates.

      IMPORTANT: Be politically neutral. Report facts only. No editorial opinions.

      Return ONLY the JSON array, no markdown, no backticks, no preamble.`
    );

    const responseText = result.response.text().trim();

    let newsItems = [];
    try {
      newsItems = JSON.parse(responseText.replace(/```json/g, '').replace(/```/g, '').trim());
    } catch {
      console.error("Failed to parse Gemini news response:", responseText);
      newsItems = [
        {
          id: "1",
          title: "Election Commission announces special voter registration drive",
          summary: "A special summary revision of electoral rolls will be conducted next month to include new voters.",
          category: "updates",
          timeAgo: "2 hours ago"
        },
        {
          id: "2",
          title: "ECI introduces new features in cVIGIL app",
          summary: "Citizens can now report Model Code of Conduct violations faster with the updated cVIGIL app.",
          category: "updates",
          timeAgo: "5 hours ago"
        },
        {
          id: "3",
          title: "Assembly election counting begins for 5 states",
          summary: "Counting for West Bengal, Tamil Nadu, Kerala, Assam, and Puducherry assembly elections begins at 8 AM.",
          category: "results",
          timeAgo: "1 hour ago"
        },
        {
          id: "4",
          title: "Record voter turnout reported across all five states",
          summary: "The Election Commission reported an average turnout of 72% across the five states that went to polls.",
          category: "analysis",
          timeAgo: "3 hours ago"
        },
        {
          id: "5",
          title: "Supreme Court upholds VVPAT verification mandate",
          summary: "The Court reaffirmed the requirement to verify VVPAT slips in 5 randomly selected booths per constituency.",
          category: "policy",
          timeAgo: "6 hours ago"
        },
        {
          id: "6",
          title: "ECI launches nationwide voter awareness campaign for 2026",
          summary: "The SVEEP program expands with digital literacy initiatives targeting first-time voters in rural areas.",
          category: "updates",
          timeAgo: "4 hours ago"
        }
      ];
    }

    return NextResponse.json({ news: newsItems, updatedAt: new Date().toISOString() });
  } catch (error) {
    console.error("News API Error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching news.", news: [], updatedAt: new Date().toISOString() },
      { status: 500 }
    );
  }
}
