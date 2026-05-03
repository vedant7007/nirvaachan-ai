"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { ChatInput } from "@/components/chat/ChatInput";
import { useChat } from "@/hooks/useChat";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Trash2 } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

function ChatPageInner() {
  const { messages, isLoading, error, sendMessage, clearHistory } = useChat();
  const { trackChatMessage } = useAnalytics();
  const searchParams = useSearchParams();
  const hasAutoSent = useRef(false);
  const [showClearModal, setShowClearModal] = React.useState(false);

  const handleSend = async (text: string) => {
    trackChatMessage();
    await sendMessage(text);
  };

  useEffect(() => {
    const q = searchParams.get("q");
    if (q && !hasAutoSent.current && messages.length === 0) {
      hasAutoSent.current = true;
      handleSend(q);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, messages.length]);

  const handleClearChat = () => {
    clearHistory();
    setShowClearModal(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-8.5rem)] max-w-5xl mx-auto w-full bg-bg-primary">
      <div className="py-4 px-4 md:px-6 border-b border-border bg-bg-card flex items-center justify-between shadow-sm z-10">
        <div>
          <h1 className="font-heading font-bold text-xl text-foreground-primary">NirvaachanAI Assistant</h1>
          <p className="text-sm text-foreground-secondary">Your expert guide on Indian elections</p>
        </div>
        {messages.length > 0 && (
          <Button variant="ghost" onClick={() => setShowClearModal(true)} className="text-foreground-muted hover:text-red-500">
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <ChatWindow messages={messages} isLoading={isLoading} onSend={handleSend} />

      <div className="p-4 md:p-6 bg-bg-primary border-t border-border mt-auto">
        {error && (
          <div className="mb-3 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm flex items-center">
            <span className="mr-2">⚠️</span>
            {error}
          </div>
        )}
        <div className="max-w-3xl mx-auto w-full">
          <ChatInput onSend={handleSend} isLoading={isLoading} />
          <p className="text-xs text-center text-foreground-muted mt-3">
            NirvaachanAI can make mistakes. Please verify important information on the official ECI website.
          </p>
        </div>
      </div>

      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={handleClearChat}
        title="Clear Chat History"
        message="Are you sure you want to clear all chat messages? This cannot be undone."
        confirmLabel="Clear"
        cancelLabel="Cancel"
      />
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><p className="text-foreground-secondary">Loading chat...</p></div>}>
      <ChatPageInner />
    </Suspense>
  );
}
