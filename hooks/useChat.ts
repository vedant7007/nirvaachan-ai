import { useState, useCallback, useRef } from "react";
import { sanitizeInput } from "@/lib/sanitize";

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
}

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (text: string) => Promise<void>;
  clearHistory: () => void;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesRef = useRef<ChatMessage[]>([]);

  // Keep ref in sync for stable callback
  messagesRef.current = messages;

  const sendMessage = useCallback(async (text: string) => {
    const sanitizedText = sanitizeInput(text);
    if (!sanitizedText) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: sanitizedText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: sanitizedText,
          history: messagesRef.current.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("You are sending messages too fast. Please wait a moment.");
        }
        throw new Error("Failed to get response from AI. Please try again.");
      }

      const data = await response.json();

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content: data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearHistory = useCallback(() => setMessages([]), []);

  return { messages, isLoading, error, sendMessage, clearHistory };
}
