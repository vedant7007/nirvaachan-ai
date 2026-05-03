# Contributing to NirvaachanAI

Thank you for your interest in contributing to NirvaachanAI!

## Development Setup

```bash
git clone https://github.com/vedant7007/nirvaachan-ai.git
cd nirvaachan-ai
npm install
cp .env.example .env.local  # Add your API keys
npm run dev
```

## Project Structure

```
app/            # Next.js App Router pages and API routes
components/     # Reusable React components
data/           # Static datasets (quiz, timeline, glossary, states)
hooks/          # Custom React hooks
lib/            # Utility functions and service clients
__tests__/      # Test files
```

## Code Standards

- **TypeScript** with strict mode enabled
- **ESLint** with Next.js recommended rules
- **Prettier** for code formatting
- Component files use PascalCase, utility files use camelCase
- All components are functional with explicit type annotations

## Before Submitting a PR

1. Run linting: `npm run lint`
2. Run tests: `npm run test`
3. Run build: `npm run build`
4. Make sure all checks pass

## Guidelines

- Keep components small and focused
- Use existing UI components from `components/ui/`
- Follow the existing color system (CSS variables in `globals.css`)
- All user-facing text must be politically neutral and factually accurate
- Test data integrity for any new data files
- Do not commit API keys or secrets
