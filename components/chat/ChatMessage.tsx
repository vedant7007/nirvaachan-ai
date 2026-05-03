import React from "react";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

interface ChatMessageProps {
  role: "user" | "model";
  content: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  const isUser = role === "user";

  const getFormattedContent = (): { __html: string } => {
    const rawMarkup = marked.parse(content, { async: false }) as string;
    const cleanMarkup = DOMPurify.sanitize(rawMarkup);
    return { __html: cleanMarkup };
  };

  return (
    <div className={cn("flex w-full mb-6", isUser ? "justify-end" : "justify-start")}>
      <div className={cn("flex max-w-[85%] md:max-w-[75%]", isUser ? "flex-row-reverse" : "flex-row")}>
        <div className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1",
          isUser ? "ml-3 bg-primary-100 text-primary-700" : "mr-3 bg-accent-100 text-accent-700"
        )}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>
        
        <div className={cn(
          "px-4 py-3 rounded-2xl text-sm md:text-base shadow-sm",
          isUser 
            ? "bg-primary-500 text-white rounded-tr-sm" 
            : "bg-bg-card border border-border text-foreground-primary rounded-tl-sm prose dark:prose-invert max-w-none"
        )}>
          {isUser ? (
            <p className="whitespace-pre-wrap">{content}</p>
          ) : (
            <div dangerouslySetInnerHTML={getFormattedContent()} className="prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-strong:text-foreground-primary" />
          )}
        </div>
      </div>
    </div>
  );
};
