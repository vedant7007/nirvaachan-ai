# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in NirvaachanAI, please report it responsibly.

**Email:** vedantidlgave16@gmail.com

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact

We aim to respond within 48 hours and will work to patch confirmed vulnerabilities promptly.

## Security Measures

### API Security
- All AI API calls are proxied through server-side routes — API keys are never exposed to the client
- Rate limiting (20 requests/minute per IP) prevents abuse
- User input is sanitized using DOMPurify before processing

### HTTP Security Headers
- `Content-Security-Policy` — restricts resource loading sources
- `X-Content-Type-Options: nosniff` — prevents MIME type sniffing
- `X-Frame-Options: DENY` — prevents clickjacking
- `X-XSS-Protection: 1; mode=block` — enables XSS filtering
- `Referrer-Policy: strict-origin-when-cross-origin` — controls referrer information
- `Permissions-Policy` — restricts browser feature access

### Data Privacy
- No personal data is stored on our servers
- Chat messages are processed in-memory only and not persisted
- Firebase Authentication data is managed by Google's infrastructure
- Google Analytics collects only anonymous usage data

### Environment Variables
- Server-side secrets (GEMINI_API_KEY) are never bundled into client-side code
- `NEXT_PUBLIC_` prefixed variables contain only non-sensitive Firebase config identifiers
- `.env.local` is gitignored and never committed

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | Yes       |
