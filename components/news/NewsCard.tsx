import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Clock, Info, MessageCircle } from "lucide-react";

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  timeAgo: string;
}

interface NewsCardProps {
  news: NewsItem;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <Card className="hover:border-primary-300 dark:hover:border-primary-700 transition-colors h-full">
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-semibold px-2 py-1 bg-bg-secondary rounded text-foreground-secondary uppercase tracking-wider">
            {news.category}
          </span>
          <div className="flex items-center text-xs text-foreground-muted">
            <Clock size={12} className="mr-1" />
            {news.timeAgo}
          </div>
        </div>

        <h3 className="font-heading font-bold text-lg text-foreground-primary mb-2 line-clamp-2">
          {news.title}
        </h3>

        <p className="text-sm text-foreground-secondary leading-relaxed flex-grow">
          {news.summary}
        </p>

        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <div className="flex items-center text-xs text-foreground-muted font-medium">
            <Info size={14} className="mr-1.5" />
            AI Curated News
          </div>
          <Link
            href={`/chat?q=${encodeURIComponent(news.title)}`}
            className="flex items-center text-xs text-primary-600 dark:text-primary-400 hover:underline font-medium"
          >
            <MessageCircle size={14} className="mr-1" />
            Ask AI about this
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
