# NirvaachanAI — Democracy, Decoded 🗳️🇮🇳

> An AI-powered interactive platform that helps Indian citizens understand
> the election process through conversation, visualization, and gamification.

**Built for PromptWars Virtual 2026 | Powered by Google Gemini**

## ✨ Features

- **🤖 AI Chatbot** — Ask anything about Indian elections in Hindi or English
- **🗓️ Interactive Timeline** — 12-step visual election process journey
- **📝 Knowledge Quiz** — 15 questions across Easy/Medium/Hard levels
- **✅ Eligibility Checker** — Check if you're eligible to vote with next steps
- **📰 Live Election News** — AI-curated latest election updates
- **📍 My Constituency** — Find your constituency and representatives
- **🗺️ India Election Map** — Click any state for election data
- **🗳️ Mock Voting Booth** — Experience voting on a simulated EVM
- **📖 Election Glossary** — 50+ election terms explained simply
- **⚖️ Know Your Rights** — Your rights as an Indian voter

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Framer Motion |
| AI | Google Gemini 2.0 Flash API |
| Auth | Firebase Authentication |
| Database | Cloud Firestore |
| Analytics | Google Analytics 4 |
| Deployment | Google Cloud Run |
| Testing | Vitest + React Testing Library |

## 🚀 Quick Start

```bash
git clone https://github.com/vedant7007/nirvaachan-ai.git
cd nirvaachan-ai
npm install
cp .env.example .env.local  # Fill in your API keys
npm run dev                  # http://localhost:3000
```

## 🧪 Testing

```bash
npm run test         # Run all tests
npm run test:coverage # With coverage report
```

## 🐳 Docker

```bash
docker build -t nirvaachan-ai .
docker run -p 8080:8080 --env-file .env.local nirvaachan-ai
```

## ☁️ Deploy to Cloud Run

```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/nirvaachan-ai
gcloud run deploy nirvaachan-ai --image gcr.io/PROJECT_ID/nirvaachan-ai --region asia-south1
```

## 📊 Scoring Criteria

| Criteria | Approach |
|----------|----------|
| Code Quality | TypeScript strict, component decomposition, ESLint |
| Security | API proxy, input sanitization, rate limiting, CSP headers |
| Efficiency | SSG, lazy loading, streaming, minimal deps |
| Testing | 10+ test files, 70%+ coverage on logic |
| Accessibility | WCAG AA, semantic HTML, ARIA, keyboard nav |
| Google Services | Gemini, Firebase Auth, Firestore, GA4, Cloud Run |

## 👤 Author

**Vedant Manmath Idlgave**
- B.Tech CSE, VJIT Hyderabad (2024-2028)
- GitHub: [vedant7007](https://github.com/vedant7007)
- LinkedIn: [vedant-idlgave](https://linkedin.com/in/vedant-idlgave-1514323063103vtsd)

## 📝 License

MIT

## ⚠️ Disclaimer

This is an educational tool built for the PromptWars 2026 hackathon. For official election information, please visit [eci.gov.in](https://eci.gov.in).
