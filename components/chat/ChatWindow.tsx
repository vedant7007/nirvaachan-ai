import React, { useEffect, useRef } from "react";
import { ChatMessage as ChatMessageComponent } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { SuggestedChips } from "./SuggestedChips";
import { ChatMessage } from "@/hooks/useChat";

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSend: (message: string) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, onSend }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-2">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 text-primary-500 rounded-full flex items-center justify-center text-2xl mb-6">
            🤖
          </div>
          <h2 className="text-2xl font-heading font-bold text-foreground-primary mb-2">
            Namaste! I am NirvaachanAI.
          </h2>
          <p className="text-foreground-secondary mb-8">
            I&apos;m your personal guide to the Indian election process. You can ask me anything about voter registration, EVMs, rules, or how democracy works in India.
          </p>
          
          <div className="w-full text-left">
            <p className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-2 px-2">
              Suggested Questions
            </p>
            <SuggestedChips onSelect={onSend} />
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto w-full">
          {messages.map((msg) => (
            <ChatMessageComponent key={msg.id} role={msg.role} content={msg.content} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={bottomRef} className="h-4" />
        </div>
      )}
    </div>
  );
};
