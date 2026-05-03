import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "pre" | "election" | "post" | "outline";
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-500",
      pre: "bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-500",
      election: "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-500",
      post: "bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-500",
      outline: "border border-border text-foreground-secondary",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";
