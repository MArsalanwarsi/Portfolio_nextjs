"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import ContourBackground from "@/components/ContourBackground";
import { siteConfig } from "@/data/portfolio";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll parallax tracking over the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Hero card scales down from full-viewport (1.0) into an inset card (0.935)
  const heroScale = useTransform(
    scrollYProgress,
    [0, 0.75],
    [1, shouldReduceMotion ? 1 : 0.935]
  );

  // Corner radius transforms from 0px (edge-to-edge) to 18.52px (standard Lando inset/radius)
  const heroRadius = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["0px", shouldReduceMotion ? "0px" : "18.52px"]
  );

  // Subtle vertical drift for the portrait cut-out
  const portraitY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", shouldReduceMotion ? "0%" : "6%"]
  );

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-[140vh] bg-paddock-olive text-paddock-olive"
      aria-label="Hero Section"
    >
      {/* Sticky Inner Hero Viewport Card */}
      <m.div
        style={{
          scale: heroScale,
          borderRadius: heroRadius,
        }}
        className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-chalk-cream flex flex-col justify-between border border-transparent sm:border-tarmac-gray/15 transition-colors select-none"
      >
        {/* Topographic Contour Canvas Overlay (Surface Light: Paddock Olive on Chalk Cream) */}
        <ContourBackground surface="light" className="opacity-95" />

        {/* Ambient Top Vignette for Contrast */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/[0.04] to-transparent z-[2]"
          aria-hidden="true"
        />

        {/* Centred Portrait Cut-Out Presentation */}
        <m.div
          style={{ y: portraitY }}
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 36, scale: 0.96 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={
            shouldReduceMotion
              ? { duration: 0.01 }
              : { duration: 0.75, ease: [0.65, 0.05, 0, 1] }
          }
          className="relative z-10 mx-auto mt-auto flex flex-col items-center justify-end h-[68vh] sm:h-[74vh] max-h-[720px] w-full max-w-[540px] pointer-events-none"
        >
          {/* Subtle Technical Framing Reticles */}
          <div
            className="absolute top-8 inset-x-8 flex justify-between text-paddock-olive/25 font-mono text-[9.26px] tracking-widest pointer-events-none"
            aria-hidden="true"
          >
            <span>[RETICLE // AW-01]</span>
            <span>[GRID // 100%]</span>
          </div>

          <div className="relative w-full h-full flex items-end justify-center">
            <Image
              src={siteConfig.portrait.src}
              alt={siteConfig.portrait.alt}
              fill
              priority
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 540px"
              className="object-contain object-bottom drop-shadow-none"
            />
          </div>
        </m.div>

        {/* Bottom-Left Active Sprint / Next Milestone Ticket */}
        <m.aside
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, x: -24, y: 16 }
          }
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0.01 }
              : { duration: 0.75, ease: [0.65, 0.05, 0, 1], delay: 0.25 }
          }
          className="absolute bottom-4 left-4 sm:bottom-[18.52px] sm:left-[18.52px] z-20 w-[270px] sm:w-[300px] pointer-events-auto"
          aria-label="Active Sprint Status Ticket"
        >
          {/* Notched Tab */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-paddock-olive text-chalk-cream text-[9.26px] font-sans font-medium uppercase tracking-[0.16em] [clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,0_100%)]">
            <span
              className="w-1.5 h-1.5 rounded-full bg-signal-lime"
              aria-hidden="true"
            />
            ACTIVE SPRINT
          </div>

          {/* Outlined Ticket Body */}
          <div className="border border-paddock-olive/35 bg-chalk-cream/95 backdrop-blur-[2px] p-4 flex flex-col gap-2 rounded-none">
            {/* System Flow Diagram / Circuit Outline */}
            <div className="flex items-center justify-between text-paddock-olive/60">
              <span className="font-mono text-[8px] tracking-[0.2em] uppercase">
                CIRCUIT // MERN ARCHITECTURE
              </span>
              <span className="font-mono text-[8px] tracking-wider text-paddock-olive font-semibold">
                NODE 01
              </span>
            </div>

            <svg
              className="w-full h-5 text-paddock-olive/40 my-0.5"
              viewBox="0 0 240 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 6 10 H 70 L 82 4 H 158 L 170 10 H 234"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <circle cx="6" cy="10" r="2.5" fill="#282c20" />
              <circle
                cx="120"
                cy="4"
                r="3"
                fill="#d2ff00"
                stroke="#282c20"
                strokeWidth="1"
              />
              <circle cx="234" cy="10" r="2.5" fill="#282c20" />
            </svg>

            {/* Main Sprint & Role Track */}
            <div>
              <h2 className="font-sans font-extrabold text-[14.81px] tracking-tight leading-tight text-paddock-olive uppercase">
                MERN / FULL-STACK DEV
              </h2>
              <p className="font-sans font-semibold text-[11.11px] tracking-normal text-paddock-olive/75 uppercase mt-0.5">
                APTECH LEARNING ASSOCIATE
              </p>
            </div>

            {/* 1px Paddock Olive Divider */}
            <div
              className="w-full h-px bg-paddock-olive/20 my-1"
              aria-hidden="true"
            />

            {/* Meta & Location */}
            <div className="flex items-center justify-between text-paddock-olive/70 text-[9.26px] font-sans uppercase tracking-[0.1em]">
              <span>SINCE 2023 · KARACHI, PK</span>
              <span className="font-mono text-[8.5px] text-paddock-olive/50">
                #2026-F1
              </span>
            </div>

            {/* Live Status Indicator Badge */}
            <div className="mt-1 flex items-center justify-between px-2.5 py-1.5 border border-paddock-olive/25 rounded-[2.96px] bg-chalk-cream">
              <span className="font-sans font-bold text-[9.26px] tracking-widest text-paddock-olive uppercase">
                OPEN TO WORK
              </span>
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal-lime opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-signal-lime ring-1 ring-moss-lime" />
              </span>
            </div>
          </div>
        </m.aside>

        {/* Bottom-Right Location & Scroll Telemetry Marker */}
        <div
          className="absolute bottom-4 right-4 sm:bottom-[18.52px] sm:right-[18.52px] hidden sm:flex flex-col items-end text-right z-20 pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="font-mono text-[9.26px] uppercase tracking-[0.18em] text-paddock-olive/60">
            COORD // 24.8607° N 67.0011° E
          </span>
          <span className="font-sans text-[11.11px] font-extrabold uppercase tracking-wider text-paddock-olive mt-0.5">
            SCROLL TO ENGAGE ↓
          </span>
        </div>
      </m.div>
    </section>
  );
}
