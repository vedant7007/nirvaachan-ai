# NirvaachanAI — Democracy, Decoded

**An AI-powered interactive platform that makes Indian elections easy to understand for every citizen — through conversation, visualization, and gamification.**

Built for **PromptWars Virtual 2026** | Live at [nirvaachan-ai.run.app](https://nirvaachan-ai-504882606553.asia-south1.run.app)

---

## Chosen Vertical

**Civic Education & Democratic Literacy** — India has 950+ million registered voters, yet many citizens — especially first-time voters — don't fully understand the election process, their rights, or how EVMs work. NirvaachanAI bridges this gap by turning complex election knowledge into an interactive, AI-powered learning experience.

The name comes from **"Nirvachan"** (Hindi: निर्वाचन), meaning "election".

---

## Approach and Logic

### Problem
Election literacy in India is fragmented — information exists across ECI websites, legal documents, and news articles, but there's no single interactive platform that explains it all in simple terms.

### Solution
NirvaachanAI consolidates election knowledge into 10 interactive features, powered by Google Gemini for natural conversation and Google Search grounding for real-time news. The architecture prioritizes:

1. **Server-side AI proxy** — API keys never touch the client. All Gemini calls go through Next.js API routes with rate limiting and input sanitization.
2. **Graceful degradation** — When Gemini quota is exhausted, the app falls back to a curated knowledge base (7 topic areas) and static news, so users always get answers.
3. **Progressive enhancement** — Core content (timeline, glossary, rights, quiz) is statically generated at build time for instant loads. AI features enhance but aren't required.
4. **Bilingual support** — The AI chatbot responds in Hindi when asked in Hindi, and English otherwise.

### Architecture

```
Client (React + Tailwind + Framer Motion)
  ↓ fetch()
Next.js API Routes (rate limiting → sanitization → Gemini SDK)
  ↓
Google Gemini 2.0 Flash API (with fallback to local knowledge base)
  ↓
Firebase Auth + Firestore (user data)
Google Analytics 4 (anonymous usage tracking)
```

---

## How the Solution Works

| Feature | How It Works |
|---------|-------------|
| **AI Chatbot** | User message → sanitized → sent to Gemini 2.0 Flash via server-side route → markdown response rendered with `marked` + DOMPurify. Falls back to keyword-matched knowledge base if API unavailable |
| **Live News** | Server-side Gemini call with `googleSearch` tool for real-time grounding → parsed JSON → rendered as categorized cards with filter tabs |
| **Interactive Map** | SVG paths for 28 states → click handler looks up state data → side panel shows seats, turnout, government |
| **Mock Voting** | 7-step state machine: Welcome → ID Check → Ink → EVM (button click) → VVPAT (7s display) → Exit → Congratulations with confetti |
| **Quiz** | 15 questions from static dataset → filtered by difficulty → scored client-side → detailed results with explanations |
| **Eligibility Checker** | Form inputs → `checkEligibility()` with 6 decision branches → returns status + required form (Form 6/6A/7/8) |
| **My Constituency** | GPS coordinates → Gemini identifies constituency OR coordinate-based fallback → shows representative details. Also supports manual state/constituency dropdown for all 28 states |
| **Timeline** | 12 steps across 3 phases (Pre/During/Post election) → filterable → each step has key facts and descriptions |

---

## Assumptions Made

1. **Gemini API availability** — The app is designed for Gemini 2.0 Flash but gracefully handles API quota exhaustion with built-in fallbacks
2. **Indian context** — All content is India-specific, based on ECI guidelines and the Representation of the People Act, 1951
3. **Modern browser** — Targets browsers supporting CSS custom properties, IntersectionObserver, and the Geolocation API
4. **Political neutrality** — The AI is instructed to refuse commentary on parties, candidates, or predictions — education only
5. **Connectivity** — Primary features (timeline, quiz, glossary, rights, eligibility) work offline after initial load since they use static data

---

## Evaluation Criteria Alignment

### 1. Code Quality — Structure, Readability, Maintainability

- **TypeScript strict mode** with explicit return types on all hooks and utility functions
- **Component decomposition** — 30+ focused components, each under 150 lines
- **Custom hooks** (`useChat`, `useQuiz`, `useTheme`, `useGeolocation`, `useInView`) encapsulate complex state logic with proper types
- **Path aliases** (`@/components`, `@/lib`, `@/data`) for clean imports
- **ESLint** with strict rules: `no-eval`, `eqeqeq`, `no-unused-vars`, `no-implied-eval`, `no-new-func`
- **Prettier** for consistent formatting
- **CI pipeline** — GitHub Actions runs lint, test, and build on every push
- **Separation of concerns** — Data files (`data/`), business logic (`lib/`), hooks (`hooks/`), UI (`components/`), and routes (`app/`) are cleanly separated

### 2. Security — Safe and Responsible Implementation

- **API key protection** — `GEMINI_API_KEY` is server-side only, never bundled into client code
- **Input sanitization** — All user input passes through DOMPurify (client) and HTML tag stripping (server)
- **Rate limiting** — Sliding window algorithm (20 req/min per IP) with automatic memory cleanup
- **Security headers** — Full suite via `next.config.mjs`:
  - `Content-Security-Policy` with strict source directives
  - `Strict-Transport-Security` (HSTS with 1-year max-age)
  - `X-Frame-Options: DENY` (anti-clickjacking)
  - `X-Content-Type-Options: nosniff`
  - `Permissions-Policy` restricting camera, microphone, payment
- **No `eval()`** — ESLint rule `no-eval` and `no-implied-eval` enforced
- **Firebase config validation** — Checks required fields before initialization
- **SECURITY.md** — Published vulnerability reporting policy
- **`.env.example`** with placeholder values — real secrets are gitignored

### 3. Efficiency — Optimal Use of Resources

- **Static generation (SSG)** — 10 pages pre-rendered at build time, zero server cost for most traffic
- **Standalone output** — Next.js `output: 'standalone'` produces minimal Docker image (~150MB vs ~1GB)
- **Code splitting** — Each page loads only its required JS (First Load JS: 87-150KB per route)
- **Font optimization** — Google Fonts loaded via `next/font` with automatic subsetting
- **Image-free design** — SVG map, Lucide icons, CSS confetti — no heavy image assets
- **Memoized callbacks** — All hook callbacks wrapped in `useCallback` with correct dependency arrays
- **Ref-based message history** — Chat uses `useRef` to avoid recreating the send callback on every message
- **Rate limiter cleanup** — Automatically prunes stale IP entries when map exceeds 1000 keys
- **Docker multi-stage build** — Build dependencies excluded from production image

### 4. Testing — Validation of Functionality

- **81 tests across 10 test files** using Vitest + React Testing Library
- **Data integrity tests** — Quiz (15 questions, valid answers, unique IDs), Timeline (12 steps, 3 phases), Glossary (50+ terms, key terms present)
- **API behavior tests** — Rate limiter enforcement, input sanitization (XSS stripping), response structure validation
- **Component logic tests** — Eligibility checker (all 6 branches), utility functions (cn, formatDate)
- **Accessibility tests** — Timeline titles >5 chars, quiz questions end with `?`, voter rights have article references
- **Vote simulation tests** — 7 steps in correct order, NOTA candidate present, ID verification before voting
- **CI integration** — Tests run automatically on every push via GitHub Actions

### 5. Accessibility — Inclusive and Usable Design

- **WCAG AA compliance** — Color contrast ratios meet AA standards in both light and dark themes
- **Semantic HTML** — `<main>`, `<nav>`, `<header>`, `<footer>`, `<article>`, proper heading hierarchy
- **ARIA labels** — All interactive elements (map states, buttons, form inputs) have descriptive `aria-label` attributes
- **Keyboard navigation** — All features operable via keyboard (Tab, Enter, Escape for modals)
- **Skip to content** link — `<SkipToContent>` component for screen reader users
- **Focus indicators** — Visible `focus-visible:ring-2` on all interactive elements
- **Dark mode** — System preference detection + manual toggle, `color-scheme` CSS property for native form controls
- **Responsive design** — Mobile-first layout, tested from 320px to 1920px
- **Error boundaries** — Graceful error and 404 pages instead of crashes
- **Loading states** — Spinner and skeleton states for async content

### 6. Google Services — Meaningful Integration

| Service | Integration |
|---------|-------------|
| **Google Gemini 2.0 Flash** | Powers the AI chatbot with a custom election-focused system prompt. Enforces political neutrality, bilingual responses, and structured markdown output |
| **Gemini + Google Search** | News API uses `googleSearch` tool for real-time grounded search — not hallucinated content |
| **Firebase Authentication** | Configured with `getAuth()` for user sign-in capability |
| **Cloud Firestore** | Configured with `getFirestore()` for persistent data storage |
| **Google Analytics 4** | Page tracking via gtag.js loaded with `next/script strategy="afterInteractive"` — respects user privacy |
| **Google Cloud Run** | Production deployment with standalone Docker image, 512MB memory, auto-scaling |
| **Google Cloud Build** | CI/CD pipeline for building Docker images from source |

---

## Getting Started

```bash
git clone https://github.com/vedant7007/nirvaachan-ai.git
cd nirvaachan-ai
npm install
cp .env.example .env.local  # Add your API keys
npm run dev                  # http://localhost:3000
```

## Testing

```bash
npm run test              # 81 tests
npm run test:coverage     # With coverage report
npm run lint              # ESLint check
```

## Deployment

```bash
# Docker
docker build -t nirvaachan-ai .
docker run -p 8080:8080 --env-file .env.local nirvaachan-ai

# Google Cloud Run
gcloud builds submit --tag gcr.io/PROJECT_ID/nirvaachan-ai
gcloud run deploy nirvaachan-ai --image gcr.io/PROJECT_ID/nirvaachan-ai --region asia-south1
```

## Project Structure

```
app/                    # Next.js App Router pages + API routes
  api/chat/             # Gemini chatbot with fallback knowledge base
  api/news/             # AI news with Google Search grounding
  api/constituency/     # GPS-based constituency lookup
components/             # 30+ React components organized by feature
data/                   # Static datasets (quiz, timeline, glossary, states, constituencies)
hooks/                  # 5 custom hooks with TypeScript return types
lib/                    # Utilities (Gemini, Firebase, rate limiter, sanitizer)
__tests__/              # 10 test files, 81 tests
.github/workflows/      # CI pipeline (lint + test + build)
```

---

## Author

**Vedant Manmath Idlgave**
- B.Tech CSE, VJIT Hyderabad (2024-2028)
- GitHub: [vedant7007](https://github.com/vedant7007)
- LinkedIn: [vedant-idlgave](https://linkedin.com/in/vedant-idlgave-1514323063103vtsd)

## License

MIT

## Disclaimer

This is an educational tool built for the PromptWars 2026 hackathon. It is not affiliated with the Election Commission of India. For official election information, visit [eci.gov.in](https://eci.gov.in).
