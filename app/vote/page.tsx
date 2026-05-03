"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EVMMachine } from "@/components/vote/EVMMachine";
import { VVPATSlip } from "@/components/vote/VVPATSlip";
import { Confetti } from "@/components/vote/Confetti";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  ChevronRight,
  ShieldCheck,
  Fingerprint,
  Droplets,
  Vote,
  FileCheck,
  DoorOpen,
  PartyPopper,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { useVoteSimulation, STEP_LABELS } from "@/hooks/useVoteSimulation";
import { useAnalytics } from "@/hooks/useAnalytics";

const stepIcons = [ShieldCheck, Fingerprint, Droplets, Vote, FileCheck, DoorOpen, PartyPopper];

export default function VotePage() {
  const { currentStep, votedCandidate, showConfetti, handleVote, handleReset, goNext } = useVoteSimulation();
  const { trackVoteComplete } = useAnalytics();

  const onVote = (candidateId: number) => {
    handleVote(candidateId);
    trackVoteComplete();
  };

  const slideVariants = {
    enter: { x: 80, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -80, opacity: 0 },
  };

  return (
    <div className="min-h-screen bg-bg-primary py-8 md:py-12">
      {showConfetti && <Confetti />}
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-primary mb-2">
            Mock Voting Simulation
          </h1>
          <p className="text-foreground-secondary">
            Experience the complete voting process step by step
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8 space-x-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i <= currentStep
                  ? "bg-primary-500 w-8"
                  : "bg-border w-4"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Welcome */}
          {currentStep === 0 && (
            <motion.div key="step-0" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck size={40} />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground-primary mb-4">
                    Welcome to the Polling Station
                  </h2>
                  <p className="text-foreground-secondary mb-6 max-w-md mx-auto">
                    On election day, you arrive at your assigned polling station. Make sure you carry a valid photo ID
                    (Voter ID, Aadhaar, Passport, PAN, or Driving License).
                  </p>
                  <div className="bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800 rounded-lg p-4 mb-8 text-left max-w-sm mx-auto">
                    <p className="text-sm font-semibold text-accent-700 dark:text-accent-300 mb-2">What to bring:</p>
                    <ul className="text-sm text-accent-600 dark:text-accent-400 space-y-1 list-disc list-inside">
                      <li>Any one of 12 approved photo IDs</li>
                      <li>Voter slip (optional but helpful)</li>
                    </ul>
                  </div>
                  <Button onClick={goNext} size="lg">
                    Enter Polling Station <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Identity Verification */}
          {currentStep === 1 && (
            <motion.div key="step-1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Fingerprint size={40} />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground-primary mb-4">
                    Identity Verification
                  </h2>
                  <p className="text-foreground-secondary mb-4 max-w-md mx-auto">
                    The Presiding Officer checks your name against the electoral roll and verifies your photo ID.
                  </p>
                  <div className="bg-secondary-50 dark:bg-secondary-900/20 border border-secondary-200 dark:border-secondary-800 rounded-lg p-4 mb-8 max-w-sm mx-auto">
                    <p className="text-sm text-secondary-700 dark:text-secondary-300 font-medium flex items-center justify-center">
                      <span className="mr-2">✅</span> Your name has been found in the voter list!
                    </p>
                  </div>
                  <Button onClick={goNext} size="lg">
                    Proceed <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Indelible Ink */}
          {currentStep === 2 && (
            <motion.div key="step-2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Droplets size={40} />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground-primary mb-4">
                    Indelible Ink Application
                  </h2>
                  <p className="text-foreground-secondary mb-4 max-w-md mx-auto">
                    Indelible ink is applied on your left forefinger. It contains silver nitrate and stays for 2-4 weeks,
                    preventing duplicate voting.
                  </p>
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <span className="text-6xl">✋</span>
                      <span className="absolute -bottom-1 -left-1 text-2xl">💜</span>
                    </div>
                  </div>
                  <Button onClick={goNext} size="lg">
                    Proceed to EVM <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: EVM Voting */}
          {currentStep === 3 && (
            <motion.div key="step-3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-heading font-bold text-foreground-primary mb-2">
                  Cast Your Vote on the EVM
                </h2>
                <p className="text-foreground-secondary text-sm">
                  Press the blue button next to your chosen candidate
                </p>
              </div>
              <EVMMachine onVote={onVote} hasVoted={false} />
            </motion.div>
          )}

          {/* Step 5: VVPAT Verification */}
          {currentStep === 4 && votedCandidate && (
            <motion.div key="step-4" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <Card>
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-heading font-bold text-foreground-primary mb-4">
                    VVPAT Verification
                  </h2>
                  <p className="text-foreground-secondary mb-4 max-w-md mx-auto text-sm">
                    A paper slip appears for 7 seconds showing your choice. This provides a paper trail of your vote.
                  </p>
                  <VVPATSlip
                    candidateName={votedCandidate.name}
                    candidateSymbol={votedCandidate.symbol}
                    partyName={votedCandidate.party}
                    show={true}
                  />
                  <div className="mt-8">
                    <Button onClick={goNext} size="lg">
                      Continue <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 6: Exit */}
          {currentStep === 5 && (
            <motion.div key="step-5" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <DoorOpen size={40} />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground-primary mb-4">
                    Exit the Booth
                  </h2>
                  <p className="text-foreground-secondary mb-6 max-w-md mx-auto">
                    Your vote has been recorded. Please exit the polling station quietly.
                  </p>
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8 max-w-md mx-auto text-left">
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      <span className="font-bold">💡 Fun Fact:</span> In India, even if there is just 1 voter in a remote area,
                      the ECI sets up a full polling station — like the one in Gir Forest, Gujarat!
                    </p>
                  </div>
                  <Button onClick={goNext} size="lg">
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 7: Congratulations */}
          {currentStep === 6 && (
            <motion.div key="step-6" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-3xl font-heading font-bold text-foreground-primary mb-4">
                    Congratulations!
                  </h2>
                  <p className="text-lg text-foreground-secondary mb-2">
                    You have completed the mock voting experience!
                  </p>
                  <p className="text-sm text-foreground-muted mb-8 max-w-md mx-auto">
                    Remember: Your real vote is SECRET. No one can see who you voted for.
                    The EVM does not record the sequence of votes.
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 mb-6">
                    <Button onClick={handleReset} variant="outline">
                      <RotateCcw className="mr-2 h-4 w-4" /> Try Again
                    </Button>
                    <Link href="/quiz">
                      <Button variant="secondary">Take the Quiz &rarr;</Button>
                    </Link>
                    <Link href="/timeline">
                      <Button>Learn the Full Process &rarr;</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step labels */}
        <div className="mt-8 grid grid-cols-7 gap-1 text-center">
          {STEP_LABELS.map((label, i) => {
            const Icon = stepIcons[i];
            return (
              <div key={label} className={`text-xs ${i <= currentStep ? "text-primary-600 dark:text-primary-400" : "text-foreground-muted"}`}>
                <Icon className="h-4 w-4 mx-auto mb-1" />
                {label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
