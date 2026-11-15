import { Award, Database, FileCode, Globe, Layers, Star } from "lucide-react";
import { LiftCard } from "@/components/PremiumMotion";
import SectionHeader from "@/components/SectionHeader";
import { certificatesContent } from "@/data/portfolio";

const iconMap = {
  Award,
  Database,
  FileCode,
  Globe,
  Layers,
  Star,
};

export default function Certificates() {
  return (
    <section id="certificates" className="px-4 py-20 sm:px-6 lg:py-28 bg-paddock-olive text-chalk-cream">
      <div className="mx-auto w-full max-w-6xl border-t border-tarmac-gray/30 pt-16">
        <SectionHeader
          {...certificatesContent.header}
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {certificatesContent.items.map((cert, index) => {
            const Icon = iconMap[cert.icon as keyof typeof iconMap] ?? Award;

            return (
              <LiftCard key={cert.title} className="h-full" delay={index * 0.06}>
                <div className="h-full rounded-[8px] border border-tarmac-gray/40 bg-visor-black/90 p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <div className="mb-5 flex items-center justify-between gap-4 border-b border-tarmac-gray/30 pb-4">
                      <span className="grid size-10 place-items-center rounded-[8px] bg-paddock-olive text-signal-lime border border-tarmac-gray/40">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 border border-[#b4b8a5]/30 text-[#b4b8a5] text-xs font-mono tracking-widest uppercase">
                        {cert.date}
                      </span>
                    </div>

                    <span className="font-mono text-[9.26px] tracking-[0.2em] uppercase text-signal-lime">
                      CREDENTIAL // 0{index + 1}
                    </span>
                    <h3 className="font-sans text-xl font-bold uppercase tracking-tight text-chalk-cream mt-1 leading-snug">
                      {cert.title}
                    </h3>
                    <p className="mt-1 text-sm font-serif font-bold text-moss-lime tracking-wide">
                      {cert.issuer}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-stone-gray font-sans">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </LiftCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
