"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  MessageCircle,
  Brain,
  Newspaper,
  MapPin,
  Globe,
  Vote,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Timeline", href: "/timeline", icon: Calendar },
  { label: "AI Chat", href: "/chat", icon: MessageCircle },
  { label: "Quiz", href: "/quiz", icon: Brain },
  { label: "News", href: "/news", icon: Newspaper },
  { label: "My Area", href: "/my-constituency", icon: MapPin },
  { label: "Explore", href: "/explore", icon: Globe },
  { label: "Mock Vote", href: "/vote", icon: Vote },
  { label: "Eligibility", href: "/eligibility", icon: CheckCircle },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled ? "bg-bg-card/80 backdrop-blur-md shadow-sm" : "bg-bg-primary"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 text-primary-500 font-heading font-bold text-xl hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded"
        >
          <span className="text-2xl" aria-hidden="true">🇮🇳</span>
          <span>NirvaachanAI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
                  isActive
                    ? "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-500"
                    : "text-foreground-secondary hover:bg-bg-secondary hover:text-foreground-primary"
                )}
              >
                <Icon size={16} />
                <span className="hidden lg:inline-block">{link.label}</span>
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-foreground-secondary hover:bg-bg-secondary rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-bg-card h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors",
                    isActive
                      ? "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-500"
                      : "text-foreground-secondary hover:bg-bg-secondary"
                  )}
                >
                  <Icon size={20} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
