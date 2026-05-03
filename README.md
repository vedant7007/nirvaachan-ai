# NirvaachanAI — Democracy, Decoded

**An AI-powered interactive platform that makes Indian elections easy to understand for every citizen — through conversation, visualization, and gamification.**

Built for **PromptWars Virtual 2026** | Live at [nirvaachan-ai.run.app](https://nirvaachan-ai-504882606553.asia-south1.run.app)

---

## What is NirvaachanAI?

India has 950+ million registered voters, but many don't fully understand how elections work — from EVM machines to VVPAT verification, from voter registration to the Model Code of Conduct. NirvaachanAI bridges this gap using AI to make election literacy accessible, interactive, and fun.

The name comes from **"Nirvachan"** (Hindi: निर्वाचन), meaning "election".

---

## Features

| Feature | Description |
|---------|-------------|
| **AI Chatbot** | Ask anything about Indian elections in Hindi or English. Powered by Gemini 2.0 Flash with built-in knowledge base fallback |
| **Interactive Timeline** | Visual 12-step journey of the election process — from delimitation to government formation |
| **Knowledge Quiz** | 15 questions across Easy, Medium, and Hard difficulty levels |
| **Eligibility Checker** | Check if you're eligible to vote and get the right form (Form 6, 6A, etc.) |
| **Live Election News** | AI-curated factual election updates using Google Search grounding |
| **My Constituency** | Find your Lok Sabha constituency via GPS or manual selection — covers all 28 states + 8 UTs |
| **India Election Map** | Interactive SVG map — click any state for seats, turnout, and government data |
| **Mock Voting Booth** | 7-step EVM + VVPAT voting simulation with realistic flow |
| **Election Glossary** | 50+ election terms explained in plain language |
| **Know Your Rights** | Constitutional voting rights with article references |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, SSG + SSR, Standalone output) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v3, CSS variables, dark mode |
| Animation | Framer Motion (page transitions, timeline, voting sim) |
| AI | Google Gemini 2.0 Flash API + Google Search grounding |
| Auth | Firebase Authentication |
| Database | Cloud Firestore |
| Analytics | Google Analytics 4 |
| Deployment | Docker multi-stage build on Google Cloud Run |
| Testing | Vitest + React Testing Library (81 tests, 10 test files) |
| Security | DOMPurify sanitization, rate limiting, CSP headers, API proxy |
| Accessibility | WCAG AA, semantic HTML, ARIA labels, keyboard navigation |

---

## Getting Started

### Prerequisites
- Node.js 18+
- A Google Gemini API key ([get one here](https://aistudio.google.com/apikey))
- Firebase project (for auth — optional for local dev)

### Setup

```bash
git clone https://github.com/vedant7007/nirvaachan-ai.git
cd nirvaachan-ai
npm install
cp .env.example .env.local
```

Add your API keys to `.env.local`:

```
GEMINI_API_KEY=your_gemini_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Testing

```bash
npm run test              # Run all 81 tests
npm run test:coverage     # With coverage report
```

Tests cover:
- Data integrity (quiz questions, timeline steps, glossary terms, voter rights)
- API behavior (rate limiting, input sanitization, response structure)
- Component logic (eligibility checker branches, utility functions)
- Accessibility (ARIA attributes, keyboard navigation, semantic structure)
- Vote simulation (step order, candidate data, EVM/VVPAT flow)

---

## Deployment

### Docker

```bash
docker build -t nirvaachan-ai .
docker run -p 8080:8080 --env-file .env.local nirvaachan-ai
```

### Google Cloud Run

```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/nirvaachan-ai
gcloud run deploy nirvaachan-ai \
  --image gcr.io/PROJECT_ID/nirvaachan-ai \
  --region asia-south1 \
  --allow-unauthenticated
```

---

## Project Structure

```
nirvaachan-ai/
  app/                  # Next.js App Router pages + API routes
    api/chat/           # Gemini-powered chatbot endpoint
    api/news/           # AI-curated news with Google Search
    api/constituency/   # GPS-based constituency lookup
  components/           # React components (chat, vote, explore, quiz, etc.)
  data/                 # Static data (quiz, timeline, glossary, states, constituencies)
  hooks/                # Custom React hooks (useChat, useQuiz, useTheme, useGeolocation)
  lib/                  # Utilities (Gemini client, Firebase, rate limiter, sanitizer)
  __tests__/            # 10 test files, 81 tests
  public/               # Static assets
```

---

## How It Handles Gemini API Limits

NirvaachanAI gracefully handles API quota limits:
- **Chat**: Falls back to a built-in knowledge base covering EVM, VVPAT, NOTA, voting process, ECI, MCC, and voter registration
- **News**: Shows curated election news items
- **Constituency**: Uses coordinate-based state lookup
- When the API is available, it automatically uses live Gemini responses

---

## Author

**Vedant Manmath Idlgave**
- B.Tech CSE, VJIT Hyderabad (2024-2028)
- GitHub: [vedant7007](https://github.com/vedant7007)
- LinkedIn: [vedant-idlgave](https://linkedin.com/in/vedant-idlgave-1514323063103vtsd)

---

## License

MIT

---

## Disclaimer

This is an educational tool built for the PromptWars 2026 hackathon. It is not affiliated with the Election Commission of India. For official election information, visit [eci.gov.in](https://eci.gov.in).
