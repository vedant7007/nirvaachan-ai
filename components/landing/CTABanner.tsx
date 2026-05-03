import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const CTABanner: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-primary-600 dark:bg-primary-900">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#FFFFFF 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white opacity-10 blur-2xl"></div>
      
      <div className="container relative z-10 mx-auto px-4 text-center text-white">
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
          Ready to decode democracy?
        </h2>
        <p className="text-primary-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Start your journey now. Ask questions, explore the timeline, or test your knowledge with our interactive quiz.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/chat" passHref legacyBehavior>
            <Button size="lg" className="w-full sm:w-auto text-lg bg-white text-primary-700 hover:bg-primary-50">
              Start Exploring
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
