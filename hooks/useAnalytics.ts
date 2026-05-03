"use client";

import { useCallback } from "react";
import { event as trackEvent, pageview } from "@/lib/analytics";

/** Predefined event categories for consistent analytics tracking */
export type EventCategory = "engagement" | "ai_chat" | "interaction" | "navigation" | "education";

interface AnalyticsEvent {
  action: string;
  category: EventCategory;
  label?: string;
  value?: number;
}

interface UseAnalyticsReturn {
  trackPageView: (url: string) => void;
  trackEvent: (event: AnalyticsEvent) => void;
  trackQuizStart: (difficulty: string) => void;
  trackQuizComplete: (score: number, total: number) => void;
  trackChatMessage: () => void;
  trackVoteComplete: () => void;
  trackFeatureUsed: (feature: string) => void;
}

/**
 * Custom hook for Google Analytics 4 event tracking.
 * Provides type-safe, pre-configured tracking methods for all app features.
 */
export function useAnalytics(): UseAnalyticsReturn {
  const trackPageView = useCallback((url: string) => {
    pageview(url);
  }, []);

  const track = useCallback((analyticsEvent: AnalyticsEvent) => {
    trackEvent({
      action: analyticsEvent.action,
      category: analyticsEvent.category,
      label: analyticsEvent.label,
      value: analyticsEvent.value,
    });
  }, []);

  const trackQuizStart = useCallback((difficulty: string) => {
    trackEvent({ action: "quiz_start", category: "engagement", label: difficulty });
  }, []);

  const trackQuizComplete = useCallback((score: number, total: number) => {
    trackEvent({ action: "quiz_complete", category: "engagement", label: `${score}/${total}`, value: score });
  }, []);

  const trackChatMessage = useCallback(() => {
    trackEvent({ action: "chat_message_sent", category: "ai_chat" });
  }, []);

  const trackVoteComplete = useCallback(() => {
    trackEvent({ action: "mock_vote_cast", category: "interaction" });
  }, []);

  const trackFeatureUsed = useCallback((feature: string) => {
    trackEvent({ action: "feature_used", category: "navigation", label: feature });
  }, []);

  return { trackPageView, trackEvent: track, trackQuizStart, trackQuizComplete, trackChatMessage, trackVoteComplete, trackFeatureUsed };
}
