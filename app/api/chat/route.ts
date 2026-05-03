import { NextResponse } from "next/server";
import { model, SYSTEM_PROMPT } from "@/lib/gemini";
import { rateLimiter } from "@/lib/rate-limiter";

export const dynamic = "force-dynamic";

// Simple server-safe sanitizer (no jsdom dependency)
function sanitize(input: string): string {
  if (!input) return "";
  return input.replace(/<[^>]*>/g, "").trim();
}

// Knowledge base for offline fallback when Gemini API is unavailable
const FALLBACK_RESPONSES: Record<string, string> = {
  evm: `## Electronic Voting Machine (EVM)

An **EVM** is an electronic device used for casting votes in Indian elections. Key facts:

- **Introduced**: First used in 1982 in Kerala (Parur Assembly constituency)
- **Nationwide use**: Since 2004 general elections
- **Components**: Control Unit (with presiding officer) + Ballot Unit (in voting compartment)
- **Capacity**: Can record up to 2,000 votes and accommodate up to 64 candidates
- **Power**: Runs on a 7.5V battery — no electricity needed
- **Security**: Standalone machine, not connected to any network or internet
- **Manufacturer**: Bharat Electronics Limited (BEL) and Electronics Corporation of India Limited (ECIL)

Since 2017, **VVPAT** (Voter Verifiable Paper Audit Trail) is attached to every EVM for verification.`,

  vvpat: `## VVPAT (Voter Verifiable Paper Audit Trail)

**VVPAT** is a device attached to EVMs that provides a paper receipt of the vote cast.

- **Purpose**: Allows voters to verify their vote was recorded correctly
- **Display time**: The paper slip is visible for **7 seconds** through a transparent window
- **Introduced**: Mandatory since 2017 for all elections
- **Supreme Court ruling**: In 2019, the SC ordered VVPAT verification in 5 randomly selected booths per constituency
- **How it works**: After pressing the EVM button, a printed slip shows the candidate name, party symbol, and serial number`,

  "voter id": `## Voter ID Card (EPIC)

The **Electors Photo Identity Card (EPIC)** is issued by the Election Commission of India.

### How to apply:
1. **Online**: Visit [nvsp.in](https://www.nvsp.in) → Fill **Form 6**
2. **Offline**: Visit your nearest Electoral Registration Office
3. **Documents needed**: Proof of age, address proof, passport-size photo

### Key details:
- Minimum age: **18 years** (as of January 1 of the qualifying year)
- You can also use 12 alternative IDs to vote (Aadhaar, Passport, PAN card, etc.)
- Check your name on the voter list at [electoralsearch.eci.gov.in](https://electoralsearch.eci.gov.in)`,

  nota: `## NOTA (None Of The Above)

**NOTA** allows voters to reject all candidates in an election.

- **Introduced**: 2013, after Supreme Court ruling in *PUCL vs Union of India*
- **Symbol**: A ballot paper with a cross mark ✗
- **Effect**: NOTA votes are counted but do **not** affect the result — the candidate with the most votes wins regardless of NOTA count
- **Purpose**: Gives voters the right to express dissatisfaction with all candidates
- **Usage**: Available in both Lok Sabha and State Assembly elections`,

  "how to vote": `## How to Vote in Indian Elections

### Step-by-step process:
1. **Check voter list** — Verify your name at [electoralsearch.eci.gov.in](https://electoralsearch.eci.gov.in)
2. **Go to polling booth** — On election day, visit your assigned booth (mentioned on voter slip)
3. **Identity verification** — Show your Voter ID or any of 12 approved photo IDs
4. **Indelible ink** — Your left index finger is marked with ink to prevent re-voting
5. **Enter voting compartment** — An official guides you to the EVM
6. **Cast your vote** — Press the button next to your chosen candidate on the Ballot Unit
7. **Verify via VVPAT** — Check the paper slip shown for 7 seconds
8. **Exit** — Leave the polling booth

### Important rules:
- Voting hours: Usually **7 AM to 6 PM**
- Voting is **not compulsory** but is a fundamental right
- **Secrecy of vote** is guaranteed by law`,

  eci: `## Election Commission of India (ECI)

The **ECI** is an autonomous constitutional body responsible for administering elections in India.

- **Established**: 25 January 1950 (celebrated as National Voters' Day)
- **Article**: Set up under **Article 324** of the Constitution
- **Composition**: Chief Election Commissioner + 2 Election Commissioners
- **Headquarters**: Nirvachan Sadan, New Delhi
- **Functions**:
  - Conduct free and fair elections (Lok Sabha, Rajya Sabha, State Assemblies, President, Vice President)
  - Prepare and update electoral rolls
  - Enforce Model Code of Conduct
  - Register and monitor political parties
  - Decide election schedules and resolve disputes`,

  mcc: `## Model Code of Conduct (MCC)

The **MCC** is a set of guidelines issued by the Election Commission for political parties and candidates during elections.

### Key rules:
- **No hate speech** or appeals to caste/religion for votes
- **No government resources** for campaign purposes
- **No announcements** of new schemes/projects after MCC is in effect
- **No bribing voters** with money, liquor, or gifts
- **Campaign silence**: 48 hours before polling ends (no campaigning)
- **Permission needed** for rallies, processions, and loudspeakers

### When does it apply?
- From the **date of announcement** of elections until results are declared
- Applies to the **ruling party**, opposition, and all candidates equally

### Enforcement:
- Through **cVIGIL app** — citizens can report violations
- Flying squads and surveillance teams monitor compliance`,

  default: `Thank you for your question about Indian elections! I'm NirvaachanAI, your guide to understanding India's democratic process.

I can help you with topics like:
- **EVM & VVPAT** — How voting machines work
- **Voter Registration** — How to get your Voter ID (Form 6)
- **Election Process** — The 12-step journey from delimitation to government formation
- **Your Rights** — Fundamental voting rights under the Constitution
- **ECI** — The Election Commission and its role
- **NOTA** — The "None of the Above" option
- **Model Code of Conduct** — Rules during election season

Please ask about any of these topics and I'll provide detailed, factual information based on official ECI guidelines!`
};

