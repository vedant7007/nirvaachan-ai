import React from "react";
import { Bot } from "lucide-react";

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex w-full mb-6 justify-start">
      <div className="flex max-w-[85%] md:max-w-[75%] flex-row">
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 mr-3 bg-accent-100 text-accent-700">
          <Bot size={16} />
        </div>
        
        <div className="px-4 py-4 rounded-2xl rounded-tl-sm bg-bg-card border border-border shadow-sm flex items-center space-x-1.5 h-12">
          <div className="w-2 h-2 rounded-full bg-foreground-muted animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-foreground-muted animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-foreground-muted animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  );
};
