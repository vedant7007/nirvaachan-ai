import { HeroSection } from "@/components/landing/HeroSection";
import { StatsCounter } from "@/components/landing/StatsCounter";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { QuickFlow } from "@/components/landing/QuickFlow";
import { CTABanner } from "@/components/landing/CTABanner";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <StatsCounter />
      <FeatureGrid />
      <QuickFlow />
      <CTABanner />
    </div>
  );
}
