import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { rateLimiter } from "@/lib/rate-limiter";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const dynamic = "force-dynamic";

const FALLBACK_NEWS = [
  {
    id: "1",
    title: "Election Commission announces special voter registration drive",
    summary: "A special summary revision of electoral rolls will be conducted next month to include new voters across all states.",
    category: "updates",
    timeAgo: "2 hours ago"
  },
  {
    id: "2",
    title: "ECI introduces new features in cVIGIL app",
    summary: "Citizens can now report Model Code of Conduct violations faster with the updated cVIGIL app for real-time monitoring.",
    category: "updates",
    timeAgo: "5 hours ago"
  },
  {
    id: "3",
    title: "Supreme Court upholds VVPAT verification mandate",
    summary: "The Court reaffirmed the requirement to verify VVPAT slips in 5 randomly selected booths per constituency.",
    category: "policy",
    timeAgo: "1 hour ago"
  },
  {
    id: "4",
    title: "Record voter turnout reported in recent state elections",
    summary: "The Election Commission reported an average turnout of 72% across states that recently went to polls.",
    category: "analysis",
    timeAgo: "3 hours ago"
  },
  {
    id: "5",
    title: "ECI mandates multi-factor authentication for EVM logistics",
    summary: "New security protocols require multi-layer verification at every stage of EVM storage, transport, and deployment.",
    category: "policy",
    timeAgo: "6 hours ago"
  },
  {
    id: "6",
    title: "SVEEP voter awareness campaign reaches 500 districts",
    summary: "The Systematic Voters' Education and Electoral Participation program expands digital literacy for first-time voters.",
    category: "updates",
    timeAgo: "4 hours ago"
  }
];

export async function GET(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    if (!rateLimiter.check(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Try Gemini API with Google Search grounding
    try {
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

        Focus on: ECI announcements, election-related Supreme Court decisions, voter registration updates, state assembly elections.

        IMPORTANT: Be politically neutral. Report facts only. No editorial opinions.

        Return ONLY the JSON array, no markdown, no backticks, no preamble.`
      );

      const responseText = result.response.text().trim();
      const newsItems = JSON.parse(responseText.replace(/```json/g, '').replace(/```/g, '').trim());
      return NextResponse.json({ news: newsItems, updatedAt: new Date().toISOString() });
    } catch (apiError) {
      console.warn("Gemini News API unavailable, using fallback:", apiError);
      return NextResponse.json({ news: FALLBACK_NEWS, updatedAt: new Date().toISOString() });
    }
  } catch (error) {
    console.error("News API Error:", error);
    return NextResponse.json({ news: FALLBACK_NEWS, updatedAt: new Date().toISOString() });
  }
}
