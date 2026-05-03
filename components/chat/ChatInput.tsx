import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative flex items-end bg-bg-card border border-border rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-accent-500 focus-within:border-accent-500 p-2 overflow-hidden"
    >
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask NirvaachanAI anything about elections..."
        className="w-full max-h-[120px] bg-transparent border-none focus:ring-0 resize-none py-2 px-3 text-foreground-primary placeholder:text-foreground-muted min-h-[40px] text-base"
        disabled={isLoading}
        rows={1}
      />
      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        className={cn(
          "flex-shrink-0 ml-2 p-2.5 rounded-lg text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2",
          input.trim() && !isLoading
            ? "bg-primary-500 hover:bg-primary-600"
            : "bg-border text-foreground-muted cursor-not-allowed"
        )}
        aria-label="Send message"
      >
        <Send size={18} />
      </button>
    </form>
  );
};
