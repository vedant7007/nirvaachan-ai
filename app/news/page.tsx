"use client";

import React, { useState, useEffect } from "react";
import { NewsCard, NewsItem } from "@/components/news/NewsCard";
import { CategoryFilter } from "@/components/news/CategoryFilter";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/Button";
import { RefreshCw, AlertCircle } from "lucide-react";

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/news");
      if (!res.ok) {
        throw new Error("Failed to fetch news");
      }
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setNews(data.news || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredNews = activeCategory === "all"
    ? news
    : news.filter((item) => item.category.toLowerCase() === activeCategory);

  return (
    <div className="min-h-screen bg-bg-primary pt-10 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-primary mb-2 text-center md:text-left">
              Live Election News
            </h1>
            <p className="text-foreground-secondary text-center md:text-left">
              AI-curated, factual updates from the world of Indian elections.
            </p>
          </div>
          <Button
            onClick={fetchNews}
            disabled={isLoading}
            variant="outline"
            className="w-full md:w-auto"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <CategoryFilter activeCategory={activeCategory} onChange={setActiveCategory} />

        {error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-xl flex flex-col items-center justify-center text-center">
            <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">Unable to load news</h3>
            <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
            <Button onClick={fetchNews} variant="outline" className="bg-white dark:bg-transparent">
              Try Again
            </Button>
          </div>
        ) : isLoading && news.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-foreground-secondary animate-pulse">Curating the latest facts for you...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNews.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
              {filteredNews.length === 0 && !isLoading && (
                <div className="col-span-full text-center py-12 text-foreground-secondary">
                  No news found for this category.
                </div>
              )}
            </div>
            <p className="text-xs text-center text-foreground-muted mt-8">
              ⚠️ News is AI-summarized and may not be 100% accurate. Verify from official sources.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
