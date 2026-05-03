"use client";

import React, { useState } from "react";
import { EligibilityForm } from "@/components/eligibility/EligibilityForm";
import { EligibilityResult as ResultComponent } from "@/components/eligibility/EligibilityResult";
import { checkEligibility, EligibilityData, EligibilityResult } from "@/lib/eligibility";

export default function EligibilityPage() {
  const [result, setResult] = useState<EligibilityResult | null>(null);

  const handleCheck = (data: EligibilityData) => {
    const outcome = checkEligibility(data);
    setResult(outcome);
  };

  const handleBack = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-bg-primary py-12 md:py-20 flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground-primary mb-4">
            Voter Eligibility Checker
          </h1>
          <p className="text-lg text-foreground-secondary">
            Find out if you are eligible to vote in Indian elections and discover your next steps.
          </p>
        </div>

        {!result ? (
          <EligibilityForm onSubmit={handleCheck} />
        ) : (
          <ResultComponent result={result} onBack={handleBack} />
        )}
      </div>
    </div>
  );
}
