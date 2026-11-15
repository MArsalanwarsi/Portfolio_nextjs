"use client";

import ContourBackground from "@/components/ContourBackground";
import { landoEase } from "@/components/PremiumMotion";
import { m, useReducedMotion } from "framer-motion";

export default function Manifesto() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      data-surface="dark"
      className="relative w-full overflow-hidden bg-paddock-olive text-chalk-cream py-[88.89px] px-4 sm:px-6 lg:px-8"
    >
      {/* Target anchor for direct #manifesto links */}
      <span id="manifesto" className="sr-only" aria-hidden="true" />

      {/* Topographic Contour Overlay on Paddock Olive Canvas */}
      <ContourBackground surface="dark" className="opacity-90" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Eyebrow Badge (9.26px caps, 2.96px radius, 1px Tarmac border) */}
        <m.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.75, ease: landoEase }}
          className="flex justify-center mb-8 sm:mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-[2.96px] border border-tarmac-gray/60 bg-paddock-olive/80 px-3 py-1 font-sans text-[9.26px] font-normal uppercase tracking-[0.14em] text-lichen-gray">
            <span className="size-1.5 rounded-full bg-signal-lime" aria-hidden="true" />
            02 // MANIFESTO & PHILOSOPHY
          </span>
        </m.div>

        {/* Mixed-Face Statement Block (Sage Fog Mona Sans + Moss Lime Bodoni Moda Serif Accent Words) */}
        <m.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.75, ease: landoEase }}
          className="mx-auto max-w-5xl text-center"
        >
          <h2 className="font-statement uppercase text-sage-fog text-[clamp(2.1rem,6.4vw,117.59px)] leading-[0.9] tracking-[-0.93px] select-none">
            <span className="block">
              BUILDING SCALABLE FULL-STACK
            </span>
            <span className="block mt-1 sm:mt-2">
              SYSTEMS WITH{" "}
              <span className="inline-block align-baseline font-serif font-bold italic text-moss-lime text-[clamp(2.25rem,6.8vw,122.22px)] leading-[0.83] tracking-[-2.78px]">
                PRECISION
              </span>
            </span>
            <span className="block mt-1 sm:mt-2">
              AND PRODUCTION{" "}
              <span className="inline-block align-baseline font-serif font-bold italic text-moss-lime text-[clamp(2.25rem,6.8vw,122.22px)] leading-[0.83] tracking-[-2.78px]">
                SPEED
              </span>
            </span>
          </h2>
        </m.div>

        {/* Personal Callout Quote (Bodoni Moda 22.22px/400 lowercase at 0.94 line-height & +0.74px tracking) */}
        <m.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.75, ease: landoEase, delay: 0.1 }}
          className="mx-auto max-w-2xl text-center mt-12 sm:mt-16"
        >
          <blockquote
            className="font-serif text-[clamp(18px,1.4vw,22.22px)] font-normal lowercase text-chalk-cream"
            style={{ lineHeight: 0.94, letterSpacing: "+0.74px" }}
          >
            “the highest standard of software engineering happens where{" "}
            <strong className="font-bold text-chalk-cream">discipline</strong> meets relentless{" "}
            <strong className="font-bold text-chalk-cream">precision</strong> across the entire product lifecycle.”
          </blockquote>

          {/* Signal Lime (#d2ff00) Signature Scribble SVG (placed 18.52px below the quote) */}
          <div
            className="flex justify-center"
            style={{ marginTop: "18.52px" }}
            aria-label="Signature scribble by Muhammad Arsalan Warsi"
          >
            <svg
              width="210"
              height="62"
              viewBox="0 0 210 62"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-signal-lime stroke-current"
            >
              <path
                d="M14 42 C 24 38, 42 16, 48 18 C 54 20, 40 46, 38 48 C 36 50, 64 24, 72 26 C 80 28, 62 48, 64 50 C 66 52, 92 30, 102 32 C 112 34, 118 42, 126 38 C 134 34, 148 22, 156 25 C 164 28, 152 44, 162 42 C 172 40, 188 32, 196 34 M 22 56 C 58 52, 110 50, 178 52 C 192 52.4, 204 53, 206 51"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </m.div>

        {/* Captioned Story Fragments (Square-cornered, 9.26px uppercase captions, 1px Tarmac borders, 0 shadow) */}
        <m.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.75, ease: landoEase, delay: 0.15 }}
          className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="border border-tarmac-gray bg-visor-black p-6 rounded-none">
            <span className="block font-sans text-[9.26px] font-normal uppercase tracking-[0.14em] text-lichen-gray mb-3">
              KARACHI, 2026 // APTECH LEARNING
            </span>
            <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-chalk-cream mb-2 tracking-tight leading-tight uppercase">
              MENTORSHIP & CODE DISCIPLINE
            </h3>
            <p className="font-sans text-sm text-stone-gray leading-relaxed">
              Delivering practical instruction in MERN stack architecture, state management, and real-world full-stack workflows.
            </p>
          </div>

          <div className="border border-tarmac-gray bg-visor-black p-6 rounded-none">
            <span className="block font-sans text-[9.26px] font-normal uppercase tracking-[0.14em] text-lichen-gray mb-3">
              CORE STACK // SECURE ARCHITECTURE
            </span>
            <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-chalk-cream mb-2 tracking-tight leading-tight uppercase">
              PRODUCTION MERN & NEXT.JS
            </h3>
            <p className="font-sans text-sm text-stone-gray leading-relaxed">
              Building bulletproof authentication systems (JWT, cookies, OTP), resilient REST APIs, and scalable MongoDB schemas.
            </p>
          </div>

          <div className="border border-tarmac-gray bg-visor-black p-6 rounded-none">
            <span className="block font-sans text-[9.26px] font-normal uppercase tracking-[0.14em] text-lichen-gray mb-3">
              ENGINEERING // ZERO CAST SHADOWS
            </span>
            <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-chalk-cream mb-2 tracking-tight leading-tight uppercase">
              TACTILE INTERACTION & SPEED
            </h3>
            <p className="font-sans text-sm text-stone-gray leading-relaxed">
              Crafting high-precision interfaces separated by tonal contrast, 1px borders, and fluid responsive physics.
            </p>
          </div>
        </m.div>
      </div>
    </section>
  );
}
