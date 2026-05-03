import { NextResponse } from "next/server";
import { model, SYSTEM_PROMPT } from "@/lib/gemini";
import { rateLimiter } from "@/lib/rate-limiter";
import { sanitizeInput } from "@/lib/sanitize";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    if (!rateLimiter.check(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // 2. Parse and Sanitize Input
    const body = await req.json();
    const { message, history } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const sanitizedMessage = sanitizeInput(message);

    // 3. Prepare Chat History
    const chatHistory = history ? history.map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    })) : [];

    // 4. Start Chat Session with Gemini
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I will strictly follow these rules and act as NirvaachanAI." }],
        },
        ...chatHistory,
      ],
    });

    // 5. Send Message and Get Response
    const result = await chat.sendMessage(sanitizedMessage);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
