import { CalendarDays, GraduationCap, Star } from "lucide-react";
import { LiftCard } from "@/components/PremiumMotion";
import SectionHeader from "@/components/SectionHeader";
import { educationContent } from "@/data/portfolio";

export default function Education() {
  return (
    <section id="education" className="px-4 py-20 sm:px-6 lg:py-28 bg-paddock-olive text-chalk-cream">
      <div className="mx-auto w-full max-w-6xl border-t border-tarmac-gray/30 pt-16">
        <SectionHeader {...educationContent.header} />

        <div className="grid gap-6 md:grid-cols-2">
          {educationContent.items.map((item, index) => (
            <LiftCard key={item.degree} className="h-full" delay={index * 0.06}>
              <div className="h-full rounded-[8px] border border-tarmac-gray/40 bg-visor-black/90 p-5 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="mb-6 flex items-start justify-between gap-4 border-b border-tarmac-gray/30 pb-4">
                    <span className="grid size-10 place-items-center rounded-[8px] bg-paddock-olive text-signal-lime border border-tarmac-gray/40">
                      <GraduationCap className="size-5" aria-hidden="true" />
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-[#b4b8a5]/30 text-[#b4b8a5] text-xs font-mono tracking-widest uppercase">
                      <CalendarDays className="size-3.5" aria-hidden="true" />
                      {item.period}
                    </span>
                  </div>

                  <span className="font-mono text-[9.26px] tracking-[0.2em] uppercase text-signal-lime">
                    ACADEMY // 0{index + 1}
                  </span>
                  <h3 className="font-sans text-2xl font-bold uppercase tracking-tight text-chalk-cream mt-1">
                    {item.degree}
                  </h3>
                  <p className="mt-1 text-sm font-serif font-bold text-moss-lime tracking-wide">
                    {item.institution}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-stone-gray font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 pt-3 border-t border-tarmac-gray/20">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-sans font-semibold uppercase tracking-wide border border-signal-lime/40 text-signal-lime bg-paddock-olive/50">
                    <Star className="size-3 text-signal-lime" aria-hidden="true" />
                    {item.result}
                  </span>
                  {item.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="inline-flex items-center px-2.5 py-1 text-xs font-sans font-medium uppercase tracking-wide border border-[#b4b8a5]/30 bg-paddock-olive/40 text-sage-fog"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </LiftCard>
          ))}
        </div>
      </div>
    </section>
  );
}
