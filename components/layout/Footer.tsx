import React from "react";
import Link from "next/link";


export const Footer: React.FC = () => {
  return (
    <footer className="bg-bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <Link href="/" className="text-xl font-heading font-bold text-primary-500 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded px-1">
              🇮🇳 NirvaachanAI
            </Link>
            <p className="text-foreground-secondary max-w-xs text-sm">
              Democracy, Decoded.
            </p>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://github.com/vedant7007/nirvaachan-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-muted hover:text-foreground-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded p-1"
                aria-label="GitHub Repository"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a
                href="https://linkedin.com/in/vedant-idlgave-1514323063103vtsd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-muted hover:text-accent-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded p-1"
                aria-label="LinkedIn Profile"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-1 text-sm text-foreground-secondary">
            <p className="font-medium text-foreground-primary">Built by Vedant Idlgave</p>
            <p>For PromptWars Virtual 2026</p>
            <p className="text-xs text-foreground-muted mt-2">Powered by Google Gemini | Deployed on Cloud Run</p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-foreground-muted text-center md:text-left">
          <p>
            Data Sources: <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" className="hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-500 rounded">ECI (eci.gov.in)</a> | Constitution of India
          </p>
          <p>
            Disclaimer: Educational tool only. For official info visit eci.gov.in
          </p>
        </div>
      </div>
    </footer>
  );
};