function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("evm") || lower.includes("voting machine")) return FALLBACK_RESPONSES.evm;
  if (lower.includes("vvpat") || lower.includes("paper trail") || lower.includes("paper audit")) return FALLBACK_RESPONSES.vvpat;
  if (lower.includes("voter id") || lower.includes("epic") || lower.includes("voter card") || lower.includes("form 6") || lower.includes("voter list")) return FALLBACK_RESPONSES["voter id"];
  if (lower.includes("nota") || lower.includes("none of the above")) return FALLBACK_RESPONSES.nota;
  if (lower.includes("how to vote") || lower.includes("how do i vote") || lower.includes("voting process") || lower.includes("cast my vote") || lower.includes("polling booth") || lower.includes("vote kaise")) return FALLBACK_RESPONSES["how to vote"];
  if (lower.includes("eci") || lower.includes("election commission")) return FALLBACK_RESPONSES.eci;
  if (lower.includes("mcc") || lower.includes("model code") || lower.includes("code of conduct")) return FALLBACK_RESPONSES.mcc;
  return FALLBACK_RESPONSES.default;
}

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

    const sanitizedMessage = sanitize(message);

    // 3. Try Gemini API first, fall back to knowledge base
    try {
      const chatHistory = history ? history.map((msg: { role: string; content: string }) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })) : [];

      const chat = model.startChat({
        history: [
          { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
          { role: "model", parts: [{ text: "Understood. I will strictly follow these rules and act as NirvaachanAI." }] },
          ...chatHistory,
        ],
      });

      const result = await chat.sendMessage(sanitizedMessage);
      const responseText = result.response.text();
      return NextResponse.json({ reply: responseText });
    } catch (apiError) {
      console.warn("Gemini API unavailable, using fallback:", apiError);
      const fallback = getFallbackResponse(sanitizedMessage);
      return NextResponse.json({ reply: fallback });
    }
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
