"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-bg-primary pt-16 md:pt-24 pb-16">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#F97316 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-primary-500/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-secondary-500/10 blur-3xl"></div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-500 px-3 py-1 rounded-full text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span>Election 2024 Updates Live</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground-primary mb-6 leading-tight">
            Democracy, <span className="text-primary-500">Decoded.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground-secondary mb-10 leading-relaxed">
            Your personal AI guide to the world&apos;s largest democratic exercise. 
            Understand the process, know your rights, and make an informed choice.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/timeline" passHref legacyBehavior>
              <Button size="lg" className="w-full sm:w-auto text-lg group">
                Explore Timeline
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/chat" passHref legacyBehavior>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg group">
                <Bot className="mr-2 h-5 w-5" />
                Ask NirvaachanAI
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
