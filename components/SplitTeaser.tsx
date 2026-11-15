"use client";

import { ArrowUpRight, Code, Laptop } from "lucide-react";
import ContourBackground from "@/components/ContourBackground";
import { LiftCard } from "@/components/PremiumMotion";

export default function SplitTeaser() {
  return (
    <section
      id="split-teaser"
      data-surface="light"
      className="relative w-full py-24 sm:py-32 bg-chalk-cream text-paddock-olive overflow-hidden border-y border-paddock-olive/15 select-none"
      aria-label="Dual Track Division: On Code vs In Lab"
    >
      {/* Topographic Contour Canvas Ground */}
      <ContourBackground surface="light" className="opacity-90" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Headline */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-paddock-olive text-chalk-cream text-[9.26px] font-mono tracking-[0.2em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-signal-lime" aria-hidden="true" />
            DUAL-TRACK PERFORMANCE // F1 TELEMETRY
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-tight text-paddock-olive">
            DELIVERING <span className="font-serif font-normal italic lowercase text-moss-lime">speed</span> ON CODE,{" "}
            INSTILLING <span className="font-serif font-normal italic lowercase text-moss-lime">precision</span> IN LAB.
          </h2>
          <p className="mt-4 font-sans text-sm sm:text-base text-paddock-olive/75 max-w-xl mx-auto leading-relaxed">
            Operating at the intersection of production systems engineering and computer science pedagogy.
          </p>
        </div>

        {/* Two-Way Split Columns */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Track 01: ON CODE */}
          <LiftCard delay={0.05} className="h-full">
            <article className="h-full border border-paddock-olive/25 bg-chalk-cream/95 backdrop-blur-xs p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-paddock-olive/15 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center bg-paddock-olive text-signal-lime">
                      <Code className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="font-mono text-[9.26px] tracking-[0.2em] uppercase text-paddock-olive/60">
                        TRACK // 01
                      </span>
                      <h3 className="font-sans text-xl font-bold uppercase tracking-tight text-paddock-olive">
                        ON CODE
                      </h3>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 border border-paddock-olive/20 text-paddock-olive text-[10px] font-mono tracking-widest uppercase">
                    PROD OPS
                  </span>
                </div>

                <p className="font-sans text-sm sm:text-base leading-relaxed text-paddock-olive/80">
                  Architecting full-stack web applications, scalable RESTful services, and responsive Next.js frontends. Focused on clean architecture, minimal runtime overhead, and deterministic execution.
                </p>

                <div className="mt-6 grid grid-cols-3 gap-2 border-t border-paddock-olive/10 pt-4 text-center">
                  <div>
                    <div className="font-sans text-xl font-extrabold text-paddock-olive">08</div>
                    <div className="font-mono text-[8px] uppercase tracking-wider text-paddock-olive/60">BUILDS</div>
                  </div>
                  <div>
                    <div className="font-sans text-xl font-extrabold text-paddock-olive">67</div>
                    <div className="font-mono text-[8px] uppercase tracking-wider text-paddock-olive/60">SKILLS</div>
                  </div>
                  <div>
                    <div className="font-sans text-xl font-extrabold text-signal-lime bg-paddock-olive px-1 py-0.5">100%</div>
                    <div className="font-mono text-[8px] uppercase tracking-wider text-paddock-olive/60 mt-0.5">COVERAGE</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-paddock-olive/15 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-paddock-olive/70 font-semibold">
                  EXPLORE CODE REPOSITORIES
                </span>
                <a
                  href="#projects"
                  aria-label="View on-track code repositories"
                  className="grid size-[55.5px] place-items-center bg-signal-lime text-paddock-olive transition-transform hover:scale-105 active:scale-95"
                >
                  <ArrowUpRight className="size-6 stroke-[2.5]" aria-hidden="true" />
                </a>
              </div>
            </article>
          </LiftCard>

          {/* Track 02: IN LAB */}
          <LiftCard delay={0.12} className="h-full">
            <article className="h-full border border-paddock-olive/25 bg-chalk-cream/95 backdrop-blur-xs p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-paddock-olive/15 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center bg-paddock-olive text-signal-lime">
                      <Laptop className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="font-mono text-[9.26px] tracking-[0.2em] uppercase text-paddock-olive/60">
                        TRACK // 02
                      </span>
                      <h3 className="font-sans text-xl font-bold uppercase tracking-tight text-paddock-olive">
                        IN LAB
                      </h3>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 border border-paddock-olive/20 text-paddock-olive text-[10px] font-mono tracking-widest uppercase">
                    APTECH FACULTY
                  </span>
                </div>

                <p className="font-sans text-sm sm:text-base leading-relaxed text-paddock-olive/80">
                  Mentoring aspiring developers in modern web development and software engineering paradigms. Leading hands-on labs in JavaScript, React, Node.js, and database schema design.
                </p>

                <div className="mt-6 grid grid-cols-3 gap-2 border-t border-paddock-olive/10 pt-4 text-center">
                  <div>
                    <div className="font-sans text-xl font-extrabold text-paddock-olive">150+</div>
                    <div className="font-mono text-[8px] uppercase tracking-wider text-paddock-olive/60">STUDENTS</div>
                  </div>
                  <div>
                    <div className="font-sans text-xl font-extrabold text-paddock-olive">03+</div>
                    <div className="font-mono text-[8px] uppercase tracking-wider text-paddock-olive/60">YEARS</div>
                  </div>
                  <div>
                    <div className="font-sans text-xl font-extrabold text-signal-lime bg-paddock-olive px-1 py-0.5">ACCP</div>
                    <div className="font-mono text-[8px] uppercase tracking-wider text-paddock-olive/60 mt-0.5">CURRICULUM</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-paddock-olive/15 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-paddock-olive/70 font-semibold">
                  REVIEW ACADEMIC RECORD
                </span>
                <a
                  href="#experience"
                  aria-label="View academic mentorship and teaching record"
                  className="grid size-[55.5px] place-items-center bg-signal-lime text-paddock-olive transition-transform hover:scale-105 active:scale-95"
                >
                  <ArrowUpRight className="size-6 stroke-[2.5]" aria-hidden="true" />
                </a>
              </div>
            </article>
          </LiftCard>
        </div>
      </div>
    </section>
  );
}
