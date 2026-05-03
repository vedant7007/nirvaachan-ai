import React from "react";
import { CheckCircle2, XCircle, AlertTriangle, ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EligibilityResult as ResultType } from "@/lib/eligibility";
import { cn } from "@/lib/utils";

interface EligibilityResultProps {
  result: ResultType;
  onBack: () => void;
}

export const EligibilityResult: React.FC<EligibilityResultProps> = ({ result, onBack }) => {
  
  const getStatusConfig = () => {
    switch (result.status) {
      case "Fully Eligible to Vote":
        return {
          icon: CheckCircle2,
          colorClass: "text-secondary-500",
          bgClass: "bg-secondary-100 dark:bg-secondary-900/30",
          borderColor: "border-secondary-500"
        };
      case "Eligible to Register":
      case "Eligible as Overseas Elector":
        return {
          icon: CheckCircle2,
          colorClass: "text-primary-500",
          bgClass: "bg-primary-100 dark:bg-primary-900/30",
          borderColor: "border-primary-500"
        };
      case "Not Eligible Yet":
        return {
          icon: AlertTriangle,
          colorClass: "text-accent-500",
          bgClass: "bg-accent-100 dark:bg-accent-900/30",
          borderColor: "border-accent-500"
        };
      default: // Not Eligible, Disqualified
        return {
          icon: XCircle,
          colorClass: "text-red-500",
          bgClass: "bg-red-100 dark:bg-red-900/30",
          borderColor: "border-red-500"
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Card className={cn("max-w-2xl mx-auto border-t-4 overflow-hidden", config.borderColor)}>
      <CardContent className="p-8 md:p-12 text-center">
        <div className={cn("w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6", config.bgClass, config.colorClass)}>
          <Icon size={40} />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-primary mb-4">
          {result.status}
        </h2>
        
        <p className="text-lg text-foreground-secondary leading-relaxed mb-8">
          {result.description}
        </p>

        {result.actionForm && (
          <div className="bg-bg-secondary border border-border rounded-xl p-6 mb-8 text-left">
            <div className="flex items-start space-x-4">
              <div className="bg-bg-card p-3 rounded-lg shadow-sm">
                <FileText className="h-8 w-8 text-primary-500" />
              </div>
              <div>
                <h4 className="font-bold text-foreground-primary mb-1">Next Step: Fill {result.actionForm}</h4>
                <p className="text-sm text-foreground-secondary mb-4">
                  You need to submit this form to register yourself on the electoral roll.
                </p>
                <a 
                  href={result.actionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700 focus:outline-none focus:underline"
                >
                  Visit ECI Voter Portal
                  <ExternalLink className="ml-1.5 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        <Button onClick={onBack} variant="outline" className="w-full sm:w-auto">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Check Another Profile
        </Button>
      </CardContent>
    </Card>
  );
};
