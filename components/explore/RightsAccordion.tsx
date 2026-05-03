"use client";

import React, { useState } from "react";
import { voterRights } from "@/data/rights";
import { Scale, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const RightItem: React.FC<{ right: typeof voterRights[0] }> = ({ right }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between bg-bg-secondary px-4 py-3 text-left font-medium text-foreground-primary transition-colors hover:bg-border focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
        aria-expanded={isOpen}
      >
        <span className="flex items-center space-x-2">
          <span aria-hidden="true" className="text-lg">{right.icon}</span>
          <span className="font-semibold text-sm">{right.title}</span>
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-5 w-5 text-foreground-muted" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="bg-bg-card p-4 text-foreground-secondary border-t border-border space-y-3">
              <span className="inline-block px-2.5 py-1 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-400 text-xs font-semibold rounded-md border border-secondary-200 dark:border-secondary-800">
                {right.article}
              </span>
              <p className="text-sm leading-relaxed">
                {right.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const RightsAccordion: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-full flex items-center justify-center">
          <Scale size={24} />
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-primary">
          Your Democratic Rights
        </h2>
      </div>
      
      <p className="text-center text-foreground-secondary mb-10 max-w-2xl mx-auto">
        As an Indian citizen, the Constitution and the Election Commission guarantee you several fundamental rights regarding elections.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {voterRights.map((right, index) => (
          <RightItem key={index} right={right} />
        ))}
      </div>
    </div>
  );
};
