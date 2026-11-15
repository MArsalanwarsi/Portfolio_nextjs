import { Briefcase, CalendarDays, MapPin } from "lucide-react";
import { LiftCard } from "@/components/PremiumMotion";
import SectionHeader from "@/components/SectionHeader";
import { experienceContent } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="px-4 py-20 sm:px-6 lg:py-28 bg-paddock-olive text-chalk-cream">
      <div className="mx-auto w-full max-w-6xl border-t border-tarmac-gray/30 pt-16">
        <SectionHeader {...experienceContent.header} />

        <div className="relative space-y-6 before:absolute before:left-4 before:top-3 before:h-[calc(100%-1.5rem)] before:w-px before:bg-tarmac-gray/40 sm:before:left-6">
          {experienceContent.items.map((experience, index) => (
            <LiftCard
              key={`${experience.company}-${experience.role}`}
              className="relative pl-12 sm:pl-16"
              delay={index * 0.07}
            >
              <article data-scroll-enter>
                <span className="absolute left-[0.78rem] top-6 z-10 size-3 rounded-full bg-signal-lime ring-4 ring-paddock-olive sm:left-[1.28rem]" />

                <div className="rounded-[8px] border border-tarmac-gray/40 bg-visor-black/90 p-5 sm:p-7">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-tarmac-gray/30 pb-4">
                    <div>
                      <span className="font-mono text-[9.26px] tracking-[0.2em] uppercase text-signal-lime">
                        EXP // 0{index + 1}
                      </span>
                      <h3 className="font-sans text-2xl font-bold uppercase tracking-tight text-chalk-cream mt-1">
                        {experience.role}
                      </h3>
                      <div className="mt-2.5 flex flex-wrap gap-3 text-xs font-mono uppercase tracking-wider text-sage-fog">
                        <span className="inline-flex items-center gap-1.5">
                          <Briefcase className="size-3.5 text-signal-lime" aria-hidden="true" />
                          {experience.company}
                        </span>
                        {experience.location ? (
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="size-3.5 text-signal-lime" aria-hidden="true" />
                            {experience.location}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-[#b4b8a5]/30 text-[#b4b8a5] text-xs font-mono tracking-widest uppercase">
                      <CalendarDays className="size-3.5" aria-hidden="true" />
                      {experience.period}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-2.5 text-sm leading-6 text-stone-gray font-sans">
                    {experience.description.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-signal-lime" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2 pt-2 border-t border-tarmac-gray/20">
                    {experience.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-2.5 py-1 text-xs font-sans font-medium uppercase tracking-wide border border-[#b4b8a5]/30 bg-paddock-olive/40 text-sage-fog"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </LiftCard>
          ))}
        </div>
      </div>
    </section>
  );
}

