import { Award, Briefcase, Code2, FolderGit2, Users } from "lucide-react";
import { LiftCard } from "@/components/PremiumMotion";
import SectionHeader from "@/components/SectionHeader";
import { statsContent } from "@/data/portfolio";

const iconMap = {
  Award,
  Briefcase,
  Code2,
  FolderGit2,
  Users,
};

export default function Stats() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28 bg-paddock-olive text-chalk-cream">
      <div className="mx-auto w-full max-w-6xl border-t border-tarmac-gray/30 pt-16">
        <SectionHeader
          {...statsContent.header}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsContent.items.map((stat, index) => {
            const Icon = iconMap[stat.icon as keyof typeof iconMap] ?? Code2;

            return (
              <LiftCard key={stat.label} className="h-full" delay={index * 0.05}>
                <div className="h-full rounded-[8px] border border-tarmac-gray/40 bg-visor-black/90 p-6 text-center">
                  <span className="mx-auto grid size-10 place-items-center rounded-[8px] bg-paddock-olive text-signal-lime border border-tarmac-gray/40">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div className="mt-4 font-sans text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-chalk-cream leading-none">
                    {stat.value}
                    <span className="text-signal-lime">{stat.suffix}</span>
                  </div>
                  <p className="mt-2.5 text-xs font-mono uppercase tracking-widest text-sage-fog">
                    {stat.label}
                  </p>
                </div>
              </LiftCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
