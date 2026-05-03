"use client";

import React, { useState } from "react";
import { statesData, StateElectionData } from "@/data/states";
import { StatePanel } from "./StatePanel";

const statePathData: Record<string, { d: string; cx: number; cy: number }> = {
  JK: { d: "M150,30 L180,20 L200,40 L190,70 L170,80 L150,60Z", cx: 170, cy: 50 },
  HP: { d: "M190,75 L210,70 L220,90 L200,100 L185,90Z", cx: 200, cy: 85 },
  PB: { d: "M165,85 L190,80 L195,100 L180,110 L160,100Z", cx: 175, cy: 95 },
  UK: { d: "M215,75 L245,70 L250,90 L230,100 L215,90Z", cx: 232, cy: 85 },
  HR: { d: "M170,105 L195,100 L200,120 L185,130 L165,120Z", cx: 182, cy: 115 },
  DL: { d: "M185,118 L195,115 L198,125 L190,128Z", cx: 192, cy: 122 },
  UP: { d: "M200,105 L270,95 L280,140 L240,160 L200,145Z", cx: 240, cy: 125 },
  RJ: { d: "M100,110 L170,100 L175,160 L140,180 L90,160Z", cx: 135, cy: 140 },
  GJ: { d: "M60,160 L110,150 L120,190 L90,220 L50,200Z", cx: 85, cy: 185 },
  MP: { d: "M140,155 L230,145 L240,190 L170,200 L140,185Z", cx: 190, cy: 175 },
  BR: { d: "M280,130 L330,125 L335,155 L290,160 L275,150Z", cx: 305, cy: 142 },
  JH: { d: "M280,155 L325,150 L330,180 L290,185 L275,170Z", cx: 302, cy: 168 },
  WB: { d: "M325,140 L350,130 L360,190 L340,210 L320,180Z", cx: 340, cy: 170 },
  OR: { d: "M260,185 L320,175 L330,215 L280,225 L255,210Z", cx: 290, cy: 200 },
  CT: { d: "M230,190 L270,185 L275,225 L240,230 L225,215Z", cx: 250, cy: 208 },
  MH: { d: "M100,200 L180,190 L190,240 L140,270 L90,250Z", cx: 142, cy: 230 },
  TS: { d: "M160,240 L220,230 L230,270 L180,280 L155,265Z", cx: 192, cy: 255 },
  AP: { d: "M160,275 L235,265 L260,310 L200,330 L155,305Z", cx: 205, cy: 295 },
  KA: { d: "M100,260 L160,250 L170,310 L130,340 L90,310Z", cx: 130, cy: 295 },
  GA: { d: "M85,265 L105,260 L108,280 L88,285Z", cx: 96, cy: 272 },
  KL: { d: "M105,320 L135,310 L140,370 L115,380 L100,355Z", cx: 122, cy: 348 },
  TN: { d: "M130,310 L200,300 L210,360 L160,380 L130,355Z", cx: 168, cy: 340 },
  AS: { d: "M370,110 L420,100 L430,125 L385,130 L365,120Z", cx: 398, cy: 115 },
  NL: { d: "M420,115 L440,112 L442,128 L422,130Z", cx: 430, cy: 121 },
  MN: { d: "M425,130 L445,128 L447,150 L427,152Z", cx: 436, cy: 140 },
  MZ: { d: "M415,150 L435,148 L438,175 L418,177Z", cx: 426, cy: 163 },
  TR: { d: "M400,155 L418,152 L420,172 L402,175Z", cx: 410, cy: 164 },
  ML: { d: "M370,120 L400,115 L405,135 L375,138Z", cx: 388, cy: 127 },
  SK: { d: "M340,105 L358,100 L360,115 L342,118Z", cx: 350, cy: 108 },
  AR: { d: "M390,85 L430,80 L435,105 L395,108Z", cx: 412, cy: 95 },
};

export const IndiaMap: React.FC = () => {
  const [selectedState, setSelectedState] = useState<StateElectionData | null>(null);
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);

  const handleStateClick = (code: string) => {
    const state = statesData.find((s) => s.code === code);
    setSelectedState(state || null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3">
        <div className="bg-bg-card border border-border rounded-2xl p-4 shadow-sm">
          <h3 className="text-lg font-heading font-bold text-foreground-primary mb-4 text-center">
            Click a state to view election data
          </h3>
          <svg
            viewBox="0 0 480 420"
            className="w-full h-auto"
            role="img"
            aria-label="Interactive map of India showing states"
          >
            {Object.entries(statePathData).map(([code, { d }]) => {
              const state = statesData.find((s) => s.code === code);
              const isSelected = selectedState?.code === code;
              const isHovered = hoveredCode === code;
              return (
                <path
                  key={code}
                  d={d}
                  fill={isSelected ? "var(--primary-500)" : isHovered ? "var(--accent-500)" : "var(--phase-pre)"}
                  stroke="var(--bg-primary)"
                  strokeWidth="1.5"
                  opacity={isSelected ? 1 : isHovered ? 0.9 : 0.6}
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => handleStateClick(code)}
                  onMouseEnter={() => setHoveredCode(code)}
                  onMouseLeave={() => setHoveredCode(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={state ? `${state.name} — ${state.lokSabhaSeats} Lok Sabha seats` : code}
                  onKeyDown={(e) => { if (e.key === "Enter") handleStateClick(code); }}
                />
              );
            })}
            {Object.entries(statePathData).map(([code, { cx, cy }]) => (
              <text
                key={`label-${code}`}
                x={cx}
                y={cy}
                textAnchor="middle"
                dominantBaseline="central"
                className="pointer-events-none select-none"
                fill="white"
                fontSize="7"
                fontWeight="bold"
              >
                {code}
              </text>
            ))}
          </svg>
          <div className="flex justify-center gap-4 mt-4 text-xs text-foreground-secondary">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: "var(--phase-pre)", opacity: 0.6 }} /> State
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: "var(--accent-500)" }} /> Hover
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: "var(--primary-500)" }} /> Selected
            </span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        {selectedState ? (
          <StatePanel state={selectedState} onClose={() => setSelectedState(null)} />
        ) : (
          <div className="bg-bg-card border border-border rounded-xl p-8 text-center h-full flex flex-col items-center justify-center">
            <span className="text-4xl mb-4">🗺️</span>
            <p className="text-foreground-secondary text-sm">
              Click on any state in the map to view its election data, Lok Sabha seats, voter turnout, and current government.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
