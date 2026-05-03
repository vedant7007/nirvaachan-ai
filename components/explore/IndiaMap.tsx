"use client";

import React, { useState } from "react";
import { statesData, StateElectionData } from "@/data/states";
import { StatePanel } from "./StatePanel";

// Simplified but recognizable SVG paths for Indian states
// ViewBox: 0 0 500 620, scaled to approximate geographic positions
const statePathData: Record<string, { d: string; cx: number; cy: number }> = {
  // Northern States
  JK: {
    d: "M140,20 L175,12 L200,18 L215,40 L210,68 L198,82 L180,88 L162,80 L148,60 L138,40Z",
    cx: 178, cy: 48,
  },
  HP: {
    d: "M198,82 L218,74 L235,80 L238,98 L222,110 L205,108 L198,95Z",
    cx: 218, cy: 93,
  },
  PB: {
    d: "M155,88 L180,88 L198,95 L205,108 L192,118 L168,118 L152,108Z",
    cx: 175, cy: 103,
  },
  UK: {
    d: "M235,80 L258,72 L272,80 L270,98 L252,108 L238,98Z",
    cx: 252, cy: 90,
  },
  HR: {
    d: "M152,108 L168,118 L192,118 L210,120 L218,138 L210,152 L182,152 L158,140Z",
    cx: 185, cy: 132,
  },
  DL: {
    d: "M198,135 L210,132 L212,142 L200,145Z",
    cx: 205, cy: 138,
  },
  // Large Northern States
  RJ: {
    d: "M55,148 L110,132 L152,108 L158,140 L182,152 L182,200 L158,240 L120,258 L72,252 L42,218 L38,178Z",
    cx: 108, cy: 192,
  },
  UP: {
    d: "M210,108 L252,108 L270,98 L305,105 L318,118 L312,152 L298,172 L262,185 L228,185 L210,200 L182,200 L182,152 L210,152 L218,138 L210,120Z",
    cx: 248, cy: 148,
  },
  // Western State
  GJ: {
    d: "M22,195 L38,178 L55,148 L72,158 L72,252 L52,278 L68,298 L58,322 L28,308 L12,268 L15,232Z",
    cx: 45, cy: 240,
  },
  // Central States
  MP: {
    d: "M158,240 L182,200 L210,200 L228,185 L262,185 L278,208 L282,252 L258,278 L195,278 L168,262Z",
    cx: 218, cy: 238,
  },
  // Eastern States
  BR: {
    d: "M312,152 L355,138 L370,158 L352,178 L298,178 L298,172Z",
    cx: 330, cy: 160,
  },
  JH: {
    d: "M278,208 L298,178 L352,178 L352,218 L322,232 L285,222Z",
    cx: 315, cy: 205,
  },
  WB: {
    d: "M352,158 L382,142 L392,168 L388,228 L372,262 L358,248 L352,218 L352,178Z",
    cx: 370, cy: 200,
  },
  OR: {
    d: "M282,252 L322,232 L352,248 L362,282 L338,312 L295,302 L278,278Z",
    cx: 320, cy: 275,
  },
  CT: {
    d: "M258,278 L282,252 L295,302 L278,332 L248,325 L242,298Z",
    cx: 268, cy: 298,
  },
  // Western/Southern States
  MH: {
    d: "M58,322 L68,298 L52,278 L72,252 L120,258 L158,240 L168,262 L195,278 L210,312 L198,348 L168,375 L128,370 L92,352 L72,338Z",
    cx: 132, cy: 312,
  },
  GA: {
    d: "M82,342 L95,338 L98,358 L85,362Z",
    cx: 90, cy: 350,
  },
  TS: {
    d: "M210,312 L242,298 L278,312 L272,352 L240,368 L210,355Z",
    cx: 242, cy: 332,
  },
  // Southern States
  KA: {
    d: "M85,362 L128,370 L168,375 L175,398 L170,442 L148,468 L118,460 L92,432 L80,400Z",
    cx: 125, cy: 418,
  },
  AP: {
    d: "M210,355 L240,368 L272,352 L295,342 L318,362 L308,408 L275,440 L242,450 L210,435 L175,398 L168,375 L198,348Z",
    cx: 245, cy: 395,
  },
  KL: {
    d: "M92,432 L118,460 L148,468 L142,508 L128,528 L108,518 L92,478Z",
    cx: 118, cy: 482,
  },
  TN: {
    d: "M148,468 L170,442 L210,435 L242,450 L262,442 L275,458 L260,498 L228,535 L188,538 L155,530 L148,518 L142,508Z",
    cx: 205, cy: 488,
  },
  // Northeast States
  SK: {
    d: "M365,118 L382,112 L388,128 L372,135Z",
    cx: 377, cy: 123,
  },
  AS: {
    d: "M395,112 L442,102 L455,120 L445,138 L408,142 L392,130Z",
    cx: 422, cy: 122,
  },
  AR: {
    d: "M418,82 L455,75 L462,98 L445,102 L422,100Z",
    cx: 440, cy: 90,
  },
  ML: {
    d: "M395,135 L425,128 L430,148 L400,155Z",
    cx: 412, cy: 142,
  },
  NL: {
    d: "M455,120 L472,118 L475,138 L458,142Z",
    cx: 465, cy: 130,
  },
  MN: {
    d: "M460,145 L478,142 L482,170 L465,175Z",
    cx: 470, cy: 158,
  },
  MZ: {
    d: "M448,165 L468,160 L472,195 L452,200Z",
    cx: 460, cy: 180,
  },
  TR: {
    d: "M428,175 L448,170 L452,200 L432,205Z",
    cx: 440, cy: 188,
  },
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
            viewBox="0 0 500 580"
            className="w-full h-auto max-h-[70vh]"
            role="img"
            aria-label="Interactive map of India showing states"
          >
            {/* State shapes */}
            {Object.entries(statePathData).map(([code, { d }]) => {
              const state = statesData.find((s) => s.code === code);
              const isSelected = selectedState?.code === code;
              const isHovered = hoveredCode === code;
              return (
                <path
                  key={code}
                  d={d}
                  fill={
                    isSelected
                      ? "var(--primary-500)"
                      : isHovered
                      ? "var(--accent-500)"
                      : "var(--phase-pre)"
                  }
                  stroke="var(--bg-card)"
                  strokeWidth="1.5"
                  opacity={isSelected ? 1 : isHovered ? 0.85 : 0.65}
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => handleStateClick(code)}
                  onMouseEnter={() => setHoveredCode(code)}
                  onMouseLeave={() => setHoveredCode(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={
                    state
                      ? `${state.name} — ${state.lokSabhaSeats} Lok Sabha seats`
                      : code
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleStateClick(code);
                  }}
                />
              );
            })}
            {/* State labels */}
            {Object.entries(statePathData).map(([code, { cx, cy }]) => (
              <text
                key={`label-${code}`}
                x={cx}
                y={cy}
                textAnchor="middle"
                dominantBaseline="central"
                className="pointer-events-none select-none"
                fill="white"
                fontSize="8"
                fontWeight="bold"
              >
                {code}
              </text>
            ))}
          </svg>
          <div className="flex justify-center gap-6 mt-4 text-xs text-foreground-secondary">
            <span className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: "var(--phase-pre)", opacity: 0.65 }}
              />{" "}
              State
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: "var(--accent-500)" }}
              />{" "}
              Hover
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: "var(--primary-500)" }}
              />{" "}
              Selected
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
              Click on any state in the map to view its election data, Lok Sabha
              seats, voter turnout, and current government.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
