import React from "react";
import Link from "next/link";
import { Calendar, MessageCircle, Brain, Newspaper, MapPin, Vote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Interactive Timeline",
    description: "Follow the 12-step journey of an Indian election from delimitation to government formation.",
    icon: Calendar,
    href: "/timeline",
    color: "text-primary-500",
    bgColor: "bg-primary-100 dark:bg-primary-900/20"
  },
  {
    title: "AI Election Guide",
    description: "Ask any question about the electoral process in English or Hindi and get instant, factual answers.",
    icon: MessageCircle,
    href: "/chat",
    color: "text-accent-500",
    bgColor: "bg-accent-100 dark:bg-accent-900/20"
  },
  {
    title: "Voter Quiz",
    description: "Test your knowledge about Indian democracy across three difficulty levels.",
    icon: Brain,
    href: "/quiz",
    color: "text-secondary-500",
    bgColor: "bg-secondary-100 dark:bg-secondary-900/20"
  },
  {
    title: "Live Election News",
    description: "Stay updated with the latest headlines curated by AI, focusing on facts over noise.",
    icon: Newspaper,
    href: "/news",
    color: "text-purple-500",
    bgColor: "bg-purple-100 dark:bg-purple-900/20"
  },
  {
    title: "My Constituency",
    description: "Find your local representatives and upcoming elections based on your location.",
    icon: MapPin,
    href: "/my-constituency",
    color: "text-rose-500",
    bgColor: "bg-rose-100 dark:bg-rose-900/20"
  },
  {
    title: "Mock EVM Vote",
    description: "Experience the polling booth digitally with our interactive EVM and VVPAT simulation.",
    icon: Vote,
    href: "/vote",
    color: "text-amber-500",
    bgColor: "bg-amber-100 dark:bg-amber-900/20"
  }
];

export const FeatureGrid: React.FC = () => {
  return (
    <section className="py-20 bg-bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground-primary mb-4">
            Everything you need to know
          </h2>
          <p className="text-foreground-secondary text-lg">
            Explore our interactive tools designed to make the Indian election process clear, engaging, and accessible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link key={index} href={feature.href} className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded-xl">
                <Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1 border-border/50 hover:border-border">
                  <CardHeader>
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors", feature.bgColor, feature.color)}>
                      <Icon size={24} />
                    </div>
                    <CardTitle className="group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
