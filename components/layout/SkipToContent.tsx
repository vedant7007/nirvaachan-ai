import React from 'react';

export const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-bg-card focus:text-accent-600 focus:font-semibold focus:outline-none focus:ring-2 focus:ring-accent-500"
    >
      Skip to content
    </a>
  );
};
