"use client";

import { useReducedMotion } from "framer-motion";

const TECH_ITEMS = [
  "NEXT.JS 16",
  "REACT 19",
  "TYPESCRIPT",
  "NODE.JS",
  "EXPRESS",
  "MONGODB",
  "TAILWIND CSS v4",
  "FRAMER MOTION",
  "POSTGRESQL",
  "DOCKER",
  "REDUX TOOLKIT",
  "GIT WORKFLOWS",
  "REST APIS",
  "MERN ARCHITECTURE",
];

export default function TechMarquee() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="relative w-full h-[51px] bg-chalk-cream text-paddock-olive border-y border-paddock-olive/20 overflow-hidden flex items-center select-none"
      data-scroll-enter aria-label="Continuous Technology Velocity Marquee"
    >
      {/* Center Crossing Badge / Accent */}
      <div className="absolute left-4 sm:left-8 z-20 flex items-center gap-2 px-3 py-1 bg-signal-lime text-paddock-olive border border-paddock-olive text-[9.26px] font-mono font-bold tracking-[0.2em] uppercase shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-paddock-olive animate-pulse" aria-hidden="true" />
        STACK VELOCITY
      </div>

      {/* Infinite Scrolling Track */}
      <div className={`flex w-max items-center whitespace-nowrap pl-44 sm:pl-56 ${shouldReduceMotion ? "" : "animate-[marquee_28s_linear_infinite]"}`}>
        {/* Repeating sequence 1 */}
        {TECH_ITEMS.map((item, idx) => (
          <div key={`m1-${idx}`} className="inline-flex items-center gap-6 px-4">
            <span className="font-sans text-sm sm:text-base font-extrabold uppercase tracking-widest text-paddock-olive">
              {item}
            </span>
            <span className="text-paddock-olive/35 font-mono text-xs" aria-hidden="true">
              ///
            </span>
          </div>
        ))}

        {/* Repeating sequence 2 */}
        {TECH_ITEMS.map((item, idx) => (
          <div key={`m2-${idx}`} className="inline-flex items-center gap-6 px-4" aria-hidden="true">
            <span className="font-sans text-sm sm:text-base font-extrabold uppercase tracking-widest text-paddock-olive">
              {item}
            </span>
            <span className="text-paddock-olive/35 font-mono text-xs">
              ///
            </span>
          </div>
        ))}
      </div>

      {/* Left/Right Edge Gradient Mask */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-chalk-cream to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-chalk-cream to-transparent z-10" />
    </div>
  );
}

